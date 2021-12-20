<template>
  <div class="row">
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
                  <tab-link icon="fa fa-search" :title="$t('search') | capitalize" :active="true"
                            link="#sd1"></tab-link>
                  <tab-link icon="fa fa-plus" :title="$t('new') | capitalize" :link="formLink+'/0'"></tab-link>
                </ul>
              </slot>
            </div>
          </div>
        </div>
      </template>
      <div class="tab-content tab-space">
        <div class="tab-pane active" id="sd1">

          <div v-if="$slots.formFields" class="row">
            <form @submit.prevent="sendForm" class="col-md-12 p-0">
              <div class="col-12 p-0">
                <slot name="formFields">
                  <div class="col-12">
                    <base-input label="CPF/CNPJ" v-model="doc"></base-input>
                  </div>
                </slot>
                <slot name="formControl">
                  <div class="col-6">
                    <button type="button" class="btn btn-block btn-warning" @click="clearForm(data)">{{
                        $t('clear')
                      }}
                    </button>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-block btn-success">{{ $t('search') }}</button>
                  </div>
                </slot>
              </div>
            </form>
          </div>

          <slot name="table">
            <div class="mt-4 row">
              <div class="col-md-12 p-0">
                <div class="offset-9 col-3">
                  <slct
                      description="Limite"
                      :opt="$store.state.search.limitItens"
                      :value="$store.state.search.search_limit"
                      @input="updateLimit"
                  >
                  </slct>
                </div>
              </div>

              <grid :target="formLink"></grid>

              <div class="col-md-12">
                <nav class="float-right">
                  <ul class="pagination pagination-info">
                    <li v-for="(offset, i) in listOffsets"
                        :key="i"
                        class="page-item"
                        :class="$store.state.search.search_offset == i ? 'active' : ''"
                    >
                      <a class="page-link" @click="updateOffset(i)">{{ offset }}</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import TabLink from "~/components/Cards/TabLink";
import SearchMixin from "~/mixed/SearchMixin";
import Grid from "~/components/grid";

export default {
  name: "DefaultIndexSearch",
  components: {TabLink, Grid},
  mixins: [SearchMixin],
  props: {
    title: {
      type: String,
      description: 'Title of the card'
    },
    icon: {
      type: String,
      description: 'Icon to show on left'
    },
    formLink: {
      type: String,
      description: 'Link to form to edit'
    }
  }
}
</script>