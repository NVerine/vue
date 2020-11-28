<template>
  <div :class="['mt-3', 'col-md-'+tamanho]">
    <div class="control">
      <div class="form-group bmd-form-group is-filled">
        <label :for="'campo_'+getNome()" class="bmd-label-floating label-select">{{ descricao || nome }}</label>
        <input type="hidden" :id="'campo_'+getNome()" :name="getNome()" :value="model">

        <div class="btn-group bootstrap-select dropup">
          <button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" role="button" data-id="campo_tipo" title="Pessoa física">
            <div class="filter-option">
              <div class="filter-option-inner">
                <div class="filter-option-inner-inner">{{ currentText }}</div>
              </div>
            </div>
          </button>
          <div class="dropdown-menu hideable" role="combobox">
            <div class="bs-searchbox">
              <input type="text" class="form-control" autocomplete="off" v-model="search">
            </div>
            <div class="inner show select-list" role="listbox" aria-expanded="false" tabindex="-1">
              <ul class="dropdown-menu inner show">
                <li v-for="(opt, i) in getSearch"
                    :key="i" class="selected active" @click="onClick(opt)" :data-v="opt.value">
                  <a role="option" class="dropdown-item" :class="getActive(opt)" aria-disabled="false" tabindex="0" aria-selected="true">
                    <span class="text"> {{ opt.text || '--' }} </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slct",
  props: ['tamanho', 'nome', 'descricao', 'opt', 'modelo', 'prefixo', 'index'],
  data () {
    return {
      options: this.opt,
      nomeInterno: this.nome.toLowerCase(),
      currentText: '--',
      model: this.modelo,
      search: ''
    }
  },
  methods: {
    onClick: function (item){
      this.model = item.value;
      this.currentText = item.text;
      this.updateMother();
    },
    updateMother: function (){
      const text = this.currentText;
      const value = this.model;
      const nome = this.getNome();
      this.$emit('update', { nome, value, text});
      this.$emit('update:modelo', value);
    },
    getNome: function () {
      let str = '';
      if(this.prefixo){
        str = this.prefixo+'_';
      }
      str += this.nomeInterno;
      if(this.index || this.index === 0){
        str += '_'+this.index;
      }
      return str;
    },
    getActive: function (item){
      if(item.value == this.model){
        this.currentText = item.text;
        return 'selected active';
      }
      return '';
    },
  },
  computed: {
    getSearch: function () {
      const el = this;
      return this.options.filter(function (e) {
        return e.text.toString().toLowerCase().includes(el.search.toString().toLowerCase());
      });
    }
  },
  watch: {
    modelo: function (e) {
      this.model = e;
    },
    opt: function () {
      this.options = this.opt;
    },
  },
}
</script>

<style scoped="scoped">
 .dropdown-menu.hideable{
   overflow: hidden;
   min-height: 130px;
   min-width: 300px;
   max-height: 300px !important;
   position: absolute;
   will-change: top, left;
 }
 .select-list.inner{
   max-height: 243.667px;
   overflow-y: auto;
   min-height: 86px;
 }
</style>