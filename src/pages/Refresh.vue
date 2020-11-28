<template>
  <h1>Tenta n�o utilizar este componente</h1>
</template>

<script>
    import router from "../router";

    export default {
        name: "Refresh",
        beforeCreate() {
            router.go(-1);
        }
    }
</script>

<style scoped>

</style>