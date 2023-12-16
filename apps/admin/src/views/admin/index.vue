<template>
	<div class="h-full">
		<fs-crud ref="crudRef" v-bind="crudBinding"></fs-crud>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useFs, dict } from "@fast-crud/fast-crud";
import createCrudOptions from "@/views/crud";

const apiPrefix = "/admin";
const context: any = {
	apiPrefix,
	columns: {
		username: {
			title: "用户名",
			type: "text",
			search: { show: true },
			column: {
				component: {
					sortOrder: false,
					sorter: "default",
				},
			},
		},
		passwordstr: {
			title: "密码",
			type: "text",
			column: {
				show: false,
			},
		},
		avatar: {
			title: "头像",
			type: "cropper-uploader",
		},
		userrole: {
			title: "权限组",
			type: "dict-radio",
			form: {
				value: "super",
			},
			dict: dict({
				data: [
					{ value: "super", label: "超管", color: "error" },
					{ value: "admin", label: "管理员", color: "success" },
					{ value: "user", label: "用户", color: "" },
				],
			}),
		},

		pass: {
			title: "状态",
			search: { show: true },
			type: "dict-switch",
			form: {
				value: true,
			},
			// dict: dict({
			//   url: `${apiPrefix}/dict`
			// })
			dict: dict({
				data: [
					{ value: true, label: "正常", color: "success" },
					{ value: false, label: "禁用", color: "warning" },
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
