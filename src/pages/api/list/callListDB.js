import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function callListDB() {
  const client = await MongoClient.connect(uri, options);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection('lists');

  const result = await collection.find({}).toArray();

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const result = await callListDB();
    res.status(201).json({ message: 'success', result });
  }
}
