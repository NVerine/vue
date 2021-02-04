<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">CST #{{ dados.id }}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-pencil" :txt="dados.id ? 'Editar' : 'Cadastrar'" ativo="true" rota="#sd1"></tab-link>
                <tab-link icon="fa fa-undo" txt="Retornar" :rota="{name: 'cst_pesquisa'}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form class="col-md-12 px-md-3 p-0 pb-3" autocomplete="off">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <field tipo="number" descricao="Código" nome="codigo" :modelo.sync="dados.codigo" tamanho="3"></field>
                <field nome="Nome" :modelo.sync="dados.nome" tamanho="6"></field>
                <slct tamanho="3" nome="Tipo" :modelo.sync="dados.tipo" :opt="tipoCST"></slct>
                <field nome="Descrição" :modelo.sync="dados.descricao" tamanho="12"></field>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="enviar('/api/cst/')">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import field from "../../components/field";
import tabLink from "../../components/tabLink";
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import slct from "@/components/slct";

export default {
  name: "EditaCST",
  components: { field, tabLink, slct },
  mixins: [EditaMixins],
  data: function(){
    return{
      tipoCST: [{value: "O", text: "Origem"}, {value: "T", text: "Código da Situação Tributária (CST)"}],
      tipoRetorno: 2
      //tipoRetorno: 4
    };
  },
  mounted () {
    // carrega informações iniciais da página
    this.getDados("/api/cst/" + this.$route.params.id);
  }
};
</script>