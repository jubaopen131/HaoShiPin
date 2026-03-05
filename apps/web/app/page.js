'use client';

import { useState } from 'react';
import { createVideoJob, getVideoJob } from '../lib/api';

const initial = {
  imageUrl: '',
  productUrl: '',
  productCopy: ''
};

export default function HomePage() {
  const [form, setForm] = useState(initial);
  const [jobId, setJobId] = useState('');
  const [status, setStatus] = useState('idle');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setVideoUrl('');
    setStatus('submitting');

    try {
      const data = await createVideoJob(form);
      setJobId(data.id);
      setStatus(data.status);
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  }

  async function onRefresh() {
    if (!jobId) return;
    try {
      const data = await getVideoJob(jobId);
      setStatus(data.status);
      if (data.videoUrl) setVideoUrl(data.videoUrl);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>AI 带货视频生成平台（MVP）</h1>
      <p>上传图片 URL / 商品链接 / 产品文案，自动生成可下载视频。</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 24 }}>
        <input
          placeholder="产品图片 URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <input
          placeholder="商品链接"
          value={form.productUrl}
          onChange={(e) => setForm({ ...form, productUrl: e.target.value })}
        />
        <textarea
          rows={5}
          placeholder="产品文案"
          value={form.productCopy}
          onChange={(e) => setForm({ ...form, productCopy: e.target.value })}
        />

        <button type="submit">生成带货视频</button>
      </form>

      <section style={{ marginTop: 24 }}>
        <p>任务 ID: {jobId || '-'}</p>
        <p>状态: {status}</p>
        <button onClick={onRefresh} disabled={!jobId}>刷新任务状态</button>
      </section>

      {videoUrl && (
        <section style={{ marginTop: 16 }}>
          <a href={videoUrl} target="_blank">下载视频</a>
        </section>
      )}

      {error && <p style={{ color: '#ff7d7d' }}>{error}</p>}
    </main>
  );
}
