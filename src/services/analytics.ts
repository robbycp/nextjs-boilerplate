import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
const GTM_COOKIE_KEY = '_gtm'

export const usePageAnalytics = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {})
    return () => {
      router.events.off('routeChangeComplete', () => {})
    }
  }, [router.events])
}

export const gtmGetUserProperties = () => {
  const userProperties = Cookies.get(GTM_COOKIE_KEY)
  return userProperties ? JSON.parse(userProperties) : {}
}

export const gtmSetUserProperties = (data: Record<string, unknown>) => {
  const existingProperties = gtmGetUserProperties()

  if (!existingProperties?.user_id) {
    // Add platform 'mobile' / 'desktop' in props data using utils/view useIsMobile
    const defaultProperties = {
      ...data,
      user_currency: 'IDR',
    }
    let userProperties = existingProperties
      ? {
        ...existingProperties,
        ...defaultProperties,
      }
      : defaultProperties

    // Change to set manual cookie to avoid encoding from js cookie
    const date = new Date()
    date.setTime(date.getTime() + 30 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${GTM_COOKIE_KEY}=${JSON.stringify(
      userProperties,
    )};expires=${expires};path:/`
  }
}

export const gtmFlushProperties = (propertiesType: 'screen' | 'event') => {
  if (propertiesType === 'screen') {
    window.dataLayer.push({ event: 'flush', screen_properties: undefined })
  } else {
    window.dataLayer.push({ event: 'flush', event_properties: undefined })
  }
}

export const useTrackScreen = () => {
  const router = useRouter()
  return (screenName: string, screenProperties?: Record<string, unknown>, isFlush = true) => {
    if (isFlush) {
      gtmFlushProperties('event')
      gtmFlushProperties('screen')
    }
    const defaultScreenProperties = { ...router.query }

    window.dataLayer.push({
      event: 'screen_view',
      screen_properties: screenProperties
        ? {
          screen_name: screenName,
          ...defaultScreenProperties,
          ...screenProperties,
        }
        : { screen_name: screenName, ...defaultScreenProperties },
    })
  }
}

type GTMEventProperties = (
  eventName: string,
  eventProperties?: Record<string, unknown>
) => void
export const gtmTrackEvent: GTMEventProperties = (eventName, eventProperties) => {
  gtmFlushProperties('event')
  window.dataLayer.push({
    event: eventName,
    event_properties: eventProperties ?? {},
  })
}
