'use server'

import { revalidatePath } from "next/cache"
import { createTodo, createTodoByUser, updateTodo } from "../sevices/todoService"
import { Prisma, Todo } from "@prisma/client"
import { error } from "console"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"
import { redirect } from "next/navigation"

export async function createTodoAction(title: string) {
  try {
    const todo = await createTodo(title)
    // if(!todo){
    //   console.log('!todo: ',todo)
    // }
    // else{
    //   console.log('todo:',todo)
    // }
    revalidatePath('/')
  } catch (e: any) {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation'
        )

        redirect("/?status=error");
      }
      else{
        throw e
      }
    }
    // else{
    //   message = e 
    // }

    // console.log('todo create error: ', e)
   
  }
}

export async function createTodoByUserAction(input: TodoInputType) {
  await createTodoByUser(input)
  revalidatePath('/oneToMany')
}

export async function updateTodoAction(id: string, isCompleted: boolean) {
  await updateTodo(id, isCompleted)
  revalidatePath('/')
  revalidatePath('/oneToMany')
}
