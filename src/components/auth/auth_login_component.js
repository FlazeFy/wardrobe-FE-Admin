import { loginAdmin } from '../../app/services/auth_service.js'
import { UNKNOWN_ERROR } from '../../const/message.js'

export function setupLoginForm() {
    const form = document.getElementById('login-form')
    const errorMsg = document.getElementById('error-msg')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            const res = await loginAdmin(email, password)

            if (res.data.role !== 'admin') {
                errorMsg.textContent = 'Invalid credentials or not admin role.'
                return
            }

            localStorage.setItem('token', res.data.token)
            window.electronAPI.navigateTo('home_page.html')
        } catch (err) {
            if (err instanceof Response && [400, 404, 500].includes(err.status)) {
                try {
                    const body = await err.json()
                    errorMsg.textContent = body.message || UNKNOWN_ERROR
                } catch {
                    errorMsg.textContent = UNKNOWN_ERROR
                }
            } else {
                errorMsg.textContent = UNKNOWN_ERROR
            }
        }
    })
}
