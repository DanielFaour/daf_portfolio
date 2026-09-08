import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("dist/index.html", "dist/404.html");
await copyFile("CNAME", "dist/CNAME");
await cp("res", "dist/res", { recursive: true });
