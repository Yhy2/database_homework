import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const rootDir = resolve(__dirname, "../../../..");

describe("production Docker build", () => {
  it("passes the merchant demo token into the frontend build", () => {
    const dockerfile = readFileSync(resolve(rootDir, "Dockerfile"), "utf8");
    const prodCompose = readFileSync(resolve(rootDir, "docker-compose.prod.yml"), "utf8");

    expect(dockerfile).toContain("ARG VITE_DEMO_ACCESS_TOKEN=local-demo-token");
    expect(dockerfile).toContain("ENV VITE_DEMO_ACCESS_TOKEN=$VITE_DEMO_ACCESS_TOKEN");
    expect(prodCompose).toContain("VITE_DEMO_ACCESS_TOKEN: ${DEMO_ACCESS_TOKEN");
  });
});
