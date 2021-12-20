import Vue from 'vue'
import './extra/polyfills';

import './globalComponents';

import './globalDirectives';


// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);
