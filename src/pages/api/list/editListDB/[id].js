import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function editListDB(id, updatedDoc) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db('minedocs');
  const collection = db.collection('lists');

  const filter = { _id: new ObjectId(id) };
  const updateList = { $set: updatedDoc };
  
  const result = await collection.updateOne(filter, updateList);

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'PUT') { // HTTP Method를 PUT으로 변경합니다.
    const id = req.query.id;
    const updateList = req.body; // 업데이트할 데이터는 request body에서 받아옵니다.
    const result = await editListDB(id, updateList);
    res.status(201).json({ message: 'success', result });
  }
}
