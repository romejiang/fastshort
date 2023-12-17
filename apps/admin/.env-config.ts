/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

const docker_url = "DEFINE_DOCKER_URL"
/** 不同请求服务的环境配置 */
const serviceEnv: ServiceEnv = {
  dev: {
    url: 'http://localhost:3000/api/admin'
  },
  test: {
    url: 'http://localhost:8080'
  },
  prod: {
    url: docker_url ? docker_url + '/api/admin' : 'https://api.fastshort.top/api/admin'
  }
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv): ServiceEnvConfigWithProxyPattern {
  const { VITE_SERVICE_ENV = 'dev' } = env;

  const config = serviceEnv[VITE_SERVICE_ENV];

  return {
    ...config,
    proxyPattern: '/proxy-pattern'
  };
}
