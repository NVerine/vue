<template>
  <div style="width:100%;">

    <Notifications/>

    <header>
      <main-navbar/>
    </header>

    <main>
      <div class="container-fluid">
        <div class="row" v-if="$store.state.interfacectrl.isErrored > 0 && $store.state.interfacectrl.isGoingBackAfterError">
          <div id="page-scroll" class="page-scroll col-md-10 col-sm-9 page-height"></div>
        </div>
        <div class="row" v-else>
          <main-menu/>

          <overlay/>

          <Content :key="$store.state.interfacectrl.appState" />
        </div>
      </div>

    </main>

    <messages-log/>

    <main-footer/>

  </div>
</template>

<script>
import Content from "~/layouts/components/MainContent";
import MainFooter from "~/layouts/components/MainFooter";
import MainNavbar from "~/layouts/components/MainNavbar";
import MainMenu from "~/layouts/components/MainMenu";
import Overlay from "~/layouts/components/Overlay";
import MessagesLog from "~/layouts/components/MessagesLog";

export default {
  components: {
    MainNavbar,
    MainFooter,
    Content,
    MainMenu,
    Overlay,
    MessagesLog
  },
  middleware: 'authenticated',
  beforeMount() {
    this.$store.dispatch("interfacectrl/updateActiveTab", "1");
  }
};
</script>
