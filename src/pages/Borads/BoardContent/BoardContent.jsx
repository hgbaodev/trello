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
import { cloneDeep } from 'lodash'

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

  // Tìm cái column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    setActiveDragItemmId(event?.active?.id)
    setActiveDragItemmType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemmData(event?.active?.data?.current)
  }

  // Trigger trong quá trình kéo 1 phần từ
  const handleDrapOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handleDropOver', event)
    const { active, over } = event
    if (!active || !over) return

    // activeDraggingCard: là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overcard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over

    // Tìm 2 cái column thuộc cái card id
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn ) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // Tìm vị trí (index) của cái overCard trong column đích
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex

        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

        const nextColumns = cloneDeep([...prevColumns])
        const nextActiveColumns = nextColumns.find(column => column._id === activeColumn._id )
        const nextOverColumns = nextColumns.find(column => column._id === overColumn._id )

        // Cloumn cũ
        if (nextActiveColumns) {
          //Xóa card ở cải column active
          nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== activeDraggingCardId)
          // Cập nhật lại mảng card orderIds
          nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id)
        }
        // Column mới
        if (overColumn) {
          // Kiểm tra xem cái card đang kéo có tồn tại ở  overColumn hay chưa nếu có thì xóa nó trước đi
          nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDraggingCardId)
          //Thêm cái card mới vào over column
          nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // Cập nhật lại mảng card orderIds
          nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  const handleDrapEnd = (event) => {
    // console.log(event)
    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Hành động kéo thả Card - Tạm thời khoogn làm gì cả')
      return
    }
    const { active, over } = event
    if (!active || !over) return

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
      onDragOver={handleDrapOver}
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
