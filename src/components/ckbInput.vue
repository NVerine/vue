<template>
  <div class="form-check">
    <label class="form-check-label">
      <input
        :id="'campo_'+nomeInterno"
        :name="nomeInterno"
        data-toggle="checkbox"
        :checked="modelo"
        type="checkbox"
        class="form-check-input"
        @click="onChange($event)"
      >
      {{ descricao || nome }}
      <span class="form-check-sign"><span class="check" /></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CkbRadio",
  props : ["nome", "descricao", "modelo"],
  data() {
    return{
      nomeInterno: this.nome.toLowerCase()
    };
  },
  methods: {
    onChange: function (event) {
      this.$emit("update:modelo", event.target.checked);
    },
  },
};
</script>