import { API_BASE_URL } from '../../const/config.js'

export async function apiLogin(email, password) {
    const res = await fetch(`${API_BASE_URL}/auths/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    return data
}

export async function apiSignOut() {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_BASE_URL}/auths/signout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (res.status == 500) throw new Error('Failed to fetch')
  
    const data = await res.json()
    return {
        status: res.status,
        body: data
    }
}