<template>
  <div class="row">
    <div class="card mb-1">
      <div class="card-header row card-header card-header-info ">
        <div class="col-md-4">
          <h4 class="card-title">Familia de produtos</h4></div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation pull-right">
            <div class="nav-tabs-wrapper">
              <ul class="nav nav-tabs mt-0" role="tablist">
                <tab-link icon="fa fa-pencil" :txt=" dados.id ? 'Cabeçalho' : 'Cadastrar'" ativo="true" rota="#sd1"></tab-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <form name="produtos" id="edita_produto" class="col-md-12 px-md-3 p-0 pb-3" autocomplete="off">
        <div class="tab-content tab-space">
          <div class="tab-pane active" id="sd1">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 pl-0 d-flex">

                  <div class="mt-1 col-md-6">
                    <div class="control">
                      <div class="input-group form-group bmd-form-group is-filled">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="font-family: Monospace;">
                            -
                          </span>
                        </div>
                        <label for="campo_nome" class="bmd-label-floating" style="margin-left:36px;">Nome</label>
                        <input id="campo_nome" type="text" v-model="nome" class="form-control">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 py-2 pr-0 d-flex">
                    <button type="button" class="btn btn-info col-md-12" @click="addFilho(false)">+ Filho</button>
                  </div>
                </div>
              </div>
              <div v-for="(r, i) in dados.itens" :key="i" class="row">
                <div class="col-md-12 pl-0 d-flex">

                  <div class="mt-1 col-md-6">
                    <div class="control">
                      <div class="input-group form-group bmd-form-group is-filled">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="font-family: Monospace;">
                            {{r.codigo}}
                          </span>
                        </div>
                        <label :for="'campo_nome'+i" class="bmd-label-floating" :style="getTamanho(r.codigo)">Nome</label>
                        <input :id="'campo_nome'+i" type="text" v-model="r.nome" class="form-control">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 py-2 pr-0 d-flex">
                    <button v-if="r.codigo.length < 9" type="button" class="btn btn-info col-md-6" @click="addFilho(i)">+ Filho</button>
                    <button v-else type="button" class="btn col-md-6">+ Filho</button>
                    <button type="button" class="btn btn-danger col-md-6" @click="removeItem(i)">X Remover</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 float-right">
            <button type="button" class="btn btn-success btn-block" @click="enviar('/api/familia_produtos/')">Atualizar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import EditaMixins from "../../mixed/vue-mix/EditaMixin";
import CommonMixin from "../../mixed/vue-mix/CommonMixin";
import tabLink from "../../components/tabLink";

export default {
  name: "FamiliaProdutosEdita",
  mixins: [EditaMixins, CommonMixin],
  components: {tabLink},
  data () {
    return {
      nome: "raiz",
    };
  },
  methods: {
    getTamanho: function(str){
      const charSize = 7;
      const tamanho = (str.length  * charSize) + 30;
      return "margin-left:"+tamanho+"px;";
    },
    addFilho: function(index){
      let codigos = [];
      let novoCodigo = "";
      if(index === false){
        codigos = this.dados.itens.filter(function (item) {
          return item.codigo.length === 2;
        });
      }
      else{
        const codigo = this.dados.itens[index].codigo;
        novoCodigo = codigo + ".";

        codigos = this.dados.itens.filter(function (item) {
          if((codigo.length + 3) !== item.codigo.length){
            return false;
          }
          return item.codigo.substring(0, codigo.length) === codigo;
        });
      }

      let ultimo = codigos[codigos.length-1];
      if(!ultimo){
        novoCodigo += "01";
      }
      else{
        let temp = ultimo.codigo.split(".");
        let temp2 = parseInt(temp[temp.length-1]);
        novoCodigo += this.insereZero(temp2+1, 2);
      }
      const novoItem= {
        codigo: novoCodigo,
        nome: "Novo filho",
      };
      this.dados.itens.splice(index+1, 0, novoItem);
      this.enviar("/api/familia_produtos/");
    },
    removeItem: function (index) {
      this.dados.itens[index].exclui = true;
      this.enviar("/api/familia_produtos/");
    }
  },
  created() {
    this.getDados("/api/familia_produtos/")
      .then(() => {
        const temp = this.dados;
        this.dados = {};
        this.$set(this.dados, "itens", temp);
        console.log(this.dados);
      });
  }
};
</script>