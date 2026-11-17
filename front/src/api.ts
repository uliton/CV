export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message)
  }
}

async function request(path: string, options?: RequestInit) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...options?.headers },
    credentials: 'same-origin',
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(body?.error ?? 'The CV service is unavailable.', response.status)
  }
  return response
}

async function readContent(response: Response) {
  const revision = response.headers.get('ETag')
  if (!revision) throw new Error('The CV service returned content without a revision.')
  const data: Mock = await response.json()
  return { data, revision }
}

let contentRequest: Promise<{ data: Mock; revision: string }> | undefined

export function getContent() {
  if (!contentRequest) {
    contentRequest = request('/content').then(readContent).finally(() => {
      contentRequest = undefined
    })
  }
  return contentRequest
}

export async function updateContent(data: Mock, revision: string) {
  return readContent(await request('/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'If-Match': revision },
    body: JSON.stringify(data),
  }))
}

export const getSession = () => request('/auth/session')
export const logOut = () => request('/auth/logout', { method: 'POST' })

export function logIn(username: string, password: string) {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}
