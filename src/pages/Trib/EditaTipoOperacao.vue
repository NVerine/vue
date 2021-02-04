<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Tipo Operação #{{ dados.id }}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-pencil" :txt="dados.id ? 'Editar' : 'Cadastrar'" ativo="true" rota="#sd1"></tab-link>
                <tab-link icon="fa fa-undo" txt="Retornar" :rota="{name: 'tipoOperacao_pesquisa'}"></tab-link>
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
                <slct tamanho="3" nome="Tipo" :modelo.sync="dados.tipo" :opt="tipo"></slct>
                <field tipo="number" nome="Código" :modelo.sync="dados.codigo" tamanho="3"></field>
                <field nome="Nome" :modelo.sync="dados.nome" tamanho="6"></field>
                <field nome="descricao" descricao="Descrição/histórico legislação" :modelo.sync="dados.descricao" tamanho="12"></field>
                <slct tamanho="12" nome="CFOP" :modelo.sync="dados.cfop.id" :opt="lista_cfop"></slct>
                <slct tamanho="6" nome="Origem" :modelo.sync="dados.cstOrigem.id" :opt="lista_origem"></slct>
                <slct tamanho="6" nome="CST" :modelo.sync="dados.cstTrib.id" :opt="lista_cst"></slct>
                <field nome="base_icms" descricao="% Base cálculo ICMS" :modelo.sync="dados.icmsbase" tamanho="3"></field>
                <field nome="aliquota_pis" descricao="Alíquota PIS" :modelo.sync="dados.pisaliquota" tamanho="3"></field>
                <field nome="aliquota_cofins" descricao="Alíquota COFINS" :modelo.sync="dados.cofinsaliquota" tamanho="3"></field>
                <field nome="aliquota_issqn" descricao="Alíquota ISSQN" :modelo.sync="dados.issqnaliquota" tamanho="3"></field>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="enviar('/api/tipooperacao/')">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import field from "../../components/field";
import tabLink from "../../components/tabLink";
import slct from "@/components/slct";
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import axios from "axios";

export default {
  name: "EditaTipoOperacao",
  components: { field, tabLink, slct},
  mixins: [EditaMixins],
  data: function(){
    return{
      tipo: [{value: "S", text: "Saída"}, {value: "E", text: "Entrada"}],
      lista_cfop: [],
      lista_origem: [],
      lista_cst: [],
      dados: {
        cfop: { id: null },
        cstOrigem: { id: null },
        cstTrib: { id: null }
      }
    };
  },
  mounted () {
    // carrega informações iniciais da página
    this.getDados("/api/tipooperacao/" + this.$route.params.id);

    axios
      .get("/api/cfop/list")
      .then(response => {
        for (const i in response.data.dados){
          this.lista_cfop.push({value: response.data.dados[i].id, text: response.data.dados[i].codigo + ") " + response.data.dados[i].descricao});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  
    axios
      .get("/api/cst/list?pesq_tipo=O")
      .then(response => {
        for (const i in response.data.dados){
          this.lista_origem.push({value: response.data.dados[i].value, text: response.data.dados[i].text});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  
    axios
      .get("/api/cst/list?pesq_tipo=T")
      .then(response => {
        for (const i in response.data.dados){
          this.lista_cst.push({value: response.data.dados[i].value, text: response.data.dados[i].text});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  }
};
</script>