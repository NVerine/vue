<template>
  <div v-show="$store.state.interfacectrl.isShowingMessages" id="message-log">
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
</template>

<script>
export default {
  name: "MessagesLog"
}
</script>