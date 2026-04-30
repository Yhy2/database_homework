import { flushPromises, mount } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { createMemoryHistory, createRouter } from "vue-router";
import { beforeEach, vi } from "vitest";

import HomeView from "../HomeView.vue";
import { resetAuthSessionForTest } from "../../auth/session";

vi.mock("../../api/system", () => ({
  getHealth: vi.fn().mockResolvedValue({ status: "ok", database: "ok" }),
}));

vi.mock("../../api/users", () => ({
  listUsers: vi.fn().mockResolvedValue([
    { user_id: "u001", user_name: "ZhangSan", phone: "13800000001" },
    { user_id: "u002", user_name: "LiSi", phone: "13800000002" },
  ]),
}));

vi.mock("../../api/items", () => ({
  listItems: vi.fn().mockResolvedValue([
    { item_id: "i001", item_name: "CalculusBook", category: "Book", price: 20, status: 0, seller_id: "u001" },
    { item_id: "i002", item_name: "DeskLamp", category: "DailyGoods", price: 35, status: 1, seller_id: "u002" },
  ]),
}));

vi.mock("../../api/orders", () => ({
  listOrders: vi.fn().mockResolvedValue([
    {
      order_id: "0001",
      item_id: "i002",
      item_name: "DeskLamp",
      buyer_id: "u001",
      buyer_name: "ZhangSan",
      seller_id: "u002",
      seller_name: "LiSi",
      order_date: "2024-05-01",
    },
  ]),
}));

vi.mock("../../api/reports", () => ({
  getAggregateReports: vi.fn().mockResolvedValue({
    total_items: 2,
    average_price: 27.5,
    top_seller: { user_id: "u001", user_name: "ZhangSan", item_count: 1 },
    category_counts: [],
  }),
}));

async function mountHome() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: HomeView },
      { path: "/items", component: { template: "<div>items page</div>" } },
      { path: "/login", component: { template: "<div>login page</div>" } },
      { path: "/stats", component: { template: "<div>stats page</div>" } },
    ],
  });

  router.push("/");
  await router.isReady();

  const wrapper = mount(HomeView, {
    global: {
      plugins: [router, ElementPlus],
    },
  });

  await flushPromises();
  return wrapper;
}

describe("HomeView", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("renders a dashboard-only homepage without explanatory sections", async () => {
    const wrapper = await mountHome();

    expect(wrapper.text()).toContain("校园二手交易平台");
    expect(wrapper.text()).toContain("保留原有结构的核心入口");
    expect(wrapper.text()).toContain("商品管理");
    expect(wrapper.text()).toContain("查询统计");
    expect(wrapper.text()).toContain("事务购买演示");
    expect(wrapper.text()).toContain("游客只读模式");
    expect(wrapper.text()).toContain("商家登录上架");
    expect(wrapper.text()).not.toContain("系统运行概览");
    expect(wrapper.text()).not.toContain("作业能力覆盖");
  });
});
