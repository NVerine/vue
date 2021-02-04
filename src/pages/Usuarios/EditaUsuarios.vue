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
                  <field nome="nome" descricao="Nome completo" :modelo.sync="dados.nome" tamanho="6"></field>
                  <field tipo="e-mail" nome="email" descricao="E-mail" :modelo.sync="dados.email" tamanho="6"></field>
                  <field nome="telefone" descricao="Telefone" comprimento="14" :modelo.sync="dados.telefone" tamanho="6"></field>
                  <field nome="cpf" descricao="CPF" comprimento="14" :modelo.sync="dados.cpf" tamanho="6"></field>
                </div>

                <div v-if="pessoa_existe" key="pessoaexiste" :class="id == 0 ? 'col-md-10 p-0' : 'col-md-12 p-0'">
                  <autocomplete nome="Pessoa" :modelo.sync="dados.pessoa.nome" :modelo2.sync="dados.pessoa.id"
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
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="enviar('/api/user/')">Enviar</button>
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
window.VMasker = window.VMasker = VMasker;

export default {
  name: "UsuariosEdita",
  components: { slct, field, binaryInput, autocomplete, tabLink },
  mixins: [EditaMixins],
  data () {
    return {
      id: this.$route.params.id,
      dados: { pessoa: {id: null, nome: null}},
      pessoa_existe: true,
      listaGrupos: [],
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
      console.log(this.dados);
      this.$set(this.dados, "senha", result);
      this.$set(this.dados, "senha2", result);
      prompt("Copie a nova senha", this.dados.senha);
    }
  },
  mounted () {
    // carrega informações iniciais da página

    this.getDados("/api/user/" + this.$route.params.id)
      .then(() => {
        if(this.dados.grupo) this.dados.grupo = this.dados.grupo.id;
      });

    // carrega lista de grupos
    axios
      .get("/api/permissoes/lista")
      .then(response => {
        for (const i in response.data.dados){
          this.listaGrupos.push({value: response.data.dados[i].id, text: response.data.dados[i].nome});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  },
  watch: {
    "dados.telefone": function () {
      console.log(this.dados);
      if(!this.dados.telefone) {
        return;
      }
      this.$set(this.dados, "telefone", VMasker.toPattern(this.dados.telefone.toString(), "(99)99999-9999"));
    },
    "dados.cpf": function () {
      if(!this.dados.cpf) {
        return;
      }
      this.$set(this.dados, "cpf", VMasker.toPattern(this.dados.cpf.toString(), "999.999.999-99"));
    }
  }
};
</script>