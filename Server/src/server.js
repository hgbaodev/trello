/* eslint-disable no-console */
/**
 * Updated by hgbaodev.com's author on August 17 2023
 * YouTube: https://youtube.com/@hgbaodev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'


const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World hgbaodev!</h1><hr>')
  })
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello hgbaodev, Backend server is running successfully at host:  http://${ hostname }:${ port }/`)
  })

  exitHook(() => {
    console.log('4. Disconnecting from MogoDb Cloud Atlas')
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

