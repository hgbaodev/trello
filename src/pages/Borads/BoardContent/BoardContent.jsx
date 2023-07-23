import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card.jsx/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const customDropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.5' } }
  })
}

const BoardContent = ({ board }) => {

  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // eslint-disable-next-line no-unused-vars
  const [activeDragItemId, setActiveDragItemmId] = useState(null)
  const [activeDragItemType, setActiveDragItemmType] = useState(null)
  const [activeDragItemData, setActiveDragItemmData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {
    setActiveDragItemmId(event?.active?.id)
    setActiveDragItemmType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemmData(event?.active?.data?.current)
  }


  const handleDrapEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id == active.id)
      const newIndex = orderedColumns.findIndex(c => c._id == over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.findIndex.map(c => c._id)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemmId(null)
    setActiveDragItemmType(null)
    setActiveDragItemmData(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDrapEnd}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <Box sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-thumb': { m: 2 }
        }}>
          {/* Column 01*/}
          <ListColumns columns = { orderedColumns }/>
          <DragOverlay dropAnimation={ customDropAnimation }>
            {!activeDragItemType && null}
            {(activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
            {(activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
          </DragOverlay>
        </Box>
      </Box>
    </DndContext>
  )
}
export default BoardContent
