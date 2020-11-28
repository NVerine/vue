<template>
  <div v-if="getItens.length > 0" :id="nome" class="card-body" style="overflow: hidden;">
    <div class="table-responsive" style="width: 100%;">
      <table :id="'tabela_'+nome" class="table table-striped mb-1">
        <thead>
          <th>&nbsp;</th>
          <th v-for="(headers, index) in itens[0]" :key="index">
            {{ index | capitalizar }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(tr, i) in itens" :key="i">
            <td>
              <div class="btn btn-warning btn-round btn-sm m-0 btn-fab" @click="editaItem(tr)">
                <i class="fa fa-pencil" />
              </div>
            </td>
            <td v-for="(td, ii) in tr" :key="ii">
              {{ td }}
            </td>
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
    props: ['nome', 'itens', 'target'],
    computed: {
        getItens: function () {
            return this.itens || []
        }
    },
    methods: {
        editaItem(tr){
          this.$router.push({ name: this.target, params : { id : tr.id} });
        }
    },
    filters: {
        capitalizar: function (valor) {
            if(!valor) return 'erro';
            let result = valor.replace( /([A-Z])/g, " $1" );
            result = result.toLowerCase();
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
    }
}
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
</style>