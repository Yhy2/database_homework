import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const stylesheet = readFileSync(resolve(currentDir, "../main.css"), "utf8");

describe("module title styling", () => {
  it("renders module title labels in a normal text style without decorative effects", () => {
    expect(stylesheet).toMatch(
      /\.section-kicker,\s*\.page-hero__eyebrow,\s*\.result-table-card__eyebrow,\s*\.shortcut-card__eyebrow,\s*\.hero-insight__eyebrow\s*\{/,
    );
    expect(stylesheet).toContain("letter-spacing: normal;");
    expect(stylesheet).toContain("text-transform: none;");
    expect(stylesheet).toContain("color: var(--text-soft);");
    expect(stylesheet).not.toMatch(
      /\.section-kicker[\s\S]*letter-spacing:\s*0\.24em[\s\S]*text-transform:\s*uppercase/,
    );
  });
});
