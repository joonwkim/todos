import prisma from '@/lib/prisma'
import { User } from 'next-auth';
import { getTodos } from './todoService';

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            include: {
                profile:true,
                todos: {
                    select:{
                        id:true,
                        title:true,
                        desc:true,
                        isCompleted:true,
                        user:true,
                        category:true
                    }
                },
            }
        })
      
        return  users 
    } catch (error) {
        return ({ error })
    }
}
export async function createUser(input: UserType) {
    try {
        const user = await prisma.user.create({
            data: {
                email: input.email,
                name:input.name,
                password: input.password,
                profile: {
                    create: {
                        picture: 'no picture available'
                    },
                },
            },
            include: {
                profile: true,
                todos: true
            },
        });
        return user
    }
    catch (error) {
        return ({ error })
    }
}

export async function updateUser(id: string, userInput: User) {
    try {
        // const user = await prisma.user.update({where: {id},data:{userInput}})
        // return {user}
    } catch (error) {
        return ({ error })
    }

}


