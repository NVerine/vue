<template>
  <div v-if="getItens.length > 0" :id="nome" class="card-body" style="overflow: hidden;">
    <div class="table-responsive" style="width: 100%;">
      <table :id="'tabela_'+nome" class="table table-striped mb-1">
        <thead v-if="!dados.headers">
          <th>&nbsp;</th>
          <th v-for="(i, header) in getItens[0]" :key="header">
            {{ header | capitalizar }}
          </th>
        </thead>
        <thead v-else>
          <th>&nbsp;</th>
          <th v-for="(header, index) in dados.headers" :key="index">
            {{ getCabecalho(header) | capitalizar }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(tr, i) in getItens" :key="i">
            <td>
              <div class="btn btn-warning btn-round btn-sm m-0 btn-fab" @click="editaItem(tr)">
                <i class="fa fa-pencil" />
              </div>
            </td>
            <td v-for="(td, ii) in getTr(tr)" :key="ii" v-html="td"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="col-md-12">
    <h3 class="text-center border py-2">Sem dados na tabela</h3>
  </div>
</template>

<script>
export default {
  name: "Tabela",
  props: ["nome", "dados", "target"],
  computed: {
    getItens: function () {
      return this.dados.items || [];
    }
  },
  methods: {
    editaItem(tr){
      this.$router.push({ name: this.target, params : { id : tr.id} });
    },
    getCabecalho(el){
      if(typeof el === "object"){
        return el[Object.keys(el)[0]];
      }
      return el;
    },
    getTr(row){
      let td = [];
      if(!this.dados.headers){
        for (let r in row) {
          td.push(this.getTd(row, r));
        }
      }
      else {
        for (let r in this.dados.headers) {
          let header = this.dados.headers[r];
          if (typeof header === "object") {
            header = Object.keys(header)[0];
          }
          td.push(this.getTd(row, header));
        }
      }
      return td;
    },
    getTd: function(row, header){
      let dado = row[header];
      if(dado === true){
        dado = "<i class='fa fa-check' style='color: green;'></i>";
      }
      else if(dado === false){
        dado = "<i class='fa fa-times' style='color: red;'></i>";
      }
      return dado;
    },
  },
  filters: {
    capitalizar: function (valor) {
      if(!valor) return "erro";
      let result = valor.replace( "_", " " );
      result = result.replace( /([A-Z])/g, " $1" );
      result = result.toLowerCase();
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
  }
};
</script>

<style scoped>
  .btn-sm.btn-fab{
    height: 25px !important;
    min-width: 25px !important;
    width: 25px !important;
  }
  .fa.fa-pencil{
    line-height: 23px !important;
  }
  :not(.table-condensed)>tbody>tr>td {
    white-space: nowrap;
  }
</style>