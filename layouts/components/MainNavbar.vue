<template>
  <nav class="navbar p-1 m-0 navbar-expand-md fixed-top">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <router-link class="nav-link pl-0" data-toggle="tab" role="tablist" to="/">
          <img width="120" src="~/assets/images/logo.png">
        </router-link>
      </div>
      <form class="navbar-form px-0">
        <span class="bmd-form-group">
          <div class="input-group no-border">
            <input id="live-search" type="text" value="" class="form-control ui-autocomplete-input" placeholder="Pesquisar..." autocomplete="off" >
              <button type="submit" class="btn btn-info btn-round btn-just-icon d-none d-sm-block" >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </span>
      </form>
      <div id="navigation" class="my-2 my-md-0" >
        <ul class="navbar-nav mt-0 flex-column flex-sm-row">
          <mobile-menu></mobile-menu>

          <base-dropdown
              tag="li"
              title-tag="div"
              class="nav-item dropdown message-menu"
              title-classes="nav-link p-2 p-md-3 bmd-btn-icon"
              menu-classes="dropdown-menu dropdown-menu-right"
          >
            <template slot="title">
              <i class="fa fa-envelope"></i>
            </template>

            <h4 class="dropdown-header"> Mensagens </h4>
            <div class="dropdown-divider"></div>
            <div class="menu-body">
              <h5 class="menu-header" onclick="destinoMenu('mensagens&amp;u=%3F')" > Ver mais </h5>
            </div>
          </base-dropdown>

          <base-dropdown
              tag="li"
              title-tag="div"
              class="nav-item dropdown alert-menu"
              title-classes="nav-link p-2 p-md-3 bmd-btn-icon"
              menu-classes="dropdown-menu dropdown-menu-right"
          >
            <template slot="title">
              <i class="fa fa-bell"></i>
              <span class="notification">3</span>
            </template>

            <h4 class="dropdown-header"> Mensagens </h4>
            <a class="dropdown-item py-1 d-block px-2" href="?pagina=suporte_chamados&amp;pesq_chamado=141" >
              <p class="row m-0" style="white-space:pre-wrap;" >
                <strong>Atraso:</strong> Google analytics/ADS
              </p>
              <p class="m-0 mt-2">
                  <span class="misterio">
                    <i class="fa fa-calendar-o"></i>
                  </span>
              </p>
            </a>
            <a class="dropdown-item py-1 d-block px-2" href="?pagina=suporte_chamados&amp;pesq_chamado=143" >
              <p class="row m-0" style="white-space:pre-wrap;" >
                <strong>Atraso:</strong> Projetar reestruturação do Portal - Oficinas
              </p>
              <p class="m-0 mt-2">
                  <span class="misterio">
                    <i class="fa fa-calendar-o"></i>
                  </span>
              </p>
            </a>
            <a class="dropdown-item py-1 d-block px-2" href="?pagina=suporte_chamados&amp;pesq_chamado=161" >
              <p class="row m-0" style="white-space:pre-wrap;" >
                <strong>Atraso:</strong> Permissões de visualizações - EDUCACIONAL
              </p>
              <p class="m-0 mt-2">
                  <span class="misterio">
                    <i class="fa fa-calendar-o"></i>
                  </span>
              </p>
            </a>

          </base-dropdown>

          <base-dropdown
              tag="li"
              title-tag="div"
              class="nav-item dropdown user-menu"
              title-classes="nav-link p-2 p-md-3 bmd-btn-icon"
              menu-classes="dropdown-menu dropdown-menu-right"
          >
            <template slot="title">
              <i class="fa fa-user"></i>
            </template>

            <h4 class="dropdown-header">
              <img src="uploads/galeria/teste/usuario/Anotacao_2020-01-09_115139.png">
            </h4>
            <div class="menu-body">
              <nuxt-link class="menu-header no-decoration" to="/perfil">
                {{ usuario_nome }}
                <span class="misterio d-block">{{ grupo }}</span>
              </nuxt-link>
            </div>
            <div class="dropdown-divider"></div>
            <div class="menu-body">
              <a href="#" class="menu-header no-decoration active nuxt-link-active" @click.prevent.stop="$helper.logout"> Sair </a>
            </div>


          </base-dropdown>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import MobileMenu from "./MobileMenu";
export default {
  name: "MainNavbar",
  components: { MobileMenu },
  data: function () {
    return {
      usuario_nome: this.$store.state.session.usuario_nome,
      grupo: this.$store.state.session.grupo
    };
  }
};
</script>

<style scoped>
.no-decoration{
  display: block;
  color: #505050;
}
.no-decoration:hover{
  background-color: transparent;
  color: #505050;
  box-shadow: none !important;
}
</style>
