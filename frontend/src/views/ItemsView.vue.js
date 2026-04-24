import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ItemFormDialog from "../components/ItemFormDialog.vue";
import { deleteItem, listItems, updateItemPrice } from "../api/items";
import { listUsers } from "../api/users";
import { formatCategory, formatPrice, formatStatus, getErrorMessage, statusTagType, } from "../utils/display";
const loading = ref(false);
const dialogVisible = ref(false);
const priceDialogVisible = ref(false);
const items = ref([]);
const users = ref([]);
const currentItem = ref(null);
const priceForm = reactive({
    price: 0,
});
const sortedItems = computed(() => [...items.value].sort((left, right) => left.item_id.localeCompare(right.item_id)));
async function loadPageData() {
    loading.value = true;
    try {
        const [itemList, userList] = await Promise.all([listItems(), listUsers()]);
        items.value = itemList;
        users.value = userList;
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        loading.value = false;
    }
}
function openPriceDialog(item) {
    currentItem.value = item;
    priceForm.price = Number(item.price);
    priceDialogVisible.value = true;
}
async function submitPriceUpdate() {
    if (!currentItem.value) {
        return;
    }
    try {
        await updateItemPrice(currentItem.value.item_id, priceForm.price);
        ElMessage.success("商品价格已更新");
        priceDialogVisible.value = false;
        await loadPageData();
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
}
async function removeCurrentItem(item) {
    try {
        await ElMessageBox.confirm(`确认删除商品 ${item.item_name}（${item.item_id}）吗？`, "删除确认", {
            type: "warning",
            confirmButtonText: "确认删除",
            cancelButtonText: "取消",
        });
        await deleteItem(item.item_id);
        ElMessage.success("商品已删除");
        await loadPageData();
    }
    catch (error) {
        if (error === "cancel") {
            return;
        }
        ElMessage.error(getErrorMessage(error));
    }
}
async function handleCreated() {
    await loadPageData();
}
onMounted(loadPageData);
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
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.loadPageData)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (...[$event]) => {
        __VLS_ctx.dialogVisible = true;
    }
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
    data: (__VLS_ctx.sortedItems),
    border: true,
    stripe: true,
    emptyText: "暂无商品数据",
}));
const __VLS_18 = __VLS_17({
    data: (__VLS_ctx.sortedItems),
    border: true,
    stripe: true,
    emptyText: "暂无商品数据",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_19.slots.default;
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "item_id",
    label: "商品编号",
    width: "110",
}));
const __VLS_22 = __VLS_21({
    prop: "item_id",
    label: "商品编号",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    prop: "item_name",
    label: "商品名称",
    minWidth: "160",
}));
const __VLS_26 = __VLS_25({
    prop: "item_name",
    label: "商品名称",
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "分类",
    minWidth: "130",
}));
const __VLS_30 = __VLS_29({
    label: "分类",
    minWidth: "130",
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
    minWidth: "120",
}));
const __VLS_34 = __VLS_33({
    prop: "seller_name",
    label: "卖家",
    minWidth: "120",
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
    label: "状态",
    width: "110",
}));
const __VLS_42 = __VLS_41({
    label: "状态",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_43.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_44 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        type: (__VLS_ctx.statusTagType(row.status)),
    }));
    const __VLS_46 = __VLS_45({
        type: (__VLS_ctx.statusTagType(row.status)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (__VLS_ctx.formatStatus(row.status));
    var __VLS_47;
}
var __VLS_43;
const __VLS_48 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    label: "操作",
    minWidth: "220",
    fixed: "right",
}));
const __VLS_50 = __VLS_49({
    label: "操作",
    minWidth: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_51.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-actions" },
    });
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        size: "small",
        plain: true,
        disabled: (row.status === 1),
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        size: "small",
        plain: true,
        disabled: (row.status === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openPriceDialog(row);
        }
    };
    __VLS_55.slots.default;
    var __VLS_55;
    const __VLS_60 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        plain: true,
        disabled: (row.status === 1),
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        plain: true,
        disabled: (row.status === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    let __VLS_66;
    const __VLS_67 = {
        onClick: (...[$event]) => {
            __VLS_ctx.removeCurrentItem(row);
        }
    };
    __VLS_63.slots.default;
    var __VLS_63;
}
var __VLS_51;
var __VLS_19;
/** @type {[typeof ItemFormDialog, ]} */ ;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(ItemFormDialog, new ItemFormDialog({
    ...{ 'onSubmitted': {} },
    modelValue: (__VLS_ctx.dialogVisible),
    users: (__VLS_ctx.users),
}));
const __VLS_69 = __VLS_68({
    ...{ 'onSubmitted': {} },
    modelValue: (__VLS_ctx.dialogVisible),
    users: (__VLS_ctx.users),
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
let __VLS_71;
let __VLS_72;
let __VLS_73;
const __VLS_74 = {
    onSubmitted: (__VLS_ctx.handleCreated)
};
var __VLS_70;
const __VLS_75 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    modelValue: (__VLS_ctx.priceDialogVisible),
    title: "修改商品价格",
    width: "420px",
}));
const __VLS_77 = __VLS_76({
    modelValue: (__VLS_ctx.priceDialogVisible),
    title: "修改商品价格",
    width: "420px",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
__VLS_78.slots.default;
const __VLS_79 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    labelPosition: "top",
}));
const __VLS_81 = __VLS_80({
    labelPosition: "top",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
__VLS_82.slots.default;
const __VLS_83 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    label: "商品",
}));
const __VLS_85 = __VLS_84({
    label: "商品",
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
__VLS_86.slots.default;
const __VLS_87 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    modelValue: (__VLS_ctx.currentItem?.item_name ?? ''),
    disabled: true,
}));
const __VLS_89 = __VLS_88({
    modelValue: (__VLS_ctx.currentItem?.item_name ?? ''),
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
var __VLS_86;
const __VLS_91 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
    label: "新价格",
}));
const __VLS_93 = __VLS_92({
    label: "新价格",
}, ...__VLS_functionalComponentArgsRest(__VLS_92));
__VLS_94.slots.default;
const __VLS_95 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    modelValue: (__VLS_ctx.priceForm.price),
    min: (0.01),
    precision: (2),
    ...{ style: {} },
}));
const __VLS_97 = __VLS_96({
    modelValue: (__VLS_ctx.priceForm.price),
    min: (0.01),
    precision: (2),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
var __VLS_94;
var __VLS_82;
{
    const { footer: __VLS_thisSlot } = __VLS_78.slots;
    const __VLS_99 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
        ...{ 'onClick': {} },
    }));
    const __VLS_101 = __VLS_100({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    let __VLS_103;
    let __VLS_104;
    let __VLS_105;
    const __VLS_106 = {
        onClick: (...[$event]) => {
            __VLS_ctx.priceDialogVisible = false;
        }
    };
    __VLS_102.slots.default;
    var __VLS_102;
    const __VLS_107 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_109 = __VLS_108({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_108));
    let __VLS_111;
    let __VLS_112;
    let __VLS_113;
    const __VLS_114 = {
        onClick: (__VLS_ctx.submitPriceUpdate)
    };
    __VLS_110.slots.default;
    var __VLS_110;
}
var __VLS_78;
/** @type {__VLS_StyleScopedClasses['page-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-kicker']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['action-row']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ItemFormDialog: ItemFormDialog,
            formatCategory: formatCategory,
            formatPrice: formatPrice,
            formatStatus: formatStatus,
            statusTagType: statusTagType,
            loading: loading,
            dialogVisible: dialogVisible,
            priceDialogVisible: priceDialogVisible,
            users: users,
            currentItem: currentItem,
            priceForm: priceForm,
            sortedItems: sortedItems,
            loadPageData: loadPageData,
            openPriceDialog: openPriceDialog,
            submitPriceUpdate: submitPriceUpdate,
            removeCurrentItem: removeCurrentItem,
            handleCreated: handleCreated,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
