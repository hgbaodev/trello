import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, Tooltip } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '5px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

const BoardBar = ({ board }) => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBardHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={board?.type}
          clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation "
          clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          onClick={() => {}}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >Invite</Button>
        <AvatarGroup
          max={6}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4bobe' }
            }
          }}
        >
          <Tooltip title="hgbaodev">
            <Avatar alt="hgbaodev" src="https://avatars.githubusercontent.com/u/120194990?v=4" />
          </Tooltip>
          <Tooltip title="v1">
            <Avatar alt="v1" src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/Anh-Wibu-giau-mat.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://tvmcomics.com.vn/wp-content/uploads/2019/11/anh12-3.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://i.pinimg.com/236x/79/3c/78/793c78f3fd685027ecaa36a5f44b3e34.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://i.pinimg.com/236x/97/58/ae/9758ae3e6b9bcc929cb9511d44a86b0d.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://duhocchaudaiduong.edu.vn/hinh-nen-cool-ngau-nu/imager_76_4257_700.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://duhocchaudaiduong.edu.vn/hinh-nen-cool-ngau-nu/imager_76_4257_700.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://duhocchaudaiduong.edu.vn/hinh-nen-cool-ngau-nu/imager_76_4257_700.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://duhocchaudaiduong.edu.vn/hinh-nen-cool-ngau-nu/imager_76_4257_700.jpg" />
          </Tooltip>
          <Tooltip title="v3">
            <Avatar alt="v3" src="https://duhocchaudaiduong.edu.vn/hinh-nen-cool-ngau-nu/imager_76_4257_700.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}
export default BoardBar
