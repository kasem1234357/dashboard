import React from 'react'
import { Line } from 'react-chartjs-2'
import { data, options } from './LineConfig'

function LineCharts() {
  return (
    <Line data={data} options={options}/>
  )
}

export default LineCharts