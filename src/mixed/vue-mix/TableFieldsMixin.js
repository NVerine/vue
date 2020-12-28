const TableFieldsMixin = {
  methods: {
    copiaArray: function (arr, obj) {
      obj.push(Object.assign({}, arr));
    },
    removeArray: function (arr, pos) {
      if(arr[pos].id){
        this.$set(arr[pos], 'exclui', true);
      }
      else{
        arr.splice(pos, 1);
      }
    }
  }
};

export default TableFieldsMixin;