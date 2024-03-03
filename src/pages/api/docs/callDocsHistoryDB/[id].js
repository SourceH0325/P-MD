import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

async function callDocsHistoryDB(id) {
  const client = await MongoClient.connect(uri, options)
  const db = client.db(process.env.DATABASE_NAME)
  const collection = db.collection('history')

  const result = await collection
    .find({ 'docs.id': id, type: { $ne: 'add_docs' } })
    .toArray()

  await client.close()
  return result
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const id = req.query.id
    const result = await callDocsHistoryDB(id)
    res.status(201).json({ result })
  }
}
