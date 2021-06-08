<template>
  <div style="position:relative;" class="sidebar d-none d-sm-block col-md-2 col-sm-3 p-0" id="main-menu"
       data-color="green" data-background-color="black" data-image="/images/sidebar-1.jpg">
    <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
    <div class="sidebar-wrapper page-height" style="width: 100%">
      <ul class="nav">
        <li v-for="(item, i) in itens" :key="i" class="nav-item">
<!--          <div v-if="$store.state.permissoes[item.rotaApi]">-->
          <div v-if="item.children">
            <a class="nav-link overflow-hidden" data-toggle="collapse" :href="'#plus'+i" @click.prevent="">
              <i :class="item.icon"></i>
              <p> {{ item.nome }}
                <b class="caret"></b>
              </p>
            </a>
            <div class="collapse" :id="'plus'+i">
              <ul class="nav">
                <li v-for="(c, index) in item.children" :key="index" class="nav-item">
                  <router-link class="nav-link" :to="{name: index}">
                    <span class="sidebar-mini"> {{ c.nome.substring(0,1) }} </span>
                    <span class="sidebar-normal"> {{ c.nome }} </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <router-link class="nav-link" :to="{name: i}" v-if="$router.resolve({name: i}).resolved.matched.length">
              <i :class="item.icon"></i>
              <p> {{ item.nome }} </p>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MenuMixin from "../mixed/vue-mix/MenuMixin";
export default {
  name: "MainMenu",
  mixins: [ MenuMixin ],
  methods: {
    toggleActive: function (path, reloaded = false) {
      $("#main-menu .nav-item.active").removeClass("active");
      if(path.toString() === "/"){
        return;
      }

      let active = $("#main-menu [href*='"+path+"']")[0];
      $(active).parents(".nav-item").addClass("active");

      setTimeout(function () {
        if(!reloaded){
          $("#main-menu .nav-item:not(.active) .collapse").collapse("hide");
        }
        else{
          $("#main-menu .nav-item.active .collapse").collapse("show");
        }
      }, 500);
    },
  },
  watch:{
    $route (to){
      this.toggleActive(to.path);
    }
  },
  updated: function () {
    this.$nextTick(function () {
      this.toggleActive(this.$router.currentRoute.path, true);
    });
  },
  created() {
    this.$store.dispatch("loadPermissoes");
  }
};
</script>