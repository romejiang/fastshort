<template>
	<n-card
		:title="VITE_APP_NAME"
		:bordered="false"
		size="large"
		class="rounded-8px shadow-sm"
	>
		<p class="leading-24px">
			{{ VITE_APP_DESC }}
			<br /><br />
			APP 演示地址，账号可自行注册
			<br />
			http://h5.ai2app.xyz
			<br />
			<br />
			管理后台地址<br />
			http://admin.ai2app.xyz
			<br /><br />
			超级管理员账号<br />
			romejiang / 1qazxsw2
		</p>
	</n-card>
</template>

<script setup lang="ts">
defineOptions({ name: "ProjectIntroduction" });

const { VITE_APP_NAME, VITE_APP_DESC } = import.meta.env;
</script>

<style scoped></style>
