# AI 带货视频 SaaS（MVP）

这是一个面向“上传产品图片/链接/文案，自动生成带货视频”的全栈模板，技术栈：

- 前端：Next.js
- 后端：NestJS
- 视频处理：FFmpeg
- 模型：国内 + 国外大模型 API 抽象
- 订阅支付：Stripe

## 目录结构

```txt
apps/
  web/      # Next.js 前端
  api/      # NestJS 后端
```

## 核心流程

1. 用户在 `web` 提交素材（图片 URL / 商品链接 / 文案）。
2. `api` 创建视频任务并解析输入素材。
3. `api` 调用 LLM 生成脚本、分镜和旁白文案。
4. `api` 使用 FFmpeg 合成视频并输出 mp4。
5. 前端轮询任务状态并展示视频下载地址。
6. Stripe 订阅控制配额与可用功能。

## 本地开发

```bash
npm install
npm run dev
```

环境变量见各 app 的 `.env.example`。

## 下一步建议

- 接入对象存储（S3/OSS/COS）管理素材和视频文件。
- 引入队列（BullMQ + Redis）处理长任务。
- 增加鉴权（JWT + RBAC）和组织/团队计费。
- 为生成链路增加可观测性（日志、trace、失败重试）。
