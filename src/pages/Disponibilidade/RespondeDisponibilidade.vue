<template>
  <div class="card">
    <div class="card-header card-header-text card-header-success">
      <div class="card-text">
        <div class="card-title">
          Pesquisa de disponibilidade
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <field nome="Nickname" requerido="true" tamanho="6" :modelo.sync="dados.nome"></field>
          <field nome="Telefone" requerido="true" comprimento="14" tamanho="6" :modelo.sync="dados.telefone"></field>
        </div>
      </div>

      <div class="card m-0 my-2 p-2">
        <div class="card-body">
          <p>Adicione e preencha os períodos com dia e hora</p>
          <div class="row" v-for="(linha, index) in periodos" :key="periodos[index].id">
            <div class="col-md-12 p-0">
              <div class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
                   @click="removeArray(periodos, index)" title="Excluir item"></div>
              <field prefixo="periodos" :index="index" nome="id" tipo="hidden" :modelo.sync="linha.id"></field>
              <slct prefixo="periodos" :index="index" nome="Dia" tamanho="6" :modelo.sync="linha.dia" :opt="dias_semana"></slct>
              <field prefixo="periodos" :index="index" descricao="Hora início" nome="inicio" :modelo.sync="linha.hora_inicio"
                     funcao="datepicker-time" tamanho="3"></field>
              <field prefixo="periodos" :index="index" descricao="Hora termino" nome="termino" :modelo.sync="linha.hora_termino"
                     funcao="datepicker-time" tamanho="3"></field>
            </div>
          </div>
          <button type="button" class="btn btn-info fa fa-plus"
                  @click="copiaArray(periodo_modelo, periodos)" title="Inserir novo item"></button>
        </div>
      </div>
      <div class="col-md-4 float-right pr-0">
        <button type="button" class="btn btn-block btn-success"
                @click="enviar('/api/disponibilidade/')">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import field from "@/components/field";
import TableFieldsMixin from "@/mixed/vue-mix/TableFieldsMixin";
import slct from "@/components/slct";
import EditaMixins from "@/mixed/vue-mix/EditaMixin";
import VMasker from "vanilla-masker";

export default {
  name: "RespondeDisponibilidade",
  components: { field, slct },
  mixins: [TableFieldsMixin, EditaMixins],
  data: function () {
    return {
      periodos: [],
      periodo_modelo: {
        dia: null,
        hora_inicio: null,
        hora_termino: null
      },
      dias_semana: [
        {value: 0, text: "Domingo"},
        {value: 1, text: "Segunda"},
        {value: 2, text: "Terça"},
        {value: 3, text: "Quarta"},
        {value: 4, text: "Quinta"},
        {value: 5, text: "Sexta"},
        {value: 6, text: "Sábado"}
      ]
    };
  },
  watch: {
    "dados.telefone": function () {
      if(!this.dados.telefone) {
        return;
      }
      this.dados.telefone = VMasker.toPattern(this.dados.telefone.toString(), "(99)99999-9999");

    }
  }
};
</script>