import { flushPromises, mount } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { createMemoryHistory, createRouter } from "vue-router";
import { beforeEach, vi } from "vitest";

import PurchaseView from "../PurchaseView.vue";
import { resetAuthSessionForTest } from "../../auth/session";

vi.mock("../../api/orders", () => ({
  purchaseItem: vi.fn(),
}));

vi.mock("../../api/users", () => ({
  listUsers: vi.fn().mockResolvedValue([
    { user_id: "u001", user_name: "ZhangSan", phone: "13800000001" },
    { user_id: "u002", user_name: "LiSi", phone: "13800000002" },
  ]),
}));

vi.mock("../../api/reports", () => ({
  getBasicReports: vi.fn().mockResolvedValue({
    unsold_items: [
      {
        item_id: "i001",
        item_name: "CalculusBook",
        category: "Book",
        price: 20,
        status: 0,
        seller_id: "u001",
        seller_name: "ZhangSan",
      },
    ],
    price_above_30: [],
    daily_goods_items: [],
    seller_u001_items: [],
  }),
}));

describe("PurchaseView", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("renders the transaction demo page without explanatory rule modules", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/purchase", component: PurchaseView },
        { path: "/login", component: { template: "<div>login page</div>" } },
      ],
    });
    router.push("/purchase");
    await router.isReady();

    const wrapper = mount(PurchaseView, {
      global: {
        plugins: [router, ElementPlus],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("事务购买演示台");
    expect(wrapper.text()).toContain("选择成交买家");
    expect(wrapper.text()).toContain("游客只读模式");
    expect(wrapper.text()).toContain("登录后购买");
    expect(wrapper.text()).not.toContain("事务规则说明");
  });
});
