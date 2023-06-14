import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let clientPromise = MongoClient.connect(uri, options)
  .then((client) => {
    return client
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })

export default clientPromise
