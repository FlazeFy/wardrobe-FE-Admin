export async function getUser(api, page) {
    return await api.fetchUser(page)
}

export async function createUser(api, userData) {
    return await api.postUser(userData)
}