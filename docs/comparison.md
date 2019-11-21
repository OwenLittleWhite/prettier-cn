# Prettier vs. Linters

## 与 ESLint / TSLint / stylelint 等相比如何？

linters 有两类规则：

**格式化规则**：例如：[max-len](https://eslint.org/docs/rules/max-len), [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs), [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing), [comma-style](https://eslint.org/docs/rules/comma-style)...

Prettier 让你不必操心这种规则！ Prettier 会从头到尾重新打印整个程序，因此程序员不会犯这种规则的错误了:)

**代码质量规则**：例如：[no-unused-vars](https://eslint.org/docs/rules/no-unused-vars), [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind),
[no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals), [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)...

Prettier 对这种类型的规则没有做任何事情，这也是 linters 提供的最重要的功能，这些功能能发现代码中真正的 bug。
