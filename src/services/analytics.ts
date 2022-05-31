import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export const usePageAnalytics = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
}
export const pageview = (url: string) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url,
  })
}
