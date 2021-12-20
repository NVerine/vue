const SearchMixin = {
  head() {
    return{
      title: this.$options.filters.capitalize(this.$t(this.title))
    }
  },
  data: () => {
    return {
      data: {}
    }
  },
  methods: {
    getItens: function(){
      let el = this;
      let url = el.$store.state.search.urlApi;
      el.data.search_limit = el.$store.state.search.search_limit;
      el.data.search_offset = el.$store.state.search.search_offset;
      let data = el.data; //Object.assign(this.dados, this.$router.currentRoute.query);

      return el.$backend
        .get(url, { params: data })
        .then(response => {
          el.$store.dispatch('search/setTable', response.data.data.items);
          if(response.data.notify.length > 0) {
            for(let r in response.data.notify){
              el.$store.dispatch('interfacectrl/addMessage', response.data.notify[r]);
            }
          }
        });
    },
    updateOffset: function(val){
      this.$store.dispatch('search/setSearch_offset', val).then(() => {
        this.sendForm()
      })
    },
    updateLimit: function(val){
      this.$store.dispatch('search/setSearch_limit', val).then(() => {
        this.sendForm()
      })
    },
    clearForm: function (obj) {
      console.log(obj)
      obj = {};
    },
    sendForm: function () {
      // this.appEndURL(this.$route.query);
      this.getItens();
    },
  },
  computed: {
    listOffsets: function () {
      let start = parseInt(this.$store.state.search.search_offset)-2;
      let arr = [];
      if (start < 0) start = 0;
      for (let i = start; i <= parseInt(this.$store.state.search.search_offset)+3; i++){
        arr[i] = i+1;
      }
      return arr;
    }
  },
  mounted() {
    this.$store.dispatch(
      'interfacectrl/updateBreadcrumb',
      {module: this.module, title: this.title})
  }
};

export default SearchMixin;