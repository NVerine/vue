<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Produto #{{ dados.id }}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <li class="nav-item text-center">
                  <a class="nav-link active" data-toggle="tab" role="tablist" href="#sd1">
                    <i class="material-icons fa fa-pencil"></i><span>{{ dados.id ? 'Cabeçalho' : 'Cadastrar'}}</span>
                  </a>
                </li>
                <li class="nav-item text-center">
                  <router-link class="nav-link" data-toggle="tab" role="tablist" :to="{name: 'produtos_pesquisa'}">
                    <i class="material-icons fa fa-undo"></i><span>Retornar</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form name="produtos" id="edita_produto" class="col-md-12 px-md-3 p-0 pb-3" autocomplete="off">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <button type="button" class="btn btn-white btn-block" data-toggle="modal" data-target="#modal_familia_produtos">{{familia_cod}} - {{ familia_text }}</button>
                </div>
                <div class="col-md-12 p-0">
                  <field nome="cod_barras" descricao="Cód. barras / ISBN" :modelo.sync="dados.nome" tamanho="4"></field>
                  <field nome="Nome" :modelo.sync="dados.nome" tamanho="8"></field>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="enviar('/api/produtos/')">Enviar</button>
          </div>
        </div>
      </form>
    </div>
    <modal size="modal-lg" nome="modal_familia_produtos" titulo="Selecione a família de produtos até o último nível">
      <div slot class="row">
        <div v-for="(nivel, index) in familia_lista" :key="index" class="col-6">
          <div class="p-0 col-md-12">
            <div>
              <label class="m-0">Nível {{ (index + 1) }}</label>
              <radio-input v-for="(item, i) in nivel.filter((flt) => index === 0 || familiaShow(flt.codigo))"
                           :modelo.sync="familia_selecionada" :key="i" :valor="item.codigo"
                           :nome="'nivel_'+index" :descricao="item.codigo + ' ) ' + item.nome">
              </radio-input>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="btn" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="aplicaFamilia">Aplicar mudanças</button>
      </div>
    </modal>
  </div>
</template>

<script>
    import axios from 'axios';
    import EditaMixins from "../../mixed/vue-mix/EditaMixin";
    import field from "../../components/field";
    import modal from "../../components/modal";
    import radioInput from "../../components/radioInput";

    export default {
        name: "ProdutosEdita",
        components: { field, modal, radioInput},
        mixins: [EditaMixins],
        data () {
            return {
                id: this.$route.params.id,
                familia_lista: [],
                familia_lista_original: [],
                familia_selecionada: null,
                familia_cod: "-",
                familia_text: "Selecione a família de produtos"
            }
        },
        methods: {
            familiaShow: function (cod) {
                if((!this.familia_selecionada) || (this.familia_selecionada.length+4) < cod.length) return false;
                if(cod.length > this.familia_selecionada.length) {
                    return cod.substring(0, this.familia_selecionada.length) === this.familia_selecionada;
                }
                return true;
            },
            aplicaFamilia: function () {
                for (const i in this.familia_lista_original){
                    if(this.familia_lista_original[i].codigo === this.familia_selecionada){
                        this.familia_cod = this.familia_selecionada;
                        this.familia_text = this.familia_lista_original[i].nome;
                        this.dados.familia = this.familia_lista_original[i].id;
                        return;
                    }
                }
            }
        },
        mounted() {
            axios
                .get("/api/familia_produtos/list")
                .then(response => {
                    let separados = [];
                    for (const i in response.data.dados){
                        let nivel = response.data.dados[i].codigo.split(".");
                        if(!separados[nivel.length]){
                            separados[nivel.length-1] = [response.data.dados[i]];
                        }else{
                            separados[nivel.length-1].push(response.data.dados[i]);
                        }
                    }
                    this.familia_lista_original = response.data.dados;
                    this.familia_lista = separados;
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true
                })
                .finally(() => this.loading = false);
        }
    }
</script>