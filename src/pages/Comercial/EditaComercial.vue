<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Faturamento #{{ dados.id }}</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link ativo="true" icon="material-icons fa fa-pencil"
                          :txt="dados.id ? 'Editar' : 'Cadastrar'" rota="#sd1"></tab-link>
                <tab-link icon="material-icons fa fa-gift"
                          txt="Itens" rota="#sd2"></tab-link>
                <tab-link icon="material-icons fa fa-undo"
                          txt="Retornar" :rota="{name: 'comercial_pesquisa'}"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form name="comercial" id="edita_comercial" class="col-md-12 px-md-3 p-0">
        <div class="tab-content tab-space">

          {{dados}}
          <div class="tab-pane" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-12 p-0">
                  <slct tamanho="4" nome="Tipo da nota" :modelo.sync="dados.tipo" :opt="tipoNota"></slct>
                  <slct tamanho="4" nome="Modelo da nota" :modelo.sync="dados.modelo" :opt="modeloNota"></slct>
                  <slct tamanho="4" nome="Finalidade da nota" :modelo.sync="dados.finalidade" :opt="finalidadeNota"></slct>
                  <field descricao="Num. NF" nome="num_nf" leitura="true" :modelo.sync="dados.numNf" tamanho="4"></field>
                  <field descricao="Data emissão" nome="data_emissao" :modelo.sync="dados.dataEmissao"
                         funcao="datepicker-datetime" tamanho="8"></field>

                  <div class="col-md-8 px-0">
                    <autocomplete nome="Cliente" :modelo.sync="dados.cliente.nome" :modelo2.sync="dados.cliente.id"
                                  url="/api/pessoa/autocomplete/nome" tamanho="12" param="pesq_nome"></autocomplete>
                  </div>

                  <field descricao="Data lançamento" nome="data_lancamento" :modelo.sync="dados.dataLancamento"
                         funcao="datepicker-datetime" tamanho="4"></field>


                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane active" id="sd2">
            <div class="card-body">
              <div class="row">
                <div class="card m-0 mx-2 mb-2 p-2 p-md-0">
                  <div class="card-body p-1 px-md-4">
                    <div class="row p-2">
                      <div class="table-responsive">
                        <table class="table table-striped mb-0 input-table">
                          <thead>
                            <tr>
                              <th>Produto</th>
                              <th>Cod.</th>
                              <th>Operação</th>
                              <th>Unidade</th>
                              <th>Quantidade</th>
                              <th>$ Unitário</th>
                              <th>$ Bruto</th>
                              <th>% Desconto</th>
                              <th>$ Desconto</th>
                              <th>% IPI</th>
                              <th>$ IPI</th>
                              <th>$ Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(linha, index) in dados.comercialItens" :key="linha.id">
                              <td class="tabc large">
                                <autocomplete nome="produto" :modelo.sync="linha.produto.nome" @update:modelo2="updateItens($event, index)"
                                              :isTable="true" url="/api/produto/autocomplete/nome" tamanho="12"
                                              param="pesq_nome"></autocomplete>
                              </td>
                              <td class="tabc">
                                <field nome="cod" leitura="true" :modelo.sync="linha.produto.id" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <slct nome="Finalidade da nota" :modelo.sync="linha.operacao" :opt="finalidadeNota"
                                      :is-table="true" @update:modelo="getTipoOperacao($event, index)"></slct>
                              </td>
                              <td class="tabc">
                                <field nome="cod" leitura="true" :modelo.sync="linha.produto.id" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="quantidade" :modelo.sync="linha.quantidade" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="unidade" leitura="true" :modelo.sync="linha.valorUnitario" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="bruto" leitura="true" :modelo.sync="linha.valorBruto" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="perc_desconto" :modelo.sync="linha.percDesconto" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="valor_desconto" :modelo.sync="linha.valorDesconto" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="perc_ipi" :modelo.sync="linha.percIpi" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="valor_ipi" :modelo.sync="linha.valorIpi" :is-table="true"></field>
                              </td>
                              <td class="tabc">
                                <field nome="total" :modelo.sync="linha.valorTotal" :is-table="true"></field>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-block btn-success"
                    @click="enviar('/api/comercial/')">Enviar</button>
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
import axios from "axios";
window.VMasker = window.VMasker = VMasker;

export default {
  name: "ComercialEdita",
  components: { field, tabLink, slct, autocomplete },
  mixins: [TableFieldsMixin, EditaMixins ],
  data () {
    return {
      listaOperacao: [],
      tipoRegime: [
        { value: 1, text: "Simples Nacional" },
        { value: 2, text: "Simples Nacional - Excesso de sublimite" },
        { value: 3, text: "Regime Normal" },
      ],
      tipoNota: [
        { value: "S", text: "Saída" },
        { value: "E", text: "Entrada" },
      ],
      modeloNota: [
        { value: 55, text: "NF-e" },
        { value: 65, text: "NF Consumidor" },
      ],
      finalidadeNota: [
        { value: 1, text: "Normal" },
        { value: 2, text: "Complementar" },
        { value: 3, text: "Ajuste" },
        { value: 4, text: "Devolução" },
      ],
      // modeloItem: {
      //   produto:{
      //     id: null,
      //     nome: null,
      //   },
      // },
      dados:{
        cliente:{
          id: null, nome: null
        }
      }
    };
  },
  methods: {
    updateItens: function (e, index = 1) {
      if (e){
        axios
          .get("/api/produto/dados/"+e)
          .then(response => {
            console.log(response);
            this.results = response.data;
          });
      }
    },
    getTipoOperacao: function (e, index) {
      console.log(e, index);
    }
  },
  mounted: function () {
    // carrega informações iniciais da página
    this.getDados("/api/comercial/" + this.$route.params.id,);
  
    axios
      .get("/api/tipooperacao/list?pesq_tipo="+this.dados.tipo)
      .then(response => {
        console.log(response.data);
        for (const i in response.data.dados){
          this.listaOperacao.push({value: response.data.dados[i].value, text: response.data.dados[i].text});
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
  },
};
</script>