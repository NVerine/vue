const TableFieldsMixin = {
  methods: {
    copiaArray: function (arr, obj) {
      obj.push(Object.assign({}, arr));
    },
    removeArray: function (arr, pos) {
      arr.splice(pos, 1);
    }
  }
};

export default TableFieldsMixin;