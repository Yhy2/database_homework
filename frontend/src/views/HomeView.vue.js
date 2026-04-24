import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import MetricCard from "../components/MetricCard.vue";
import { listItems } from "../api/items";
import { listOrders } from "../api/orders";
import { getAggregateReports } from "../api/reports";
import { getHealth } from "../api/system";
import { listUsers } from "../api/users";
import { getErrorMessage } from "../utils/display";
const router = useRouter();
const loading = ref(false);
const healthLabel = ref("检测中");
const userCount = ref(0);
const itemCount = ref(0);
const orderCount = ref(0);
const unsoldCount = ref(0);
const averagePrice = ref("¥0.00");
const topSeller = ref("-");
const shortcuts = [
    { title: "商品管理", description: "新增商品、修改价格、删除未售商品", path: "/items" },
    { title: "数据查询", description: "查看连接查询、聚合结果和数据库视图", path: "/stats" },
    { title: "交易演示", description: "现场演示事务购买与重复购买限制", path: "/purchase" },
];
async function loadDashboard() {
    loading.value = true;
    try {
        const [health, users, items, orders, aggregate] = await Promise.all([
            getHealth(),
            listUsers(),
            listItems(),
            listOrders(),
            getAggregateReports(),
        ]);
        healthLabel.value = health.database === "ok" ? "数据库连接正常" : "数据库异常";
        userCount.value = users.length;
        itemCount.value = items.length;
        orderCount.value = orders.length;
        unsoldCount.value = items.filter((item) => item.status === 0).length;
        averagePrice.value = `¥${aggregate.average_price.toFixed(2)}`;
        topSeller.value = `${aggregate.top_seller.user_name} (${aggregate.top_seller.item_count} 件)`;
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        loading.value = false;
    }
}
function openPage(path) {
    router.push(path);
}
onMounted(loadDashboard);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "page-section" },
});
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-kicker" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-copy" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-status" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.healthLabel);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "metric-grid" },
});
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "用户总数",
    value: (__VLS_ctx.userCount),
    description: "题目初始用户已导入",
    tone: "sun",
}));
const __VLS_1 = __VLS_0({
    title: "用户总数",
    value: (__VLS_ctx.userCount),
    description: "题目初始用户已导入",
    tone: "sun",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "商品总数",
    value: (__VLS_ctx.itemCount),
    description: "包含 1 条自定义商品数据",
    tone: "sea",
}));
const __VLS_4 = __VLS_3({
    title: "商品总数",
    value: (__VLS_ctx.itemCount),
    description: "包含 1 条自定义商品数据",
    tone: "sea",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "订单总数",
    value: (__VLS_ctx.orderCount),
    description: "展示历史成交与新增订单",
    tone: "ink",
}));
const __VLS_7 = __VLS_6({
    title: "订单总数",
    value: (__VLS_ctx.orderCount),
    description: "展示历史成交与新增订单",
    tone: "ink",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "在售商品",
    value: (__VLS_ctx.unsoldCount),
    description: "可直接用于购买演示",
    tone: "sun",
}));
const __VLS_10 = __VLS_9({
    title: "在售商品",
    value: (__VLS_ctx.unsoldCount),
    description: "可直接用于购买演示",
    tone: "sun",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "平均价格",
    value: (__VLS_ctx.averagePrice),
    description: "数据库聚合统计结果",
    tone: "sea",
}));
const __VLS_13 = __VLS_12({
    title: "平均价格",
    value: (__VLS_ctx.averagePrice),
    description: "数据库聚合统计结果",
    tone: "sea",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {[typeof MetricCard, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
    title: "最多发布者",
    value: (__VLS_ctx.topSeller),
    description: "按商品数量自动计算",
    tone: "ink",
}));
const __VLS_16 = __VLS_15({
    title: "最多发布者",
    value: (__VLS_ctx.topSeller),
    description: "按商品数量自动计算",
    tone: "ink",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "shortcut-grid" },
});
for (const [card] of __VLS_getVForSourceType((__VLS_ctx.shortcuts))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
        key: (card.path),
        ...{ class: "shortcut-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (card.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (card.description);
    const __VLS_18 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        ...{ 'onClick': {} },
        type: "primary",
        plain: true,
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onClick': {} },
        type: "primary",
        plain: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_22;
    let __VLS_23;
    let __VLS_24;
    const __VLS_25 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openPage(card.path);
        }
    };
    __VLS_21.slots.default;
    var __VLS_21;
}
/** @type {__VLS_StyleScopedClasses['page-section']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['section-kicker']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-status']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['shortcut-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['shortcut-card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MetricCard: MetricCard,
            loading: loading,
            healthLabel: healthLabel,
            userCount: userCount,
            itemCount: itemCount,
            orderCount: orderCount,
            unsoldCount: unsoldCount,
            averagePrice: averagePrice,
            topSeller: topSeller,
            shortcuts: shortcuts,
            openPage: openPage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
