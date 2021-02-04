<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Test #{{ dados.id }}</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link ativo="true" icon="material-icons fa fa-pencil"
                          :txt="dados.id ? 'Editar' : 'Cadastrar'" rota="#sd1">
                </tab-link>
                <tab-link icon="material-icons fa fa-undo"
                          txt="Retornar" :rota="{name: 'test_pesquisa'}">
                </tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form class="col-md-12 px-md-3 p-0">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-12 p-0">
                  <field nome="handle" tipo="hidden" :modelo.sync="dados.id"></field>
                  <div class="col-3">
                    <binary-input nome="public" descricao="Public" :modelo.sync="dados.public"></binary-input>
                  </div>
                  <field nome="Title" :modelo.sync="dados.title" tamanho="9"></field>
                  <div class="mt-3 col-md-12" id="wrapper_editor_conteudo">
                    <div class="control">
                      <div class="form-group bmd-form-group">
                        <label class="bmd-label-floating label-select" for="campo_editor_conteudo">Description</label>
                        <textarea class="form-control" id="campo_editor_conteudo" v-model="dados.description"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 p-0 pb-2">
                  <h4 class="col-12">Active questions</h4>
                  <questionlist :lista="getQuestions(true)" :ativos="true"></questionlist>
                </div>
                <div class="col-12 p-0 pb-2">
                  <h4 class="col-8">Inactive questions</h4>
                  <slct tamanho="4" nome="Discipline" :modelo.sync="disciplina" :opt="disciplinas"></slct>
                  <questionlist :lista="getQuestions(false)" :ativos="false"></questionlist>
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
import field from "@/components/field";
import tabLink from "@/components/tabLink";
import EditaMixins from "@/mixed/vue-mix/EditaMixin";
import binaryInput from "@/components/binaryInput";
import slct from "@/components/slct";
import questionlist from "@/pages/Test/questionlist";
import axios from "axios";

export default {
  name: "EditaTest",
  components: { field, tabLink, binaryInput, questionlist, slct },
  mixins: [EditaMixins],
  data: function(){
    return {
      disciplina: false,
      questions: [],
      disciplinas: [{value: "", text: ""}]
    };
  },
  methods: {
    getQuestions: function (active) {
      const el = this;
      let retorno = this.questions.filter(function (e) {
        return (e.active == active && active) ||
            (e.active == active && !el.disciplina && !active) ||
            (e.active == active && el.disciplina && !active && e.disciplina.id == el.disciplina);
      });
      if(active){
        retorno.sort(function (a, b) {
          if (a.ordem > b.ordem) {
            return 1;
          }
          if (a.ordem < b.ordem) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      return retorno;
    },
    customEnviar: function () {
      this.dados.questions = this.getQuestions(true);
      this.enviar("/api/test/");
    }
  },
  mounted() {
    // carrega informações iniciais da página
    this.getDados("/api/test/" + this.$route.params.id).then(() => {
      let actives = [];
      for(let i in this.dados.quizQuestions){
        actives[this.dados.quizQuestions[i].question.id] = {
          ordem: this.dados.quizQuestions[i].ordem,
          weight: this.dados.quizQuestions[i].weight
        };
      }

      // carrega lista de questoes
      axios
        .get("/api/questions/")
        .then(response => {
          let temp = [];
          for (const i in response.data.dados){
            if(response.data.dados[i].disciplina){
              temp[response.data.dados[i].disciplina.id] = response.data.dados[i].disciplina.name;
              if(response.data.dados[i].disciplina.segmento){
                temp[response.data.dados[i].disciplina.id] = response.data.dados[i].disciplina.segmento + " - " + temp[response.data.dados[i].disciplina.id];
              }
            }
            if(actives[response.data.dados[i].id]){
              this.$set(response.data.dados[i], "ordem", actives[response.data.dados[i].id].ordem);
              this.$set(response.data.dados[i], "weight", actives[response.data.dados[i].id].weight);
              this.$set(response.data.dados[i], "active", true);
            }
            else{
              this.$set(response.data.dados[i], "active", false);
            }

            this.questions.push(response.data.dados[i]);
          }
          for (let i in temp){
            this.disciplinas.push({value: i, text: temp[i]});
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
    });
  }
};
</script>