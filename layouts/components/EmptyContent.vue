<template>
  <div class="wrapper">
    <div class="main-panel">
      <div class="content p-0">
        <div id="main-content" :key="$store.state.interfacectrl.appState">
          <FadeTransition :duration="200" mode="out-in">
            <!-- your content here -->
            <nuxt></nuxt>
          </FadeTransition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import Breadcrumb from "~/layouts/components/Breadcrumb";

export default {
  components: {
    FadeTransition,
    Breadcrumb
  }
};
</script>
