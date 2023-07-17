'use server'

import { revalidatePath } from "next/cache"
import { createTodo, createTodoByUser, updateTodo } from "../../sevices/todoService"
import { Todo } from "@prisma/client"

export async function createTodoAction(title:string) {
    await createTodo(title)
    revalidatePath('/')
}

export async function createTodoByUserAction(input:TodoInputType){
    await createTodoByUser(input)
    revalidatePath('/oneToMany')
}

export async function updateTodoAction(id: string, isCompleted:boolean) {
    await updateTodo(id,isCompleted)
    revalidatePath('/')
    revalidatePath('/oneToMany')
}
