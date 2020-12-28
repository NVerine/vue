<template>
  <div class="card m-0 mb-2 p-2 p-md-0" id="dynamic_enderecos">
    <div class="card-body">
      <div class="row" v-for="(linha, index) in enderecos" :key="enderecos[index].id">
        <div class="col-md-12 p-0">

          <div v-if="linha.exclui" class="btn btn-success fa fa-plus btn-list btn-sm btn-round btn-fab"
               @click="linha.exclui = null" title="Manter item"></div>
          <div v-else class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
               @click="removeArray(enderecos, index)" title="Excluir item"></div>

          <field prefixo="endereco" :index="index" nome="id" tipo="hidden" :modelo.sync="linha.id"></field>
          <div class="mt-3 col-md-2">
            <div class="control">
              <div class="form-group bmd-form-group" :class="linha.cep ? 'is-filled': ''">
                <label :for="'campo_endereco_cep_'+index" class="bmd-label-floating">Cep</label>
                <input type="text" :name="'endereco_cep_'+index" :id="'campo_endereco_cep_'+index"
                       class="form-control" v-on:input="linha.cep = $event.target.value"
                       @keydown="lockSize($event)"
                       @keyup="updateCep($event, index)" :value="getMaskedCep(linha.cep)" >
              </div>
            </div>
          </div>
          <estados-cidades prefixo="endereco" :index="index"
                           :uf.sync="linha.uf" :ibge-cidade.sync="linha.ibgeCidade"
                            :nome_estado.sync="linha.estado" :nome_cidade.sync="linha.cidade">
          </estados-cidades>
          <field prefixo="endereco" :index="index" nome="Bairro" :modelo.sync="linha.bairro" tamanho="4"></field>
          <field prefixo="endereco" :index="index" nome="Logradouro" :modelo.sync="linha.logradouro" tamanho="6"></field>
          <field prefixo="endereco" :index="index" nome="Complemento" :modelo.sync="linha.complemento" tamanho="4"></field>
          <field prefixo="endereco" :index="index" nome="Numero" :modelo.sync="linha.numero" tamanho="2"></field>
        </div>
      </div>
      <button type="button" class="btn btn-info fa fa-plus"
              @click="copiaArray(enderecoModelo, enderecos)" title="Inserir novo item"></button>
    </div>
  </div>
</template>

<script>
import field from "../../components/field";
import EstadosCidades from "./EstadosCidades";

import TableFieldsMixin from '../../mixed/vue-mix/TableFieldsMixin';
import axios from "axios";
import VMasker from "vanilla-masker";

export default {
  name: "Endereco",
  components: { field, EstadosCidades },
  mixins: [TableFieldsMixin],
  props: ['enderecos'],
  data() {
    return {
      enderecoModelo: {
        cep: null,
        uf: null,
        estado: null,
        cidade: null,
        //ibge_estado: null,
        ibgeCidade: null,
        bairro: null,
        logradouro: null,
        complemento: null,
        numero: null,
        excluir: false
      },
    }
  },
  methods: {
    lockSize: function (e) {
      if(e.target.value.length >= 10 && e.key !== "Backspace"){
        e.preventDefault();
      }
    },
    updateCep: function (e, i) {
      if (e.target.value.length === 9) {
        const cep = e.target.value.replace('-', '');
        axios
            .get('https://viacep.com.br/ws/' + cep + '/json/')
            .then(response => {
              if (response.data) {
                for (let r in this.$store.state.pessoas.estados){
                  if(this.$store.state.pessoas.estados[r].value == response.data.uf){
                    this.enderecos[i].estado = this.$store.state.pessoas.estados[r].text;
                    break;
                  }
                }
                this.enderecos[i].bairro = response.data.bairro;
                this.enderecos[i].cidade = response.data.localidade;
                this.enderecos[i].ibgeCidade = response.data.ibge;
                this.enderecos[i].uf = response.data.uf;
                this.enderecos[i].complemento = response.data.complemento;
                this.enderecos[i].logradouro = response.data.logradouro;
                this.enderecos[i].numero = response.data.unidade;
              }
            })
            .catch(error => {
              console.log(error);
              this.errored = true
            })
            .finally(() => this.loading = false);
      }
    },
    getMaskedCep: function (val) {
      if (!val) return '';
      return VMasker.toPattern(val.toString(), "99999-999");
    },
  }
}
</script>