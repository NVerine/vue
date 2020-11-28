<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title"><i class="mr-2 fa fa-user"></i>Pessoas</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation float-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-search" txt="Pesquisa" ativo="true" rota="#sd1"></tab-link>
                <tab-link icon="fa fa-plus" txt="Inserir" :rota="{name: 'pessoas_edita', params : { id : 0}}"></tab-link>
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
                <div class="col-md-3 p-0"></div>
                <div class="col-md-9 p-0">
                  <field nome="pesq_cpf_cnpj" descricao="CPF/CNPJ" :modelo.sync="dados.pesq_cpfCnpj" tamanho="4"></field>
                  <field nome="pesq_nome" descricao="Nome" :modelo.sync="dados.pesq_nome" tamanho="8"></field>
                  <div class="col-md-6">
                    <button type="button" class="btn btn-block btn-warning" @click="limpaForm">Limpar</button>
                  </div>
                  <div class="col-md-6">
                    <button type="submit" class="btn btn-block btn-success">Pesquisar</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="mt-4 row">
              <div class="col-md-12 p-0">
                <slct tamanho="3" class="offset-9" nome="Limite" :modelo.sync="dados.pesq_limite" :opt="limiteItens"></slct>
              </div>
              <tabela nome="pessoa" target="pessoas_edita" :itens="itens"></tabela>
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
  import Field from '../../components/field';
  import Tabela from '../../components/tabela';
  import slct from "../../components/slct";
  import tabLink from "../../components/tabLink";
  import PesquisaMixin from "../../mixed/vue-mix/PesquisaMixin";
  import VMasker from 'vanilla-masker';
  window.VMasker = window.VMasker = VMasker;

  export default {
      name: "PessoasPesquisa",
      components: { Field, Tabela, slct, tabLink },
      mixins: [PesquisaMixin],
      data: function(){
          return{
              urlApi: "/api/pessoa/"
          }
      },
      watch: {
          'dados.pesq_cpfCnpj': function () {
              if(!this.dados.pesq_cpfCnpj) {
                  return;
              }
              if(this.dados.pesq_cpfCnpj.length > 14) {
                  this.dados.pesq_cpfCnpj = VMasker.toPattern(this.dados.pesq_cpfCnpj.toString(), "99.999.999/9999-99");
              }
              else{
                  this.dados.pesq_cpfCnpj = VMasker.toPattern(this.dados.pesq_cpfCnpj.toString(), "999.999.999-99");
              }
          }
      },
  }
</script>