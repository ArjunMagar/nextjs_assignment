

declare module "next-auth" {
    interface Session {
        user: {
            role: string,
            id: string,
            email: string,
            name: string,
            image: string,
        }
    }
    interface JWT {
        id: string;
    }
}