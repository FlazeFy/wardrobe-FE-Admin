import * as api from '../repositories/question_repository.js'
import { getQuestion } from '../usecases/question_usecase.js'

export async function loadQuestion(page = 1) {
  return await getQuestion(api, page)
}