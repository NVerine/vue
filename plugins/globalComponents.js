import Vue from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import Card from '@/components/Cards/Card.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
import { Input, InputNumber, Tooltip, Popover } from 'element-ui';
import DefaultIndexSearch from "~/components/Layout/DefaultIndexSearch";
import slct from "~/components/slct";
import Notifications from '~/components/NotificationPlugin/Notifications';


/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(slct.name, slct);
Vue.component(DefaultIndexSearch.name, DefaultIndexSearch);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseDropdown.name, BaseDropdown);
Vue.component(Card.name, Card);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BaseButton.name, BaseButton);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component('Notifications', Notifications);
Vue.use(Tooltip);
Vue.use(Popover);
// Vue.use(Notifications);
