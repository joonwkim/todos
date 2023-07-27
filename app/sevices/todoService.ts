import prisma from '@/lib/prisma'
import { Prisma, Todo } from '@prisma/client'

export async function getTodos() {
    try {
        const todos = await prisma.todo.findMany({
            include: {
                user:{
                    select:{
                        name: true,
                        email:true,
                    }
                },
                category:{
                    select:{
                        name:true,
                    }
                }
            }
        })
        return todos
    } catch (error) {
        return({error})
    }
}

export async function createTodo(title:string){
    try{
        const todo = await prisma.todo.create({data:{title}})
        return todo
    }catch (e) {
        // if (e instanceof Prisma.PrismaClientKnownRequestError) {
        //   // The .code property can be accessed in a type-safe manner
        //   if (e.code === 'P2002') {
        //     console.log(
        //       'There is a unique constraint violation, a new user cannot be created with this email'
        //     )
        //   }
        // }
        // console.log('todo create error: ', e)
        throw e
      }
}

export async function createTodoByUser(input: TodoInputType){
    try{
        const todo = await prisma.todo.create({data: input, include:{user:true, category:true}})
        return {todo}
    }
    catch(error){
        return({error})
    }
}

export async function updateTodo(id: string, isCompleted:boolean) {
    try {
        const todo = await prisma.todo.update({where: {id},data:{isCompleted}})
        return {todo}
    } catch (error) {
        return({error})
    }
    
}