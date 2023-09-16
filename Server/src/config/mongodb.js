//username: hgbaodev
//password: aomdc0LN2VlGz0hM
//DatabaseName: trello-hgbaodev

const MONGODB_URL = 'mongodb+srv://hgbaodev:aomdc0LN2VlGz0hM@cluster0-hgbaodev.imugkwu.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
const DATABASE_NAME = 'trello-hgbaodev'

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

//Khởi tạo 1 đối tượng instance để connect đến MogoDb
const mongoClientInstance = new MongoClient(MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// Kết nối tới Database
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}

