import { initSelect } from './clothes_used_stats_select_component.js'
import { loadStats } from '../../app/services/stats_service.js'

async function renderChart(context) {
    const chartContainer = document.getElementById('most-context-stats-holder')
    chartContainer.innerHTML = ''

    try {
        const res = await loadStats('clothes_used', context, 'd4dbb0d3-8a96-489b-b86c-8bb77c4aea21')
        const data = res.data

        const labels = data.map(item => item.context)
        const series = data.map(item => item.total)

        const options = {
            chart: {
                type: 'pie'
            },
            labels,
            series,
            colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
            title: {
                text: `Most Context Clothes Used - ${context.replace(/_/g, ' ')}`
            }
        }

        const chart = new ApexCharts(chartContainer, options)
        chart.render()
    } catch (err) {
        chartContainer.innerHTML = `<p style="color:red;">${err.message || 'Failed to load data'}</p>`
    }
}

initSelect(renderChart)
