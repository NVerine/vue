<template>
  <li class="nav-item text-center">
    <nuxt-link v-if="link"
               class="nav-link"
               data-toggle="tab"
               role="tablist"
               :to="localePath(link)">
      <i :class="icon"></i>
      <span>{{ title }}</span>
    </nuxt-link>
    <a v-else
       :class=" $store.state.interfacectrl.activeTab === index ? 'active' : ''"
       :href="link" class="nav-link"
       @click.stop.prevent="changeActive(index)"
    >
      <i :class="icon"></i>
      <span>{{ title }}</span>
    </a>
  </li>
</template>

<script>
export default {
  name: "TabLink",
  props: {
    title: {
      type: String,
      description: 'Title of the link'
    },
    icon: {
      type: String,
      description: 'Icon to show on left'
    },
    link: {
      type: String,
      description: 'Link to redirect'
    },
    index: {
      type: String,
      description: 'Save the index of tab to update'
    },
  },
  methods: {
    changeActive: function (e) {
      if (e){
        this.$store.dispatch("interfacectrl/updateActiveTab", e)
      }
    }
  }
};
</script>