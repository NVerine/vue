<template>
  <DefaultForm :title="$t('person')" icon="fa fa-user" submitAction="edits/person/submit">
    <template slot="tab-link">
      <ul class="nav nav-tabs mt-0">
        <tab-link
            icon="fa fa-pencil"
            :title="$t('edit') | capitalize"
            index="1"
        ></tab-link>
        <tab-link
            v-if="id > 0"
            icon="far fa-map"
            :title="$t('address') | capitalize"
            index="2"
        ></tab-link>
        <tab-link
            v-if="id > 0"
            icon="far fa-phone"
            :title="$t('contact') | capitalize"
            index="3"
        ></tab-link>
        <tab-link
            icon="fa fa-undo"
            :title="$t('return') | capitalize"
            link="person"
        ></tab-link>
      </ul>
    </template>
    <template slot="formFields">
      <tab-panel index="1">
        <div class="card-body">
          <div class="row">
            <div class="col-12 p-0">
              <div class="col-3">
                <slct
                    description="Tipo"
                    :opt="typePersonOpt"
                    :model.sync="typePerson"
                >
                </slct>
              </div>
              <div class="col-3">
                <base-input label="Document" v-model="nickname"></base-input>
              </div>

              <div class="col-6">
                <base-input label="Full name" v-model="name"></base-input>
              </div>
              <div class="col-8">
                <base-input label="Nickname" v-model="nickname"></base-input>
              </div>
              <div class="col-4">
                <base-input label="Birth date" v-model="birth_date"></base-input>
              </div>
              <div class="mt-3 col-md-12" id="wrapper_editor_conteudo">
                <div class="control">
                  <div class="form-group bmd-form-group">
                    <label class="bmd-label-floating label-select" for="campo_editor_conteudo">Observações</label>
                    <textarea class="form-control " id="campo_editor_conteudo" v-model="observations"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-panel>
      <tab-panel v-if="id > 0" index="2">
        <div class="card-body">
          <Address></Address>
        </div>
      </tab-panel>
      <tab-panel v-if="id > 0" index="3">
        <div class="card-body">
          <Contact></Contact>
        </div>
      </tab-panel>
    </template>
  </DefaultForm>
</template>

<script>
import DefaultForm from "~/components/layout/DefaultForm";
import EditMixin from "~/mixed/EditMixin";
import {mapFields} from 'vuex-map-fields';
import TabLink from "~/components/Cards/TabLink";
import TabPanel from "~/components/Cards/TabPanel";
import Address from "~/components/Pages/Address";
import Contact from "~/components/Pages/Contact";

export default {
  name: "Person-edit",
  components: { DefaultForm, Address, TabLink, TabPanel, Contact},
  mixins: [EditMixin],
  data: function () {
    return {
      module: 'general',
      title: 'person',
      typePersonOpt: [
        {value: "I", text: "Individuals"},
        {value: "C", text: "Companies"}
      ]
    };
  },
  beforeMount() {
    this.$store.dispatch("edits/person/getData", this.id);
  },
  computed: {
    ...mapFields('edits/person', [
      'data.nickname',
      'data.name',
      'data.birth_date',
      'data.typePerson',
      'data.observations'
    ]),
  },
};
</script>