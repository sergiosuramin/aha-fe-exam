export const LOGO_ICON = '/assets/icon/logo_icon.webp'

export const MENU_ITEMS = [
  {
    name: 'Home',
    path: '/',
    icon_url_off: '/assets/icon/menu_off.webp',
    icon_url_on: '/assets/icon/menu_on.webp',
  },
  {
    name: 'Tags',
    path: '/tags',
    icon_url_off: '/assets/icon/menu_off.webp',
    icon_url_on: '/assets/icon/menu_on.webp',
  },
  {
    name: 'UI/UX',
    path: '/interface',
    icon_url_off: '/assets/icon/menu_off.webp',
    icon_url_on: '/assets/icon/menu_on.webp',
  },
]

export const PASSWORD_STRENGTH = [
  {
    title: 'Have at least one uppercase letter',
    icon_off: '/assets/svg/check_default.svg',
    icon_on: '/assets/svg/check_pass.svg',
    key: 'hasUppercase',
  },
  {
    title: 'Have at least one lowercase letter',
    icon_off: '/assets/svg/check_default.svg',
    icon_on: '/assets/svg/check_pass.svg',
    key: 'hasLowercase',
  },
  {
    title: 'Have at least one number',
    icon_off: '/assets/svg/check_default.svg',
    icon_on: '/assets/svg/check_pass.svg',
    key: 'hasNumber',
  },
  {
    title: 'Have at least one special character (!@#$...etc)',
    icon_off: '/assets/svg/check_default.svg',
    icon_on: '/assets/svg/check_pass.svg',
    key: 'hasSpecialCharacter',
  },
  {
    title: 'Longer than 8 characters',
    icon_off: '/assets/svg/check_default.svg',
    icon_on: '/assets/svg/check_pass.svg',
    key: 'isLongEnough',
  },
]
