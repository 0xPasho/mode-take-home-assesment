import { authOptions } from "@/modules/auth/components/use-auth";
import NextAuth from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
