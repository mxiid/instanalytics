import NextAuth from 'next-auth';
import {Account, User as AuthUser} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../models/user";
import connect from "../../../utils/db";
const authOptions:any = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                name: {label: "Name", type: "text"},
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any) {
                await connect();
                try{
                    const user = await User.findOne({email: credentials.email});
                    if(user){
                        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                        if(isPasswordValid){
                            return user;
                        }
                    }
                } catch(err: any){
                    throw new Error(err)
                }
            }
        }),

    ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};

