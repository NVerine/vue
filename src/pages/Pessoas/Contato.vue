<template>
  <div class="card m-0 mb-2 p-2 p-md-0" id="dynamic_contatos">
    <div class="card-body p-0">
      <div class="row mx-0 px-2" :class="(ativo == index)? 'bg-info': ''"
           v-for="(linha, index) in contatos" :key="contatos[index].id">
        <div class="col-md-12 p-0">

          <div v-if="linha.exclui" class="btn btn-success fa fa-plus btn-list btn-sm btn-round btn-fab"
               @click="linha.exclui = null" title="Manter item"></div>
          <div v-else class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
               @click="removeArray(contatos, index)" title="Excluir item"></div>

          <field prefixo="contato" :index="index" nome="id" tipo="hidden" :modelo.sync="linha.id"></field>
          <field prefixo="contato" :index="index" nome="Nome" :modelo.sync="linha.nome" tamanho="4"></field>
          <field prefixo="contato" :index="index" descricao="E-mail" nome="email" tipo="email"
                 :modelo.sync="linha.email" tamanho="5"></field>
          <field prefixo="contato" :index="index" nome="Telefone" :modelo.sync="linha.telefone" @update:modelo="setPhoneMask($event, index)" tamanho="3"></field>
        </div>
      </div>
      <button type="button" class="btn btn-info fa fa-plus m-2"
              @click="copiaArray(contatoModelo, contatos)" title="Inserir novo item"></button>
    </div>
  </div>
</template>

<script>
import field from "@/components/field";
import TableFieldsMixin from "@/mixed/vue-mix/TableFieldsMixin";
import VMasker from "vanilla-masker";

export default {
  name: "Contato",
  components: { field },
  mixins: [TableFieldsMixin],
  props: ["contatos", "ativo"],
  data () {
    return {
      contatoModelo: {
        email: null,
        nome: null,
        telefone: null,
        excluir: false
      },
    };
  },
  methods: {
    setPhoneMask: function (e, index){
      this.contatos[index].telefone = VMasker.toPattern(this.contatos[index].telefone, "(99)9999-99999");
    }
  },
};
</script>

<style scoped>
.bg-info{
  background-color: rgba(25, 189, 210, 0.2)!important;
}
</style>