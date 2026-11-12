# 开发导航

游戏的 3,570 条原版声明/语句已拆入 85 个 ES 模块。模块间使用显式导入/导出，没有循环依赖，没有通过全局注册表或字符串拼接执行游戏代码。

`src/main.js` 先安装语言层，再加载 `src/game.js`。后者按发布版顺序列出系统，`src/app/bootstrap.js` 负责组装上下文、启动、比赛切换和每帧更新。启动局部变量与主要构造器参数已命名为 `scene`、`world`、`player`、`arsenal`、`context` 等可读名称。

## 按功能定位

| 想修改的内容 | 入口 |
| --- | --- |
| 主循环、系统组装、部署/暂停/退出 | `src/app/bootstrap.js` 的 `startGame` |
| 画质、后处理、动态模糊、镜头渲染 | `src/render/renderer.js` 的 `GameRenderer` |
| 光照、地面反射、烟雾、粒子、弹痕 | `src/render/lighting-volume.js`、`reflections.js`、`effects/` |
| 酒店结构、房间与泳池 | `src/scene/hotel.js` 的 `createHotel` |
| 分区布置 | `src/scene/dress/{base,lobby,west-wing,east-wing,details}.js` |
| 家具、灯具、植物、杂物 | `src/scene/props/`，从 `index.js` 的 `createPropLibrary` 进入 |
| 材质及程序纹理 | `src/scene/materials.js` 的 `createMaterials` |
| 碰撞、玻璃与可破坏物件 | `src/physics/{world,glass,props}.js` |
| 移动、姿态、跳跃、滑铲与飞扑 | `src/player/controller.js` 的 `PlayerController` |
| 第一人称身体、手部、角色骨架 | `src/player/{first-person-body,rig,operator-rig,operator-mesh}.js` 与 `hands/` |
| 伤害、射速、弹匣、后坐力基础值 | `src/weapons/definitions.js` 的 `WEAPON_DEFINITIONS` |
| 命中/穿透、弹药/换弹、开镜、枪口火光 | `src/weapons/{combat,arsenal,optic,muzzle-flash}.js` |
| 后坐与武器重量、第一人称持枪 | `src/weapons/{recoil,weight,viewmodel}.js` |
| 配件、迷彩与进度存档 | `src/weapons/loadout.js` |
| 具体枪械模型和动作 | `src/weapons/models/{carbine,smg,pistol,shotgun}.js` |
| 通用配件、迷彩材质、模型入口 | `src/weapons/models/{attachments,camos,shared,index}.js` |
| 机器人、导航、比赛计分与重生 | `src/ai/{bot,navigation,match}.js` |
| K9 模型、姿态、寻敌与生命周期 | `src/ai/k9/{rig,mesh,locomotion,animation,system}.js` |
| 菜单、设置和枪匠 | `src/ui/menus.js` 的 `MenuController` |
| 战斗 HUD、小地图、战犬状态 | `src/ui/{hud,minimap,k9-hud}.js` |
| 3D 武器预览和迷彩图标 | `src/ui/{weapon-studio,studio-environment,camo-preview}.js` |
| 声音合成、空间音频和音乐 | `src/audio/{synthesis,system}.js` |
| 键位与默认设置 | `src/core/{input,settings}.js` |

旧版简化武器模型仍保留在 `src/weapons/models/legacy.js`，以免恢复时丢失发布内容；当前模型由 `models/index.js` 的 `buildGun` 选择。没有公开的局部变量原名保持原样，避免猜测性重命名。

## 上下文与调试

系统通过明确的 `context` 对象共享 `world`、`player`、`arsenal`、`match`、`audio` 等引用。调整功能时优先修改所属模块，避免在 UI 中更改模拟规则。

原版调试入口仍然可用：

```js
GH.ready;
GH.G.state;
GH.debug.stats();
GH.debug.player;
GH.debug.arsenal;
GH.debug.match;
GH.debug.ctx.settings;
GH.debug.boot;
GH.debug.navCheck();
```

原版 `?nolock` 可供不支持 Pointer Lock 的自动化环境使用。`GH.debug.key("KeyW", true/false)`、`GH.debug.look(yaw, pitch)` 仍可注入测试输入；正常游玩使用不带该参数的地址。

## 简体中文与英文

语言代码为 `zh-CN`（默认）和 `en`。入口在 `src/i18n/index.js`，词典在 `zh-CN.js`，动态计数/提示在 `translate.js`，字体与布局补充样式在 `styles.css`。

语言层仅处理显示文本及 title/aria-label/placeholder，保留原始英文，可即时切换。它不替换 innerHTML，不重建 HUD 节点，不修改键位、存档字段、武器/AI 数值或勋章 ID。数字、武器型号、机器人代号与艺术标牌保留。简体中文使用本机中文字体，无远程字体下载。

新增 UI 文案时，以英文显示原文为词典键，并添加中文译文；动态数字组合在 `translate.js` 中加规则。请勿把技术 ID 当作翻译键。语言偏好独立存于 `golden-hour-language-v1`，不改变原版存档格式。

可用 `?lang=en` 或 `?lang=zh-CN` 临时指定显示语言；URL 优先于已保存偏好，未指定时读取偏好，否则默认简体中文。

设置页返回后，原版隐藏子面板会拦截点击。补充样式让未激活页面不接收鼠标事件，保留现有可见布局。

## 验证与继续开发

`npm run check` 检查所有模块的语法、导入/导出、全局引用和循环依赖，校验归档，并运行语言测试。`npm run build` 产出本地 source map。

`npm run verify:refactor` 把当前 85 个模块逐条与归档对照，检查表达式、常量、模板/着色器、词法绑定和完整覆盖。映射在 `scripts/refactor-map.json`。它用于证明重构，不是要求后续功能永远不能改变。

`scripts/migrate-bundle.mjs --write` 是一次性提取工具，按 `scripts/module-plan.json` 重新生成这些模块。**后续编辑后不要直接重跑**，否则会覆盖已改动的游戏模块。

浏览器回归工具位于 `tests/browser-{harness,pose,fingerprint,scenario}.js`。通过 `npm run test:pages` 生成原版/当前版隔离页面，`node scripts/serve-audit.mjs` 在 5181 启动无热更新服务。仅测试页面安装固定随机种子、帧时钟、墙上钟表与音频时钟，正常游戏不载入这些工具。对比记录保存在 `docs/refactor/`，可用 `node scripts/compare-runtime.mjs` 检查已保存证据。

修改游戏后完整刷新；原版没有用于热替换整套 WebGL 场景的销毁接口。保留 `index.html` 的内部空白和 `archive/published/` 的原件。
