const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function createVideoJob(payload) {
  const res = await fetch(`${API_BASE_URL}/video-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`创建任务失败: ${res.status}`);
  return res.json();
}

export async function getVideoJob(jobId) {
  const res = await fetch(`${API_BASE_URL}/video-jobs/${jobId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`拉取任务失败: ${res.status}`);
  return res.json();
}
