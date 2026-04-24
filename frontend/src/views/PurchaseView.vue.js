import { computed, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { purchaseItem } from "../api/orders";
import { getBasicReports } from "../api/reports";
import { listUsers } from "../api/users";
import { formatCategory, formatPrice, getErrorMessage, } from "../utils/display";
const loading = ref(false);
const submittingItemId = ref("");
const users = ref([]);
const unsoldItems = ref([]);
const selectedBuyer = ref("");
const buyerOptions = computed(() => users.value.map((user) => ({
    label: `${user.user_name} (${user.user_id})`,
    value: user.user_id,
})));
async function loadPurchaseData() {
    loading.value = true;
    try {
        const [userList, basicReports] = await Promise.all([listUsers(), getBasicReports()]);
        users.value = userList;
        unsoldItems.value = basicReports.unsold_items;
        selectedBuyer.value || (selectedBuyer.value = userList[0]?.user_id ?? "");
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        loading.value = false;
    }
}
async function handlePurchase(item) {
    if (!selectedBuyer.value) {
        ElMessage.warning("请先选择买家");
        return;
    }
    try {
        await ElMessageBox.confirm(`确认由 ${selectedBuyer.value} 购买商品 ${item.item_name} 吗？`, "购买确认", {
            type: "warning",
            confirmButtonText: "确认购买",
            cancelButtonText: "取消",
        });
        submittingItemId.value = item.item_id;
        await purchaseItem({
            item_id: item.item_id,
            buyer_id: selectedBuyer.value,
        });
        ElMessage.success("购买成功，订单已写入数据库");
        await loadPurchaseData();
    }
    catch (error) {
        if (error === "cancel") {
            return;
        }
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        submittingItemId.value = "";
    }
}
onMounted(loadPurchaseData);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "page-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "section-header" },
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
    ...{ class: "action-row" },
});
const __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.selectedBuyer),
    placeholder: "选择买家",
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.selectedBuyer),
    placeholder: "选择买家",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [buyer] of __VLS_getVForSourceType((__VLS_ctx.buyerOptions))) {
    const __VLS_4 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: (buyer.value),
        label: (buyer.label),
        value: (buyer.value),
    }));
    const __VLS_6 = __VLS_5({
        key: (buyer.value),
        label: (buyer.label),
        value: (buyer.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
var __VLS_3;
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.loadPurchaseData)
};
__VLS_11.slots.default;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "panel-card" },
});
const __VLS_16 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    data: (__VLS_ctx.unsoldItems),
    border: true,
    stripe: true,
    emptyText: "当前没有可购买的商品",
}));
const __VLS_18 = __VLS_17({
    data: (__VLS_ctx.unsoldItems),
    border: true,
    stripe: true,
    emptyText: "当前没有可购买的商品",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_19.slots.default;
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "item_id",
    label: "商品编号",
    width: "120",
}));
const __VLS_22 = __VLS_21({
    prop: "item_id",
    label: "商品编号",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    prop: "item_name",
    label: "商品名称",
    minWidth: "180",
}));
const __VLS_26 = __VLS_25({
    prop: "item_name",
    label: "商品名称",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "分类",
    minWidth: "140",
}));
const __VLS_30 = __VLS_29({
    label: "分类",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.formatCategory(row.category));
}
var __VLS_31;
const __VLS_32 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    prop: "seller_name",
    label: "卖家",
    minWidth: "140",
}));
const __VLS_34 = __VLS_33({
    prop: "seller_name",
    label: "卖家",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "价格",
    width: "120",
}));
const __VLS_38 = __VLS_37({
    label: "价格",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_39.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.formatPrice(row.price));
}
var __VLS_39;
const __VLS_40 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    label: "操作",
    width: "180",
}));
const __VLS_42 = __VLS_41({
    label: "操作",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_43.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_44 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submittingItemId === row.item_id),
        disabled: (!__VLS_ctx.selectedBuyer),
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.submittingItemId === row.item_id),
        disabled: (!__VLS_ctx.selectedBuyer),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handlePurchase(row);
        }
    };
    __VLS_47.slots.default;
    var __VLS_47;
}
var __VLS_43;
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['page-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-kicker']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['action-row']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formatCategory: formatCategory,
            formatPrice: formatPrice,
            loading: loading,
            submittingItemId: submittingItemId,
            unsoldItems: unsoldItems,
            selectedBuyer: selectedBuyer,
            buyerOptions: buyerOptions,
            loadPurchaseData: loadPurchaseData,
            handlePurchase: handlePurchase,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
