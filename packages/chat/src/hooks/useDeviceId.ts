import { useEffect } from 'react'
import { get as getCache, set as setCache } from 'idb-keyval'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { nanoid } from 'nanoid'
import { useStore } from 'stook'
import { isReactNative } from '../utils'

const DEVICE_ID_KEY = 'ai_translator_device_id'

export const getOrGenerateDeviceId = async (): Promise<string> => {
  if (isReactNative()) {
    const deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY)
    if (deviceId) return deviceId

    const newDeviceId = nanoid()
    await AsyncStorage.setItem(DEVICE_ID_KEY, newDeviceId)
    return newDeviceId
  }

  const deviceId = await getCache<string | undefined>(DEVICE_ID_KEY)
  if (deviceId) return deviceId

  const newDeviceId = nanoid()
  await setCache(DEVICE_ID_KEY, newDeviceId)
  return newDeviceId
}

export function useDeviceId(): string {
  const [deviceId, setDeviceId] = useStore<string>(DEVICE_ID_KEY, '')

  useEffect(() => {
    getOrGenerateDeviceId().then((_deviceId) => setDeviceId(_deviceId))
  }, [])

  return deviceId
}
