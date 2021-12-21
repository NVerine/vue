<template>
  <div class="row">
    <!--    <gallery tipo="pessoas" :id="dados.id"></gallery>-->
    <card header-classes="row card-header card-header-info">
      <template slot="header">
        <div class="col-md-4">
          <h4 class="card-title"><i v-if="icon" :class="'mr-2 ' + icon "></i>{{ title }}</h4>
        </div>
        <div class="col-md-8 pl-md-3 pr-md-3 p-0">
          <div class="nav-tabs-navigation float-right">
            <div class="nav-tabs-wrapper">
              <slot name="tab-link">
                <ul class="nav nav-tabs mt-0" role="tablist">
                  <tab-link icon="fa fa-pencil" :title="$t('edit') | capitalize" :active="true" link="#sd1"></tab-link>
                  <tab-link icon="fa fa-undo" :title="$t('return') | capitalize" link="person"></tab-link>
                </ul>
              </slot>
            </div>
          </div>
        </div>
      </template>
      <div class="tab-content tab-space">
        <slot name="formFields">
          <tab-panel index="1">
            <div class="row">
            </div>
          </tab-panel>
        </slot>
        <slot name="formButtons">
          <div class="col-md-4 float-right">
            <button type="submit" class="btn btn-block btn-success" @click="$store.dispatch(submitAction)">Enviar</button>
          </div>
        </slot>
      </div>
    </card>
  </div>
</template>

<script>
import TabLink from "~/components/Cards/TabLink";
import EditMixin from "~/mixed/EditMixin";
import TabPanel from "~/components/Cards/TabPanel";

export default {
  name: "DefaultForm",
  components: {TabLink, TabPanel},
  mixins: [EditMixin],
  props: {
    title: {
      type: String,
      description: 'Title of the card'
    },
    icon: {
      type: String,
      description: 'Icon to show on left'
    },
    submitAction:{
      type: String,
      description: 'Name of the action to call when submitting the form'
    }
  }
}
</script>