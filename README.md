# pi-workbuddy-cn

WorkBuddy 中国版（workbuddy.cn）的 pi 模型服务商。在 pi 里直接使用你 WorkBuddy 账号的模型，默认只列不花积分的免费模型。

改自 [icekale/pi-workbuddy-connect](https://github.com/icekale/pi-workbuddy-connect)（原版对接国际版 workbuddy.ai）。

## 安装

```bash
pi install "C:/Users/xieweiyang/pi-workbuddy-cn"
```

或临时加载：

```bash
pi -e "C:/Users/xieweiyang/pi-workbuddy-cn/extensions/workbuddy.ts"
```

## 登录

```
/login
```

选 **WorkBuddy AI**，浏览器会打开 workbuddy.cn 的登录页，登录完自动回来。

令牌存在 `~/.pi/agent/.workbuddy-auth.json`，另外 pi 自己的 `~/.pi/agent/auth.json` 也会存一份。访问令牌 28 天有效，过期前自动用刷新令牌续期；刷新令牌 30 天有效，每次续期重新计时。连续 30 天不用，或你在网页/桌面端主动退出登录，需要重新 `/login` 一次。

登录参数用的是中国版桌面端那一套：`platform=workbuddy` 加本机设备码 `~/.workbuddy/login-device-nonce`。国际版用的 `platform=CLI` 在中国版登录页不会把授权交回来，所以这里不能照抄。

## 模型

默认只列 `x0.00`（不花积分）的模型，名单从本机 `~/.workbuddy/cache/acc-product-config-v3.json` 自动算出来。当前是：

| 模型 | 上下文 | 最大输出 | 推理档 |
| --- | --- | --- | --- |
| Hy3 (`hy3`) | 192K | 64K | low · high |
| Hy3 (`hy3-b`) | 192K | 64K | low · high |
| Hy3 (`hy3-c`) | 192K | 64K | low · high |
| Step-5-Preview (`step-5-preview`) | 1M | 64K | low · medium · high |

要花积分的（如 Deepseek-V4.1-Flash x0.11、Hy4 preview x0.29）默认不显示，用 `/workbuddy all` 打开。

## 设置

- **侧栏卡片**：账号、各积分包余量和当前模型列表。
- **`/workbuddy`** 弹出菜单：刷新积分与账号 / 列出全部模型（含付费）/ 只列出免费模型 / 断开登录。
  也接受参数：`/workbuddy free`、`/workbuddy all`、`/workbuddy logout`。

范围记在 `~/.pi/agent/.workbuddy-settings.json`，切换后服务商立即重新注册模型，不用重启。

## 环境变量

| 变量 | 作用 |
| --- | --- |
| `WORKBUDDY_AUTH_FILE` | 指定自存令牌文件路径，优先于默认位置 |
| `WORKBUDDYAI_PRODUCT_CONFIG` | 指定产品配置 JSON 路径 |
| `PI_CODING_AGENT_DIR` | pi 的 agent 目录，影响令牌与设置文件位置 |

## 和国际版的差别

- 域名 `www.workbuddy.cn`；登录平台名 `workbuddy` 外加本机设备码。
- 产品配置路径 `~/.workbuddy/cache/acc-product-config-v3.json`。
- 不再读桌面端的登录文件：中国版那边存的是加密令牌（`$wbEncrypted` 信封，密钥由原生模块保管），脚本解不开。要登录就重新走一次浏览器授权。
- 免费模型名单按中国版配置算，不是国际版那三款。
- 其余（请求规整、推理档映射、积分解析、侧栏卡片、`/workbuddy` 菜单）沿用原版。

## 自检

```bash
node --experimental-strip-types extensions/workbuddy.ts --self-check
node --experimental-strip-types test/scope.test.mts
node --experimental-strip-types test/session-start.test.mts
npx --yes -p typescript@5.7 tsc -p tsconfig.json
```

## License

MIT
