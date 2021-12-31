<script>
import { select } from 'd3-selection'
import { timeParse, timeFormat } from 'd3-time-format'
import { debounce } from 'lodash'

const allowedPeriods = /^(hourly|daily|weekly|monthly|yearly)$/

export default {
  name: 'Chart',
  props: {
    data: { type: Array, default: () => [] },
    period: { type: String, default: "daily", validator: value => allowedPeriods.test(value) },

    height: { type: Number, default: 150 }
  },

  data: () => ({
    margins: {
      top: 10,
      right: 25,
      bottom: 20,
      left: 25
    },

    chartClasses: null,
    chartOffsets: { w: 600, h: 150 },

    transitionDuration: 350
  }),

  computed: {
    chartAttrs() {
      const width = this.chartSizes.width + this.margins.left + this.margins.right
      const height = this.chartSizes.height + this.margins.top + this.margins.bottom

      return {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`
      }
    },

    chartStyles() {
      return {
        default: { height: this.height + "px" },
        wrapper: { transform: `translate(${this.margins.left}, ${this.margins.top})` }
      }
    },

    chartSizes() {
      return {
        width: this.chartOffsets.w - this.margins.left - this.margins.right,
        height: this.chartOffsets.h - this.margins.top - this.margins.bottom
      }
    },

    chartPeriod() {
      return allowedPeriods.test(this.period) ? this.period : "daily"
    },

    chartFormats() {
      return { parser: "%Y-%m-%d", formatter: "%a, %d" }
    },

    chartLegend() {
      return null
    },

    parseTime() {
      return timeParse(this.chartFormats.parser)
    },

    formatTime() {
      return timeFormat(this.chartFormats.formatter)
    }
  },

  watch: {
    data(value) {
      if (value) this.updateChart()
    }
  },

  mounted() {
    this.svg = select(this.$refs.svg)
    this.g = select(this.$refs.wrapper)
    this.defs = select(this.$refs.defs)

    this.updateChartSizes()
    this.initChart()
    window.addEventListener("resize", this.onResize)
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  },

  methods: {
    onResize: debounce(function () {
      this.updateChartSizes()
      // this.updateChart()
    }, 120),

    updateChart() {
      this.bindData()
      this.setScale()
      this.addElements()
      this.updateElements()
      this.removeElements()
    },

    updateChartSizes() {
      this.chartOffsets.w = parseInt(this.$refs.chart?.offsetWidth)
      this.chartOffsets.h = parseInt(this.$refs.chart?.offsetHeight)
    },

    updateDomain() {
      // if (this.groupAxis) this.groupAxis.remove()
      this.groupAxis = this.g.append("g").attr("class", "chart__axis")

      // if (this.grid) this.grid.remove()
      this.grid = this.groupAxis.append("g").attr("class", "chart__grid")

      this.xAxis = this.groupAxis.append("g").attr("class", "chart__axis--x")
      this.yAxis = this.groupAxis.append("g").attr("class", "chart__axis--y")
    },

    initChart() {

    }
  }
}
</script>

<template lang="pug">
  .chart(:class="chartClasses")
    .chart__title(v-if="$scopedSlots['title']")
      slot(name="title")
    .chart__wrapper(:style="chartStyles.default" ref="chart")
      svg.chart__svg(v-bind="chartAttrs" ref="svg")
        g.chart__margins(v-bind="chartStyles.wrapper" ref="wrapper")
        defs(ref="defs")
    component(v-if="chartLegend" :is="chartLegend")
</template>
