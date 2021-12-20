import Vue from 'vue'

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('capitalizeToCamelCase', function (value) {
  if (!value) return ''
  value = value.toString().toLowerCase();
  value = value.replace( "_", " " );
  value = value.replace( /([A-Z])/g, " $1" );
  return value.charAt(0).toUpperCase() + value.slice(1)
})