import { execSync } from "child_process";

try {
  console.log("🛠 Building project...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("🚀 Deploying to Surge...");
  execSync("surge ./build portfolio-" + Date.now() + ".surge.sh", {
    stdio: "inherit",
  });

  console.log("✅ Deployment complete!");
} catch (err) {
  console.error("❌ Deployment failed:", err);
}
