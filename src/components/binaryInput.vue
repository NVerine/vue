<template>
  <div :class="getClass()">
    <div class="control">
      <div class="form-group bmd-form-group is-filled pb-0">
        <label class="bmd-label-floating">{{ descricao || nome }}</label>
        <div class="togglebutton">
          <label>
            <input
              :id="'campo_'+getNome()"
              :name="getNome()"
              :checked="model"
              type="checkbox"
              @change="onChange($event)"
            >
            <span class="toggle" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BinaryInput",
  props : ['nome', 'descricao', 'modelo', 'tamanho', 'prefixo', 'index', 'classe'],
  data() {
    return{
      nomeInterno: this.nome.toLowerCase(),
      model: this.modelo,
    }
  },
  methods: {
    onChange: function (event) {
      this.$emit('update:modelo', event.target.checked);
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

    getClass: function (){
      if(this.classe) return this.classe;
      const str =  this.tamanho ? 'col-md-' + this.tamanho : 'col-md-12';
      return str + ' mt-4';
    }
  },
  watch: {
    modelo: function (e) {
      this.model = e;
    }
  }
}
</script>