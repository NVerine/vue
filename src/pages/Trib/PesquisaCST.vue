<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title"><i class="mr-2 fa fa-calculator"></i>CST</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation float-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-search" txt="Pesquisa" ativo="true" rota="#sd1"></tab-link>
                <tab-link icon="fa fa-plus" txt="Inserir" :rota="{name: 'cst_edita', params : { id : 0}}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content tab-space">
        <div class="tab-pane active" id="sd1">
          <div class="card-body">
            <div class="row">
              <form @submit.prevent="enviaForm" id="form_pesquisa" class="col-md-12 p-0">
                <field nome="pesq_codigo" descricao="Código" tamanho="6" :modelo.sync="$route.query.pesq_codigo"></field>
                <slct tamanho="6" nome="pesq_tipo" descricao="Tipo" :modelo.sync="$route.query.pesq_tipo" :opt="[{value: 'E', text: 'Entrada'}, {value: 'S', text: 'Saida'}]"></slct>

                <div class="col-md-3 float-right">
                  <button type="submit" class="btn btn-block btn-success">Pesquisar</button>
                </div>
                <div class="col-md-3 float-right">
                  <button type="button" class="btn btn-block btn-warning" @click="limpaForm">Limpar</button>
                </div>
              </form>
            </div>
            <div class="mt-4 row">
              <div class="col-md-12 p-0">
                <slct tamanho="3" class="offset-9" nome="Limite" :modelo.sync="dados.pesq_limite" :opt="limiteItens"></slct>
              </div>
              <tabela nome="cst" target="cst_edita" :dados="table"></tabela>
              <div class="col-md-12">
                <nav class="float-right">
                  <ul class="pagination pagination-info">
                    <li v-for="(offset, i) in listOffsets" :key="i" class="page-item" :class="dados.pesq_offset == i ? 'active' : ''">
                      <a class="page-link" @click="updateOffset(i)">{{offset}}</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabela from "../../components/tabela";
import slct from "../../components/slct";
import field from "../../components/field";
import tabLink from "../../components/tabLink";
import PesquisaMixin from "../../mixed/vue-mix/PesquisaMixin";

export default {
  name: "PesquisaCST",
  mixins: [PesquisaMixin],
  components: { Tabela, slct, field, tabLink},
  data: function(){
    return{
      urlApi: "/api/cst/"
    };
  },
};
</script>