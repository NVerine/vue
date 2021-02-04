<template>
  <div v-if="!$route.name"><h1>404</h1></div>
  <div v-else-if="$route.name != 'login' && !$route.name.includes('public')" style="width:100%;">
    <header>
      <router-view name="header" />
    </header>
    <main>
      <div class="container-fluid">
        <div class="row">
          <router-view name="menu" />
          <div v-if="$store.state.interfacectrl.isLoading > 0" id="spinner" class="loader">Loading...</div>
          <div v-if="$store.state.interfacectrl.isLoading > 0 || $store.state.interfacectrl.isErrored" class="col-md-10 offset-2 dark-overlay overlay-spinner"></div>
          <div id="page-scroll" class="page-scroll col-md-10 col-sm-9 page-height">
            <div class="sitemap mt-md-4 mt-3">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6 col-sm-6">
                    <div class="float-left">
                      Empresa Teste
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <div class="float-right mt-md-0 mt-2 mt-sm-0">
                      <span id="modulo">Cadastros </span>
                      <i class="fa fa-angle-right" />
                      <span id="pagina"> Pessoas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="wrapper">
              <div class="main-panel">
                <div class="content pb-0 pt-2 p-md-3 p-1">
                  <div id="main-content" :key="$store.state.interfacectrl.appState">
                    <router-view name="notify" />
                    <router-view />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- log -->
    <div v-show="showMessages" id="message-log">
      <h5 class="p-3 m-0">Mensagens do sistema</h5>
      <div class="messages-wrapper m-0 p-1">
        <ol id="lista-mensagens" class="pl-1 pr-1">
          <li class="typo p-2 danger">
            <div class="clear">
              <span class="pull-left">
                titulo aqui
              </span>
              <span class="pull-right">
                1203912039
              </span>
              <p class="m-0">
                mensagem aqui
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>

    <router-view :show.sync="showMessages" name="footer" />
  </div>
  <div v-else-if="$route.name.includes('public')">
    <header>
      <router-view name="header" />
    </header>
    <main>
      <div class="container-fluid">
        <div class="row">
          <router-view name="menu" />
          <div id="page-scroll" class="col-md-12">
            <div class="wrapper">
              <div class="main-panel">
                <div class="content pb-0 pt-2 p-md-3 p-1">
                  <div id="main-content" :key="$store.state.interfacectrl.appState">
                    <router-view name="notify" />
                    <router-view />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <router-view v-else />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showMessages: false
    };
  }
};
</script>
