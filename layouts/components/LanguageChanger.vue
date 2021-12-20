<template>
    <slct name="language_changer"
          :opt="getOpt"
          :value="$i18n.locale"
          dropup
          @input="$i18n.setLocale"
    >
    </slct>
</template>

<script>
export default {
  name: "LanguageChanger",
  computed: {
    getOpt: function () {
      return this.$i18n.locales.map(function(num) {
        return { text: num.name, value: num.code}
      });
    }
  }
}
</script>