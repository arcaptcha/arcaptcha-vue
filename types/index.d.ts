import type { Component } from 'vue'

export interface ArcaptchaVueProps {
  site_key: string
  size?: 'normal' | 'invisible'
  theme?: 'light' | 'dark'
  color?: string
  lang?: 'fa' | 'en'
  error_print?: 0 | 1

  callback?: (token?: string) => void
  rendered_callback?: () => void
  error_callback?: () => void
  reset_callback?: () => void
  expired_callback?: () => void
  chlexpired_callback?: () => void
  blocked_callback?: () => void
  clicked_callback?: () => void
  opened_callback?: () => void
  closed_callback?: () => void
}

declare const component: Component
export default component
