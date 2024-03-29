# 选项的哲学

::: warning 注意
由于历史原因，Prettier 的有一些选项。**但是我们不会增加更多选项**。

继续阅读以了解更多信息。
:::

Prettier 并不是一个你想怎样打印就打印的代码格式化工具，它是*死板*的，引用[为什么用 Prettier](/why-prettier.md)页中提到的：

::: warning 注意
到目前为止，采用 Prettier 的最大原因是停止所有有关样式的持续辩论。
:::

Prettier 设置的选项越多，就离其主要目标越远。**关于样式的争论就演变成了使用哪个 Prettier 选项的争论**。

[拒绝添加配置](https://github.com/prettier/prettier/issues/40)的 issue 比增加选项的 issue 获 👍 更多

那么，为什么还会有一些选项呢？

- 一些是为了在 Prettier 的初期使其完全腾飞。🚀
- 一些是“应广大群众要求”所加 🤔
- 一些是为了兼容性 👍

我们这几年了解到，衡量需求很难。Prettier 在使用上已经有了很大的改善。过去的“大需求”今天已经不太多了。但是有多少呢？对于所有默默使用的用户？

“再添加一个”选项非常容易。但是我们什么时候停下来？ 什么时候太多？ issue 跟踪中始终会有一个“热门问题”。即使我们只添加了最后一个选项。

选项会导致团队内部展开辩论。我们应该使用哪个选项？ 为什么？ 我们做出了正确的选择吗？

每添加一个选项，会让拒绝再添加一个新的选项变得更困难。那些选项就可以添加进来，为什么这个选项不能呢？

我们有几个用户开启了几个选项的请求，几个月后就自己关闭了。他们意识到，哪些过去他们强烈争论的小的语法选择，
自己压根就不在乎了。比如这两个 issue：[#3101](https://github.com/prettier/prettier/issues/3101#issuecomment-500927917)、[#5501](https://github.com/prettier/prettier/issues/5501#issuecomment-487025417)。

所有这些使 Prettier 中的选项主题变得非常困难。并为维护者带来精神上的疲劳。人们想要什么？ 人们六个月后真正想要什么？ 我们是否在正确的事情上花费时间和精力？

一些选项很容易被提议：

- `--trailing-comma es5` 让你无需切换环境就可以使用尾随逗号（尾随逗号是在 ES2017 加进来的）。
- `-prose-wrap`对于支持所有古怪的 `markdown` 渲染器很重要。
- `--html-whitespace-sensitivity` 很有用，由于 HTML 不好的空格规则.
- `--end-of-line` 使得团队在 git 仓库之外保持 CRLF 更简单。
- `--quote-props`对于 Google Closure 编译器的高级使用非常重要。

但是，事后看来，有些选项更难被提议。`--arrow-parens`, `--jsx-single-quote`, `--jsx-bracket-same-line`, `--no-bracket-spacing`不是我们想要的选项类型。它们存在（并且现在很难删除），但是不应再提议添加更多类似的选项。

欢迎提 issue！Prettier 也不是完美的。许多情况下，无需添加选项就可以改进。但是，如果该 issue 确实需要一个新的选项，我们通常会将其保持开启状态，以便人们 👍 并添加评论。
