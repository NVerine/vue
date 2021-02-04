<template>
  <draggable class="row px-3" group="question" @end="onMoveCallback">
    <div v-for="(q, i) in lista" :key="q.id" class="bg-white border p-1 px-2 align-items-start col-12">
      <input type="hidden" :id="'ordem_'+q.id" v-model="q.ordem">
      <div class="d-flex">
        <h5 class="mb-1"><strong>{{q.id}} - {{ q.title }}</strong></h5>
        <field v-if="ativos" nome="weight" :index="q.id" :modelo.sync="q.weight"
               class="ml-auto d-flex" style="margin-top: 0!important;"></field>
      </div>
      <div class="d-flex">
        <binary-input classe="float-left" :index="i" descricao="Is active" nome="is_active" :modelo.sync="q.active"></binary-input>
        <div class="ml-auto d-flex">
          <p class="mr-2" v-if="q.disciplina"><small>{{q.disciplina.segmento}} - {{q.disciplina.name}}</small></p>
          <button type="button" class="btn btn-sm btn-round" :class="q.expand ? 'btn-danger' : 'btn-success'"
                  @click="expandir(q)">...</button>
        </div>
      </div>
      <div class="px-2 pb-2" v-if="q.expand">
        <p class="mb-1">{{q.description}}</p>
        <ul class="m-0" v-if="q.opt.length > 0">
          <li v-for="(opt) in q.opt" :key="opt.id">
            <small>{{opt.text}}</small>
          </li>
        </ul>
      </div>
    </div>
  </draggable>
</template>

<script>
import binaryInput from "@/components/binaryInput";
import draggable from "vuedraggable";
import field from "@/components/field";

export default {
  name: "questionlist",
  components: { binaryInput, draggable, field},
  props : ["lista", "ativos"],
  methods: {
    expandir: function (item) {
      this.$set(item, "expand", !item.expand);
    },
    onMoveCallback: function(evt){
      // reordena��o
      for (let i=0; evt.to.children.length > i; i++) {
        $(evt.to.children[i]).find("[id^='ordem']").val(i+1)[0].dispatchEvent(new Event("input"));
      }
      if(evt.from !== evt.to){
        $(evt.item).find("input:checkbox").click();
      }
    }
  }
};
</script>

<style scoped>
.sortable-chosen.sortable-fallback.sortable-drag{
  opacity: 1 !important;
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
}
</style>