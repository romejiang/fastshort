export default function (plop) {
  plop.setGenerator('curd', {
    description: '生成CURD',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '数据对象名称'
      },
      {
        type: 'list',
        name: 'location',
        message: '数据对象位置',
        choices: ['admin', 'app']
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../route/{{location}}/{{name}}.js',
        templateFile: './controller.hbs'
      }
    ]
  })
}
