<template>
	<div class="h-full">
		<fs-crud ref="crudRef" v-bind="crudBinding"></fs-crud>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useFs, dict } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useRouter } from "vue-router";

const router = useRouter();

const apiPrefix = "/series";
const context: any = {
	router,
	apiPrefix,
	columns: {
		// _index: {
		// 	title: "序号",
		// 	form: { show: false },
		// 	column: {
		// 		// type: "index",
		// 		align: "center",
		// 		width: "55px",
		// 		columnSetDisabled: true,
		// 		formatter: (context) => {
		// 			let index = context.index ?? 1;
		// 			return index;
		// 		},
		// 	},
		// },
		name: {
			title: "短剧名称",
			type: "text",
			column: {
				width: 300,
				fixed: "left",
			},
			search: { show: true },
		},

		cover: {
			title: "封面",
			type: "image-uploader",
			form: {
				component: {
					max: 1,
				},
			},
		},
		category: {
			title: "所属分类",
			type: "dict-select",
			search: { show: true },
			column: {
				width: 200,
			},
			dict: dict({
				url: `${apiPrefix}/dict`,
			}),
		},
		season: {
			title: "第几季",
			type: "number",
			form: {
				value: 1,
			},
			component: {
				min: 0,
			},
		},
		recommend: {
			title: "推荐首页",
			type: "dict-switch",
			form: {
				value: false,
			},
			dict: dict({
				data: [
					{ value: true, label: "推荐", color: "success" },
					{ value: false, label: "不推荐", color: "warning" },
				],
			}),
		},
		pass: {
			title: "状态",
			type: "dict-switch",
			form: {
				value: true,
			},
			dict: dict({
				data: [
					{ value: true, label: "上架", color: "success" },
					{ value: false, label: "下架", color: "warning" },
				],
			}),
		},
		description: {
			title: "简介",
			type: "textarea",
			column: {
				show: false,
			},
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
