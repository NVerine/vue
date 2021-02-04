const CommonMixin = {
    data(){
      return{
        VMASKER_MONEY_CONFIG: {
            // Decimal precision -> "90"
            precision: 2,
            // Decimal separator -> ",90"
            separator: ',',
            // Number delimiter -> "12.345.678"
            delimiter: '.',
            // Money unit -> "R$ 12.345.678,90"
            unit: 'R$',
            // Money unit -> "12.345.678,90 R$"
            suffixUnit: 'R$',
            // Force type only number instead decimal,
            // masking decimals with ",00"
            // Zero cents -> "R$ 1.234.567.890,00"
            zeroCents: true
        }
      }
    },
    methods: {
        insereZero: function(number, length) {
            let my_string = '' + number;
            while (my_string.length < length) {
                my_string = '0' + my_string;
            }
            return my_string;
        }
    }
};

export default CommonMixin;

