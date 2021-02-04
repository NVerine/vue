<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title"><i class="mr-2 fa fa-user"></i>Permissoes</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation float-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <li class="nav-item text-center">
                  <a class="nav-link active" data-toggle="tab" role="tablist" href="#sd1">
                    <i class="fa fa-search"></i>
                    <span>Pesquisa</span>
                  </a>
                </li>
                <li class="nav-item text-center">
                  <router-link class="nav-link" data-toggle="tab" role="tablist" :to="{name: 'permissoes_edita', params : { id : 0}}">
                    <i class="fa fa-plus"></i>
                    <span>Inserir</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content tab-space">
        <div class="tab-pane active" id="sd1">
          <div class="card-body">
            <div class="mt-4 row">
              <div class="col-md-12 p-0">
                <slct tamanho="3" class="offset-9" nome="Limite" :modelo.sync="dados.pesq_limite" :opt="limiteItens"></slct>
              </div>
              <tabela nome="permissoes" target="permissoes_edita" :dados="table"></tabela>
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
import PesquisaMixin from "../../mixed/vue-mix/PesquisaMixin";

export default {
  name: "PermissoesPesquisa",
  components: { Tabela, slct },
  mixins: [PesquisaMixin],
  data () {
    return {
      urlApi: "/api/permissoes/"
    };
  }
};
</script>