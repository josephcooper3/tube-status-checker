<template>
  <div id="app">
    <h1>Tube Line Status Checker</h1>
    <label for="filter">Filter Lines: </label>
    <select id="filter" v-model="filterSelected">
      <option value="all-lines">Show All Lines</option>
      <option value="good-lines">Show Only Lines with Good Service</option>
      <option value="bad-lines">Show Only Disrupted Lines</option>
    </select>
    <br>
    <button v-on:click="fetchStatusDetails()">Refresh Status</button>
    <status-list :lines="filteredLines"></status-list>
    <footer>Powered by TfL Open Data. Contains OS data © Crown copyright and database rights 2016 and Geomni UK Map data © and database rights 2019</footer>
  </div>
</template>

<script>

import StatusList from './components/StatusList'

export default {
  name: 'app',
  data() {
    return {
      statusDetails: [],
      filterSelected: 'all-lines'
    }
  },
  mounted() {
    this.fetchStatusDetails();
  },
  computed: {
    filteredLines: function () {
      if (this.filterSelected === 'good-lines') {
        return this.statusDetails.filter((line) => line.lineStatuses[0].statusSeverityDescription === 'Good Service')
      } else if (this.filterSelected === 'bad-lines') {
        return this.statusDetails.filter((line) => line.lineStatuses[0].statusSeverityDescription !== 'Good Service')
      } else {
        return this.statusDetails
      }
    }
  },
  components: {
    'status-list': StatusList,
  },
  methods: {
    fetchStatusDetails() {
      fetch('tflLineStatus')
      .then(result => result.json())
      .then(statusDetails => this.statusDetails = statusDetails)
      .catch(console.error);      
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

footer {
  font-size: 12px;
}

button {
  margin-top: 10px
}
</style>
