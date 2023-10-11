// material-ui
import { alpha, createTheme } from '@mui/material/styles'

// project-imports
import ThemeOption from './theme'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const paletteColor = ThemeOption('light')

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: paletteColor.secondary[800],
        secondary: paletteColor.secondary.main,
        disabled: paletteColor.secondary[400]
      },
      action: {
        disabled: paletteColor.secondary.light
      },
      divider: alpha(paletteColor.secondary.light, 0.65),
      background: {
        paper: '#fff',
        default: paletteColor.secondary.lighter,
        neutral: '#f4f6f8'
      },
      appBarHeight: APP_BAR_HEIGHT,
      boardBardHeight: BOARD_BAR_HEIGHT,
      boardContentHeight: BOARD_CONTENT_HEIGHT,
      columnHeaderHeight: COLUMN_HEADER_HEIGHT,
      columnFooterHeight: COLUMN_FOOTER_HEIGHT
    }
  })
}

export default Palette
