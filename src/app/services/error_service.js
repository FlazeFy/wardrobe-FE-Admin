import * as api from '../repositories/error_repository.js'
import { getError } from '../usecases/error_usecase.js'

export async function loadError(page = 1) {
  return await getError(api, page)
}