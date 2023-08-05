import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function deleteListDB(id) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection('lists');

  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const id = req.query.id;
    const result = await deleteListDB(id);
    res.status(201).json({ message: 'success', result });
  }
}
