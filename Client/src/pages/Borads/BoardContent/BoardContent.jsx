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
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import { cloneDeep } from 'lodash'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card.jsx/Card'
import { useTheme } from '@mui/material'

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
  const theme = useTheme()
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  // Điểm va chạm cuối cùng xử lý thuật toán phát hiện va chạm
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm cái column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tìm vị trí (index) của cái overCard trong column đích
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex

      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

      const nextColumn = cloneDeep(prevColumns)
      const nextActiveColumns = nextColumn.find(column => column._id === activeColumn._id )
      const nextOverColumns = nextColumn.find(column => column._id === overColumn._id )

      // Cloumn cũ
      if (nextActiveColumns) {
        //Xóa card ở cải column active
        nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== activeDraggingCardId)
        // Cập nhật lại mảng card orderIds
        nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id)
      }
      if (nextActiveColumns) {
        // Kiểm tra xem cái card đang kéo có tồn tại ở  overColumn hay chưa nếu có thì xóa nó trước đi
        nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardId = {
          ...activeDraggingCardData,
          columnId: nextOverColumns._id
        }
        //Thêm cái card mới vào over column
        nextOverColumns.cards = nextOverColumns.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardId)
        // Cập nhật lại mảng card orderIds
        nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id)
      }

      return nextColumn
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemmId(event?.active?.id)
    setActiveDragItemmType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemmData(event?.active?.data?.current)

    // Nếu kéo thả card thì set lại oldColumnWhenDraggingCard
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong quá trình kéo 1 phần từ
  const handleDrapOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
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
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDrapEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    // Xử lý kéo thả card
    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overcard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id: overCardId } = over

      // Tìm 2 cái column thuộc cái card id
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn ) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // Hành động kéo thả card 2 column khác nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Hành động kéo thả card cùng 1 column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        // Lấy vị trí mới từ thằng over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        // Dùng arrayMove dndkit
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // Clone mảng orderedColumnsState cũ ra một cái mơi để xử lý data ròi return - cập nhật lại sau
          const nextColumn = cloneDeep(prevColumns)
          // Tìm tới column mà chúng ta đang thả
          const targetColumn = nextColumn.find(column => column._id === overColumn._id)
          // cập nhật lại column
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumn
        })
      }
    }

    // Xử lý kéo thả collumn
    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí cũ (trừ thằng active)
      if (active.id !== over.id) {
        // Lấy vị trí cũ từ thằng active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // Lấy vị trí mới từ thằng over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.findIndex.map(c => c._id)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Reset dữ liệu
    setActiveDragItemmId(null)
    setActiveDragItemmType(null)
    setActiveDragItemmData(null)
    setOldColumnWhenDraggingCard(null)
  }

  // args = arguments = Các đối số, tham số
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    const pointerIntersections = pointerWithin(args)
    const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)
    // Tìm overId đầu tiên trong đám intersections ở trên
    let overId = getFirstCollision(intersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })?.[0].id
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      // Cảm biến
      sensors={sensors}
      // CollisionDetectionAlgorithms thuật toán phát hiện va chạm
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDrapOver}
      onDragEnd={handleDrapEnd}>
      <Box sx={{
        bgcolor: (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: theme.palette.boardContentHeight,
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
