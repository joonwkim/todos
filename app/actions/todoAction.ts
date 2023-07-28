'use server'
import { revalidatePath } from "next/cache"
import { createTodo, createTodoByUser, updateTodoComplete, updateTodoSelect } from "../sevices/todoService"
import { Prisma, Todo } from "@prisma/client"
import { redirect, useSearchParams } from "next/navigation"
import router from "next/router"

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

export async function updateTodoCompleteAction(id: string, isCompleted: boolean) {
  await updateTodoComplete(id, isCompleted)
  revalidatePath('/')
  revalidatePath('/oneToMany')
}

export async function updateTodoSelectAction(id: string, isSelected: boolean) {
  console.log('updateTodoSelectAction', isSelected)
  await updateTodoSelect(id, isSelected)
  revalidatePath('/')
  // revalidatePath('/oneToMany')
}

export async function setCheckedOnCompleteAction(checked:boolean){
  // const searchParams = useSearchParams()
  // redirect(`/?checked =${checked}`)
  revalidatePath('/')
    // router.push(`/?checked =${checked}`)
}

