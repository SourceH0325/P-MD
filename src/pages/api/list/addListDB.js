import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function addListDB(list) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection('lists');

  const result = await collection.insertOne(list);

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const list = req.body;
    const result = await addListDB(list);
    res.status(201).json({ message: 'success', result });
  }
}
