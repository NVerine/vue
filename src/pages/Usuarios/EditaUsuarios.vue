<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Usuário #{{ dados.id }}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-pencil" :txt="dados.id ? 'Editar' : 'Cadastrar'" ativo="true" rota="#sd1"></tab-link>
                <tab-link v-if="dados.id" icon="fa fa-building" :txt="'Vincular à filial'" rota="#sd2"></tab-link>
                <tab-link icon="fa fa-undo" txt="Retornar" :rota="{name: 'usuarios_pesquisa'}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form name="usuarios" id="edita_usuario" class="col-md-12 px-md-3 p-0 pb-3" autocomplete="off">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div v-if="id == 0" class="col-md-2 p-0">
                  <binary-input nome="pessoa_existe" descricao="Pessoa ja cadastrada?" :modelo.sync="pessoa_existe"></binary-input>
                </div>

                <div v-if="!pessoa_existe" key="novapessoa" class="col-md-10 p-0">
                  <field nome="nome" descricao="Nome completo" :modelo.sync="pessoa.nome" tamanho="6"></field>
                  <field tipo="e-mail" nome="email" descricao="E-mail" :modelo.sync="pessoa.email" tamanho="6"></field>
                  <field nome="telefone" descricao="Telefone" comprimento="14" :modelo.sync="pessoa.telefone" tamanho="6"></field>
                  <field nome="cpf" descricao="CPF" comprimento="14" :modelo.sync="pessoa.cpf" tamanho="6"></field>
                </div>

                <div v-if="pessoa_existe" key="pessoaexiste" :class="id == 0 ? 'col-md-10 p-0' : 'col-md-12 p-0'">
                  <autocomplete nome="Pessoa" :modelo.sync="pessoa.nome" :modelo2.sync="pessoa.id"
                                url="/api/pessoa/autocomplete/nome" tamanho="12" param="pesq_nome"></autocomplete>
                </div>

                <div :class="id == 0 ? 'col-md-10 p-0 offset-2' : 'col-md-12 p-0'">
                  <slct  nome="Grupo" :modelo.sync="dados.grupo" :opt="listaGrupos" tamanho="3"></slct>
                  <field nome="Login" :modelo.sync="dados.username" tamanho="3"></field>
                  <field nome="Senha" tipo="Password" :modelo.sync="dados.senha" tamanho="3"></field>
                  <field nome="Confirmar senha" :inputClasse="dados.senha == dados.senha2 ? '' : 'invalid'"
                         tipo="Password" :modelo.sync="dados.senha2" tamanho="3"></field>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="sd2">
            <div class="card-body">
              <div class="row">
  
                <div class="card m-0 mb-2 p-2 p-md-0" id="dynamic_filiais">
                  <div class="card-body p-0">
                    <div class="row mx-0 px-2" v-for="(linha, index) in dados.filiais" :key="index">
                      <div class="col-md-12 p-0">
                        <div v-if="linha.exclui" class="btn btn-success fa fa-plus btn-list btn-sm btn-round btn-fab"
                             @click="linha.exclui = null" title="Manter item"></div>
                        <div v-else class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
                             @click="removeArray(dados.filiais, index)" title="Excluir item"></div>
                        
                        <slct prefixo="filial" :index="index" nome="Filial" :modelo.sync="linha.id" :opt="listaFiliais" tamanho="12"></slct>
                        
                      </div>
                    </div>
                    <button type="button" class="btn btn-info fa fa-plus m-2"
                            @click="copiaArray(filialModelo, dados.filiais)" title="Inserir novo item"></button>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="customEnviar()">Enviar</button>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-warning" @click="makeid">Nova Senha</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import slct from "../../components/slct";
import field from "../../components/field";
import binaryInput from "../../components/binaryInput";
import axios from "axios";
import autocomplete from "../../components/autocomplete";
import tabLink from "../../components/tabLink";
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import VMasker from "vanilla-masker";
import TableFieldsMixin from "../../mixed/vue-mix/TableFieldsMixin";
window.VMasker = window.VMasker = VMasker;

export default {
  name: "UsuariosEdita",
  components: { slct, field, binaryInput, autocomplete, tabLink },
  mixins: [EditaMixins, TableFieldsMixin],
  data () {
    return {
      id: this.$route.params.id,
      pessoa: {id: null, nome: null, cpf: null, email: null, telefone: null},
      pessoa_existe: true,
      listaGrupos: [],
      listaFiliais: [],
      filialModelo: {
        id: null,
      },
    };
  },
  methods: {
    makeid: function () {
      let result           = "";
      let characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for ( let i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.$set(this.dados, "senha", result);
      this.$set(this.dados, "senha2", result);
      prompt("Copie a nova senha", this.dados.senha);
    },
    customEnviar: function () {
      console.log(this.dados);
      this.dados.pessoa = this.pessoa;
      this.dados.pessoa_existe = this.pessoa_existe;
      this.enviar("/api/user/");
    },
    // implementação diferente pois a relação dessas entidades é diferente
    removeArray: function(arr, pos){
      if(arr[pos].nome){
        this.$set(arr[pos], "exclui", true);
      }
      else{
        arr.splice(pos, 1);
      }
    }
  },
  mounted () {
    // carrega informações iniciais da página
    this.getDados("/api/user/" + this.$route.params.id)
      .then(() => {
        if(this.dados.grupo) this.dados.grupo = this.dados.grupo.id;
        if (this.dados.pessoa){
          this.$set(this, "pessoa",
            {
              id: this.dados.pessoa.id,
              nome: this.dados.pessoa.nome,
            });
        }
      });

    // carrega lista de grupos
    axios
      .get("/api/permissoes/lista")
      .then(response => {
        for (const i in response.data.dados.items){
          this.listaGrupos.push({value: response.data.dados.items[i].id, text: response.data.dados.items[i].nome});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  
    // carrega lista de filiais
    axios
      .get("/api/filial/lista")
      .then(response => {
        for (const i in response.data.dados.items){
          this.listaFiliais.push({value: response.data.dados.items[i].id, text: response.data.dados.items[i].nome});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  },
  watch: {
    "pessoa.telefone": function () {
      if(!this.pessoa.telefone) {
        return;
      }
      this.$set(this.pessoa, "telefone", VMasker.toPattern(this.pessoa.telefone.toString(), "(99)99999-9999"));
    },
    "pessoa.cpf": function () {
      if(!this.pessoa.cpf) {
        return;
      }
      this.$set(this.pessoa, "cpf", VMasker.toPattern(this.pessoa.cpf.toString(), "999.999.999-99"));
    }
  }
};
</script>