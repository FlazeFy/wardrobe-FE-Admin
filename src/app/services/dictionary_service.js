import * as api from '../repositories/dictionary_repository.js'
import { getDictionary } from '../usecases/dictionary_usecase.js'

export async function loadDictionary(page = 1) {
  return await getDictionary(api, page)
}