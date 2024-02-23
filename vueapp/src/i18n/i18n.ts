import {createI18n} from "vue-i18n";
import messages from "./messages";

let language = navigator.language.split('-')[0];
if (language !== 'en') {
    language = 'fr';
}

const i18n = createI18n({
    legacy: false,
    locale: language,
    messages,
    missing: (locale, key) => '',
    datetimeFormats: {
        'fr': {
            short: {
                year: 'numeric', month: 'numeric', day: 'numeric'
            },
            long: {
                year: 'numeric', month: 'long', day: 'numeric'
            }
        },
        'en': {
            short: {
                year: 'numeric', month: 'numeric', day: 'numeric'
            },
            long: {
                year: 'numeric', month: 'long', day: 'numeric'
            }
        }
    }
});

export default i18n;