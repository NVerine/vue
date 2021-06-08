import axios from "axios";
import router from "../../router";

const EditaMixins = {
  data: function () {
    return {
      dados: {},
    };
  },
  methods: {
    enviaForm: function () {
      this.appEndURL(this.dados);
      this.getItens();
    },
    getDados: function(rota){
      return axios
        .get(rota)
        .then(response => {
          if(response.data.dados.items){
            this.dados = response.data.dados.items;
          }
          if(response.data.notify.length > 0) {
            let isErrored = false;
            for (const i in response.data.notify) {
              if(response.data.notify[i].tipo === "danger") isErrored = true;
              this.$store.commit("addMessage", response.data.notify[i]);
            }
            if(isErrored) router.push({ name: "error" });
          }
          return response;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
    },
    enviar: function (rota) {
      const id = this.dados.id || 0;
      const el = this;
      axios
        .post(rota + id + "/edit", this.dados)
        .then(response => {
          if (response.data.notify.length > 0){
            let issucced = false;
            let setings = {
              newest_on_top: true,
              offset: {
                x: 20,
                y: 130
              },
              spacing: 10,
              delay: 3000,
              timer: 1000,
              template:   `  <div data-notify="container" class="col-12 col-sm-3 col-md-3 col-xs-3 alert alert-{0}" role="alert">
                                                <button type="button" aria-hidden="true" class="close" data-notify="dismiss">x</button>
                                                <i data-notify="icon" class="material-icons">notifications</i> 
                                                <span data-notify="title">{1}</span> 
                                                <span data-notify="message">{2}</span>
                                                <a href="{3}" target="{4}" data-notify="url"></a>
                                            </div>`
            };

            for (const i in response.data.notify){
              let not = { message: response.data.notify[i].texto };
              setings.type = response.data.notify[i].tipo;

              if(response.data.notify[i].tipo === "danger"){
                setings.delay = 0;
                setings.timer = 0;
                setings.template = setings.template.replace("col-sm-3 col-md-3 col-xs-3", "col-sm-12 col-md-8");
                setings.onClose = function (){
                  // fechar overlay
                  el.$store.state.isErrored = false;
                };

                setings.placement = {
                  from: "top",
                  align: "center"
                };
                el.$store.state.isErrored = true;
              }
              if(response.data.notify[i].tipo === "success"){
                issucced = true;
              }
              $.notify(not, setings);
              el.$store.commit("addShowedMessages", response.data.notify[i]);
            }

            if(issucced){
              //verifica se tem modal aberto e fecha ele
              $(".modal-backdrop.fade.show").remove();
              /**
               * tipo retorno
               * 1- abrir página do novo registro
               * 2- voltar para página anterior
               * 3- abrir lista de arquivos(pesquisa)
               * 4- abrir página para cadastrar novo registro(/0)
               */
              switch (this.tipoRetorno) {
              case 2: {
                this.$router.go(-1);
                break;
              }
              case 3: {
                let temp = router.currentRoute.name.split("_");
                this.$router.push({name: temp[0] + "_pesquisa"});
                break;
              }
              case 4: {
                if (router.currentRoute.params.id == 0) break;
                this.$router.push({name: router.currentRoute.name, params: {id: 0}});
                break;
              }
              default: {  // tratar como se fosse 1
                if (router.currentRoute.params.id != 0) break;
                this.$router.push({
                  name: router.currentRoute.name,
                  params: {id: response.data.dados}
                });
                break;
              }
              }
              this.$store.commit("updateState");
              // if(response.data.dados.length > 0)
              //     this.$router.push({ name: router.currentRoute.name, params: { id: response.data.dados } });
              // else{
              //     this.$store.commit("updateState");
              // }
            }
          }
        });
    },
  }
};

export default EditaMixins;