import { loadUser } from '../../app/services/user_service.js'

let currentPage = 1

async function render(page = 1) {
    const tbody = document.querySelector('#userTable tbody')
    const pagination = document.getElementById('pagination')
    tbody.innerHTML = ''
    pagination.innerHTML = ''

    try {
        // Table
        const res = await loadUser(page)
        const data = res.data
        const meta = res.metadata
        currentPage = meta.page

        data.forEach(dt => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${dt.id}</td>
                <td>${dt.username}</td>
                <td>${dt.email}</td>
                <td>${dt.total_clothes}</td>
                <td>${dt.total_outfit}</td>
                <td>
                    <h4 style="margin:0;">${dt.telegram_user_id ?? '-'}</h4>
                    <p>${dt.telegram_is_valid ? `<div class='btn-tag bg-success'>Validated</div>` : `<div class='btn-tag bg-danger'>Not Validated</div>`}</p>
                </td>
                <td>${new Date(dt.created_at).toLocaleString()}</td>
            `
            tbody.appendChild(tr)
        })

        // Button Pagination
        const prev = document.createElement('button')
        prev.textContent = 'Previous'
        prev.disabled = meta.page === 1
        prev.onclick = () => render(meta.page - 1)

        const next = document.createElement('button')
        next.textContent = 'Next'
        next.disabled = meta.page === meta.total_pages
        next.onclick = () => render(meta.page + 1)

        pagination.appendChild(prev)
        pagination.append(` Page ${meta.page} of ${meta.total_pages} `)
        pagination.appendChild(next)
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="3">Failed to load</td></tr>`
    }
}

render(currentPage)