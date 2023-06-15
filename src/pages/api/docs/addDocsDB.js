import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function addDocsDB(doc) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection('docs');

  const result = await collection.insertOne(doc);

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const doc = req.body;
    const result = await addDocsDB(doc);
    res.status(201).json({ result });
  }
}
