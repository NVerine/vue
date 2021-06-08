<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title"><i class="mr-2 fa fa-pencil"></i>Filiais</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation float-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-search" txt="Pesquisa" ativo="true" rota="#sd1"></tab-link>
                <tab-link icon="fa fa-plus" txt="Inserir" :rota="{name: 'filial_edita', params : { id : 0}}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content tab-space">
        <div class="tab-pane active" id="sd1">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 p-0">
                <slct tamanho="3" class="offset-9" nome="Limite" :modelo.sync="dados.pesq_limite" :opt="limiteItens"></slct>
              </div>
              <tabela nome="filial" target="filial_edita" :dados="table"></tabela>
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
import tabLink from "../../components/tabLink";
import PesquisaMixin from "../../mixed/vue-mix/PesquisaMixin";
import VMasker from "vanilla-masker";
window.VMasker = window.VMasker = VMasker;

export default {
  name: "FilialPesquisa",
  components: { Tabela, slct, tabLink },
  mixins: [PesquisaMixin],
  data: function(){
    return{
      urlApi: "/api/filial/"
    };
  }
};
</script>