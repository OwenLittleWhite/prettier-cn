# 基本原理

Prettier 的是一个有主见的代码格式化程序。本文档解释了它是如何做选择的。

## Prettier 关注什么

### 正确性

Prettier 的首要要求是输出功能与格式化之前完全相同的有效代码。请报告任何 Prettier 无法遵循这些正确性规则的代码-这是一个错误，需要修复！

### 字符串

双引号还是单引号？Prettier 选择出现转义符最少的那个。"It's gettin' better!", 而不是 'It\'s gettin\' better!'。如果出现两种出现的次数相同，Prettier 默认是使用双引号（可以通过`--single-quote`选项修改）

JSX 有自己的引号选项：`--jsx-single-quote`。JSX 起源于 HTML，在 HTML 中，属性引号的主要用法是双引号。浏览器开发人员工具也遵循此约定，始终显示带有双引号的 HTML，即使源代码使用单引号也是如此。单独的选项允许对 JS 使用单引号，对“ HTML”（JSX）使用双引号。

Prettier 保留您的字符串转义的方式。例如，“🙂”将不会被格式化为“ \ uD83D \ uDE42”，反之亦然。

### 空行

事实证明，很难自动生成空行。Prettier 采取的方法是保留空行，就像保留原始源代码一样。还有两个附加规则：

- Prettier 将多条空白行折叠为一条空白行。
- 块（和整个文件）开头和结尾的空行将被删除。（不过，文件始终以单个换行符结尾。）

### 多行对象

