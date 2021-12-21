<template>
  <DefaultIndexSearch
      :title="$t('permissions') | capitalize"
      icon="fa fa-user"
      form-link="/permissions"
  >
  </DefaultIndexSearch>
</template>

<script>
import SearchMixin from "~/mixed/SearchMixin";

export default {
  scrollToTop: true,
  name: "Permissions-index",
  mixins: [SearchMixin],
  data: function () {
    return {
      urlApi: '/api/permissions/',
      title: 'permissions',
      module: 'general'
    }
  },
  mounted() {
    this.$store.dispatch("search/setUrlApi", this.urlApi).then(() => {
      this.getItens();
    });
  }
};
</script>