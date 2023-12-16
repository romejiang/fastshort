<template>
	<div class="h-full">
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template v-if="episode" #header-top>
				<div class="text-center text-xl font-bold pr-20">
					管理《{{ seriesname }}》第{{ episode }}集的评论
				</div>
			</template>
		</fs-crud>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFs, dict } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useRoute } from "vue-router";
const route = useRoute();

const episode = ref("");
const seriesname = ref("");

const apiPrefix = "/comment";
const context: any = {
	episode: ref(""),
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
			title: "评论内容",
			type: "text",
			search: { show: true },
		},
		user: {
			title: "用户名",
			type: "text",
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
	if (route.query.id) {
		console.log("onMounted...", route.query.id);
		context.episode.value = route.query.id;
		// crudBinding.value.columns.series.form.value = route.query.id;
	}
	if (route.query.episode) {
		episode.value = route.query.episode;
	}
	if (route.query.seriesname) {
		seriesname.value = route.query.seriesname;
	}

	crudExpose.doRefresh();
});
</script>
