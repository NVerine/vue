<template>
  <div class="row">
    <gallery tipo="pessoas" :id="dados.id"></gallery>
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title"><i class="mr-2 fa fa-pencil"></i>Pessoa #{{ dados.id }}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link ativo="true" icon="material-icons fa fa-pencil"
                          :txt="dados.id ? 'Editar' : 'Cadastrar'" rota="#sd1"></tab-link>
                <tab-link v-if="dados.id" icon="material-icons fa fa-home"
                          txt="Endereços" rota="#sd2"></tab-link>
                <tab-link v-if="dados.id" icon="material-icons fa fa-phone"
                          txt="Contatos" rota="#sd3"></tab-link>
                <tab-link icon="material-icons fa fa-undo"
                          txt="Retornar" :rota="{name: 'pessoas_pesquisa'}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form name="pessoa" id="edita_pessoa" class="col-md-12 px-md-3 p-0 pb-2">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-md-3 col-sm-6 p-0 pb-3">
                  <div class="mt-3 col-md-12">
                    <div>
                      <label class="m-0">Funções</label>
                      <ckb-radio nome="Ativo" :modelo.sync="dados.ativo"></ckb-radio>
                      <ckb-radio nome="Cliente" :modelo.sync="dados.cliente"></ckb-radio>
                      <ckb-radio nome="Empresa" :modelo.sync="dados.empresa"></ckb-radio>
                      <ckb-radio nome="Fornecedor" :modelo.sync="dados.fornecedor"></ckb-radio>
                      <ckb-radio nome="Funcionario" :modelo.sync="dados.funcionario"></ckb-radio>
                    </div>
                  </div>
                </div>
                <div class="col-md-9 col-sm-6 p-0">
                  <field nome="handle" tipo="hidden" :modelo.sync="dados.id"></field>
                  <slct tamanho="3" nome="Tipo" :modelo.sync="dados.tipo" :opt="tipoPessoa"></slct>
                  <field descricao="CPF/CNPJ" nome="cpfcnpj" :comprimento="getTamanho" :modelo.sync="dados.cpfCnpj" tamanho="5"></field>
                  <field descricao="RG/Inscrição" nome="RG" :modelo.sync="dados.rg" tamanho="4"></field>
                  <field descricao="Nome/razão social" nome="nome" :modelo.sync="dados.nome" tamanho="8"></field>
                  <field nome="CNAE" :modelo.sync="dados.cnae" tamanho="4"></field>
                  <field descricao="Apelido/nome fantasia" :modelo.sync="dados.nomeFantasia" nome="nome_fantasia" tamanho="8"></field>
                  <field descricao="Data nascimento" nome="data_nascimento" :modelo.sync="dados.dataNascimento"
                         funcao="datepicker-date" tamanho="4"></field>
                  <div class="mt-3 col-md-12" id="wrapper_editor_conteudo">
                    <div class="control">
                      <div class="form-group bmd-form-group">
                        <label class="bmd-label-floating label-select" for="campo_editor_conteudo">Observações</label>
                        <textarea class="form-control " name="editor_conteudo" id="campo_editor_conteudo" v-model="dados.observacoes"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="dados.id" class="tab-pane" id="sd2">
            <div class="card-body">
              <div class="row">
                <slct tamanho="12" nome="Endereco principal" :modelo.sync="enderecoPrincipal" :opt="getEnderecoList"></slct>
                <endereco :enderecos.sync="dados.endereco" :ativo="enderecoPrincipal"></endereco>
              </div>
            </div>
          </div>
          <div v-if="dados.id" class="tab-pane" id="sd3">
            <div class="card-body">
              <div class="row">
                <slct tamanho="12" nome="Contato principal" :modelo.sync="contatoPrincipal" :opt="getContatoList"></slct>
                <contato :contatos="dados.contato" :ativo="contatoPrincipal"></contato>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success"
                    @click="customEnviar()">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import slct from "../../components/slct";
