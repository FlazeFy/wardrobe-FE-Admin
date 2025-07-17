import { loadFeedback } from '../../app/services/feedback_service.js'

let currentPage = 1

async function render(page = 1) {
    const tbody = document.querySelector('#feedbackTable tbody')
    const pagination = document.getElementById('pagination')
    tbody.innerHTML = ''
    pagination.innerHTML = ''

    const getColorFeedbackRate = (rate) => {
        if (rate >= 4) return '#00c896'
        else if (rate >= 2) return '#fbb566'
        return '#d6806e'
    }

    try {
        // Table
        const res = await loadFeedback(page)
        const data = res.data
        const meta = res.metadata
        currentPage = meta.page

        data.forEach(dt => {
            const color = getColorFeedbackRate(dt.feedback_rate)
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td><div style="background:${color};" class="button-tag">${dt.feedback_rate}</div></td>
                <td>${dt.feedback_body}</td>
                <td>${new Date(dt.created_at).toLocaleString()}</td>
                <td>
                    <h4 style="margin:0;">${dt.user.username} - ${dt.user.email}</h4>
                    <p>Joined at ${new Date(dt.user.created_at).toLocaleString()}</p>
                </td>
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
        tbody.innerHTML = `<tr><td colspan="3">${err}</td></tr>`
    }
}

render(currentPage)