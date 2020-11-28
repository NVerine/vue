<template>
  <div>
    <field :prefixo="prefixo" :index="index" nome="nome_estado" tipo="hidden" :modelo="nomeEstado"></field>
    <field :prefixo="prefixo" :index="index" nome="nome_cidade" tipo="hidden" :modelo="nomeCidade"></field>
    <slct :prefixo="prefixo" :index="index" tamanho="3" nome="Estado"
          :modelo="uf" :opt="listaEstados" @update="updateEstado($event)"></slct>
    <slct :prefixo="prefixo" :index="index" tamanho="3" nome="municipio" descricao="Município"
          :modelo="ibgeCidade" :opt="listaCidades[currentUf]" @update="updateCidade($event)"></slct>
  </div>
</template>

<script>
import slct from "../../components/slct";
import TableFieldsMixin from '../../mixed/vue-mix/TableFieldsMixin';
import axios from "axios";
import field from "@/components/field";

export default {
  name: "EstadosCidades",
  components: { slct, field },
  mixins: [TableFieldsMixin],
  props: ['uf', 'ibgeCidade', 'nome_estado', 'nome_cidade', 'prefixo', 'index'],
  data() {
    return {
      currentUf: this.uf,
      nomeEstado: this.nome_estado,
      nomeCidade: this.nome_cidade
    }
  },
  methods: {
    updateEstado: function(e){
      console.log(e);
      this.nomeEstado = e.text;
      this.$emit('update:nome_estado', e.text);
      this.$emit('update:uf', e.value);
    },
    updateCidade: function (e){
      this.nomeCidade = e.text;
      this.$emit('update:nome_cidade', e.text);
      //this.$emit('update:ibgeCidade', e.value);
    },
    getEstados: function () {
      if(this.$store.state.pessoas.estados.length > 0) return Promise.resolve(false);

      // carrega lista de estados
      let temp = [];

      return axios
          .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
          .then(response => {
            let uf = response.data;
            uf.sort(function (a, b) {
              return (a.sigla > b.sigla) ? 1 : ((b.sigla > a.sigla) ? -1 : 0);
            });
            for (const i in uf) {
              const atual = uf[i];
              temp.push({value: atual.sigla, text: atual.nome, ibge: atual.id});
            }
            return temp;
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
    },
    getCidades: function () {
      if(this.$store.state.pessoas.cidades.length > 0) return Promise.resolve(false);

      // sempre chamar após os estados
      let temp = [];
      for (const i in this.$store.state.pessoas.estados) {
        temp[this.$store.state.pessoas.estados[i].value] = [];
      }

      // carrega lista de cidades
      return axios
          .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
          .then(response => {
            for (const i in response.data) {
              const atual = response.data[i];
              temp[atual.microrregiao.mesorregiao.UF.sigla].push({value: atual.id, text: atual.nome});
            }
            return temp;
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          });
    }
  },
  created() {
    this.getEstados().then((response) => {
      if (response){
        this.$store.commit('saveEstados', response);
      }
      this.getCidades().then((retorno) => {
        if (retorno) {
          this.$store.commit('saveCidades', retorno)
        }
      });
    });
  },
  computed: {
    listaEstados() {
      return this.$store.state.pessoas.estados;
    },
    listaCidades() {
      return this.$store.state.pessoas.cidades;
    }
  },
  beforeDestroy() {
    //delete localStorage.estados;
  },
  watch: {
    // uf: function (){
    //   $('#'+this.$children[0].getNome()).change();
    // },
    ibgeCidade: function () {
      $('#'+this.$children[1].getNome()).change();
    }
  }
}
</script>