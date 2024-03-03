import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

async function addDocsDB(docs) {
  const client = await MongoClient.connect(uri, options)
  const db = client.db(process.env.DATABASE_NAME)
  const collection = db.collection('docs')

  const result = await collection.insertOne(docs)

  await client.close()
  return result
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const docs = req.body
    const result = await addDocsDB(docs)
    res.status(201).json({ result })
  }
}
