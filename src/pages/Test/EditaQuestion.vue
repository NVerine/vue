<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Question #{{ dados.id }}</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link ativo="true" icon="material-icons fa fa-pencil"
                          :txt="dados.id ? 'Edit' : 'Insert'" rota="#sd1">
                </tab-link>
                <tab-link icon="material-icons fa fa-undo"
                          txt="Return" :rota="{name: 'question_pesquisa'}">
                </tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form class="col-md-12 px-md-3 p-0 pb-2">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-12 p-0">
                  <field nome="handle" tipo="hidden" :modelo.sync="dados.id"></field>
                  <field nome="Title" :modelo.sync="dados.title" tamanho="8"></field>
                  <slct tamanho="4" nome="Discipline" :modelo.sync="dados.disciplina.id" :opt="discipline"></slct>
                  <div class="mt-3 col-md-12" id="wrapper_editor_conteudo">
                    <div class="control">
                      <div class="form-group bmd-form-group">
                        <label class="bmd-label-floating label-select">Description</label>
                        <textarea v-model="dados.description" class="form-control"></textarea>
                      </div>
                    </div>
                  </div>
                  <slct tamanho="4" nome="Type" :modelo.sync="dados.tipo" :opt="tipo"></slct>
                  <field nome="Answer" v-show="dados.tipo < 3" :modelo.sync="dados.answer" tamanho="8"></field>
                </div>
              </div>
              <div v-show="dados.tipo > 2" class="row">
                <div class="card m-0 mb-2 p-2 p-md-0" id="dynamic_questions">
                  <div class="card-body">
                    <div class="row" v-for="(linha, index) in dados.opt" :key="dados.opt[index].id">
                      <div class="col-md-12">
                        <div class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
                             @click="removeArray(dados.opt, index)" title="Excluir item"></div>
                        <field prefixo="opt" :index="index" nome="id" tipo="hidden" :modelo.sync="linha.id"></field>
                        <binary-input @hook:mounted="filterSelected(index)" prefixo="opt" :index="index" descricao="Is answer" nome="is_answer" :modelo.sync="linha.isAnswer" tamanho="2"></binary-input>
                        <field prefixo="opt" :index="index" nome="Text" :modelo.sync="linha.text" tamanho="10"></field>
                      </div>
                    </div>
                    <button type="button" class="btn btn-info fa fa-plus"
                            @click="copiaArray(optModel, dados.opt)" title="Inserir novo item"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success"
                    @click="enviar('/api/questions/')">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import field from "@/components/field";
import tabLink from "@/components/tabLink";
import EditaMixins from "@/mixed/vue-mix/EditaMixin";
import slct from "@/components/slct";
import TableFieldsMixin from "@/mixed/vue-mix/TableFieldsMixin";
import binaryInput from "@/components/binaryInput";
import axios from "axios";

export default {
  name: "EditaQuestion",
  components: { field, tabLink, slct, binaryInput },
  mixins: [EditaMixins, TableFieldsMixin],
  data: function () {
    return {
      dados: {
        opt: [],
        teste: false,
        disciplina: {id: null}
      },
      tipo: [
        {value: 1, text: "Text"},
        {value: 2, text: "Number"},
        {value: 3, text: "Select"},
        {value: 4, text: "Choose"},
        {value: 5, text: "Multiple choose"}
      ],
      optModel: {
        isAnswer: false,
        text: ""
      },
      discipline: []
    };
  },
  methods: {
    filterSelected: function (e) {
      let el = this;
      $("#campo_opt_is_answer_"+e).change(function (){
        if(this.checked && el.dados.tipo != 5){
          $("[id^='campo_opt_is_answer']:checked:not(#campo_opt_is_answer_"+e+")").click();
        }
      });
    }
  },
  mounted () {
    // carrega informa��es iniciais da p�gina
    this.getDados("/api/questions/" + this.$route.params.id).then(() => {
      this.dados.disciplina = this.dados.disciplina || {id: null};
    });

    // carrega lista de disciplinas
    axios
      .get("/api/discipline/")
      .then(response => {
        for (const i in response.data.dados){
          var value = response.data.dados[i].id;
          var text = response.data.dados[i].id + "-" + response.data.dados[i].segmento + ") " + response.data.dados[i].name;
          this.discipline.push({value: value, text: text});
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