'use server'
import { createChildTodo, createTodo, createTodoByUser, deleteSelected, getParentTodo, setParentDisconnected, unselectAllTodo, updateParentTodo, updateTodoComplete, updateTodoExpand, updateTodoSelect, updateTodoSelectAndResetRelation } from "../sevices/todoService"
import { Prisma, Todo } from "@prisma/client"
import { revalidatePath } from "next/cache";
import { redirect, } from "next/navigation";

export async function createTodoAction(title: string) {
  try {
    const todo = await createTodo(title)
    revalidatePath('/')
  } catch (e: any) {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        redirect("/todos/?status=error && code=P2002");
      }
      else {
        throw e
      }
    }
  }
}

export async function createChildTodoAction(parentTodo: any, title: string) {
  try {
    // console.log('createChildTodoAction', parentTodo, title)
    const child = await createChildTodo(parentTodo, title);
    // console.log('child created', child)

    const parentUpdated = await updateParentTodo(parentTodo, false);
    // console.log('parent updated:', parentTodo)

    revalidatePath('/')
  } catch (e: any) {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        redirect("/todos/?status=error && code=P2002");
      }
      else {
        throw e
      }
    }
  }
}

export async function resetParentChildTodoAction(parentTodo: any, childId: string, isSelected: boolean) {
  try {
    const child = await updateTodoSelectAndResetRelation(childId, isSelected);
    revalidatePath('/')
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        redirect("/todos/?status=error && code=P2002");
      }
      else {
        throw e
      }
    }
  }
}

export async function createTodoByUserAction(input: TodoInputType) {
  await createTodoByUser(input)
  revalidatePath('/oneToMany')
}
const isAllChildrenCompleted = (parent: any) => {
  let result: boolean = true;
  parent.children.forEach((child: any) => {
    if (!child.isCompleted) {
      result = false;
      return result;
    }
  })

  return result;
}
export async function updateTodoCompleteAction(selectedTodo: Todo, isCompleted: boolean) {
  await updateTodoComplete(selectedTodo, isCompleted)
  const parent = await getParentTodo(selectedTodo) as Todo
  if (parent) {
    if (!isCompleted) {
      await updateTodoComplete(parent, isCompleted)
    } else {
      if (isAllChildrenCompleted(parent)) {
        await updateTodoComplete(parent, true)
      }
    }
  }
  revalidatePath('/')
}

export async function updateTodoSelectAction(id: string, isSelected: boolean) {
  await updateTodoSelect(id, isSelected)
  revalidatePath('/')
}

export async function updateTodoExpandAction(id: string, isExpanded: boolean) {
  await updateTodoExpand(id, isExpanded)
  revalidatePath('/')
}

export async function unselectAllTodoAction() {
  await unselectAllTodo()
  revalidatePath('/')
}

export async function deleteSelectedAction() {
  try {
    await setParentDisconnected()

    await deleteSelected();

    revalidatePath('/')
    revalidatePath('/todos')
  } catch (e: any) {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        redirect("/todos/?status=error && code=P2002");
      }
      else {
        throw e
      }
    }
  }

}
