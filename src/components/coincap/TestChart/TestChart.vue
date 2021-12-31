<template>
  <svg ref="svg" width="600" height="250"></svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'TestChart',

  props: {
    currencyHistory: null,
  },

  data() {
    return {
      currencyPriceList: [],
      currencyTimeList: [],
    }
  },

  async mounted() {
    this.currencyHistory.map(item => this.currencyPriceList.push(item.priceUsd))
    this.currencyHistory.map(item => {
      const time = new Date(item.time)
      this.currencyTimeList.push(`${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`)
    })
    this.initChart(this.$refs.svg)
  },

  methods: {
    initChart(ref) {
      const svg = d3.select(ref);

      svg.append("g")
        .attr('transform', 'translate(50,210)')
        .call(d3.axisBottom().scale(this.getScaleX()).tickFormat(d3.timeFormat('%Y-%m')));

      svg.append("g")
        .attr('transform', 'translate(50,10)')
        .call(d3.axisLeft().scale(this.getScaleY()));

      svg.append('g')
        .attr('transform', 'translate(50, 10)')
        .append('path')
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', 2)

      const path = this.currencyPriceList.reduce((p, v, i) => {
        const x = 500 / this.currencyPriceList.length * i;
        const y = this.getScaleY()(v);
        if (i === 0) return `M ${x},${y}`;
        return p + ` L ${x},${y}`;
      }, null)

      svg.append('g')
        .attr('transform', 'translate(50, 10)')
        .append('path')
        .attr('d', path)
        .attr('stroke-linejoin', 'round')
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', 2)
    },

    getMaxValueY() {
      return d3.max(this.currencyPriceList)
    },

    getScaleX() {
      return d3.scaleTime()
        .domain(this.getDateRange())
        .range([0, 500]);
    },

    getScaleY() {
      return d3.scaleLinear()
        .domain([this.getMaxValueY(), 0])
        .range([0, 200]);
    },

    getDateRange() {
      const parseDate = d3.timeParse('%Y-%m-%d')
      return d3.extent(this.currencyTimeList, item => parseDate(item))
    },
  }
}
</script>