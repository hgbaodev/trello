import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
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
