<template>
  <div class="row">
    <div class="col-12 p-0">
      <div class="col-12">
        <slct
            description="Endereço principal"
            :opt="$store.getters['edits/person/getContactList']"
            v-model="mainContact"
        >
        </slct>

        <card class="card m-0 mb-2 p-2 p-md-0 dynamic-list" body-classes="p-0">
          <template slot="default">
            <div class="row mx-0 p-2 dynamic-list-row" :class="(mainContact == index)? 'active': ''"
                 v-for="(row, index) in contact" :key="contact[index].id">
              <div class="col-md-12 p-0">

                <div v-if="row.exclude" class="btn btn-success fa fa-plus btn-list btn-sm btn-round btn-fab"
                     @click="row.exclude = null" title="Manter item">
                </div>
                <div v-else class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
                     @click="$store.dispatch('edits/person/delContact', index)" title="Excluir item">
                </div>

                <div class="col-4">
                  <base-input label="name" v-model="row.contact_name"></base-input>
                </div>
                <div class="col-4">
                  <base-input type="e-mail" label="email" v-model="row.email"></base-input>
                </div>
                <div class="col-4">
                  <base-input label="phone" v-model="row.phone"></base-input>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-info fa fa-plus m-2"
                    @click="$store.dispatch('edits/person/newContact')" title="Inserir novo item"></button>
          </template>
        </card>

      </div>
    </div>
  </div>
</template>

<script>
import {mapFields, mapMultiRowFields} from "vuex-map-fields";
import {Card} from "~/components";

export default {
  name: "Contact",
  components: {Card},
  computed: {
    ...mapMultiRowFields('edits/person', {
      contact: 'data.contact',
    }),
    ...mapFields('edits/person', {
      mainContact: 'data.mainContactIndex'
    }),
  }
}
</script>

<style lang="scss">
.dynamic-list {
  .dynamic-list-row:nth-child(odd) {
    background: #eee;
  }

  .dynamic-list-row.active {
    background: #c4eff5;
  }
}

</style>