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
                {{dados}}
                <div class="col-md-12 p-0">
                  <field nome="cod_barras" descricao="Cód. barras / ISBN" :modelo.sync="dados.nome" tamanho="4"></field>
                  <field nome="Nome" :modelo.sync="dados.nome" tamanho="8"></field>
                  <slct tamanho="9" nome="Família" :modelo.sync="familia" :opt="familia_lista"></slct>
                  <field nome="Preço" :modelo.sync="dados.preco" tamanho="3"></field>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success" @click="enviar('/api/produto/')">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import field from "../../components/field";
import slct from "@/components/slct";
import VMasker from "vanilla-masker";

export default {
  name: "ProdutosEdita",
  components: { field, slct },
  mixins: [EditaMixins],
  data () {
    return {
      id: this.$route.params.id,
      familia_lista: [],
    };
  },
  mounted() {
    // carrega informações iniciais da página
    this.getDados("/api/produto/" + this.$route.params.id);
    axios
      .get("/api/familia_produtos/list")
      .then(response => {
        for (const i in response.data.dados){
          let temp = {
            value: response.data.dados[i].id,
            text: response.data.dados[i].codigo + ") " + response.data.dados[i].nome
          };
          this.familia_lista.push(temp);
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  },
  computed: {
    familia: {
      get(){
        return (this.dados.familia) ? this.dados.familia.id : null;
      },
      set(val){
        this.dados.familia.id = val;
      }
    },
  },
  watch: {
    "dados.preco": function () {
      this.dados.preco = VMasker.toMoney(this.dados.preco);
    }
  },
};
</script>