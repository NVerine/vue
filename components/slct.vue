<template>
  <div class="form-group has-label">
    <div v-if="!isTable" class="control selectable">
      <div class="form-group bmd-form-group is-filled">
        <label class="bmd-label-floating label-select">{{ description }}</label>

        <v-select
            v-bind="$attrs"
            :value="value || model"
            v-on="listeners"
            :options='opt'
            :reduce="eval(reduce)"
            :label="optLabel"
            :append-to-body="true"
            :calculate-position="withPopper"
        >
          <template #no-options="{ search, searching, loading }">
            {{ $t('nothing_found') | capitalize }}
          </template>
        </v-select>
      </div>
    </div>

  </div>

</template>

<script>
import {createPopper} from '@popperjs/core'
import vSelect from 'vue-select'

export default {
  inheritAttrs: false,
  name: "slct",
  components: { vSelect },
  props: {
    description: {
      type: String,
      description: 'Input label|name'
    },
    opt: {
      type: Array,
      description: 'Options to list on select'
    },
    value: {
      type: [String, Number, Object],
      description: 'Input value'
    },
    isTable: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    dispatcher: {
      type: String,
      description: 'dispatch an action instead of update directly',
    },
    reduce: {
      type: String,
      description: 'iterate each item in array and "create" a new array of values',
      default: 'element => element.value'
    },
    optLabel: {
      type: String,
      description: 'the name of prop which gonna appear as label of each option',
      default: 'text'
    },
    model: {},
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    eval(expr) {
      return eval(expr)
    },
    onChange(evt) {
      //if is a dispatcher use it instead of updating
      if (this.dispatcher){
        this.$store.dispatch(this.dispatcher, evt);
        return;
      }

      this.$emit('input', evt);
      this.$emit("update:model", evt);
      this.$emit('model:update', evt);
    },

    withPopper(dropdownList, component, {width}) {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = width

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({state}) {
              component.$el.classList.toggle(
                  'drop-up',
                  state.placement === 'top'
              )
            },
          },
        ],
      })

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy()
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onChange,
      };
    },
    getSearch: function () {
      if (!this.options) return;
      const el = this;
      return this.options.filter(function (e) {
        return e.text.toString().toLowerCase().includes(el.search.toString().toLowerCase());
      });
    },

  }
};
</script>

<style lang="scss">
.vs--open{
  .vs__dropdown-toggle{
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.5);
  }
}
.vs__dropdown-toggle{
  border: none;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
  height: 36px;
}
.vs__dropdown-menu{
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.5);
  .vs__dropdown-option--highlight{
    background-color: #00bcd4;
  }
}
.vs__clear{
  line-height: 10px;
}
.vs--single.vs--open .vs__selected{
  position: initial;
}
</style>