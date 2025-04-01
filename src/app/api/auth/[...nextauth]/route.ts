import sequelize from "@/database/connection";
import dbConnect from "@/database/connection";
import User from "@/database/models/User";

import NextAuth, { Session } from "next-auth";
import { } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

interface IToken { name: string, email: string, picture: string, sub: string, id: string, role: string }
//@ts-ignore
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // session: {
    //     strategy: "jwt",
    //     maxAge: 60, //  Session expires given (in seconds)
    //     updateAge: 60,  //  Refresh session every 15 minutes
    // },

    // jwt: {
    //     maxAge:60, // Token expires given (in seconds)
    // },

    callbacks: {
        async signIn({ user }: { user: { name: string, email: string, image: string } }): Promise<boolean> {
            try {
                await sequelize
                const existingUser = await User.findOne({ where: { email: user.email } }) // return object {username : "sdfdf",email:"sdf"} , {}\

                if (!existingUser) {
                    await User.create({
                        username: user.name,
                        email: user.email,
                        profileImage: user.image,
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        async jwt({ token }: { token: IToken }) {
            await sequelize
            const user = await User.findOne({
                where: { email: token.email }
            })
            // console.log(user, "USER")
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }: { session: Session, token: IToken }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role
            }

            return session;

        }
    }
}
//@ts-ignore
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }