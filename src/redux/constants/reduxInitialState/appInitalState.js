import globalConst from '../globalConst';

export default {
  globalConst,
  menuItems: [
    {
      key: 'dashBoard',
      icon: 'png_menu_proposals',
      iconSelected: 'png_menu_proposals_selected',
      title: 'Proposal Dashboard',
      pageTitle: 'Dashboard',
      showWhen: 'always',
      showPlatform: 'all'
    },
    {
      key: 'newProposal',
      icon: 'png_menu_create',
      iconSelected: 'png_menu_create_selected',
      title: 'Create Proposal',
      pageTitle: 'New Proposal',
      showWhen: 'login',
      showPlatform: 'all'
    },
    {
      key: 'news',
      icon: 'png_menu_news',
      iconSelected: 'png_menu_news_selected',
      title: 'News and Announcements',
      pageTitle: 'News',
      showWhen: 'always',
      showPlatform: 'all'
    },
    {
      key: 'userAccount',
      icon: 'png_menu_account',
      iconSelected: 'png_menu_account_selected',
      title: 'Account Settings',
      pageTitle: 'Account',
      showWhen: 'login',
      showPlatform: 'all'
    },
    {
      key: 'register',
      icon: 'png_menu_register',
      iconSelected: 'png_menu_register_selected',
      title: 'Register',
      pageTitle: 'Register',
      showWhen: 'logout',
      showPlatform: 'all'
    },
    {
      key: 'faq',
      icon: 'png_menu_faq',
      iconSelected: 'png_menu_faq_selected',
      title: 'Faq',
      pageTitle: 'FAQ',
      showWhen: 'never',
      showPlatform: 'all'
    },
    {
      key: 'masterNode',
      icon: 'png_menu_masternodes',
      iconSelected: 'png_menu_masternodes_selected',
      title: 'Masternode Setting',
      pageTitle: 'Masternode',
      showWhen: 'login',
      showPlatform: 'all'
    },
    {
      key: 'login',
      icon: 'login_icon',
      iconSelected: 'login_icon',
      title: 'Login',
      pageTitle: 'Login',
      showWhen: 'logout',
      showPlatform: 'mobile'
    },
    {
      key: 'logout',
      icon: 'logout_icon',
      iconSelected: 'logout_icon',
      title: 'Logout',
      pageTitle: 'Logout',
      showWhen: 'login',
      showPlatform: 'mobile'
    },
    {
      key: 'tool',
      icon: 'png_menu_info',
      iconSelected: 'png_menu_info_selected',
      title: 'Masternode resources',
      pageTitle: 'Masternode resources',
      showWhen: 'always',
      showPlatform: 'all'
    }
  ],
  currentUser: null,
  showPage: 'login', //'home',
  showChat: false,
  showMenu: false,
  platform: {},
  loading: false,
  twoFA: {
    twoFA: false,
    sms: false,
    auth: false
  },
  dashBoard: {
    showContainer: 'dashBoard',
    selectedProposal: ''
  }
};
