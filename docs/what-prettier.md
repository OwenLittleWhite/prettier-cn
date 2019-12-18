# 什么是 Prettier

Prettier 是一个推荐的代码格式化工具，它支持：

- JavaScript, including [ES2017](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
- [JSX](https://facebook.github.io/jsx/)
- [Angular](https://angular.io/)
- [Vue](https://vuejs.org/)
- [Flow](https://flow.org/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS, [Less](http://lesscss.org/), and [SCSS](https://sass-lang.com/)
- [HTML](https://en.wikipedia.org/wiki/HTML)
- [JSON](http://json.org/)
- [GraphQL](https://graphql.org/)
- [Markdown](https://commonmark.org/), including [GFM](https://github.github.com/gfm/) and [MDX](https://mdxjs.com/)
- [YAML](https://yaml.org/)

它移除了所有原始样式，并确保所有输出的代码都符合一致的样式。（请参阅此[博客文章](https://jlongster.com/A-Prettier-Formatter)）

Prettier 会考虑您的代码，并通过考虑行长从头开始重新输出代码。

例如，对于以下代码：

```JS
foo(arg1, arg2, arg3, arg4);
```

这段代码一行正合适，因此格式化后代码将保持原样。但是，我们经常遇到这种情况：

```JS
foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
```

这段代码太长了，我们之前调用方法的格式就不适用了。Prettier 会做详尽的工作重新输出这段代码，像下面的代码一样：

```JS
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

Prettier 在整个代码库中强制执行一致的代码样式（代码样式不会影响 AST（抽象语法树）），因为它无视原始的样式，其方法是将代码解析，并将具有自己规则的已解析 的 AST 重新打印输出，而该规则将最大行数考虑在内，必要时会包装代码。

如果您想了解更多信息，下面的两个会议演讲是不错的介绍：

<a href="https://www.youtube.com/watch?v=hkfBvpEfWdA"><img src="/James.png" alt="A Prettier Printer by James Long on React Conf 2017"></a>

<a href="https://www.youtube.com/watch?v=0Q4kUNx85_4"><img src="/Chedeau.png" alt="JavaScript Code Formatting by Christopher Chedeau on React London 2017"></a>
