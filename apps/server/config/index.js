// 配置环境变量
if (!process.env.PLATFORM) {
  process.env.PLATFORM = 'DEV'
}
const config = await import(`./${process.env.PLATFORM.toLowerCase()}.js`)

export default config.default
