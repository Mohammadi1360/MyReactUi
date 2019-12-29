import {FormattedMessage} from "react-intl";
import React from "react";

export default {
  items: [
    {
      name: <FormattedMessage id="menu.dashboard"/>,
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },

    {
      name: <FormattedMessage id="menu.general"/>,
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: <FormattedMessage id="menu.general.login"/>,
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: <FormattedMessage id="menu.general.register"/>,
          url: '/register',
          icon: 'icon-star',
        },
      ],
    },


    {
      name: <FormattedMessage id="menu.policyMaking"/>,
      url: '/pages',
      icon: 'icon-puzzle',
      children: [
        {
          name: <FormattedMessage id="menu.policyMaking.questionGroup"/>,
          url: '/policyMaking/questionGroup',
          icon: 'icon-pencil',
          badge: {
            variant: 'info',
          }
        },
        {
          name: <FormattedMessage id="menu.policyMaking.answerType"/>,
          url: '/answerType',
          icon: 'icon-pencil',
          badge: {
            variant: 'info',
          }
        },
        {
          name: <FormattedMessage id="menu.policyMaking.survey"/>,
          url: '/policyMaking/survey',
          icon: 'icon-pencil',
          badge: {
            variant: 'info',
          }
        },

      ],
    },

    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'ProgressBar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },

  ],
}
;
