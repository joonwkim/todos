import prisma from '@/lib/prisma'
import { Prisma, Todo } from '@prisma/client'

export async function getTodos() {
    try {
        const todos = await prisma.todo.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                category: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return { todos }
    } catch (error) {
        return ({ error })
    }
}
export async function getTodosByComplete(ckecked:any) {
    try {
        if(ckecked==='true'){
            const todos = await prisma.todo.findMany({
                where:{
                    isCompleted:false,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                        }
                    },
                    category: {
                        select: {
                            name: true,
                        }
                    }
                }
            })
            return { todos }
        }
        else{
            return getTodos();
        }
        console.log('getTodosByComplete', ckecked)

        
    } catch (error) {
        return ({ error })
    }
}

export async function createTodo(titleInput: string) {
    try {
        const todo = await prisma.todo.create({ data: { 
            title:titleInput,
            isSelected: false,
         } })
        return todo
    } catch (e) {
        throw e
    }
}

export async function createTodoByUser(input: TodoInputType) {
    try {
        const todo = await prisma.todo.create({ data: input, include: { user: true, category: true } })
        return { todo }
    }
    catch (error) {
        return ({ error })
    }
}

export async function updateTodoComplete(id: string, isCompleted: boolean) {
    try {
        const todo = await prisma.todo.update({ where: { id }, data: { isCompleted } })
        return { todo }
    } catch (error) {
        return ({ error })
    }
}

export async function updateTodoSelect(id:string, isSelected:boolean) {
    try {
        const res = await prisma.todo.update({ where: { id }, data: { isSelected } })
        return { res }
    } catch (error) {
        return ({ error })
    }
}

