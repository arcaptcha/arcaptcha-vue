import { DefineComponent } from 'vue'

export interface ArcaptchaVueProps {
  site_key: string

  // Optional props
  size?: 'normal' | 'invisible'
  theme?: 'light' | 'dark'
  color?: string
  lang?: 'fa' | 'en'
  error_print?: 0 | 1

  // Event Callbacks
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

declare const component: DefineComponent<ArcaptchaVueProps>
export default component
