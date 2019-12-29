import {defaultLocale, localeOptions} from '../../utils/constants/defaultValues'

import {
  CHANGE_LOCALE
} from './actionTypes';

const INIT_STATE = {
  locale: (localStorage.getItem('selectedLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('selectedLanguage')).length > 0) ? localStorage.getItem('selectedLanguage') : defaultLocale,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {...state, locale: action.payload};

    default:
      return {...state};
  }
}
