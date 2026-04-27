import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const stylesheet = readFileSync(resolve(currentDir, "../main.css"), "utf8");

describe("surface interaction treatment", () => {
  it("removes frosted glass styling and keeps mouse hover highlight", () => {
    expect(stylesheet).toContain("--surface: #ffffff;");
    expect(stylesheet).toContain("--surface-hover: #fcfdff;");
    expect(stylesheet).not.toContain("backdrop-filter:");
    expect(stylesheet).toMatch(/\.site-header__inner:hover\s*\{/);
    expect(stylesheet).toMatch(/\.page-hero:hover,\s*\.content-block:hover,\s*\.panel-card:hover/);
    expect(stylesheet).toMatch(/\.app-shell__backdrop\s*\{[\s\S]*z-index:\s*0;/);
    expect(stylesheet).toMatch(/\.site-header\s*\{[\s\S]*position:\s*relative;/);
    expect(stylesheet).not.toMatch(/\.site-header\s*\{[\s\S]*position:\s*fixed;/);
    expect(stylesheet).not.toMatch(/\.site-header\s*\{[\s\S]*position:\s*sticky;/);
    expect(stylesheet).toMatch(/\.page-frame\s*\{[\s\S]*z-index:\s*1;/);
    expect(stylesheet).toMatch(/\.page-frame\s*\{[\s\S]*padding:\s*28px\s*0\s*48px;/);
    expect(stylesheet).not.toMatch(/:focus-within/);
  });
});
