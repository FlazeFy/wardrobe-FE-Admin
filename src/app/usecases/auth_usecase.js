export async function login(api, email, password) {
    return await api.apiLogin(email, password)
}
  