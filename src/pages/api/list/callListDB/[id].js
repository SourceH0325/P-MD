import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function callListDB(id) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db('minedocs');
  const collection = db.collection('lists');

  const result = await collection.find({ _id: new ObjectId(id) }).toArray();

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const id = req.query.id;
    const result = await callListDB(id);
    res.status(201).json({ message: 'success', result });
  }
}
