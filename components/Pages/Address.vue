<template>
  <div class="row">
    <div class="col-12 p-0">
      <div class="col-12">
        <slct
            description="Endereço principal"
            :opt="$store.getters['person/edit/getAddressList']"
            v-model="mainAdress"
        >
        </slct>
        <card class="card m-0 mb-2 p-2 p-md-0 dynamic-list" body-classes="p-0">
          <template slot="default">
            <div class="row mx-0 p-2 dynamic-list-row" :class="(mainAdress == index)? 'active': ''"
                 v-for="(row, index) in address" :key="address[index].id">
              <div class="col-md-12 p-0">

                <div v-if="row.exclude" class="btn btn-success fa fa-plus btn-list btn-sm btn-round btn-fab"
                     @click="row.exclude = null" title="Manter item"></div>
                <div v-else class="btn btn-danger fa fa-times btn-list btn-sm btn-round btn-fab"
                     @click="$store.dispatch('person/edit/dellAddress', index)" title="Excluir item"></div>

                <div class="col-6">
                  <base-input label="district" v-model="row.district"></base-input>
                </div>
                <div class="col-6">
                  <base-input label="address" v-model="row.address"></base-input>
                </div>
                <div class="col-6">
                  <base-input label="address complement" v-model="row.address_complement"></base-input>
                </div>
                <div class="col-6">
                  <base-input label="number" v-model="row.number"></base-input>
                </div>
                <div class="col-6">
                  <base-input label="city" v-model="row.city"></base-input>
                </div>
                <div class="col-6">
                  <base-input label="zip" v-model="row.zip"></base-input>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-info fa fa-plus m-2"
                    @click="$store.dispatch('person/edit/newAddress')" title="Inserir novo item"></button>
          </template>
        </card>

      </div>
    </div>
  </div>
</template>

<script>
import {mapFields, mapMultiRowFields } from "vuex-map-fields";
import {Card} from "~/components";

export default {
  name: "Address",
  components: { Card },
  computed: {
    ...mapMultiRowFields('person/edit', {
      address: 'data.address',
    }),
    ...mapFields('person/edit', {
      mainAdress: 'data.mainAddressIndex'
    }),
  }
}
</script>

<style lang="scss">
.dynamic-list{
  .dynamic-list-row:nth-child(odd) {
    background: #eee;
  }
  .dynamic-list-row.active {
    background: #c4eff5;
  }
}

</style>