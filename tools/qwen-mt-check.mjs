#!/usr/bin/env node
/* 无参数只检查配置；--live 才发送一个实时翻译请求，不修改文章或共享缓存。 */
import { createQwenMT, qwenMTKey, qwenMTBaseURL } from "./lib-mt.mjs";

if (process.argv.slice(2).some(arg => arg !== "--live")) {
  console.error("用法：node tools/qwen-mt-check.mjs [--live]");
  process.exit(2);
}
try {
  const key = qwenMTKey();
  console.log(`百炼密钥：${key ? "已配置（不显示；项目本地文件优先于全局环境变量）" : "未配置"}`);
  console.log(`接口：${qwenMTBaseURL()}`);
  const translator = createQwenMT(key);
  if (!translator) throw new Error("请先运行 powershell -NoProfile -File tools/set-qwen-key.ps1");
  console.log(`模型：${translator.model}`);
  console.log("默认顺序：DeepL 优先，Qwen-MT 补齐失败项。");
  if (process.argv.includes("--live")) {
    const source = "The team did not win, despite scoring two goals.";
    const [cn] = await translator([source], "This is a football match report.");
    if (!cn || !/[\u3400-\u9fff]/u.test(cn)) throw new Error("未收到完整中文译文，真实调用验证未通过");
    console.log(`原文：${source}`);
    console.log(`译文：${cn}`);
    console.log("真实接口调用成功；这只证明接口可用，译文质量仍需抽查。");
  } else {
    console.log("未调用 API，未验证真实可用性。运行 --live 会消耗少量免费额度或按量计费。");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
