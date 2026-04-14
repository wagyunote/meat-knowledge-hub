import { NextResponse } from 'next/server'

export async function GET() {
  // 返回最後更新時間
  // 實際應用中可從資料庫或檔案讀取
  return NextResponse.json({
    lastUpdate: new Date().toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  })
}
