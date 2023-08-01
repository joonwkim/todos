'use server'
import { revalidatePath } from "next/cache"
import { createChildTodo, createTodo, createTodoByUser, deleteSelected, getParentTodo, unselectAllTodo, updateParentTodo, updateTodoComplete, updateTodoSelect } from "../sevices/todoService"
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

export async function createChildTodoAction(parentTodo:Todo, title: string) {
  try {
    console.log('createChildTodoAction', parentTodo, title)
    const child = await createChildTodo(parentTodo, title);
    console.log('child created', child)

    const parentUpdated = await updateParentTodo(parentTodo, false);
    console.log('parent updated:', parentTodo)

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

export async function updateTodoCompleteAction(selectedTodo: Todo, isCompleted: boolean) {
  await updateTodoComplete(selectedTodo.id, isCompleted)
  const parent = await getParentTodo(selectedTodo) as Todo
  if(parent){
    await updateTodoComplete(parent.id, isCompleted)
  }
  revalidatePath('/')
}

export async function updateTodoSelectAction(id: string, isSelected: boolean) {
  await updateTodoSelect(id, isSelected)
  revalidatePath('/')
}

export async function unselectAllTodoAction() {
  await unselectAllTodo()
  revalidatePath('/')
}
export async function deleteSelectedAction() {
  await deleteSelected()
  revalidatePath('/')
}
// export async function setCheckedOnCompleteAction(checked:boolean){
//   revalidatePath('/')
// }

