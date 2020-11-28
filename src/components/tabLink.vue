<template>
  <li class="nav-item text-center">
    <a v-if="rota.toString().includes('#')" :href="rota" class="nav-link" :class=" ativo ? 'active' : ''" data-toggle="tab" role="tablist">
      <i :class="icon"></i>
      <span>{{txt}}</span>
    </a>

    <router-link v-else class="nav-link" :class=" ativo ? 'active' : ''" data-toggle="tab" role="tablist" :to="rota">
      <i :class="icon"></i>
      <span>{{txt}}</span>
    </router-link>
  </li>
</template>

<script>
    export default {
        name: "tabLink",
        props: ['txt', 'icon', 'rota', 'ativo'],
    }
</script>

<style scoped>

</style>