import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function addLogsDB(log, session, type) {
  const client = await MongoClient.connect(uri, options);
  const db = client.db('minedocs');
  const collection = db.collection('logs');

  const result = await collection.insertOne({
    ...log,
    session,
    type,
    timeAt: new Date(),
  });

  await client.close();
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, data, session } = req.body;
    const log = {
      ...data,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };

    const result = await addLogsDB(log, session, type);

    res.status(201).json({ message: 'success', result });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
