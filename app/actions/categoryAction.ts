'use server'

import { revalidatePath } from "next/cache"
import { Category,  } from "@prisma/client"
import { createCategory, createCategoryByUser } from "../../sevices/categoryServices"
import { getCategories } from "../sevices/categoryServices"

// export async function getCategoriesAction() {
//     const categories = await getCategories();
//     revalidatePath('/userstodos')
//     return categories;    
// }

export async function createCategoryAction(name:string) {
    await createCategory(name)
    revalidatePath('/userstodos')
}
export async function createCategoryByUserAction(input:Category){
    await createCategoryByUser(input)
    revalidatePath('/categories')
}
