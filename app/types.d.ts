type UserType = {
  name: string,
  email: string,
  password: string,
}
type TodoInputType = {
  title: string,
  desc: string,
  userId: string | undefined
  categoryId:string | undefined
}