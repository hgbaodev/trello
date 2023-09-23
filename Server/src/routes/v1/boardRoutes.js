/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: Api get list boards', code: StatusCodes.OK })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'POST: Api create new boards', code: StatusCodes.CREATED })
  })

export const boardRoutes = Router