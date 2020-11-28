<template>
  <li class="nav-item dropdown main-menu d-block d-sm-none">
    <a class="nav-link p-2 p-md-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="material-icons">menu</i>
    </a>
    <div class="dropdown-menu dropdown-menu-right hiding">
      <h4 class="dropdown-header">Menu</h4>
      <form class="accordion">
        <div v-for="(item, i) in itens" :key="i" class="menu-body">

          <div v-if="item.children">
            <a class="p-2 menu-header d-block" data-toggle="collapse" :href="'#menu-mobile'+i" @click.prevent="">
              <i :class="'px-2 ' + item.icon"></i>
              {{ item.nome }}
            </a>
            <div class="collapse" :id="'menu-mobile'+i">
              <ul class="nav menu-list">
                <li v-for="(c, index) in filteredChildren(item)" :key="index" class="nav-item menu-list-item col-12 p-0">
                  <router-link class="nav-link menu-link" :to="{name: index}">
                    <span class="sidebar-mini pr-3"> {{ c.nome.substring(0,1) }} </span>
                    <span class="sidebar-normal"> {{ c.nome }} </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <div v-else>
            <router-link class="p-2 menu-header d-block" :to="{name: i}"
                         v-if="$router.resolve({name: i}).resolved.matched.length">
              <i :class="'px-2 ' + item.icon"></i>
              {{ item.nome }}
            </router-link>
          </div>

        </div>
      </form>
    </div>
  </li>
</template>

<script>
  import MenuMixin from "../mixed/vue-mix/MenuMixin";
    export default {
        name: "mobile-menu",
        mixins: [MenuMixin],
        watch:{
            $route (){
                $('.main-menu .collapse.show').each(function(){
                    $(this).collapse('hide');
                });
                $("#navbarDropdown").dropdown("toggle");
            }
        },
    };
</script>

<style scoped>
  .sidebar-mini{
    color: #007bff;
    font-weight: 900;
  }
</style>
