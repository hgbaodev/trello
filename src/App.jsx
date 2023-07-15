import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light" fontSize="small">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon/> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark" fontSize="small">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon/> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system" fontSize="small">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
 
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}
function App() {
  return (
    <>
      <ModeSelect/>
      <hr/>
      <ModeToggle/>
      <hr/>
      <div>hgbaodev</div>
      <Typography variant="body2" color="text.secondary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam esse reprehenderit illo. Error assumenda unde, iste aliquid enim voluptate! Laborum iste minus maxime iusto nobis veniam, eligendi doloremque atque sequi.</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
