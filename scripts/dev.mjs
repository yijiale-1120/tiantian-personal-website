import { spawn } from "node:child_process";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/tiantian-personal-website";

const child = spawn("next", ["dev", ...process.argv.slice(2)], {
  stdio: ["inherit", "pipe", "inherit"],
  env: { ...process.env, FORCE_COLOR: "1" },
});

child.stdout.on("data", (data) => {
  process.stdout.write(data);

  const text = data.toString();
  const match = text.match(/Local:\s+(https?:\/\/\S+)/);
  if (match) {
    const origin = match[1].replace(/\/+$/, "");
    console.log(`  ➜  Full URL:    ${origin}${basePath}`);
  }
});

child.on("exit", (code) => process.exit(code ?? 1));
