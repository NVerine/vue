<template>
  <notify-card retorno="sim" tipo="danger p-2" titulo="Os seguintes errors foram encontrados"></notify-card>
</template>

<script>
  import notifyCard from "../layout/NotifyCard";

    export default {
        name: "Error",
        components: {notifyCard}
    }
</script>