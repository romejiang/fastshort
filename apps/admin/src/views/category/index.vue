<template>
	<div class="h-full">
		<fs-crud ref="crudRef" v-bind="crudBinding"></fs-crud>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useFs, dict } from "@fast-crud/fast-crud";
import createCrudOptions from "@/views/crud";

const apiPrefix = "/category";
const context: any = {
	apiPrefix,
	columns: {
		_index: {
			title: "序号",
			form: { show: false },
			column: {
				// type: "index",
				align: "center",
				width: "55px",
				columnSetDisabled: true,
				formatter: (context) => {
					let index = context.index ?? 1;
					return index;
				},
			},
		},
		name: {
			title: "分类名称",
			type: "text",
			search: { show: true },
		},
		order: {
			title: "排序",
			type: "number",
			// column: {
			// 	sorter: "custom",
			// 	defaultSortOrder: "descend",
			// },
			form: {
				value: 1,
				component: {
					max: 10,
					min: 1,
				},
			},
		},
		pass: {
			title: "状态",
			type: "dict-switch",
			form: {
				value: false,
			},
			dict: dict({
				data: [
					{ value: true, label: "上架", color: "success" },
					{ value: false, label: "下架", color: "warning" },
				],
			}),
		},
	},
};

const { crudRef, crudBinding, crudExpose } = useFs({
	createCrudOptions,
	context,
});

onMounted(() => {
	crudExpose.doRefresh();
});
</script>
