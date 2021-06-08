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
                <tab-link icon="fa fa-pencil" :txt="'Editar'" ativo="true" rota="#sd1"></tab-link>
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
  
                <slct nome="Filial ativa" :opt="listaFiliais" :modelo.sync="dados.filialAtiva.id" tamanho="12"></slct>
                
                <div :class="id == 0 ? 'col-md-10 p-0 offset-2' : 'col-md-12 p-0'">
                  <field nome="Login" :modelo.sync="dados.username" tamanho="6"></field>
                  <field nome="Senha" tipo="Password" :modelo.sync="dados.senha" tamanho="3"></field>
                  <field nome="Confirmar senha" :inputClasse="dados.senha == dados.senha2 ? '' : 'invalid'"
                         tipo="Password" :modelo.sync="dados.senha2" tamanho="3"></field>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="enviar('/api/user/perfil/')">Enviar</button>
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
import VMasker from "vanilla-masker";
import TableFieldsMixin from "../../mixed/vue-mix/TableFieldsMixin";
import slct from "../../components/slct";
window.VMasker = window.VMasker = VMasker;

export default {
  name: "EditaPerfil",
  components: {  field, tabLink, slct },
  mixins: [EditaMixins, TableFieldsMixin],
  data () {
    return {
      id: localStorage.usuario_id,
      listaFiliais: [],
      dados: { filialAtiva: { id: null } }
    };
  },
  mounted () {
    // carrega informações iniciais da página
    this.getDados("/api/user/" + localStorage.usuario_id)
      .then((response) => {
        for (const i in response.data.dados.items.filiais){
          this.listaFiliais.push({value: response.data.dados.items.filiais[i].id, text: response.data.dados.items.filiais[i].nome});
        }
      });
  }
};
</script>