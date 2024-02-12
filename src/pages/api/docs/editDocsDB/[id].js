import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function editDocsDB(id, updatedDocs) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection('docs');

  const filter = { _id: new ObjectId(id) };
  const updateDocs = { $set: updatedDocs };

  const result = await collection.updateOne(filter, updateDocs);

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    const updatedDocs = req.body;
    const result = await editDocsDB(id, updatedDocs);
    res.status(201).json({ result });
  }
}
