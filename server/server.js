const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 5000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "portfolio-builder-dev-secret";
const DB_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DB_DIR, "db.json");

const defaultDb = { users: [], portfolios: [] };

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDb(db) {
  ensureDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": CLIENT_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, originalHash] = stored.split(":");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
}

function base64url(input) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

function signToken(payload) {
  const header = base64url({ alg: "HS256", typ: "JWT" });
  const body = base64url({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;
  const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (payload.exp < Date.now()) return null;
  return payload;
}

function currentUser(req, db) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const payload = verifyToken(token);
  if (!payload) return null;
  return db.users.find((user) => user.id === payload.userId) || null;
}

function slugify(value) {
  const slug = String(value || "portfolio")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "portfolio";
}

function normalizePortfolio(input, user) {
  const now = new Date().toISOString();
  const skills = Array.isArray(input.skills)
    ? input.skills.map(String).filter(Boolean)
    : String(input.skills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

  return {
    userId: user.id,
    username: user.username,
    name: String(input.name || ""),
    title: String(input.title || ""),
    email: String(input.email || user.email || ""),
    about: String(input.about || ""),
    skills,
    projects: Array.isArray(input.projects) ? input.projects : [],
    experience: Array.isArray(input.experience) ? input.experience : [],
    education: Array.isArray(input.education) ? input.education : [],
    font: input.font || "Poppins",
    theme: input.theme || "light",
    template: input.template || "TemplateModern",
    updatedAt: now,
  };
}

function upsertPortfolio(db, portfolio) {
  const index = db.portfolios.findIndex((item) => item.userId === portfolio.userId);
  const existing = index >= 0 ? db.portfolios[index] : {};
  const saved = { ...existing, ...portfolio, id: existing.id || crypto.randomUUID() };
  if (index >= 0) db.portfolios[index] = saved;
  else db.portfolios.push(saved);
  return saved;
}

async function handle(req, res) {
  if (req.method === "OPTIONS") return json(res, 204, {});

  const url = new URL(req.url, `http://${req.headers.host}`);
  const db = readDb();

  try {
    if (req.method === "POST" && url.pathname === "/api/auth/signup") {
      const { username, email, password } = await readBody(req);
      if (!username || !email || !password) return json(res, 400, { message: "Username, email, and password are required." });
      const normalizedEmail = String(email).toLowerCase().trim();
      const normalizedUsername = slugify(username);
      if (db.users.some((user) => user.email === normalizedEmail || user.username === normalizedUsername)) {
        return json(res, 409, { message: "An account with that email or username already exists." });
      }
      const user = {
        id: crypto.randomUUID(),
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      writeDb(db);
      return json(res, 201, { message: "Signup successful. Please log in." });
    }

    if (req.method === "POST" && url.pathname === "/api/auth/login") {
      const { email, password } = await readBody(req);
      const user = db.users.find((item) => item.email === String(email || "").toLowerCase().trim());
      if (!user || !verifyPassword(password || "", user.passwordHash)) {
        return json(res, 401, { message: "Invalid email or password." });
      }
      return json(res, 200, {
        message: "Login successful.",
        token: signToken({ userId: user.id }),
        user: { username: user.username, email: user.email },
      });
    }

    if (req.method === "GET" && url.pathname === "/api/portfolios/me") {
      const user = currentUser(req, db);
      if (!user) return json(res, 401, { message: "Please log in first." });
      const portfolio = db.portfolios.find((item) => item.userId === user.id) || null;
      return json(res, 200, { portfolio });
    }

    if (req.method === "POST" && url.pathname === "/api/portfolios/save") {
      const user = currentUser(req, db);
      if (!user) return json(res, 401, { message: "Please log in first." });
      const payload = await readBody(req);
      const saved = upsertPortfolio(db, normalizePortfolio(payload, user));
      writeDb(db);
      return json(res, 200, { message: "Portfolio saved.", portfolio: saved });
    }

    if (req.method === "POST" && url.pathname === "/api/portfolios/publish") {
      const user = currentUser(req, db);
      if (!user) return json(res, 401, { message: "Please log in first." });
      const payload = await readBody(req);
      const base = slugify(payload.slug || payload.name || user.username);
      const existing = db.portfolios.find((item) => item.userId === user.id);
      const slug = existing?.slug || `${base}-${crypto.randomBytes(3).toString("hex")}`;
      const portfolio = upsertPortfolio(db, {
        ...normalizePortfolio(payload, user),
        slug,
        published: true,
        publishedAt: new Date().toISOString(),
      });
      writeDb(db);
      return json(res, 200, {
        message: "Portfolio published.",
        portfolio,
        slug,
        url: `/portfolio/${slug}`,
      });
    }

    if (req.method === "GET" && url.pathname.startsWith("/api/portfolios/public/")) {
      const slug = decodeURIComponent(url.pathname.replace("/api/portfolios/public/", ""));
      const portfolio = db.portfolios.find((item) => item.slug === slug && item.published);
      if (!portfolio) return json(res, 404, { message: "Portfolio not found." });
      return json(res, 200, { portfolio });
    }

    return json(res, 404, { message: "Route not found." });
  } catch (error) {
    return json(res, 500, { message: error.message || "Server error." });
  }
}

http.createServer(handle).listen(PORT, () => {
  ensureDb();
  console.log(`Portfolio Builder API running on http://localhost:${PORT}`);
});
