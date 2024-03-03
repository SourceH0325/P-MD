import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

async function callrequestDB() {
  const client = await MongoClient.connect(uri, options)
  const db = client.db(process.env.DATABASE_NAME)
  const collection = db.collection('requests')

  const result = await collection.find({}).toArray()

  await client.close()
  return result
}

export default async function handler(req, res) {
  const result = await callrequestDB()
  res.status(200).json({ result })
}
