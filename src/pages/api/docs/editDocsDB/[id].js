import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function editDocsDB(id, updatedDoc) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection('docs');

  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: updatedDoc };

  const result = await collection.updateOne(filter, updateDoc);

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    const updatedDoc = req.body;
    const result = await editDocsDB(id, updatedDoc);
    res.status(201).json({ result });
  }
}
