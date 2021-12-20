<template>
  <footer class="navbar footer p-0 sticky-bottom footer-light footer-shadow content container-fluid m-0">

    <div class="col-3">
      <language-changer></language-changer>
    </div>
    <div class="float-left col-3">
      <small>NVerine - {{ year }}</small>
    </div>

    <div class="float-left col-6">
      <!-- Ferramentas de log do sistema -->
      <div class="float-right developer-tools">
        <div class="btn btn-white" @click="onChange()">
          <i class="fa fa-exclamation-triangle"></i>
        </div>
      </div>
    </div>

  </footer>
</template>
<script>
import LanguageChanger from "~/layouts/components/LanguageChanger";
export default {
  props: ["show"],
  components: { LanguageChanger },
  name: "MainFooter",
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  methods: {
    onChange: function () {
      // this.$emit("update:show", !this.show);
    },
  }
};
</script>
<style lang="scss">
footer.footer{
  .form-group.bmd-form-group{
    margin-top: 0;
    padding: 0;
  }
}
</style>
