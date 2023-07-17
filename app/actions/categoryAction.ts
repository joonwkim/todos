'use server'

import { revalidatePath } from "next/cache"
import { Category,  } from "@prisma/client"
import { createCategory, createCategoryByUser } from "../../sevices/categoryServices"

export async function createCategoryAction(name:string) {
    await createCategory(name)
    revalidatePath('/manyToMany')
}
export async function createCategoryByUserAction(input:Category){
    await createCategoryByUser(input)
    revalidatePath('/oneToMany')
}
