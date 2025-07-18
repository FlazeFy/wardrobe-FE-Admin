import { loadQuestion } from '../../app/services/question_service.js'

let currentPage = 1

async function render(page = 1) {
    const tbody = document.querySelector('#questionTable tbody')
    const pagination = document.getElementById('pagination')
    tbody.innerHTML = ''
    pagination.innerHTML = ''

    try {
        // Table
        const res = await loadQuestion(page)
        const data = res.data
        const meta = res.metadata
        currentPage = meta.page

        data.forEach(dt => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${dt.question}</td>
                <td>${dt.answer ?? '-'}</td>
                <td>${dt.is_show ? `<div class='btn-tag bg-success'>Answered</div>` : `<div class='btn-tag bg-danger'>Not Answered</div>`}</td>
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