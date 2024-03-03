import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

async function calluserDB(name, email) {
  const client = await MongoClient.connect(uri, options)
  const db = client.db(process.env.DATABASE_NAME)
  const collection = db.collection('users')

  const result = await collection.find({ name: name, email: email }).toArray()

  await client.close()
  return result
}

export default async function handler(req, res) {
  const { name, email } = req.body
  const result = await calluserDB(name, email)
  res.status(200).json({ result })
}
