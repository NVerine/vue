const MenuMixin = {
    data: function () {
        return {
            itens: {
                dashboard: {
                    nome: "dashboard",
                    icon: "fa fa-area-chart",
                    rotaApi: "api_pessoa_index",
                    rotasVue: ["pessoas_edita"]
                },
                cadastro: {
                    nome: "cadastro", icon: "fa fa-pencil", children: {
                        pessoas_pesquisa: {
                            nome: "Pessoas",
                            rotaApi: "api_pessoa_index",
                            rotasVue: ["pessoas_edita"]
                        },
                    }
                },
                ProdServ: {
                    nome: "Prod/Serv", icon: "fa fa-gift", children: {
                        familiaProdutos_edita: {
                            nome: "Familia de produtos",
                            rotaApi: "api_familia_produto_index",
                            rotasVue: []
                        },
                        cfop_pesquisa: {
                            nome: "CFOP",
                            rotaApi: "api_trib_cfop_index",
                            rotasVue: ["cfop_edita"]
                        },
                        cst_pesquisa: {
                            nome: "CST",
                            rotaApi: "api_trib_cst_index",
                            rotasVue: ["cst_edita"]
                        }
                    }
                },
                UAC: {
                    nome: "UAC", icon: "fa fa-user", children: {
                        usuarios_pesquisa: {
                            nome: "Usuários",
                            rotaApi: "api_user_index",
                            rotasVue: ["usuarios_edita"]
                        },
                        permissoes_pesquisa: {
                            nome: "Permissões",
                            rotaApi: "api_permissoes_index",
                            rotasVue: ["permissoes_edita"]
                        }
                    }
                }
            }
        }
    },
    methods: {
        filteredChildren: function (item) {
            let temp = {};
            for (const i in item.children){
                if(this.$store.state.permissions.permissoes[item.children[i].rotaApi]){
                    this.$set(temp, i, item.children[i]);
                }
            }
            return temp;
        }
    }
};

export default MenuMixin;