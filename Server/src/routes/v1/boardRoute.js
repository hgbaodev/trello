/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardContoller } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: Api get list boards', code: StatusCodes.OK })
  })
  .post(boardValidation.createNew, boardContoller.createNew)

Router.route('/:id')
  .get(boardContoller.getDetails)
  .put() //update

export const boardRoute = Router