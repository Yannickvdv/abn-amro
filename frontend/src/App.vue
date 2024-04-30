<template>
  <h1 v-if="loading">Loading nodes</h1>
  <div v-else>
    <NodeInfoBar :node="selectedNode" v-if="selectedNode" />
    <TreeChart
      :treeData="treeNode"
      :selectedNode="selectedNode"
      @node-selected="updateSelectedNode"
      @node-deselected="clearSelectedNode"
    />
  </div>
</template>

<script>
import TreeChart from './components/TreeChart.vue'
import NodeInfoBar from './components/NodeInfoBar.vue'
import axios from 'axios'

export default {
  components: {
    TreeChart,
    NodeInfoBar
  },
  data() {
    return {
      treeNode: {},
      loading: true,
      selectedNode: null
    }
  },
  mounted() {
    this.getNodesFromAPI()
  },
  methods: {
    // Retrieve the nodes from the API
    getNodesFromAPI() {
      return axios
        .get('http://localhost:3000/nodes')
        .then((response) => {
          // Parse node to object
          // Field access looks weird due to hierarchical Neo4j representation
          const jsonNode = response.data.records[0]._fields[0]
          this.treeNode = jsonNode
          this.loading = false
        })
        .catch((error) => {
          //TODO: handle error
          // Would normally present this in UI, but it is not part of the requirements
          console.error(error)
        })
    },
    updateSelectedNode(node) {
      this.selectedNode = node
    },
    clearSelectedNode() {
      this.selectedNode = null
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>
