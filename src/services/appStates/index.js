import create from 'zustand'
import { theme } from 'common/layout'

export const database = {
  local: 'http://localhost:1337',
  live: 'https://stormsen.uber.space',
}

const ENV = { Local: 'local', Live: 'live' }

export const appStates = create(set => ({
  environment: 'live',
  database_url: database[ENV.Live],
  debug: false,
  isMobile: false,
  isMobileSmall: false,
  currentSectionId: '',
  size: { width: 0, height: 0 },
  setSectionId: value => set(() => ({ currentSectionId: value })),

  init: () => {
    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      set(() => ({ size: { width: width, height: height } }))

      const mobileBreakpoint = ~~theme.breakpoints.lg.replace('px', '')
      const isMobileSmallBreakpoint = ~~theme.breakpoints.md.replace('px', '')
      set(() => ({ isMobile: width < mobileBreakpoint }))
      set(() => ({ isMobileSmall: width < isMobileSmallBreakpoint }))
    }
    window.addEventListener('resize', onResize)
    onResize()
  },
}))
