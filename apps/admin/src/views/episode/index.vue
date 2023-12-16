<template>
	<div class="h-full">
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template v-if="title" #header-top>
				<div class="text-center text-xl font-bold pr-20">
					管理《{{ title }}》的剧集
				</div>
			</template>
		</fs-crud>
	</div>
</template>

<script lang="ts" setup>
import { request } from "@/service/request";

import { onMounted, ref } from "vue";
import { useFs, dict } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useRoute, useRouter } from "vue-router";

const title = ref("");
const router = useRouter();
const route = useRoute();
const series = ref("");

const apiPrefix = "/episode";
const context: any = {
	series,
	router,
	apiPrefix,
	columns: {
		title: {
			title: "标题",
			type: "text",
			search: { show: true },
			column: {
				width: 250,
				fixed: "left",
				component: {
					sortOrder: false,
					sorter: "default",
				},
			},
		},
		episode: {
			title: "第几集",
			type: "dict-radio",
			column: {
				sorter: "custom",
				width: 100,
			},
			form: {
				value: 1,
			},
			dict: dict({
				url: `${apiPrefix}/dict?id=1&series=`,
				prototype: true,
				async getData(dict) {
					const series = dict.form.series || "";
					let res = await request.post(dict.url + series);
					res = res || {};
					const data = (res.data as []) || [];
					if (data && data.length > 0) {
						dict.form.episode = data[0]?.value;
					}
					return data;
				},
			}),
		},
		series: {
			title: "所属短剧",
			type: "dict-select",
			column: {
				width: 250,
			},
			form: {
				value: series,
			},
			dict: dict({
				url: `${apiPrefix}/dict`,
			}),
		},
		cover: {
			title: "封面",
			type: "image-uploader",
			column: {
				width: 100,
			},
			form: {
				show: false,
				component: {
					max: 1,
				},
			},
		},
		description: {
			title: "简介",
			type: "textarea",
			column: {
				show: false,
			},
		},

		video: {
			title: "视频",
			type: "file-uploader",
			column: {
				show: false,
			},
			form: {
				component: {
					max: 1,
				},
			},
		},
		pass: {
			title: "状态",
			type: "dict-switch",
			column: {
				width: 100,
			},
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
		like: {
			title: "喜欢",
			type: "number",
			column: {
				sorter: "custom",
				width: 100,
			},
			form: {
				show: false,
				value: 0,
			},
		},
		views: {
			title: "观看",
			type: "number",
			column: {
				sorter: "custom",
				width: 100,
			},
			form: {
				show: false,
				value: 0,
			},
		},
		comments: {
			title: "评论",
			type: "number",
			column: {
				sorter: "custom",
				width: 100,
			},
			form: {
				show: false,
				value: 0,
			},
		},
	},
};

let { crudRef, crudBinding, crudExpose } = useFs({
	createCrudOptions,
	context,
});

onMounted(() => {
	if (route.query.id) {
		console.log("onMounted...", route.query.id);
		series.value = route.query.id;
	}
	if (route.query.title) {
		title.value = route.query.title;
	}

	crudExpose.doRefresh();
});
</script>
