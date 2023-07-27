'use server'
import { revalidatePath } from "next/cache"
import { createTodo, createTodoByUser, updateTodo } from "../sevices/todoService"
import { Prisma, Todo } from "@prisma/client"
import { redirect } from "next/navigation"

export async function createTodoAction(title: string) {
  try {
    const todo = await createTodo(title)
    revalidatePath('/')
  } catch (e: any) {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
     
        redirect("/?status=error && code=P2002");
      }
      else{
        throw e
      }
    }
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
