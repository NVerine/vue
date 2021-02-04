<template>
  <div v-if="$store.state.interfacectrl.messages.length > 0" class="row">
    <div class="card mb-1">
      <div :class="'card-header row card-header card-header-' + (tipo ? tipo : 'warning' )">
        <div :class="retorno ? 'col-md-4' : 'col-md-12'">
          <h4 class="card-title" :class="retorno ? '' : 'p2'">{{titulo || 'Atenção'}}</h4>
        </div>
        <div v-if="retorno" class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0">
                <li class="nav-item text-center">
                  <a class="nav-link" @click="$router.go(-2)">
                    <i class="material-icons fa fa-undo"></i>
                    <span>Retornar</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <ul>
          <li v-for="(m, i) in $store.state.interfacectrl.messages" :key="i"><div v-html="m.texto"></div></li>
        </ul>
        <div v-if="retorno" class="col-md-4 float-right">
          <button type="button" class="btn btn-block btn-warning" @click="$router.go(-1)">Quero tentar novamente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotifyCard",
  props: ["titulo", "tipo", "retorno"]
};
</script>