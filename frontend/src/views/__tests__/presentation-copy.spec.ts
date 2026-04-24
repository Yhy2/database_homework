import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");

function read(relativePath: string) {
  return readFileSync(resolve(root, relativePath), "utf8");
}

describe("presentation copy cleanup", () => {
  it("removes explanatory sections and description props from the frontend shell", () => {
    expect(read("components/PageHero.vue")).not.toContain("description: string");
    expect(read("components/PageHero.vue")).not.toContain("page-hero__description");
    expect(read("components/MetricCard.vue")).not.toContain("description?: string");
    expect(read("components/MetricCard.vue")).not.toContain("metric-card__description");
    expect(read("components/ResultTable.vue")).not.toContain("description?: string");
    expect(read("components/ResultTable.vue")).not.toContain("result-table-card__description");
    expect(read("components/ItemFormDialog.vue")).not.toContain("dialog-intro");
    expect(read("views/HomeView.vue")).not.toContain("作业能力覆盖");
    expect(read("views/HomeView.vue")).not.toContain("section-copy");
    expect(read("views/ItemsView.vue")).not.toContain("panel-note-grid");
    expect(read("views/UsersView.vue")).not.toContain("panel-note-grid");
    expect(read("views/OrdersView.vue")).not.toContain("panel-note-grid");
    expect(read("views/PurchaseView.vue")).not.toContain("panel-note-grid");
    expect(read("views/StatsView.vue")).not.toContain("section.description");
  });
});
