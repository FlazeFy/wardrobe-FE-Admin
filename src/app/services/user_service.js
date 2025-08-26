import * as api from '../repositories/user_repository.js'
import { getUser, createUser } from '../usecases/user_usecase.js'

export async function loadUser(page = 1) {
  return await getUser(api, page)
}

export async function registerUser(userData) {
  return await createUser(api, userData)
}