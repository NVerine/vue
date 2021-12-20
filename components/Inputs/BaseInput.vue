<template>
  <div
      class="form-group"
      :class="{
      'input-group-focus': focused,
      'has-danger': error,
      'has-label': label,
    }"
  >
    <div class="form-group bmd-form-group" :class="{'is-filled': value}">
      <label class="bmd-label-floating">{{ label }} {{ required ? '*' : '' }}</label>
      <input
          :value="value"
          v-bind="$attrs"
          v-on="listeners"
          class="form-control"
          @keydown="lockSize"
      >
    </div>

    <slot name="error" v-if="error || $slots.error">
      <label class="error">{{ error }}</label>
    </slot>
    <slot name="helperText"></slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'base-input',
  props: {
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      description: 'Input label|name'
    },
    error: {
      type: String,
      description: 'Input error',
      default: ''
    },
    value: {
      type: [String, Number],
      description: 'Input value'
    },
    size: {
      type: [String, Number],
      description: 'Input value size in chars'
    },
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      focused: false,
      touched: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      };
    },
  },
  methods: {
    onInput(evt) {
      if (!this.touched) {
        this.touched = true;
      }
      this.$emit('input', evt.target.value);
    },
    onFocus(evt) {
      this.focused = true;
      this.$emit('focus', evt)
    },
    onBlur(evt) {
      this.focused = false;
      this.$emit('blur', evt)
    },
    lockSize: function (e) {
      if (!this.size)
        return;
      if (e.target.value.length >= this.size && !(e.key === "Backspace" || e.key === "Tab")) {
        e.preventDefault();
      }
    },
  }
};
</script>
<style></style>
