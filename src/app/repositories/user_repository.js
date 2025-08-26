import { API_BASE_URL } from '../../const/config.js'

export async function apiGetUser(path) {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
  
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

export async function fetchUser(page = 1) {
    return await apiGetUser(`/users/desc/all?page=${page}`)
}

export async function postUser(data) {
    const res = await fetch(`${API_BASE_URL}/auths/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let result
    try {
        result = await res.json()
    } catch {
        result = {}
    }

    if (!res.ok) {
        throw { status: res.status, message: result.message || 'Failed to register user' }
    }

    return { status: res.status, data: result }
}