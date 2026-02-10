// lib/api.ts
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_GATEWAY_URL || "").replace(/\/$/, "")

export interface ShortenResponse {
  shortUrl: string
  shortId: string
  title?: string
  originalUrl?: string
}

/** URL 단축 요청 */
export async function shortenUrl(originalUrl: string): Promise<ShortenResponse> {
  if (!API_BASE_URL) throw new Error("API URL이 설정되지 않았습니다.")

  const res = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: originalUrl }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    // 너 Lambda는 { error: "..." } 형태도 쓰고 있어서 둘 다 커버
    throw new Error(data.error || data.message || "URL 단축에 실패했습니다.")
  }

  return data as ShortenResponse
}

/**
 * 아래 2개는 아직 백엔드 엔드포인트(/trends, /share-timing)가 없으면
 * 호출 시 무조건 실패하니, 구현 전까지는 주석 처리하거나
 * 나중에 stats/analyze 만들고 붙이는 걸 추천.
 */
// export async function fetchTrends() { ... }
// export async function fetchShareTiming() { ... }
