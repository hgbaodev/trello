/* eslint-disable no-useless-catch */
/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    //Xử lý logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng model xử lý lưu bản ghi newBoard vào trong database
    const createBoard = await boardModel.createNew(newBoard)
    console.log('createBoard', createBoard)
    //Lấy bảng ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    console.log('getNewBoard', getNewBoard)
    // Làm thêm các xử lý logic khác với Collection khác tuỳ đặt thù dự án
    // Bắn email, notification về cho admin khi có 1 board mới được tạo..vv

    // Trả kết quả về trong service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}