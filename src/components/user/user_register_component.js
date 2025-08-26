import { registerUser } from '../../app/services/user_service.js'

async function render_user_register() {
    const holder = document.querySelector('#user-register-section')
    
    holder.innerHTML = `
        <button id="btn-main-menu" class="bg-success" data-bs-toggle="modal" data-bs-target="#registerModal">Create User</button>
        <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="registerModalLabel">Register An User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="register-form">
                            <label class="form-label">Username</label>
                            <input class="form-control" id="username" type="username" placeholder="ex: jhondoe">
                            <label class="form-label">Password</label>
                            <input class="form-control" id="password" type="password" placeholder="ex: jhondoe123">
                            <label class="form-label">Email</label>
                            <input class="form-control" id="email" type="email" placeholder="ex: jhondoe@gmail.com">
                            <label class="form-label">Telegram User ID</label>
                            <input class="form-control" id="telegram_user_id" type="text" placeholder="ex: 123456">
                            <button type="submit" class="btn btn-success mt-3">Add User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `

    const form = document.getElementById('register-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const user = {
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value.trim(),
            email: document.getElementById('email').value.trim(),
            telegram_user_id: document.getElementById('telegram_user_id').value.trim()
        }

        try {
            const res = await registerUser(user)

            Swal.fire({
                title: "Success!",
                text: res.data.message,
                icon: "success"
            })

            form.reset()
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err.message,
                icon: "error"
            });
        }
    })
}

render_user_register()