默认情况下，Prettier 的打印算法会根据需要在单行上打印表达式。但是，对象在 JavaScript 中用于许多不同的事情，并且有时多行有助于提高可读性。
例如，请参阅[object lists](https://github.com/prettier/prettier/issues/74#issue-199965534)，[nested configs](https://github.com/prettier/prettier/issues/88#issuecomment-275448346)
，[stylesheets](https://github.com/prettier/prettier/issues/74#issuecomment-275262094) 和 [keyed methods](https://github.com/prettier/prettier/pull/495#issuecomment-275745434)
我们无法为所有这些情况找到合适的规则，因此如果 `{` 和原始源代码中的第一个 `key` 之间存在换行符，则 Prettier 会将对象保留为多行。
这样的结果是长的单行对象会自动展开，而短的多行对象则不会折叠。

**提示**： 如果您有一个多行对象想要合并为一行：

```JS
const user = {
  name: "John Doe",
  age: 30
};
```

你需要将 `{` 后的空行移除：

```JS
const user = {  name: "John Doe",
  age: 30
};
```

之后运行 Prettier：

```JS
const user = { name: "John Doe", age: 30 };
```

如果你想再次变为多行，在 `{` 后加一行即可：

```JS
const user = {
 name: "John Doe", age: 30 };
```

然后运行 Prettier：

```JS
const user = {
  name: "John Doe",
  age: 30
};
```

### 装饰器

就像对象一样，装饰器用于许多不同的事情。有时在装饰线上方编写装饰器是有意义的，有时如果它们在同一行，则更好。我们无法为此找到一个好的规则，因此 Prettier 会将装饰器的位置保持在您编写它们的位置（如果它们合适就行了）。这不是理想的选择，而是对一个难题的实用解决方案。

```TS
@Component({
  selector: "hero-button",
  template: `<button>{{label}}</button>`
})
class HeroButtonComponent {
  // 这些装饰器是写在一行的，并且一行放得下，因此保持一行
  // inline.
  @Output() change = new EventEmitter();
  @Input() label: string;

  // 这些是多行编写的，因此它们保持多行。
  @readonly
  @nonenumerable
  NODE_TYPE: 2;
}
```

有一个例外：类。我们认为把他们写在一行没有任何意义，因此他们总是被移到自己的行的上方。

```JS
// 运行 Prettier 前:
@observer class OrderLine {
  @observable price: number = 0;
}
```

```JS
// 运行 Prettier 之后：
@observer
class OrderLine {
  @observable price: number = 0;
}
```

注意：Prettier 1.14.x 和更早的版本尝试自动移动装饰器，因此，如果您在代码上运行了较早的 Prettier 版本，则可能需要在此处和那里手动加入一些装饰器，以避免不一致：

```JS
@observer
class OrderLine {
  @observable price: number = 0;
  @observable
  amount: number = 0;
}
```

最后一件事：[TC39 尚未确定装饰器放在 `export` 前还是后](https://github.com/tc39/proposal-decorators/issues/69)，因此，Prettier 两者都支持：

```JS
@decorator export class Foo {}

export @decorator class Foo {}
```

### 分号

这是关于使用 [`--no-semi`](https://prettier.io/docs/en/options.html#semicolons) 选项。

考虑如下代码：

```JS
if (shouldAddLines) {
  [-1, 1].forEach(delta => addLine(delta * 20))
}
```

尽管上面的代码在没有分号的情况下也可以正常工作，但是 Prettier 实际上将其转换为：

```JS
if (shouldAddLines) {
  ;[-1, 1].forEach(delta => addLine(delta * 20))
}
```

这是为了帮助您避免错误。想象一下，Prettier 没有插入该分号并添加以下行：

```JS
 if (shouldAddLines) {
+  console.log('Do we even get here??')
   [-1, 1].forEach(delta => addLine(delta * 20))
 }
```

糟糕！ 以上实际上意味着：

```JS
if (shouldAddLines) {
 console.log('Do we even get here??')[-1, 1].forEach(delta => addLine(delta * 20))
}
```

在 `[` 之前加分号，这样的问题永远不会发生。它使该行独立于其他行，因此您无需考虑 ASI 规则即可移动和添加行。

这种做法在使用无分号样式的[标准](https://standardjs.com/rules.html#semicolons)中也很常见。

### 打印宽度

[`--print-width`](https://prettier.io/docs/en/options.html#print-width)与其说是个硬性规则，更像是 Prettier 的指南。
通常，这意味着“尝试使行固定的长度，如果需要的话，变短，在特殊情况下，变长”。

在一些边界条件下，例如很长的字符串文字，正则表达式，注释和变量名，都不能跨行打断（[Prettier 不会执行](https://prettier.io/docs/en/rationale.html#what-prettier-is-not-concerned-about)代码转换）。或者，如果您将代码嵌套了 50 个级别，那么您的行当然会缩进很多 :)

除此之外，在某些情况下，Prettier 故意超过了打印宽度。

#### 引入

Prettier 可以将 `import` 语句拆成几行：

```JS
import {
  CollectionDashboard,
  DashboardPlaceholder
} from "../components/collections/collection-dashboard/main";
```

以下示例不满足设置的打印宽度，但是 Prettier 始终将其打印在一行中：

```JS
import { CollectionDashboard } from "../components/collections/collection-dashboard/main";
```

对于某些人来说，可能很诧异，但我们这样做是因为将单个元素的 `import` 保持在一行中是常见的要求。`require` 引入也是如此。

#### 测试方法

另一个常见的要求是即使一行太长，也要在一行中保留冗长的测试描述。在这种情况下，将参数包装到新行中并没有太大帮助。

```JS
describe("NodeRegistry", () => {
  it("makes no request if there are no nodes to prefetch, even if the cache is stale", async () => {
    // 上面的代码超过的设置的最大宽度，但是仍然保留在一行中
  });
});
```

对于常见的测试框架的方法（例如 `describe`，`it` 和 `test`），Prettier 具有特殊情况。

### JSX

与涉及 `JSX` 的其他 `JS` 相比，Prettier 的打印内容略有不同：

```JS
function greet(user) {
  return user
    ? `Welcome back, ${user.name}!`
    : "Greetings, traveler! Sign up today!";
}

function Greet({ user }) {
  return (
    <div>
      {user ? (
        <p>Welcome back, {user.name}!</p>
      ) : (
        <p>Greetings, traveler! Sign up today!</p>
      )}
    </div>
  );
}
```

有两种原因：

首先，很多人已经将 JSX 括在括号中，尤其是在 `return` 语句中。Prettier 遵循这种共同的风格。

其次，[备用格式使编辑 JSX 更容易](https://github.com/prettier/prettier/issues/2208)。很容易会留下分号。与普通的 JS 相反，JSX 中的剩余分号最终可以显示为页面上的纯文本。

```HTML
<div>
  <p>Greetings, traveler! Sign up today!</p>; {/* <-- Oops! */}
</div>
```

### 注释

说到注释的内容，Prettier 确实做不了什么。注释可以包含从文字到注释掉的代码和 ASCII 图的所有内容。由于它们可以包含任何内容，因此 Prettier 无法知道如何格式化或包装它们。因此，它们保持原样。唯一的例外是 JSDoc 样式的注释（每行以 `*` 开头的块注释），Prettier 可以修复其缩进。

然后是在哪里放置注释的问题。这是一个非常困难的问题。Prettier 会尽力将您的注释大致保留在原处，但这并不是一件容易的事，因为注释几乎可以放在任何地方。

通常，将注释放在**自己的行**而不是行尾时，会获得最佳结果。`// eslint-disable-next-line` 优于 `// eslint-disable-line`。

请注意，由于 Prettier 将表达式分成多行，有时可能需要手动移动诸如 `eslint-disable-next-line` 和 `$FlowFixMe` 之类的“魔术注释”。

想象一下这段代码：

```JS
// eslint-disable-next-line no-eval
const result = safeToEval ? eval(input) : fallback(input);
```

然后，您需要添加另一个条件：

```JS
// eslint-disable-next-line no-eval
const result = safeToEval && settings.allowNativeEval ? eval(input) : fallback(input);
```

Prettier 会把上面变成：

```JS
// eslint-disable-next-line no-eval
const result =
  safeToEval && settings.allowNativeEval ? eval(input) : fallback(input);
```

这意味着 `eslint-disable` 的注释不再有效。在这种情况下，您需要移动注释：

```JS
const result =
  // eslint-disable-next-line no-eval
  safeToEval && settings.allowNativeEval ? eval(input) : fallback(input);
```

## Prettier 不关注什么

Prettier 只打印代码。 它不会改变它。 这是为了限制 Prettier 的范围。 让我们专注于打印并做得好！

这是一些超出 Prettier 范围的例子：

- 将单引号或双引号字符串转换为模板文字，反之亦然。
- 使用 `+` 将长字符串文字分解为适合打印宽度的部分。
- 当 `{}` 或者 `return` 是可选时，添加或者删除
- 将 `?:` 转换为 `if-else` 语句
- 对 import、object 属性、类成员、JSX 属性、CSS 属性等排序或者移动。除了进行转换而不只是打印（如上所述）之外，排序潜在是不安全的（例如：imports），使得验证[正确性](https://prettier.io/docs/en/rationale.html#correctness)很困难
