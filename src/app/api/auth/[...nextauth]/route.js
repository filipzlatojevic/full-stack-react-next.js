import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            // check password
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],

  pages: {
    error: "/dashboard/login",
  },
});

export { handler as GET, handler as POST };
