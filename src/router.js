import Vue from "vue";
import Router from "vue-router";
import Error from "./pages/Error";
import Refresh from "./pages/Refresh";
import NotifyCard from "./layout/NotifyCard";
import MainMenu from "./layout/MainMenu";
import MainFooter from "./layout/MainFooter";
import MainNavbar from "./layout/MainNavbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicNavbar from "@/layout/PublicNavbar";
import EditaTest from "@/pages/Test/EditaTest";
import PesquisaTest from "@/pages/Test/PesquisaTest";
import EditaQuestion from "@/pages/Test/EditaQuestion";
import PesquisaQuestion from "@/pages/Test/PesquisaQuestion";
import EditaNCM from "@/pages/Trib/EditaNCM";
import PesquisaNCM from "@/pages/Trib/PesquisaNCM";

// pages do sistema
import PessoasPesquisa from "./pages/Pessoas/PesquisaPessoas";
import PessoasEdita from "./pages/Pessoas/EditaPessoas";
import UsuariosEdita from "./pages/Usuarios/EditaUsuarios";
import UsuariosPesquisa from "./pages/Usuarios/PesquisaUsuarios";
import PermissoesEdita from "./pages/Permissoes/EditaPermissoes";
import PermissoesPesquisa from "./pages/Permissoes/PesquisaPermissoes";
import ProdutosEdita from "./pages/Produtos/EditaProdutos";
import ProdutosPesquisa from "@/pages/Produtos/PesquisaProdutos";
import PesquisaTipOperacao from "@/pages/Trib/PesquisaTipoOperacao";
import EditaTipoOperacao from "@/pages/Trib/EditaTipoOperacao";
import FamiliaProdutosEdita from "./pages/Produtos/FamiliaProdutos";
import PesquisaCFOP from "./pages/Trib/PesquisaCFOP";
import EditaCFOP from "./pages/Trib/EditaCFOP";
import PesquisaCST from "./pages/Trib/PesquisaCST";
import EditaCST from "./pages/Trib/EditaCST";
import RespondeDisponibilidade from "@/pages/Disponibilidade/RespondeDisponibilidade";
import EditaFilial from "@/pages/Filial/EditaFilial";
import PesquisaFilial from "@/pages/Filial/PesquisaFilial";
import EditaComercial from "@/pages/Comercial/EditaComercial";
import PesquisaComercial from "@/pages/Comercial/PesquisaComercial";
import EditaPerfil from "./pages/Usuarios/EditaPerfil";

Vue.use(Router);

const fixed_routes = [
  {path:"/p/refresh", name:"refresh", components: { default: Refresh}},
  {path:"/p/login", name:"login", components: { default: Login}},
  {path:"/p/logout", name:"logout"},
  {path:"/p/dashboard", name:"dashboard",
    components: {
      default: Dashboard,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/error", name:"error",
    components: {
      default: Error,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/", name:"root", redirect: { name: "dashboard" }},
  {path:"/p/", name:"index", redirect: { name: "dashboard" }},
];

const public_routes = [
  {path:"/disponibilidade/:id", name:"public_disponibilidade_edita",
    components: {
      default: RespondeDisponibilidade,
      header: PublicNavbar
    }
  },
];

const private_routes = [
  {path:"/p/pessoas", name:"pessoas_pesquisa",
    components: {
      default: PessoasPesquisa,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/pessoas/:id", name:"pessoas_edita",
    components: {
      default: PessoasEdita,
      notify: NotifyCard,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/permissoes", name:"permissoes_pesquisa",
    components: {
      default: PermissoesPesquisa,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/permissoes/:id", name:"permissoes_edita",
    components: {
      default: PermissoesEdita,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/usuarios", name:"usuarios_pesquisa",
    components: {
      default: UsuariosPesquisa,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/perfil", name:"perfil_edita",
    components: {
      default: EditaPerfil,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/usuarios/:id", name:"usuarios_edita",
    components: {
      default: UsuariosEdita,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/produtos/:id", name:"produtos_edita",
    components: {
      default: ProdutosEdita,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/produtos", name:"produtos_pesquisa",
    components: {
      default: ProdutosPesquisa,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/tipooperacao/:id", name:"tipoOperacao_edita",
    components: {
      default: EditaTipoOperacao,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/tipooperacao", name:"tipoOperacao_pesquisa",
    components: {
      default: PesquisaTipOperacao,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/familia_produtos/", name:"familiaProdutos_edita",
    components: {
      default: FamiliaProdutosEdita,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/cfop/", name:"cfop_pesquisa",
    components: {
      default: PesquisaCFOP,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/cfop/:id", name:"cfop_edita",
    components: {
      default: EditaCFOP,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/ncm/", name:"ncm_pesquisa",
    components: {
      default: PesquisaNCM,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/ncm/:id", name:"ncm_edita",
    components: {
      default: EditaNCM,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/cst/", name:"cst_pesquisa",
    components: {
      default: PesquisaCST,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/cst/:id", name:"cst_edita",
    components: {
      default: EditaCST,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/test/:id", name:"test_edita",
    components: {
      default: EditaTest,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/test", name:"test_pesquisa",
    components: {
      default: PesquisaTest,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/question/:id", name:"question_edita",
    components: {
      default: EditaQuestion,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/question", name:"question_pesquisa",
    components: {
      default: PesquisaQuestion,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/filial/:id", name:"filial_edita",
    components: {
      default: EditaFilial,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/filial", name:"filial_pesquisa",
    components: {
      default: PesquisaFilial,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/comercial/:id", name:"comercial_edita",
    components: {
      default: EditaComercial,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
  {path:"/p/comercial", name:"comercial_pesquisa",
    components: {
      default: PesquisaComercial,
      header: MainNavbar,
      menu: MainMenu,
      footer: MainFooter
    }
  },
];

const router = new Router({
  // mode: 'history',
  routes: fixed_routes.concat(public_routes, private_routes),
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;