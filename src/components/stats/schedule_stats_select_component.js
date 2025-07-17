import { STATS_SCHEDULE_FIELD } from '../../const/config.js'

export function initSelect(onSelectChange) {
    const select = document.getElementById('stats-schedule-context-select')
    select.innerHTML = ''

    STATS_SCHEDULE_FIELD.forEach(field => {
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
