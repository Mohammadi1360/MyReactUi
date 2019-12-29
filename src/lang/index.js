import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import faLang from './entries/fa-IR';

const AppLocale = {
    en: enLang,
    fa: faLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fa.data);

export default AppLocale;
