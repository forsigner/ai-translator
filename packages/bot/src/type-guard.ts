export type ApiError = {
  message: string
  code: string
  type: string
  origin: any
}

export function isApiError(error: any): error is ApiError {
  // if (error.message && error.code && Reflect.has(error, 'origin')) {
  if (error.message && Reflect.has(error, 'origin')) {
    return true
  }
  return false
}

export type DailyUsageLimit = {
  success: boolean
  code: string
  message: string
}

export function isDailyUsageLimit(error: any = {}): error is DailyUsageLimit {
  if (error?.message && error?.code === 'DailyUsageLimit') {
    return true
  }
  return false
}
