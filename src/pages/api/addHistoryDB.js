import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

async function addHistoryDB(log, user, type) {
  const client = await MongoClient.connect(uri, options)
  const db = client.db(process.env.DATABASE_NAME)
  const collection = db.collection('history')

  const result = await collection.insertOne({
    ...log,
    user,
    type,
    timeAt: new Date().toUTCString(),
  })

  await client.close()
  return result
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, data, user } = req.body
    const log = {
      ...data,
    }

    const result = await addHistoryDB(log, user, type)

    res.status(201).json({ message: 'success', result })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
