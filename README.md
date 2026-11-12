# GOLDEN HOUR — Solstice Hotel

从 [Claude Artifact](https://claude.ai/artifact/6N9gzgYJDa925a1tVxps2f) 恢复的本地网页游戏。夕阳酒店场景、5 对 5 人机团队死斗，先得 40 分获胜。包含枪匠、配件、迷彩、成长进度与 K9 战犬。

现已按系统拆分为 ES 模块，**默认简体中文**，可在 **设置 → 界面 → 语言** 切换 English。语言选择自动保存，即时生效。GOLDEN HOUR 品牌、武器型号、机器人代号和场景内的美术标牌保留原文。

## 在线试玩

**[打开 GOLDEN HOUR — Solstice Hotel](https://realskyrin.github.io/fps3ademo-golden-hour/)**，加载完成后点击 **开始行动** 进入对局。

需要支持 WebGL 2 的桌面浏览器。初次加载会生成场景、烘焙光照并预编译着色器，请等待加载完成。

## 本地运行

Node.js `^20.19.0` 或 `>=22.12.0`，支持 WebGL 2 的桌面浏览器。

```bash
git clone https://github.com/realskyrin/fps3ademo-golden-hour.git
cd fps3ademo-golden-hour
npm ci
npm run dev
```

打开 <http://127.0.0.1:5173/>。依赖已安装时，可直接 `npm run dev`。点击“开始行动”进入对局。

WASD 移动，鼠标转向；左键射击，右键开镜；Shift 冲刺，Space 跳跃，C 蹲下/滑铲，X 卧倒/飞扑，R 换弹，1/2/E 切枪，G/Q 手雷，B/3 战犬，Tab 计分板，Esc 暂停。完整说明在游戏内“设置 → 操作说明”。

## 代码入口

| 系统 | 目录与主要入口 |
| --- | --- |
| 启动与主循环 | `src/main.js` → `src/game.js` → `src/app/bootstrap.js` |
| 渲染 | `src/render/`：渲染器、光照体积、反射、粒子与特效 |
| 场景 | `src/scene/`：酒店、材质、家具、装饰和分区布置 |
| 玩家 | `src/player/`：移动、第一人称身体、角色骨架与手部 |
| 武器 | `src/weapons/`：数值、战斗、弹药、配装、后坐力、模型 |
| AI | `src/ai/`：导航、机器人、比赛流程和 K9 战犬 |
| UI | `src/ui/`：HUD、菜单、枪匠预览、小地图、图标 |
| 简体中文 | `src/i18n/`：中文词典、动态文案、语言偏好与界面适配 |
| 支撑系统 | `src/core/`、`src/physics/`、`src/audio/` |
| 原版引擎 | `src/vendor/`：内置 Three.js r180 与对应工具 |

详细说明见 [开发导航](docs/DEVELOPMENT.md)。原发布版只提供打包产物，没有公开原来的多文件源码和 source map。工程已将发布脚本拆为 85 个模块，并恢复主要类、工厂和启动上下文的可读名称；未升级引擎或重写游戏系统。

场景、模型、纹理和声音都由本地脚本生成。运行时不依赖 Claude、CDN 或后端；首次安装 npm 开发依赖需要联网。存档在当前浏览器、当前站点 origin 的 localStorage，Claude、不同域名或不同端口的存档彼此独立。

## 检查和构建

```bash
npm run check                # 所有模块、依赖图、归档哈希和语言测试
npm run verify:refactor      # 逐条核对重构与发布原件的逻辑等价性
npm run verify:restoration   # 上述逻辑检查与原版 HTML/CSS 对比
npm run build                # 生成 dist/，含本地 source map
npm run preview              # http://127.0.0.1:4173/
```

`verify:refactor` 和 `verify:restoration` 用于核验当前恢复/重构起点；后续主动改变游戏逻辑后，报告差异是预期行为。日常开发使用 `check` 和 `build`。构建的大 chunk 提示来自完整引擎与游戏，不影响构建完成。

## GitHub Pages 部署

仓库已启用 GitHub Pages，发布来源为 **GitHub Actions**。[部署工作流](https://github.com/realskyrin/fps3ademo-golden-hour/actions/workflows/pages.yml) 在推送到 `main` 时自动运行，也可通过 **Run workflow** 手动触发。工作流检查 Pages 配置，执行 `npm ci`、`npm run check` 和 `npm run build`，然后发布 `dist/`。

在其他仓库使用这套工作流时，需要先到 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。构建使用相对资源路径，可部署到仓库子目录；`dist/` 和 `node_modules/` 不提交到 Git。

保留 `archive/` 原件；不要对 `index.html` 自动排版，原 HUD 的 `firstChild` 调用依赖原始空白布局，已通过 `.prettierignore` 排除。

来源版本 `1794413451-9695`，保存日期 2026-11-12。原始验收见 [VALIDATION.md](docs/VALIDATION.md)，本轮模块化与语言验收见 [REFACTOR_VALIDATION.md](docs/REFACTOR_VALIDATION.md)。Three.js 的 MIT 许可保存在 `licenses/THREE-MIT.txt`，未为整个游戏另加开源许可。
