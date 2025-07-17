import * as api from '../repositories/stats_repository.js'
import { getStats } from '../usecases/stats_usecase.js'

export async function loadStats(module, context, userId) {
  return await getStats(api, module, context, userId)
} 