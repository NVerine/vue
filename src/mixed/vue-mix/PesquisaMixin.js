import axios from 'axios';
import router from "../../router";

const PesquisaMixin = {
    data: function () {
        return {
            itens: [],
            dados: {
                pesq_limite: this.$route.query.pesq_limite || 10,
                // pesq_cpfCnpj: this.$route.query.pesq_cpfCnpj,
                // pesq_nome: this.$route.query.pesq_nome,
                pesq_offset: this.$route.query.pesq_offset || 0
            },
            limiteItens: [
                {value: 10, text: 10},
                {value: 25, text: 25},
                {value: 50, text: 50},
                {value: 100, text: 100}
            ],
        }
    },
    methods: {
        appEndURL(arr){
            let rota = {path: router.currentRoute.path, query: arr};

            // esta horrivel, mas é a unica maneira
            this.$router.replace({name: "error"});
            this.$router.replace(rota);
        },
        getItens: function(){
            let url = this.urlApi;
            let dados = Object.assign(this.dados, router.currentRoute.query);
            return axios
                .get(url, { params: dados })
                .then(response => {
                    if(response.data.dados.length > 0) this.itens = response.data.dados;
                    else this.itens = [];
                    if(response.data.notify.length > 0) {
                        let isErrored = false;
                        for (const i in response.data.notify) {
                            if(response.data.notify[i].tipo === "danger") isErrored = true;
                            this.$store.commit('addMessage', response.data.notify[i]);
                        }
                        if(isErrored) router.push({ name: 'error' })
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        updateOffset: function(val){
            this.dados.pesq_offset = val;
            this.enviaForm()
        },
        limpaForm: function () {
            let rota = {name: router.currentRoute.name};

            // esta horrivel, mas é a unica maneira
            this.$router.replace({name: "error"});
            this.$router.replace(rota);

        },
        enviaForm: function () {
            this.appEndURL(this.$route.query);
            this.getItens();
        },
    },
    mounted: function() {
        this.getItens();
    },
    computed: {
        listOffsets: function () {
            let start = parseInt(this.dados.pesq_offset)-2;
            let arr = [];
            if (start < 0) start = 0;
            for (let i = start; i <= parseInt(this.dados.pesq_offset)+3; i++){
                arr[i] = i+1;
            }
            return arr;
        }
    },
    watch: {
        'dados.pesq_limite': function () {
            this.enviaForm();
        }
    },
};

export default PesquisaMixin;