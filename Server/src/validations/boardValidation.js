/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title min 3 chars',
      'string.max': 'Title max 50 chars',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('req.body', req.body)

    //Chỉ định abortEarly false để trường hợp có nhiều lỗi trả về nhiều lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()

    res.status(StatusCodes.CREATED).json({ message: 'POST: from validation joi', code: StatusCodes.CREATED })
  } catch (error) {
    console.log(error)
    // console.log(Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}