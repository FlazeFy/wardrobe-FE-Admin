import * as api from '../repositories/feedback_repository.js'
import { getFeedback } from '../usecases/feedback_usecase.js'

export async function loadFeedback(page = 1) {
  return await getFeedback(api, page)
}