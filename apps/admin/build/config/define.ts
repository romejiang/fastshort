import dayjs from 'dayjs';

/** 项目构建时间 */
const PROJECT_BUILD_TIME = JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'));
const DEFINE_DOCKER_URL = process.env.DEFINE_DOCKER_URL || '';

export const viteDefine = {
  PROJECT_BUILD_TIME,
  DEFINE_DOCKER_URL
};
