import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function addDocsBookmarkDB(name, email, docID) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db('minedocs');
  const collection = db.collection('users');

  const result = await collection.updateOne({ name: name, email: email }, { $push: { 'bookmark.docs': docID } });

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, docID } = req.body;
    const result = await addDocsBookmarkDB(name, email, docID);
    res.status(201).json({ result });
  }
}
