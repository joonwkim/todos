import prisma from '@/lib/prisma'
import { Prisma, Todo } from '@prisma/client'
import { JsonWebTokenError } from 'jsonwebtoken'
import { todo } from 'node:test'
import { Children } from 'react'

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
export async function getRootTodos() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                parent: null,
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
                },
                parent: true,
                children: {
                    include: {
                        children: true,
                    }
                }
            }
        })
        return todos
    } catch (error) {
        return ({ error })
    }
}
export async function getRootTodosChecked() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                isCompleted: false,
                parent: null,
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
                },
                parent: true,
                children: {
                    include: {
                        children: true,
                    }
                }
            }
        })
         
        return todos
    } catch (error) {
        return ({ error })
    }
}
export async function getRootTodosOrderByDesc() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                parent: null,
            },
            orderBy:{
                createdAt: 'desc'
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
                },
                parent: true,
                children: {
                    include: {
                        children: true,
                    }
                }
            }
        })
        return todos
    } catch (error) {
        return ({ error })
    }
}
export async function getRootTodosOrderByTitleDesc() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                parent: null,
            },
            orderBy:{
                title: 'desc'
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
                },
                parent: true,
                children: {
                    include: {
                        children: true,
                    }
                }
            }
        })
        return todos
    } catch (error) {
        return ({ error })
    }
}
export async function getRootTodosOrderByAsc() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                parent: null,
            },
            orderBy:{
                createdAt: 'asc'
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
                },
                parent: true,
                children: {
                    include: {
                        children: true,
                    }
                }
            }
        })
        console.log('service todos:', JSON.stringify(todos,null,2))
        return todos
    } catch (error) {
        return ({ error })
    }
}
export async function getRootTodosOrderByTitleAsc() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                parent: null,
            },
            orderBy:{
                title: 'asc'
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
                },
                parent: true,
                children: {
                    include: {
                        children: true,
                    }
                }
            }
        })
        return todos
    } catch (error) {
        return ({ error })
    }
}

export async function getRootTodosOrderBy(checked:any, orderBy:string, propertyName:string) {
    try {

        console.log('getRootTodosOrderBy:', checked, orderBy, propertyName)
       
        if(checked==='true' && !orderBy){
            return getRootTodosChecked()
        }
        else{
            if(orderBy === 'desc' && propertyName ==="createdAt"){
                return getRootTodosOrderByDesc();
            }
            else if(orderBy === 'asc' && propertyName ==="createdAt"){
                return getRootTodosOrderByAsc();
            }
            else{
                if(orderBy === 'desc' && propertyName ==="title"){
                    return getRootTodosOrderByTitleDesc();
                }
                else if(orderBy === 'asc' && propertyName ==="title"){
                    return getRootTodosOrderByTitleAsc();
                }
                return getRootTodos();
            }
          
        }
        
        
       
        // const todos = await prisma.todo.findMany({
        //     where: {
        //         parent: null,
        //     },
        //     orderBy:{
        //         createdAt:orderBy,
        //     },
        //     include: {
        //         user: {
        //             select: {
        //                 name: true,
        //                 email: true,
        //             }
        //         },
        //         category: {
        //             select: {
        //                 name: true,
        //             }
        //         },
        //         parent: true,
        //         children: {
        //             include: {
        //                 children: true,
        //             }
        //         }
        //     }
        // })
        // return todos
    } catch (error) {
        console.log('error: ', error)
        return ({ error })
    }
}

export async function getTodosByComplete(ckecked: any) {
    try {
        if (ckecked === 'true') {
            const todos = await prisma.todo.findMany({
                where: {
                    isCompleted: false,
                    parent: null,
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
                    },
                    parent: true,
                    children: {
                        include: {
                            children: true,
                        }
                    }
                }
            })
            return todos
        }
        else {
            return getRootTodos();
        }
        // console.log('getTodosByComplete', ckecked)


    } catch (error) {
        return ({ error })
    }
}

export async function getParentTodo(child: Todo) {
    try {
        if (child.parentId) {
            const todo = await prisma.todo.findUnique({
                where: {
                    id: child.parentId,
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
                    },
                    parent: true,
                    children: {
                        include: {
                            children: true,
                        }
                    }
                }
            })
            return todo;
        }
        return null;

        // console.log('getTodosByComplete', ckecked)


    } catch (error) {
        return ({ error })
    }
}

export async function createTodo(titleInput: string) {
    try {
        const todo = await prisma.todo.create({
            data: {
                title: titleInput,
                isSelected: false,
            }
        })
        return todo
    } catch (e) {
        throw e
    }
}

export async function createChildTodo(parentTodo: Todo, titleInput: string) {
    try {
        const todo = await prisma.todo.create({
            data: {
                title: titleInput,
                isSelected: false,
                parent: {
                    connect: {
                        id: parentTodo.id
                    },
                },
            },
            include: {
                parent: true,
                children: {
                    include: {
                        children: true
                    }
                }
            },
        })
        return todo
    } catch (e) {
        throw e
    }
}

export async function updateParentTodo(parentTodo: Todo, isCompleted: boolean) {
    try {
        const todo = await prisma.todo.update({
            where: {
                id: parentTodo.id
            },
            data: {
                isCompleted: isCompleted,
            },
            include: {
                children: {
                    include: {
                        children: true
                    }
                }
            },
        })
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

export async function updateTodoSelect(id: string, isSelected: boolean) {
    try {
        const res = await prisma.todo.update({ where: { id }, data: { isSelected } })
        return { res }
    } catch (error) {
        return ({ error })
    }
}

export async function unselectAllTodo() {
    try {
        const res = await prisma.todo.updateMany({ where: { isSelected: true }, data: { isSelected: false } })
        return { res }
    } catch (error) {
        return ({ error })
    }
}

export async function deleteSelected() {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                isSelected: true,
            }
        })
        // console.log('selected todos:', todos)
        todos.forEach(async s => {
            await prisma.todo.delete({
                where: {
                    id: s.id
                }
            })
        })

    } catch (error) {
        return ({ error })
    }
}