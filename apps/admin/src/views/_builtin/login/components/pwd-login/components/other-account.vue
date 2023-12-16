<template>
  <n-space :vertical="true">
    <n-divider class="!mb-0 text-14px text-#666">{{ $t('page.login.pwdLogin.otherAccountLogin') }}</n-divider>
    <n-space justify="center">
      <n-button
        v-for="item in accounts"
        :key="item.username"
        type="primary"
        @click="login(item.username, item.password)"
      >
        {{ item.label }}
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import { userroleLabels } from '@/constants';
import { $t } from '@/locales';

interface Emits {
  (e: 'login', param: { username: string; password: string }): void;
}

const emit = defineEmits<Emits>();

interface Account {
  key: Auth.RoleType;
  label: string;
  username: string;
  password: string;
}

const accounts: Account[] = [
  {
    key: 'super',
    label: userroleLabels.super,
    username: 'Super',
    password: 'super123'
  },
  {
    key: 'admin',
    label: userroleLabels.admin,
    username: 'Admin',
    password: 'admin123'
  },
  {
    key: 'user',
    label: userroleLabels.user,
    username: 'User01',
    password: 'user01123'
  }
];

function login(username: string, password: string) {
  emit('login', { username, password });
}
</script>

<style scoped></style>
