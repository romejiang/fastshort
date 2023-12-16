import type { App } from "vue";
import type { FsSetupOptions } from "@fast-crud/fast-crud";
// eslint-disable-next-line import/order
import { FastCrud } from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
import "./common.scss";
import { getServiceEnvConfig } from "~/.env-config";
const { url } = getServiceEnvConfig(import.meta.env);

import type { FsUploaderOptions } from "@fast-crud/fast-extends";
import {
	FsExtendsCopyable,
	FsExtendsEditor,
	FsExtendsJson,
	FsExtendsTime,
	FsExtendsUploader,
} from "@fast-crud/fast-extends";
import "@fast-crud/fast-extends/dist/style.css";
import UiNaive from "@fast-crud/ui-naive";
import axios from "axios";
import type { VueI18n } from "vue-i18n";
import { mockRequest, request } from "@/service/request";
import { setupNaive } from "@/plugins/fast-crud/naive";

/**
 *  fast-crud的安装方法
 *  注意：在App.vue中，需要用fs-ui-context组件包裹RouterView，让fs-crud拥有message、notification、dialog的能力
 * @param app
 * @param options
 */
export type FsSetupOpts = {
	i18n?: VueI18n;
};
function install(app: App, options: FsSetupOpts = {}) {
	// 安装naive ui 常用组件
	setupNaive(app);
	app.use(UiNaive);
	app.use(FastCrud, {
		i18n: options.i18n,
		async dictRequest(context: { url: string }) {
			const url = context.url;
			let res: Service.SuccessResult | Service.FailedResult;
			if (url && url.startsWith("/mock")) {
				res = await mockRequest.get(url.replace("/mock", ""));
			} else {
				res = await request.post(url);
			}
			res = res || {};
			return res.data || [];
		},
		/**
		 * useCrud时会被执行
		 */
		commonOptions() {
			return {
				table: {
					size: "small",
					pagination: false,
				},
				search: {
					options: {
						size: "medium",
					},
				},
				rowHandle: {
					buttons: {
						view: { text: null, icon: "EyeOutlined", size: "small" },
						edit: { text: null, icon: "EditOutlined", size: "small" },
						remove: {
							type: "error",
							text: null,
							icon: "DeleteOutlined",
							size: "small",
						},
					},
					dropdown: {
						more: { size: "small" },
					},
				},
				form: {
					display: "flex", // 表单布局
					labelWidth: "120px", // 表单label宽度
					col: {span:24}
				},
				toolbar: {
					show: false
				},
				pagination:{
					suffix: (obj : any) =>{
						return `共 ${obj.itemCount} 条`
					}
				},
				columns: {
					updatedAt: {
						title: "时间",
						type: "datetime",
						column: {
							order: 99,
						},
						form: {
							order: 99,
							show: false,
						},
						// valueBuilder(context) {
						//   const { value, row, key } = context;
						//   if (value) {
						//     console.log(value, dayjs(value).valueOf());

						//     row[key] = dayjs(value).valueOf();
						//   }
						// },
						// valueResolve(context) {
						//   const { value, form, key } = context;
						//   if (value) {
						//     form[key] = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
						//   }
						// }
					},
				},
			};
			// 从 useCrud({permission}) 里获取permission参数，去设置各个按钮的权限
			// const crudPermission = useCrudPermission(context);
			// return crudPermission.merge(opts);
		},
	} as FsSetupOptions);

	// fast-extends里面的扩展组件均为异步组件，只有在使用时才会被加载，并不会影响首页加载速度
	// 安装editor
	app.use(FsExtendsEditor, {
		// 编辑器的公共配置
		wangEditor: {},
	});
	app.use(FsExtendsJson);
	app.use(FsExtendsCopyable);
	// 安装uploader 公共参数
	const uploaderOptions: FsUploaderOptions = {
		defaultType: "form",
		form: {
			action: url + "/../public/upload",
      // action: 'http://www.docmirror.cn:7070/api/upload/form/upload',
			name: "file",
			withCredentials: false,
			uploadRequest: async (props) => {
				const { action, file, onProgress } = props;
				const data = new FormData();
				data.append("file", file);
				const res = await axios.post(action, data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
					timeout: 60000,
					onUploadProgress(progress) {
						onProgress({
							percent: Math.round((progress.loaded / progress.total!) * 100),
						});
					},
				});
				// 上传完成后的结果，一般返回个url 或者key,具体看你的后台返回啥
				return res.data.data;
			},
			// async successHandle(ret: string) {
			// 	console.log(ret);
			// 	// 上传完成后的结果处理， 此处应转换格式为{url:xxx,key:xxx}
			// 	return {
			// 		url: `http://www.docmirror.cn:7070${ret}`,
			// 		key: ret.replace("/api/upload/form/download?key=", ""),
			// 	};
			// },
		},
	};
	app.use(FsExtendsUploader, uploaderOptions);

	// 安装editor
	app.use(FsExtendsEditor, {
		// 编辑器的公共配置
		wangEditor: {},
	});
	app.use(FsExtendsJson);
	app.use(FsExtendsTime);
	app.use(FsExtendsCopyable);
}

export default {
	install,
};

export function setupFastCrud(app: App<Element>, options: FsSetupOpts = {}) {
	install(app, options);
}
