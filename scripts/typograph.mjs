import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Typograf from "typograf";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "content", "copy.ru.json");
const outputPath = path.join(root, "src", "content", "copy.ru.json");
const typograf = new Typograf({ locale: "ru" });

const transform = (value) => {
  if (typeof value === "string") {
    if (/^(?:https?:\/\/|\/images\/|\/brand\/)/.test(value)) return value;
    return typograf.execute(value);
  }
  if (Array.isArray(value)) return value.map(transform);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, transform(item)]));
  }
  return value;
};

const raw = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(transform(raw), null, 2)}\n`, "utf8");
console.log(`Typographed copy: ${path.relative(root, sourcePath)} -> ${path.relative(root, outputPath)}`);
