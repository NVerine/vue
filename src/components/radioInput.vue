<template>
  <div class="form-check form-check-radio">
    <label class="form-check-label">
      <input :name="nomeInterno" :id="'campo_'+nomeInterno+valor" :value="valor"
             data-toggle="checkbox" @click="onChange($event)"
             type="radio" class="form-check-input">
      {{ descricao || nome }}
      <span class="circle"><span class="check"></span></span>
    </label>
  </div>
</template>

<script>
    // n�o finalizado ainda
    export default {
        name: "radioInput",
        props : ['nome', 'descricao', 'modelo', 'valor'],
        data() {
            return{
                nomeInterno: this.nome.toLowerCase()
            }
        },
        methods: {
            onChange: function (event) {
                if(this.valor){
                    this.$emit('update:modelo', this.valor);
                }
                else{
                    this.$emit('update:modelo', event.target.checked);
                }
            },
        },
    }
</script>