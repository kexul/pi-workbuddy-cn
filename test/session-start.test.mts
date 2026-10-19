// 侧栏卡片已取消：扩展不该再注册 session_start / model_select 这些要画界面的钩子。
// 这条测试防的是"哪天有人把卡片加回来，又让启动时多发一轮网络请求"。
const ext: any = await import("../extensions/workbuddy.ts");

const handlers: Record<string, Function[]> = {};
const pi: any = {
  on: (name: string, fn: Function) => { (handlers[name] ??= []).push(fn); },
  registerProvider: () => {},
  registerCommand: () => {},
};

await ext.default(pi);

if (handlers.session_start) throw new Error("session_start 钩子应当已移除（启动时不再画卡片）");
if (handlers.model_select) throw new Error("model_select 钩子应当已移除（切模型时不再画卡片）");
if (!handlers.before_provider_headers) throw new Error("缺少 before_provider_headers 钩子");
if (!handlers.before_provider_request) throw new Error("缺少 before_provider_request 钩子");

console.log("OK: 启动与切模型都不画卡片，也不发网络请求");
