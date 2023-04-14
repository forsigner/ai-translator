import { supportedRegions } from '@src/common/supportedRegions'

interface Location {
  fl: string
  h: string
  ip: string
  ts: string
  visit_scheme: string
  uag: string
  colo: string
  sliver: string
  http: string
  loc: string
  tls: string
  sni: string
  warp: string
  gateway: string
  rbi: string
  kex: string
}

const openaiTraceUrl = 'https://chat.openai.com/cdn-cgi/trace'

export interface RegionCheckerStorage {
  modifiedAt: number // timestamp
  location: Location
  isSupported: boolean
}

const storageKey = 'REGION_CHECKER'

const ONE_SECOND = 1000 // 一秒
const ONE_MINUTE = ONE_SECOND * 60 // 一分钟

export class RegionChecker {
  private TIME_OUT_MS = 5000

  location: Location

  modifiedAt: number

  // CHECKER_INTERVAL = ONE_MINUTE * 30
  CHECKER_INTERVAL = 10000

  get isSupported() {
    if (!this.location) return false
    return supportedRegions.has(this.location.loc)
  }

  // 间隔超过检查间隔时间，需要重新 FetchLocation
  get shouldCheck() {
    // 说明还没初始化，需要check
    if (!this.location) return true

    if (Date.now() - this.modifiedAt > this.CHECKER_INTERVAL) {
      return true
    }
    return false
  }

  static fromStorage = async () => {
    const regionChecker = new RegionChecker()
    const storage = await chrome.storage.sync.get(storageKey)
    const checkerStorage = storage?.[storageKey] as RegionCheckerStorage
    if (checkerStorage) {
      regionChecker.location = checkerStorage.location
      regionChecker.modifiedAt = checkerStorage.modifiedAt
    }
    return regionChecker
  }

  private toJSON(response: string): Location {
    const params: Record<string, string> = {}
    const pairs = response.split('\n')
    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      if (key && value) {
        params[key.trim()] = value.trim()
      }
    }
    return params as unknown as Location
  }

  async saveToStorage() {
    await chrome.storage.sync.set({
      [storageKey]: {
        modifiedAt: Date.now(),
        location: this.location,
        isSupported: supportedRegions.has(this.location.loc),
      },
    })
  }

  async fetchLocation(): Promise<Location> {
    const controller = new AbortController()
    const reqTimeoutId = setTimeout(() => controller.abort(), this.TIME_OUT_MS)

    try {
      const response = await fetch(openaiTraceUrl, {
        signal: controller.signal,
        cache: 'no-store',
      })

      clearInterval(reqTimeoutId)

      const text = (await response.text()) as unknown as string

      const location = this.toJSON(text)
      this.location = location

      await this.saveToStorage()

      return location
    } catch (error) {
      return null
    }
  }
}
