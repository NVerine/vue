<template>
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
            <span id="modulo">{{$t($store.state.interfacectrl.module) | capitalize}}</span>
            <i class="fa fa-angle-right"/>
            <span id="pagina">{{$t($store.state.interfacectrl.title) | capitalize}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb"
}
</script>