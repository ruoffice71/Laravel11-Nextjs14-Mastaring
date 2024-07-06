import { LOGIN_URL } from "@/lib/apiEndPoint";
import myAxios from "@/lib/axios.config";
import {AuthOptions, ISODateString} from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials';

export interface CustomSession {
    user?:CustomUser;
    expires: ISODateString
}

export type CustomUser = {
    id?:string | null;
    name?:string | null;
    username?:string | null;
    email?:string | null;
    profile_image?:string | null;
    token?:string | null;
    created_at?:string | null;
}

export const authOptions:AuthOptions= {
    pages:{
        signIn:"/login"
    },
    callbacks:{
        async jwt({ token, user, trigger, session }) {
            if (trigger==="update" && session?.profile_image) {
                const user:CustomUser = token.user as CustomUser
                user.profile_image = session?.profile_image
            }
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, user, token }:{session:CustomSession, token:JWT, user:CustomUser}) {
            session.user = token.user as CustomUser
            return session;
        },
    },
    // Configure one or more authentication providers
    providers: [
      
      CredentialsProvider({
        name:"Credentials",
        credentials:{
            email:{},
            password:{}
        },
        async authorize(credentials, req) {
            const res = await myAxios.post(LOGIN_URL, credentials);
            const response = res.data;
            const user = response?.user;
            if (user) {
              return user;
            } else {
              return null;
            }
          },
      })
    ],
  }
  