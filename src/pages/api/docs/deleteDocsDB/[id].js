import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

async function deleteDocsDB(id, reason, session) {
  const client = await MongoClient.connect(uri, options)

  const db = client.db(process.env.DATABASE_NAME)
  const docsCollection = db.collection('docs')
  const requestsCollection = db.collection('requests')

  const foundDoc = await docsCollection.findOne({ _id: new ObjectId(id) })

  if (foundDoc) {
    const request = {
      reason,
      session,
      data: foundDoc,
    }

    const result = await requestsCollection.insertOne(request)

    await client.close()
    return result
  } else {
    await client.close()
    return null
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const id = req.query.id
    const { reason, session } = req.body
    const result = await deleteDocsDB(id, reason, session)
    res.status(201).json({ result })
  }
}