import field from "../../components/field";
import ckbRadio from "../../components/ckbInput";
import tabLink from "../../components/tabLink";
import TableFieldsMixin from "../../mixed/vue-mix/TableFieldsMixin";
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import Endereco from "./Endereco";
import Contato from "@/pages/Pessoas/Contato";
import Gallery from "@/components/Gallery";

import VMasker from "vanilla-masker";
window.VMasker = window.VMasker = VMasker;

export default {
  name: "PessoasEdita",
  components: { slct, field, ckbRadio, tabLink, Endereco, Contato, Gallery },
  mixins: [TableFieldsMixin, EditaMixins],
  data () {
    return {
      tipoPessoa: [{value: "F", text: "Pessoa física"}, {value: "J", text: "Pessoa jurídica"}],
      idEnderecoPrincipal: null,
      idContatoPrincipal: null,
    };
  },
  methods: {
    excluiItem: function(e, arr){
      arr.exclui = (!arr.exclui); // essa propriedade não é reativa
      $(e.target).toggleClass("fa-times btn-success btn-danger fa-plus");
    },
    customEnviar: function () {
      this.dados.enderecoPrincipal = this.idEnderecoPrincipal;
      this.dados.contatoPrincipal = this.idContatoPrincipal;
      this.enviar("/api/pessoa/");
    }
  },
  computed: {
    enderecoPrincipal: {
      get(){
        if(this.idEnderecoPrincipal) return this.idEnderecoPrincipal;
        if(!this.dados.enderecoPrincipal || !this.dados.enderecoPrincipal.id) return null;
        for (var r in this.dados.endereco){
          if (this.dados.endereco[r].id == this.dados.enderecoPrincipal.id) return r;
        }
        return null;
      },
      set(val){
        this.idEnderecoPrincipal = val;
      }
    },
    contatoPrincipal: {
      get(){
        if(this.idContatoPrincipal) return this.idContatoPrincipal;
        if(!this.dados.contatoPrincipal || !this.dados.contatoPrincipal.id) return null;
        for (var r in this.dados.contato){
          if (this.dados.contato[r].id == this.dados.contatoPrincipal.id) return r;
        }
        return null;
      },
      set(val){
        this.idContatoPrincipal = val;
      }
    },
    getTamanho: function(){
      if(this.dados.tipo == "F"){
        return 14;
      }
      return 18;
    },
    getEnderecoList: function () {
      if(!this.dados.endereco) return [];
      let retorno = [];
      for(var r in this.dados.endereco){
        if(this.dados.endereco[r].logradouro && this.dados.endereco[r].cidade && this.dados.endereco[r].numero){
          let txt = this.dados.endereco[r].cidade + " - " +
                    this.dados.endereco[r].logradouro + " " +
                    this.dados.endereco[r].numero;
          retorno.push({value: r, text: txt});
        }
      }
      return retorno;
    },
    getContatoList: function () {
      if(!this.dados.contato) return [];
      let retorno = [];
      for(var r in this.dados.contato){
        if(this.dados.contato[r].telefone && this.dados.contato[r].email){
          let txt = this.dados.contato[r].email + " - " +
                    this.dados.contato[r].telefone;
          retorno.push({value: r, text: txt});
        }
      }
      return retorno;
    }
  },
  mounted: function () {
    // carrega informações iniciais da página
    this.getDados("/api/pessoa/" + this.$route.params.id);

    if(!this.dados.id) this.$set(this.dados, "ativo", true);
  },
  watch: {
    "dados.cpfCnpj": function () {
      if(!this.dados.cpfCnpj) {
        return;
      }
      if(this.dados.tipo === "J") {
        this.dados.cpfCnpj = VMasker.toPattern(this.dados.cpfCnpj.toString(), "99.999.999/9999-99");
      }
      else{
        this.dados.cpfCnpj = VMasker.toPattern(this.dados.cpfCnpj.toString(), "999.999.999-99");
      }
    },
    "dados.tipo": function (a, aa) {
      // só faz a troca se não for um loading de tela
      if(aa) this.dados.cpfCnpj = "";
    }
  }
};
</script>