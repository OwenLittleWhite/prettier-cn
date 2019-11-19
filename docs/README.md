---
home: true
heroImage: /home.png
actionText: 起步 →
actionLink: /what-prettier
---

<div class="features">
  <div class="feature">
    <h2># 什么是Prettier?</h2>
    <li>一个推荐的代码格式化工具</li>
    <li>支持多种语言</li>
    <li>集成了大多数编辑器</li>
    <li>少数的选项</li>
  </div>
  <div class="feature">
    <h2># 为什么是Prettier？</h2> 
    <li>代码保存，自动格式化</li>
    <li>代码评审不用讨论代码风格问题</li>
    <li>节省时间和精力</li>
    <li>还有更多...</li>
  </div>
</div>

### 入门

```bash
# 在项目中添加 prettier：
yarn add prettier --dev --exact
# 或者 npm install prettier --save-dev --save-exact

# 通过运行文件进行验证：
yarn prettier --write src/index.js
# 或者 npx prettier --write src/index.js

# 提交文件时运行 prettier
yarn add pretty-quick husky --dev
# 或者 npm install pretty-quick husky --save-dev

# 然后将这项配置添加到 package.json 文件：
{ "husky": { "hooks": { "pre-commit": "pretty-quick --staged" } } }
```

<div class="footer">
  MIT Licensed | Copyright © 2019 <a href="https://owenlittlewhite.top" target="_blank">Owen</a>
  Powered by <a href="https://vuepress.vuejs.org/" target="_blank">Vuepress</a>
</div>
