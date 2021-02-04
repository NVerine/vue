<template>
  <div v-if="!isTable" :class="'p-0 col-md-'+tamanho">
    <div class="mt-3 col-md-8">
      <div class="control">
        <div class="form-group bmd-form-group">
          <label :for="'campo_'+getNome()" class="bmd-label-floating">{{ descricao || nome }}</label>
          <input :id="'campo_'+getNome()" :required="requerido" autocomplete="off"
                 type="text" class="form-control" :value="modelo" @blur="closeAutocomplete"
                 @keyup="callAutocomplete($event.target.value)" :name="getNome()">
          <div v-if="results.length > 0" class="dropdown-menu show autocomplete p-2">
            <button v-for="(r, i) in results" :key="i" type="button"
                    @click="aplicaAutocomplete(i)" class="dropdown-item m-0 px-2" >{{r.text}}</button>
          </div>
        </div>
      </div>
    </div>
    <field descricao="Cód" nome="cod" :tamanho="4" :modelo="modelo2" :prefixo="prefixo" :index="index" :leitura="true"></field>
  </div>
  <div class="bmd-form-group" v-else>
    <input :id="'campo_'+getNome()" :required="requerido" autocomplete="off"
           type="text" class="form-control" :value="modelo" @blur="closeAutocomplete"
           @keyup="callAutocomplete($event.target.value)" :name="getNome()">
    <div v-if="results.length > 0" class="dropdown-menu show autocomplete p-2">
      <button v-for="(r, i) in results" :key="i" type="button"
              @click="aplicaAutocomplete(i)" class="dropdown-item m-0 px-2" >{{r.text}}</button>
    </div>
  </div>
</template>
<script>
import field from "./field";
import axios from "axios";

export default{
  name: "autocomplete",
  components: { field },
  props: {tamanho: {}, nome: {}, descricao: {}, modelo: {}, modelo2: {}, tipo: {},
    requerido: {}, prefixo: {}, index: {}, comprimento: {}, url: {}, param: {}, isTable: {type: Boolean, default: false}},
  data(){
    return {
      nomeInterno: this.nome.toLowerCase(),
      results: [],
      timer: null
    };
  },
  methods: {
    autoComplete: function(val){
      // checa se o autcomplete esta com focus
      if($("#campo_"+this.getNome()).is(":focus")){
        axios
          .get(this.url ,{params: { [this.param]: val }})
          .then(response => {
            this.results = response.data;
          });
      }
    },
    aplicaAutocomplete: function(index){
      this.onChange(this.results[index].label, this.results[index].value);
      this.results = [];
    },
    callAutocomplete: function(val){
      this.onChange(val);

      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.autoComplete(val), 1000);
    },
    onChange: function(val, val2 = null) {
      this.$emit("update:modelo", val);
      if(val2) this.$emit("update:modelo2", val2);
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
    lockSize: function (e) {
      if(!this.comprimento)
        return;
      if(e.target.value.length >= this.comprimento && !(e.key === "Backspace" || e.key === "Tab")){
        e.preventDefault();
      }
    },
    closeAutocomplete: function () {
      let el = this;
      setTimeout(function(){
        el.results = [];
      }, 200);
    }
  },
  watch: {
    modelo: function () {
      if(this.modelo) {
        $("#campo_"+this.getNome()).closest(".form-group.bmd-form-group").addClass("is-filled");
      }
    },
  }
};
</script>

<style scoped>
  .autocomplete{
    width: 100%;
  }

  .autocomplete .dropdown-item{
    width: 100%;
  }
</style>