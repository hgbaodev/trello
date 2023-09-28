/* eslint-disable no-console */
/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'

// eslint-disable-next-line no-unused-vars
const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)

    //Điều hướng dữ liệ sang tầng Service

    //Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json({ message: 'POST: from controller', code: StatusCodes.CREATED })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardContoller = {
  createNew
}