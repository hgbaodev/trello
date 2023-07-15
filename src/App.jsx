import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  useColorScheme
} from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
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
