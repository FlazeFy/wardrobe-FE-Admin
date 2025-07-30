export async function login(api, email, password) {
    return await api.apiLogin(email, password)
}
  
export async function signOut(api) {
    return await api.apiSignOut()
}