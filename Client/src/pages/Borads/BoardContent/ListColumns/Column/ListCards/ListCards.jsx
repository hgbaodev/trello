import Box from '@mui/material/Box'
import Card from './Card.jsx/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useTheme } from '@mui/material'

function ListCards({ cards }) {
  const theme = useTheme()
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: `calc(
          ${theme.palette.boardContentHeight} - 
          ${theme.spacing(5)} -
          ${theme.palette.columnHeaderHeight} - 
          ${theme.palette.columnFooterHeight}
        )`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {/* Card */}
        {cards?.map(card => <Card key={card._id} card={card}/>)}
      </Box>
    </SortableContext>
  )
}

export default ListCards