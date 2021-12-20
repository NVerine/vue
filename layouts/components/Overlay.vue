<template>
  <div id="overlay">
    <div v-if="$store.state.interfacectrl.isLoading > 0"
         id="spinner"
         class="loader">Loading...
    </div>
    <div v-if="$store.state.interfacectrl.isLoading > 0 || $store.state.interfacectrl.isErrored"
         class="col-md-10 offset-2 dark-overlay overlay-spinner">
    </div>
  </div>
</template>

<script>
export default {
  name: "Overlay"
}
</script>