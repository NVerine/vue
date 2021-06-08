<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title"><i class="mr-2 fa fa-pencil"></i> Filial #{{ dados.id }}</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link ativo="true" icon="material-icons fa fa-pencil"
                          :txt="dados.id ? 'Editar' : 'Cadastrar'" rota="#sd1"></tab-link>
                <tab-link icon="material-icons fa fa-undo"
                          txt="Retornar" :rota="{name: 'filial_pesquisa'}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form name="filial" id="edita_filial" class="col-md-12 px-md-3 p-0 pb-2">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-12 p-0">
                  <field nome="handle" tipo="hidden" :modelo.sync="dados.id"></field>
                  <field descricao="Nome filial" nome="nome" :modelo.sync="dados.nome" tamanho="8"></field>
                  <slct tamanho="4" nome="Tipo" :modelo.sync="dados.regimeTributario" :opt="tipoRegime"></slct>
                  <field descricao="Timezone (PHP)" nome="timezone" :modelo.sync="dados.timezone" tamanho="6"></field>
                  <field descricao="Pula NF" nome="pulanf" :modelo.sync="dados.pulaNf" tamanho="6"></field>

                  <div class="col-md-12 px-0">
                    <autocomplete nome="Pessoa" :modelo.sync="pessoa.nome" :modelo2.sync="pessoa.id"
                                  url="/api/pessoa/autocomplete/nome" tamanho="12" param="pesq_nome"></autocomplete>
                  </div>
                </div>
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
import field from "../../components/field";
import TableFieldsMixin from "../../mixed/vue-mix/TableFieldsMixin";
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import slct from "@/components/slct";
import VMasker from "vanilla-masker";
import tabLink from "@/components/tabLink";
import autocomplete from "@/components/autocomplete";
window.VMasker = window.VMasker = VMasker;

export default {
  name: "FilialEdita",
  components: { field, tabLink, slct, autocomplete },
  mixins: [TableFieldsMixin, EditaMixins],
  data () {
    return {
      tipoRegime: [
        {value: 1, text: "Simples Nacional"},
        {value: 2, text: "Simples Nacional - Excesso de sublimite"},
        {value: 3, text: "Regime Normal"}
      ],
      pessoa: {id: null, nome: null},
    };
  },
  mounted: function () {
    // carrega informações iniciais da página
    this.getDados("/api/filial/" + this.$route.params.id).then(() => {
      if (this.dados.socio) {
        this.$set(this, "pessoa", {id: this.dados.socio.id, nome: this.dados.socio.nome});
      }
    });
  },
  methods: {
    customEnviar: function () {
      this.dados.pessoa = this.pessoa;
      this.enviar("/api/filial/");
    }
  }
};
</script>