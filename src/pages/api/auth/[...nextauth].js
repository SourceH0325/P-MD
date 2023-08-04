import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../database/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection('users');

      const result = await collection.findOne({
        providerAccountId: account.providerAccountId,
      });
      if (!result) {
        const data = {
          email: user.email,
          name: user.name,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'user',
          bookmark: {
            docs: [],
            lists: [],
          },
        };
        await collection.insertOne(data);
        return true;
      } else {
        await collection.updateOne(
          { providerAccountId: account.providerAccountId },
          {
            $set: {
              email: user.email,
              name: user.name,
              image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
              updatedAt: new Date(),
            },
          },
        );
        return true;
      }
    },
  },
});
