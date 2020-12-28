<template>
  <div v-if="tipo !== 'hidden'" :class="['mt-3', 'col-md-'+tamanho]">
    <div class="control">
      <div class="form-group bmd-form-group" :class="getClasse">
        <label :for="'campo_'+getNome()" class="bmd-label-floating">{{ descricao || nome }}</label>
        <input :id="'campo_'+getNome()" :required="requerido" :readonly="leitura"
          :type="tipo || 'text'" class="form-control" v-model="value"
          :name="getNome()" :class="inputClasse" @keydown="lockSize"
        >
      </div>
    </div>
  </div>
  <div v-else>
    <input :id="'campo_'+nome" v-model="modelo" :type="tipo" :name="nome">
  </div>
</template>

<script>
export default {
  name: "Field",
  props : ['tamanho', 'nome', 'descricao', 'modelo', 'tipo', 'requerido',
    'funcao', 'prefixo', 'index', 'comprimento', 'leitura', 'inputClasse'],
  data() {
    return{
      nomeInterno: this.nome.toLowerCase()
    }
  },
  computed: {
    getClasse: function(){
      if(this.modelo){
        return 'is-filled';
      }
      return '';
    },
    value: {
      get(){
        return this.modelo;
      },
      set(val){
        this.$emit('update:modelo', val);
      }
    }
  },
  mounted: function() {
    if (this.funcao) {
      if (this.funcao.includes('datepicker')) {
        this.datepicker(this.funcao);
      }
    }
    $("#campo_"+this.getNome()+".form-control").on("focus", function() {
      $(this).parent('.form-group').addClass("is-focused");
    }).on("blur", function() {
      $(this).parent('.form-group').removeClass("is-focused");
    });

  },
  methods: {
    datepicker: function(tipo) {
      let ele = this;
      let nome = '#campo_'+ this.getNome();
      let dateicons = {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      };

      if(tipo === 'datepicker-datetime'){
        $(nome).datetimepicker({
          format: 'DD-MM-YYYY LT',
          icons: dateicons,
          locale: 'pt-br'
        }).blur(function () {
            $(this).closest(".form-group").addClass("is-filled");
        });
      }
      if(tipo === 'datepicker-time') {
        $(nome).datetimepicker({
          format: 'LT',
          icons: dateicons,
          locale: 'pt-br'
        }).blur(function () {
          $(this).closest(".form-group").addClass("is-filled");
        });
      }
      if(tipo === 'datepicker-date') {
        $(nome).datetimepicker({
          format: 'DD-MM-YYYY',
          icons: dateicons,
          locale: 'pt-br'
        }).blur(function () {
            $(this).closest(".form-group").addClass("is-filled");
        });
      }
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
    lockSize: function (e) {
      if(!this.comprimento)
        return;
      if(e.target.value.length >= this.comprimento && !(e.key === "Backspace" || e.key === "Tab")){
        e.preventDefault();
      }
    },
  }
}
</script>