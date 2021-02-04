<template>
  <div class="card my-1">
    <div class="card-body">
      <div class="wrapper-galeria">
        <button type="button" class="btn btn-info fa fa-plus m-0 float-left" title="Inserir novo item"
                data-toggle="modal" data-target="#gallery_novo"></button>
        <div class="d-flex">
          <div class="galeria-overlay" data-toggle="modal" data-target="#gallery_edita"
               @click="editar = linha" v-for="(linha, index) in listagallery" :key="index">
            <img :src="linha.url" :alt="linha.nome">
          </div>
        </div>
      </div>
    </div>
    
    <modal nome="gallery_novo" titulo="Galeria">
      
      <template v-slot:body>
        <div class="col-md-12">
          <div class="fileinput col-md-12 text-center" data-provides="fileinput" :class="imgsrc ? 'fileinput-exists' : 'fileinput-new'">
            <img :src="imgsrc">
            <div>
              <span class="btn btn-success btn-round btn-file">
                <span class="fileinput-new">Selecionar arquivo</span>
                <span class="fileinput-exists">Trocar arquivo</span>
                <input type="file" name="imagem" id="campo_gallery_imagem" @change="preview($event)">
              </span>
              <button type="button" class="btn btn-danger btn-round fileinput-exists" @click="limpa()">Remover</button>
            </div>
          </div>
        </div>
        <field nome="nome_gallery_img_novo" descricao="Nome" tamanho="12" :modelo.sync="imgnome"></field>
      </template>
      
      <template v-slot:footer>
        <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" @click="sendGallery">Salvar</button>
      </template>
      
    </modal>
  
    <modal nome="gallery_edita" titulo="Galeria">
    
      <template v-slot:body>
        <div class="col-md-12">
          <div class="fileinput col-md-12 text-center fileinput-exists" data-provides="fileinput">
            <img :src="editar.url">
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <a :href="editar.url" target="_blank" class="btn btn-warning btn-block">Abrir imagem completa</a>
          </div>
          <div class="col-6">
            <button type="button" class="btn btn-danger btn-block" @click="deletar">Deletar</button>
          </div>
        </div>
        <field nome="nome_gallery_img" :leitura="true" descricao="Nome" tamanho="12" :modelo.sync="editar.nome"></field>
      </template>
    
      <template v-slot:footer>
        <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-success" @click="sendGallery">Salvar</button>
      </template>
  
    </modal>
    
  </div>
</template>

<script>
import axios from "axios";
import modal from "@/components/modal";
import field from "@/components/field";
import EditaMixins from "@/mixed/vue-mix/EditaMixin";

export default {
  name: "Gallery",
  components: { modal, field },
  props : {tipo: {}, id: {}},
  mixins: [EditaMixins],
  data () {
    return {
      listagallery: [],
      imgsrc: null,
      imgnome: null,
      imgfile: null,
      editar: {nome: null, url: null}
    };
  },
  methods: {
    getGallery: function () {
      axios
        .get("/api/gallery/" + this.tipo + "/" + this.id)
        .then(response => {
          this.listagallery = response.data.dados;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => this.loading = false);
    },
    preview: function (e) {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        let el = this;
        this.imgfile = e.target.files[0];
        this.imgnome = e.target.files[0].name;
        reader.onload = function(ee) {
          el.$set(el, "imgsrc", ee.target.result);
        };
  
        reader.readAsDataURL(e.target.files[0]); // convert to base64 string
      }
    },
    limpa: function () {
      this.imgsrc = null;
      this.imgnome = null;
      $("#campo_gallery_imagem").val(null);
    },
    sendGallery: function () {
      this.dados = {
        file: this.imgsrc,
        nome: this.imgnome,
        id: this.id
      };
      this.enviar("/api/gallery/" + this.tipo + "/");
    },
    deletar: function () {
      if(confirm("Deseja apagar o arquivo?")) {
        this.dados = {
          nome: this.editar.nome,
          id: this.id,
          deletar: true
        };
        this.enviar("/api/gallery/" + this.tipo + "/");
      }
    }
  },
  watch: {
    id: function () {
      this.getGallery();
    }
  }
};
</script>