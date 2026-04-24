import { computed, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { createItem } from "../api/items";
import { getErrorMessage } from "../utils/display";
const props = defineProps();
const emit = defineEmits();
const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
const formRef = ref();
const loading = ref(false);
const categoryOptions = ["Book", "DailyGoods", "Electronics", "Furniture"];
const form = reactive({
    item_id: "",
    item_name: "",
    category: "Book",
    price: 20,
    seller_id: "",
});
const rules = {
    item_id: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
    item_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
    category: [{ required: true, message: "请选择分类", trigger: "change" }],
    price: [{ required: true, message: "请输入价格", trigger: "change" }],
    seller_id: [{ required: true, message: "请选择卖家", trigger: "change" }],
};
function resetForm() {
    form.item_id = "";
    form.item_name = "";
    form.category = "Book";
    form.price = 20;
    form.seller_id = props.users[0]?.user_id ?? "";
    formRef.value?.clearValidate();
}
watch(() => props.modelValue, (value) => {
    if (value) {
        resetForm();
    }
});
watch(() => props.users, (users) => {
    if (!form.seller_id && users.length > 0) {
        form.seller_id = users[0].user_id;
    }
}, { immediate: true });
async function handleSubmit() {
    await formRef.value?.validate();
    loading.value = true;
    try {
        await createItem({
            ...form,
            price: Number(form.price),
        });
        ElMessage.success("商品已新增");
        visible.value = false;
        emit("submitted");
    }
    catch (error) {
        ElMessage.error(getErrorMessage(error));
    }
    finally {
        loading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.visible),
    title: "新增商品",
    width: "520px",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.visible),
    title: "新增商品",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
}));
const __VLS_7 = __VLS_6({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_9 = {};
__VLS_8.slots.default;
const __VLS_11 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    label: "商品编号",
    prop: "item_id",
}));
const __VLS_13 = __VLS_12({
    label: "商品编号",
    prop: "item_id",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
const __VLS_15 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    modelValue: (__VLS_ctx.form.item_id),
    placeholder: "例如 i101",
}));
const __VLS_17 = __VLS_16({
    modelValue: (__VLS_ctx.form.item_id),
    placeholder: "例如 i101",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
var __VLS_14;
const __VLS_19 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    label: "商品名称",
    prop: "item_name",
}));
const __VLS_21 = __VLS_20({
    label: "商品名称",
    prop: "item_name",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_22.slots.default;
const __VLS_23 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    modelValue: (__VLS_ctx.form.item_name),
    placeholder: "例如 Arduino Kit",
}));
const __VLS_25 = __VLS_24({
    modelValue: (__VLS_ctx.form.item_name),
    placeholder: "例如 Arduino Kit",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_22;
const __VLS_27 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    gutter: (16),
}));
const __VLS_29 = __VLS_28({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_30.slots.default;
const __VLS_31 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    span: (12),
}));
const __VLS_33 = __VLS_32({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_34.slots.default;
const __VLS_35 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    label: "分类",
    prop: "category",
}));
const __VLS_37 = __VLS_36({
    label: "分类",
    prop: "category",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
__VLS_38.slots.default;
const __VLS_39 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    modelValue: (__VLS_ctx.form.category),
    ...{ style: {} },
}));
const __VLS_41 = __VLS_40({
    modelValue: (__VLS_ctx.form.category),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.categoryOptions))) {
    const __VLS_43 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        key: (option),
        label: (option),
        value: (option),
    }));
    const __VLS_45 = __VLS_44({
        key: (option),
        label: (option),
        value: (option),
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
}
var __VLS_42;
var __VLS_38;
var __VLS_34;
const __VLS_47 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    span: (12),
}));
const __VLS_49 = __VLS_48({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
__VLS_50.slots.default;
const __VLS_51 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    label: "价格",
    prop: "price",
}));
const __VLS_53 = __VLS_52({
    label: "价格",
    prop: "price",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_54.slots.default;
const __VLS_55 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    modelValue: (__VLS_ctx.form.price),
    min: (0.01),
    precision: (2),
    ...{ style: {} },
}));
const __VLS_57 = __VLS_56({
    modelValue: (__VLS_ctx.form.price),
    min: (0.01),
    precision: (2),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
var __VLS_54;
var __VLS_50;
var __VLS_30;
const __VLS_59 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    label: "卖家",
    prop: "seller_id",
}));
const __VLS_61 = __VLS_60({
    label: "卖家",
    prop: "seller_id",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
__VLS_62.slots.default;
const __VLS_63 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
    modelValue: (__VLS_ctx.form.seller_id),
    ...{ style: {} },
}));
const __VLS_65 = __VLS_64({
    modelValue: (__VLS_ctx.form.seller_id),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_66.slots.default;
for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users))) {
    const __VLS_67 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        key: (user.user_id),
        label: (`${user.user_name} (${user.user_id})`),
        value: (user.user_id),
    }));
    const __VLS_69 = __VLS_68({
        key: (user.user_id),
        label: (`${user.user_name} (${user.user_id})`),
        value: (user.user_id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
}
var __VLS_66;
var __VLS_62;
var __VLS_8;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_71 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        ...{ 'onClick': {} },
    }));
    const __VLS_73 = __VLS_72({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    let __VLS_75;
    let __VLS_76;
    let __VLS_77;
    const __VLS_78 = {
        onClick: (...[$event]) => {
            __VLS_ctx.visible = false;
        }
    };
    __VLS_74.slots.default;
    var __VLS_74;
    const __VLS_79 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.loading),
    }));
    const __VLS_81 = __VLS_80({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    let __VLS_83;
    let __VLS_84;
    let __VLS_85;
    const __VLS_86 = {
        onClick: (__VLS_ctx.handleSubmit)
    };
    __VLS_82.slots.default;
    var __VLS_82;
}
var __VLS_3;
// @ts-ignore
var __VLS_10 = __VLS_9;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            visible: visible,
            formRef: formRef,
            loading: loading,
            categoryOptions: categoryOptions,
            form: form,
            rules: rules,
            handleSubmit: handleSubmit,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
