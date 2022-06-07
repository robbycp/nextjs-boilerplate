import { gtmTrackEvent } from "~/services/analytics"

export const trackChangeLocale = (from: string, to: string) => {
  gtmTrackEvent('click_change_locale', {
    from,
    to,
  })
}