export const metadata = {
  title: 'AI 带货视频 SaaS',
  description: '上传商品素材，自动生成带货视频'
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0b1020', color: '#e9ecf1' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}
