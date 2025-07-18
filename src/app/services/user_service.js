import * as api from '../repositories/user_repository.js'
import { getUser } from '../usecases/user_usecase.js'

export async function loadUser(page = 1) {
  return await getUser(api, page)
}