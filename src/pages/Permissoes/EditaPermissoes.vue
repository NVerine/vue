<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Grupo #{{dados.id}}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <li class="nav-item text-center">
                  <a class="nav-link active" data-toggle="tab" role="tablist" href="#sd1">
                    <i class="material-icons fa fa-pencil"></i><span>{{ dados.id ? 'Editar' : 'Cadastrar'}}</span>
                  </a>
                </li>
                <li class="nav-item text-center">
                  <router-link class="nav-link" data-toggle="tab" role="tablist" :to="{name: 'permissoes_pesquisa'}">
                    <i class="material-icons fa fa-undo"></i><span>Retornar</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form class="col-md-12 px-md-3 p-0 pb-3">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <field nome="Nome" :modelo.sync="dados.nome" tamanho="12"></field>
              </div>
              <div v-if="dados.id" class="row">
                <div class="col-12 mt-4">
                  <h4 class="m-0">Permissões/Rotas</h4>

                  <div v-for="(r, i) in rotas" :key="i" class="form-check m-0 col-4">
                    <label class="form-check-label">
                      <input data-toggle="checkbox" type="checkbox" class="form-check-input" v-model="rotas[i]" >
                      {{i}}
                      <span class="form-check-sign"><span class="check" /></span>
                    </label>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" name="enviar" id="campo_enviar" @click="beforeEnviar">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import field from "../../components/field";
    import axios from 'axios';
    import EditaMixins from "../../mixed/vue-mix/EditaMixin";

    export default {
        name: "PermissoesEdita",
        components: { field },
        mixins: [EditaMixins],
        data () {
            return {
                dados: {
                    permissoes: {}
                },
                rotas: {},
                verdadeiro: true
            }
        },
        methods: {
            beforeEnviar: function () {
                this.dados.id = this.dados.id || 0;
                this.dados.permissoes = this.rotas;
                this.enviar('/api/permissoes/');
            },
        },
        mounted () {
            // carrega informações iniciais da página
            this.getDados('/api/permissoes/' + this.$route.params.id)
                .then(() => {
                // carrega toda a lista de rotas EXISTENTES no sistema
                axios
                    .get('/api/permissoes/rotas')
                    .then(response => {
                        // para a reatividade funcionar precisa disso
                        let self = this;
                        for (const r in response.data.dados){
                            this.$set(self.rotas, r, response.data.dados[r]);
                        }
                        // precisa mapear o array de rotas
                        for (const p in this.dados.permissoes){
                            let atual = this.dados.permissoes[p];
                            this.rotas[atual.rota] = true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true
                    })
                    .finally(() => this.loading = false);
            });
        }
    }
</script>