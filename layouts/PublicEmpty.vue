<template>
  <div class="empty-layout">

    <Notifications/>

    <main>
      <overlay/>
      <Content/>
    </main>
  </div>
</template>

<script>
import Content from "~/layouts/components/EmptyContent";
import Overlay from "~/layouts/components/Overlay";

export default {
  components: {
    Content,
    Overlay,
  },
};
</script>

<style lang="scss">
.empty-layout .dark-overlay{
  width: 100%;
  margin: 0;
  height: 100%;
  top: 0;
  max-width: initial;
}
</style>