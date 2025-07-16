import { API_BASE_URL } from '../../const/config.js'

export async function apiGetAllDictionary(path) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMzMTA3MTksImlhdCI6MTc1MjcwNTkxOSwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6ImI3Y2UwMmM0LWY0MGUtNDI1Zi04ZmMyLWJlY2FlOGQyZGIyYyJ9.g8fDYBo3m21KdinDz1YqD0dm1GO_oUhZdW5HMTATJBw`,
            'Content-Type': 'application/json'
        }
    })
  
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

export async function fetchDictionary(page = 1) {
    return await apiGetAllDictionary(`/dictionaries?page=${page}`)
}