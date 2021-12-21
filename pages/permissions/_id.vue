<template>
  <DefaultForm :title="$t('permissions')" icon="fa fa-user" submitAction="edits/permissions/submit">
    <template slot="tab-link">
      <ul class="nav nav-tabs mt-0">
        <tab-link
            icon="fa fa-pencil"
            :title="$t('edit') | capitalize"
            index="1"
        ></tab-link>
        <tab-link
            icon="fa fa-undo"
            :title="$t('return') | capitalize"
            link="permissions"
        ></tab-link>
      </ul>
    </template>
    <template slot="formFields">
      <tab-panel index="1">
        <div class="card-body">
          <div class="row">
            <div class="col-12 p-0">
              <div class="col-12">
                <base-input label="Full name" v-model="name"></base-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 p-0">
              <div class="col-12">
                <base-checkbox
                    class="col-12 col-sm-6 col-md-4 m-0" v-for="(row, index) in routes"
                    :checked="$store.state.edits.permissions.checkeds.indexOf(index) > -1"
                    @input="$store.dispatch('edits/permissions/toggleChecked', index)"
                    :name="index"
                    :key="index">
                  {{ index }}
                </base-checkbox>
              </div>
            </div>
          </div>
        </div>
      </tab-panel>
    </template>
  </DefaultForm>
</template>

<script>
import DefaultForm from "~/components/layout/DefaultForm";
import EditMixin from "~/mixed/EditMixin";
import {mapFields, mapMultiRowFields} from 'vuex-map-fields';
import TabLink from "~/components/Cards/TabLink";
import TabPanel from "~/components/Cards/TabPanel";
import Address from "~/components/Pages/Address";
import Contact from "~/components/Pages/Contact";

export default {
  name: "Permissions-edit",
  components: { DefaultForm, Address, TabLink, TabPanel, Contact},
  mixins: [EditMixin],
  data: function () {
    return {
      module: 'general',
      title: 'permissions',
      agree: false
    };
  },
  beforeMount() {
    this.$store.dispatch("edits/permissions/getData", this.id);
  },
  computed: {
    ...mapFields('edits/permissions', [
      'data.name',
      'data.routes',
    ]),
  },
};
</script>