import { API_BASE_URL } from '../../const/config.js'

export async function apiGet(path) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMyODg4ODgsImlhdCI6MTc1MjY4NDA4OCwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjEwYTExM2U3LWI3ZjItNDk4ZC1hYTYyLWFmYjhlOTAwOTFhMSJ9.P88ugkbeiuMDKn-TmWWjgjDGJsYkr17yhQLhjS4EGrU`,
            'Content-Type': 'application/json'
        }
    })
  
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

export async function fetchError(page = 1) {
    return await apiGet(`/errors?page=${page}`)
}