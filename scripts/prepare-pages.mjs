import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("dist/index.html", "dist/404.html");
await copyFile("CNAME", "dist/CNAME");
await cp("res", "dist/res", { recursive: true });
await copyFile("index_eng.html", "dist/index_eng.html");
await copyFile("cv.html", "dist/cv.html");
await copyFile("cv_eng.html", "dist/cv_eng.html");
await mkdir("dist/projects/drikkings", { recursive: true });
await copyFile("projects/drikkings/index.html", "dist/projects/drikkings/index.html");
await copyFile("projects/drikkings/index_eng.html", "dist/projects/drikkings/index_eng.html");
