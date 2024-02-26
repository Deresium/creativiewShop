import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {en, fr} from "vuetify/locale";

let language = navigator.language.split('-')[0];
if (language !== 'en') {
    language = 'fr';
}


const vuetify = createVuetify({
    components,
    directives,
    locale: {
        messages: {fr, en},
        locale: language
    }
});

export default vuetify;