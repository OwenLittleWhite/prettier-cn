module.exports = {
  title: 'Prettier 中文文档',
  description: '本站是 Prettier 中文网站，资源翻译自prettier.io',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '起步', link: '/what-prettier' },
      { text: '博客', link: 'https://owenlittlewhite.top' },
    ],
    sidebar: [
      {
        title: '关于', // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          '/what-prettier',
          '/why-prettier',
          '/comparison',
          '/option-philosophy',
        ],
      },
    ],
    lastUpdated: '最近更新',
    repo: 'OwenLittleWhite/prettier-cn',
    docsDir: 'docs',
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页',
  },
};
