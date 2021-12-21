<template>
  <div class="tab-pane"
       :class=" $store.state.interfacectrl.activeTab == index ? 'active' : ''">
    <div class="card-body">
      <div class="row">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabPanel",
  props: {
    index: {
      type: String,
      description: 'Save the index of tab to update'
    },
  },
}
</script>