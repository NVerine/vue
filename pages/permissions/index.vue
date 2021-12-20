<template>
  <DefaultIndexSearch
      :title="$t('person') | capitalize"
      icon="fa fa-user"
      form-link="/person"
  >
    <template slot="formFields">
      <div class="col-6">
        <base-input label="CPF/CNPJ" v-model="data.doc"></base-input>
      </div>
      <div class="col-6">
        <base-input :label="$t('name') | capitalize" v-model="data.name"></base-input>
      </div>

    </template>
  </DefaultIndexSearch>
</template>

<script>
import SearchMixin from "~/mixed/SearchMixin";

export default {
  scrollToTop: true,
  name: "Person-index",
  mixins: [SearchMixin],
  data: function () {
    return {
      urlApi: '/api/person/',
      title: 'person',
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