React组件示例，这个组件可以显示一个食谱的标题和材料列表。

首先，你需要有Node.js环境和npm（Node.js包管理器）安装在你的机器上。然后，你可以使用Create React App来快速启动一个新的React项目。

在终端运行以下命令来创建一个新的React应用：

```bash
npx create-react-app recipe-app
cd recipe-app
npm start
```

然后，可以创建一个简单的食谱组件，比如`Recipe.js`，代码如下：

```jsx
import React from 'react';

function Recipe({ title, ingredients }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
```

接着，在你的`App.js`中使用这个`Recipe`组件：

```jsx
import React from 'react';
import Recipe from './Recipe';

function App() {
  return (
    <div>
      <Recipe
        title="番茄炒蛋"
        ingredients={['4个鸡蛋', '2个番茄', '盐', '葱花']}
      />
      {/* 可以继续添加其他食谱 */}
    </div>
  );
}

export default App;
```

这样，你就有了一个React组件`Recipe`，它接受`title`和`ingredients`作为props，并将它们渲染到页面上。

随着你对React的掌握越来越深，你可以添加更多的功能，比如状态管理（使用`useState`）、生命周期管理（使用`useEffect`）、路由（使用`react-router-dom`）等。
