import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function deleteRequestDB(id) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db('minedocs');
  const collection = db.collection('docs');
  const collectionRequest = db.collection('requests');

  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  await collectionRequest.deleteMany({ 'data._id': new ObjectId(id) });

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const result = await deleteRequestDB(id);
    res.status(200).json({ result });
  }
}