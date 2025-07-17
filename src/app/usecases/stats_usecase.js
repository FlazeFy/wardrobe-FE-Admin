export async function getStats(api, module, context, userId) {
    return await api.fetchStatsMostContext(module, context, userId)
}