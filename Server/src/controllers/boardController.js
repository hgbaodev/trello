/* eslint-disable no-console */
/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

// eslint-disable-next-line no-unused-vars
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)


    //Điều hướng dữ liệu sang tầng Service
    const createBoard = await boardService.createNew(req.body)

    //Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }
}

export const boardContoller = {
  createNew
}