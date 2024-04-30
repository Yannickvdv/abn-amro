<template>
  <div class="container">
    <vue-tree
      style="width: 100vw; height: 100vh; overflow: hidden"
      :dataset="treeData"
      :config="treeConfig"
      :collapse-enabled="false"
      :direction="'vertical'"
      linkStyle="straight"
    >
      <template v-slot:node="{ node }">
        <div
          class="rich-node"
          :class="{ selected: selectedNode === node }"
          style="border: 1px solid grey"
          @click="toggleSelection(node)"
        >
          <span style="padding: 4px 0; font-weight: bold">
            {{ node.name }}
          </span>
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
import VueTree from '@ssthouse/vue3-tree-chart'
import '@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css'

export default {
  name: 'tree-chart',
  props: ['treeData', 'selectedNode'],
  data() {
    return {
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    }
  },
  methods: {
    toggleSelection(node) {
      if (this.selectedNode === node) {
        this.$emit('node-deselected')
      } else {
        this.$emit('node-selected', node)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  align-items: center;
  color: #2c3e50;
  margin: 0px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: black;
  background-color: white;
  border-radius: 4px;
}

.selected {
  border: 2px solid coral !important;
}

.tree-container .link {
  stroke: #17928c !important;
}
</style>
