import { mount } from "@vue/test-utils";

import AnimatedDataFlow from "../AnimatedDataFlow.vue";
import LoginAccessGraphic from "../LoginAccessGraphic.vue";
import QueryFlowGraphic from "../QueryFlowGraphic.vue";
import TransactionFlowGraphic from "../TransactionFlowGraphic.vue";

describe("animated flow graphics", () => {
  it("renders the marketplace data flow nodes", () => {
    const wrapper = mount(AnimatedDataFlow);

    expect(wrapper.text()).toContain("用户 User");
    expect(wrapper.text()).toContain("商品 Item");
    expect(wrapper.text()).toContain("订单 Orders");
    expect(wrapper.text()).toContain("统计视图 View");
    expect(wrapper.find(".flow-graphic__pulse").exists()).toBe(true);
  });

  it("renders the purchase transaction flow nodes", () => {
    const wrapper = mount(TransactionFlowGraphic);

    expect(wrapper.text()).toContain("锁定商品");
    expect(wrapper.text()).toContain("写入订单");
    expect(wrapper.text()).toContain("更新状态");
    expect(wrapper.text()).toContain("拒绝重复购买");
    expect(wrapper.find(".flow-graphic__stream").exists()).toBe(true);
  });

  it("renders the query capability flow nodes", () => {
    const wrapper = mount(QueryFlowGraphic);

    expect(wrapper.text()).toContain("基本查询");
    expect(wrapper.text()).toContain("连接查询");
    expect(wrapper.text()).toContain("聚合统计");
    expect(wrapper.text()).toContain("数据库视图");
    expect(wrapper.find(".flow-graphic__orbit").exists()).toBe(true);
  });

  it("renders the login access flow nodes", () => {
    const wrapper = mount(LoginAccessGraphic);

    expect(wrapper.text()).toContain("游客只读");
    expect(wrapper.text()).toContain("账号认证");
    expect(wrapper.text()).toContain("账号模式");
    expect(wrapper.text()).toContain("上架商品");
    expect(wrapper.find(".flow-graphic__stream").exists()).toBe(true);
  });
});
