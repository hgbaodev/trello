/* eslint-disable no-console */
/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'


const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hi ${env.AUTHOR}, Backend server is running successfully at host:  http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('4. Server is shutting down....')
    CLOSE_DB()
    console.log('5. Disconnected from MogoDb Cloud Atlas')
  })
}

// Khi connnect database thành công thì mới START_SERVER
// Immediately-invoked / Anonymous Async Function (IIFE)
(async () => {
  try {
    console.log('1. Connecting to MogoDB Cloud Atlas')
    await CONNECT_DB()
    console.log('2. Connected to MogoDB Cloud Atlas')

    // Khởi động server sau khi connect databse thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()


// CONNECT_DB()
//   .then(() => console.log('2. Connected to MogoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })

