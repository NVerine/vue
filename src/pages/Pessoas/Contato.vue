<template>
  <div class="card m-0 mb-2 p-2 p-md-0" id="dynamic_contatos">
    <div class="card-body">
      <div class="row" v-for="(linha, index) in contatos" :key="contatos[index].id">
        <div class="col-md-12 p-0">
          <template v-if="!linha.id">
            <!--                          <div class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"-->
            <!--                               @click="removeArray(dados.contato, index)"></div>-->
          </template>
          <template v-else>
            <div class="btn btn-danger btn-list btn-sm btn-round btn-fab fa fa-times"
                 @click="removeArray(contatos, index)"></div>
          </template>
          <field prefixo="contato" :index="index" nome="id" tipo="hidden" :modelo.sync="linha.id"></field>
          <field prefixo="contato" :index="index" nome="Nome" :modelo.sync="linha.nome" tamanho="4"></field>
          <field prefixo="contato" :index="index" descricao="E-mail" nome="email" tipo="email"
                 :modelo.sync="linha.email" tamanho="5"></field>
          <field prefixo="contato" :index="index" nome="Telefone" :modelo.sync="linha.telefone" tamanho="3"></field>
        </div>
      </div>
      <button type="button" class="btn btn-info fa fa-plus"
              @click="copiaArray(contatoModelo, contatos)" title="Inserir novo item"></button>
    </div>
  </div>
</template>

<script>
import field from "@/components/field";
import TableFieldsMixin from "@/mixed/vue-mix/TableFieldsMixin";

export default {
  name: "Contato",
  components: { field },
  mixins: [TableFieldsMixin],
  props: ['contatos'],
  data () {
    return {
      contatoModelo: {
        email: null,
        nome: null,
        telefone: null,
        excluir: false
      },
    }
  },
}
</script>