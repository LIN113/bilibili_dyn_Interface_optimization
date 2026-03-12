# Bilibili 动态界面优化

一个用于优化 Bilibili 动态页面显示效果的 Tampermonkey 用户脚本。

## 功能特性

- **网格布局**：将动态列表从瀑布流改为整齐的网格布局
- **视频卡片优化**：仅显示视频类型动态，隐藏其他类型
- **界面简化**：移除左右侧边栏和发布动态区域，扩展主内容区域至 90% 宽度
- **卡片样式**：采用类似 B 站首页的卡片设计，包含封面、标题、作者和统计信息
- **纯白背景**：统一使用纯白色背景，视觉更清爽
- **响应式设计**：支持不同屏幕尺寸自适应

## 安装方法

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击 Tampermonkey 图标 → 管理面板 → 实用工具 → 导入
3. 选择 `bilibili_dyn_optimizer.user.js` 文件导入
4. 或直接在 Tampermonkey 中新建脚本，复制粘贴代码内容

## 使用说明

安装后访问 [Bilibili 动态页面](https://t.bilibili.com/?tab=video)，脚本会自动生效。

## 界面效果

- 卡片尺寸：310px × 269.38px
- 封面区域：310px × 174.375px（16:9 比例）
- 内容区域：95px 高度，包含作者名、标题
- 统计信息：播放量和弹幕数显示在封面底部

## 技术实现

- 使用 CSS Grid 布局替代原生瀑布流
- 通过 `!important` 强制覆盖原有样式
- MutationObserver 监听 DOM 变化，处理动态加载内容
- JavaScript 动态调整卡片布局和统计信息位置

## 兼容性

- 适配页面：`https://t.bilibili.com/?tab=video`
- 浏览器：支持现代浏览器（Chrome、Firefox、Edge 等）
- 需要 Tampermonkey 或类似的用户脚本管理器

## 许可证

MIT License
