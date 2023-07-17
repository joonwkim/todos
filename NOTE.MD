create project
pnpx create-next-app@latest .

// bootstrap 
pnpm add bootstrap react-bootstrap
pnpm add -D @types/react-bootstrap @types/bcrypt @types/jsonwebtoken @types/react-bootstrap
pnpm add @hookform/resolvers @next-auth/prisma-adapter @prisma/client bcrypt jsonwebtoken next-auth react-hook-form react-icons zod

import 'bootstrap/dist/css/bootstrap.min.css' on layout.tsx

//prisma
pnpm add -D prisma
pnpm add @prisma/client
pnpx prisma init //to initialize prism

.env //create .env file on root directory
enter DATABASE_URL value 
add .env to .gitignore

update datasource in /prisma/schema.prisma 
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

clreate model in /prisma/schema
model Todo {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  isCompleted Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

pnpx prisma db push
pnpx prisma generate

create lib folder

create prisma.ts to create prisma client instance

import { PrismaClient } from "@prisma/client";

declare global{
   var prisma: PrismaClient | undefined
}
let prisma: PrismaClient
let prismaPromise: Promise<PrismaClient>

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

create services folder for data service



//set experimental
modify next.config.js to 
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
    }
}

module.exports = nextConfig

//next-auth
pnpm add next-auth jsonwebtoken
pnpm add -D @types/jsonwebtoken

//next-auth.d.ts
import { Role } from "@prisma/client"
import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    id:UserId
    roles: Role[]
  }
}

declare module "next-auth" {
  interface Session{
    user:User & {
      id:UserId
      roles: Role[]
    }
  }
}

//vercel
vercel deploy
vercel --prod

//in case of prisma modify package.json like this
 "db:push": "prisma db push",
 "build": "prisma generate & next build",