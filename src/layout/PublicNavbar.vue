<template>
  <nav class="navbar p-1 m-0">
    <div class="container-fluid">
      <h2>Desenvolvido por NVerine</h2>
      <div class="navbar-wrapper">
        <router-link class="nav-link pl-0" data-toggle="tab" role="tablist" :to="{name: 'index'}">
          <img width="120" src="../assets/images/logo.png">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "PublicNavbar"
};
</script>
