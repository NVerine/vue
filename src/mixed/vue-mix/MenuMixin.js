import VMasker from "vanilla-masker";

const MenuMixin = {
  data: function () {
    return {
      itens: {
        //daqui pra baixo estão ignorados
        cadastro: {
          nome: "cadastro", icon: "fa fa-pencil", children: {
            pessoas_pesquisa: {
              nome: "Pessoas",
              rotaApi: "api_pessoa_index",
              rotasVue: ["pessoas_edita"]
            },
            filial_pesquisa: {
              nome: "Filial",
              rotaApi: "api_filial_index",
              rotasVue: ["filial_edita"]
            },
          }
        },
        ProdServ: {
          nome: "Prod/Serv", icon: "fa fa-gift", children: {
            produtos_pesquisa: {
              nome: "Produtos/Serviços",
              rotaApi: "api_produto_index",
              rotasVue: ["produtos_edita"]
            },
            familiaProdutos_edita: {
              nome: "Familia de produtos",
              rotaApi: "api_familia_produto_index",
              rotasVue: []
            },
          },
        },
        Fiscal: {
          nome: "Fiscal", icon: "fa fa-calendar-times-o", children: {
            tipoOperacao_pesquisa: {
              nome: "Tipo Operação",
              rotaApi: "api_tipo_operacao_index",
              rotasVue: ["tipoOperacao_edita"]
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
            },
            ncm_pesquisa: {
              nome: "NCM",
              rotaApi: "api_trib_ncm_index",
              rotasVue: ["ncm_edita"]
            }
          }
        },
        Comercial: {
          nome: "Comercial", icon: "fa fa-money", children: {
            comercial_pesquisa: {
              nome: "Vendas",
              rotaApi: "api_comercial_index",
              rotasVue: ["tipoOperacao_edita"]
            },
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
        //daqui pra cima estão ignorados
      }
    };
  },
  methods: {
    montaMenu: function () {
      const menu = {
        cadastro: { nome: "cadastro", icon: "fa fa-pencil", children: {}},
        UAC: { nome: "UAC", icon: "fa fa-user", children: {}}
      };

      //cadastro
      if (this.$store.state.permissions.permissoes["api_pessoa_index"])
        menu.cadastro.children["pessoas_pesquisa"] = {nome: "Pessoas", rotasVue: ["pessoas_edita"]};
      if (this.$store.state.permissions.permissoes["api_filial_index"])
        menu.cadastro.children["filial_pesquisa"] = {nome: "Filial", rotasVue: ["filial_edita"]};

      //UAC
      if (this.$store.state.permissions.permissoes["api_user_index"])
        menu.UAC.children["usuarios_pesquisa"] = {nome: "Usuários", rotasVue: ["usuarios_edita"]};
      if (this.$store.state.permissions.permissoes["api_permissoes_index"])
        menu.UAC.children["permissoes_pesquisa"] = {nome: "Permissões", rotasVue: ["permissoes_edita"]};

      this.$set(this, "itens", menu);
    },
  },
  watch: {
    "$store.state.permissions.permissoes": function () {
      this.montaMenu();
    },
  }
};

export default MenuMixin;