<template>
  <div v-if="!isTable" :class="['mt-3', 'col-md-'+tamanho]">
    <div class="control">
      <div class="form-group bmd-form-group is-filled">
        <label :for="'campo_'+getNome()" class="bmd-label-floating label-select">{{ descricao || nome }}</label>
        <input type="hidden" :id="'campo_'+getNome()" :name="getNome()" :value="value">

        <div class="btn-group bootstrap-select dropup">
          <button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" role="button" data-id="campo_tipo" :title="text">
            <div class="filter-option">
              <div class="filter-option-inner">
                <div class="filter-option-inner-inner">{{ text }}</div>
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
                  <a role="option" class="dropdown-item" :class="getActive(opt)" :title="opt.text || '--'"
                     aria-disabled="false" tabindex="0" aria-selected="true">
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
  
  
  <div v-else class="control is-table">
    <input type="hidden" :id="'campo_'+getNome()" :name="getNome()" :value="value">
    
    <div class="btn-group bootstrap-select dropup">
      <button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" role="button" data-id="campo_tipo" :title="text">
        <div class="filter-option">
          <div class="filter-option-inner">
            <div class="filter-option-inner-inner">{{ text }}</div>
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
              <a role="option" class="dropdown-item" :class="getActive(opt)" :title="opt.text || '--'"
                 aria-disabled="false" tabindex="0" aria-selected="true">
                <span class="text"> {{ opt.text || '--' }} </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slct",
  props: {tamanho: {}, nome: {}, descricao: {}, opt: {}, modelo: {}, prefixo: {},
    index: {}, texto: {}, isTable: {type: Boolean, default: false}
  },
  data () {
    return {
      options: this.opt,
      nomeInterno: this.nome.toLowerCase(),
      search: ""
    };
  },
  methods: {
    onClick: function (item){
      this.value = item.value;
      this.text = item.text;
    },
    getNome: function () {
      let str = "";
      if(this.prefixo){
        str = this.prefixo+"_";
      }
      str += this.nomeInterno;
      if(this.index || this.index === 0){
        str += "_"+this.index;
      }
      return str;
    },
    getActive: function (item){
      if(item.value == this.modelo){
        return "selected active";
      }
      return "";
    },
  },
  computed: {
    getSearch: function () {
      if(!this.options) return;
      const el = this;
      return this.options.filter(function (e) {
        return e.text.toString().toLowerCase().includes(el.search.toString().toLowerCase());
      });
    },
    value: {
      get(){
        return this.modelo;
      },
      set(val){
        this.$emit("update:modelo", val);
      }
    },
    text: {
      get(){
        if(this.texto) return this.texto;

        for(var r in this.options){
          if (this.options[r].value == this.modelo) {
            return this.options[r].text.toString();
          }
        }
        return "--";
      },
      set(val){
        this.$emit("update:texto", val);
      }
    }
  },
  watch: {
    opt: function () {
      this.options = this.opt;
    }
  },
};
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
 .btn.dropdown-toggle.btn-default{
   line-height: 13px;
 }
 .btn-group.bootstrap-select .dropdown-toggle{
   padding-bottom: 7px;
 }
 .control.is-table .btn-group.bootstrap-select{
   margin: 0 !important;
 }
 .control.is-table .btn.dropdown-toggle{
   padding-top: 8px !important;
   padding-bottom: 6px;
 }
 .control.is-table .bs-searchbox input{
   border: 0;
   border-bottom: 1px solid #e8e8e8;
 }
</style>