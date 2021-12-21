<template>

  <div id="page-scroll" class="page-scroll col-md-10 col-sm-9 page-height">

    <breadcrumb></breadcrumb>

    <div class="wrapper">
      <div class="main-panel">
        <div class="content pb-0 pt-2 p-md-3 p-1">
          <div id="main-content" :key="$store.state.interfacectrl.appState">
            <FadeTransition :duration="200" mode="out-in">
              <!-- your content here -->
              <nuxt></nuxt>
            </FadeTransition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import Breadcrumb from "~/layouts/components/Breadcrumb";

export default {
  name: "MainContent",
  components: {
    FadeTransition,
    Breadcrumb
  }
};
</script>
<style></style>
