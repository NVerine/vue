const EditMixins = {
  head() {
    return{
      title: this.$options.filters.capitalize(`${this.$t(this.title)} #${this.id}`)
    }
  },
  data: function () {
    return {
      id: this.$route.params.id
    };
  },
  mounted() {
    this.$store.dispatch(
      'interfacectrl/updateBreadcrumb',
      {module: this.module, title: this.title})
  }
};

export default EditMixins;