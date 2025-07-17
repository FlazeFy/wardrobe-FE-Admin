import { STATS_WASH_FIELD } from '../../const/config.js'

export function initSelect(onSelectChange) {
    const select = document.getElementById('stats-wash-context-select')
    select.innerHTML = ''

    STATS_WASH_FIELD.forEach(field => {
        const option = document.createElement('option')
        option.value = field
        option.textContent = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        select.appendChild(option)
    })

    onSelectChange(select.value)

    select.addEventListener('change', (e) => {
        onSelectChange(e.target.value)
    })
}
