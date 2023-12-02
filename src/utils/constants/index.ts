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

export const PHONE_PREFIX = [
  { label: 'Indonesia', value: '+62' },
  { label: 'Brunei Darussalam', value: '+673' },
  { label: 'Cambodia', value: '+855' },
  { label: 'Laos', value: '+856' },
  { label: 'Malaysia', value: '+60' },
  { label: 'Myanmar (Burma)', value: '+95' },
  { label: 'Philippines', value: '+63' },
  { label: 'Singapore', value: '+65' },
  { label: 'Thailand', value: '+66' },
  { label: 'Vietnam', value: '+84' },
]

export const SKELETON_TO_SHOW = {
  RESULTS: {
    DEFAULT: 1,
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
    EXTRA_LARGE: 4,
  },
  FRIENDS: {
    DEFAULT: 10,
    SMALL: 10,
    MEDIUM: 10,
    LARGE: 10,
    EXTRA_LARGE: 10,
  },
  TAGS: {
    DEFAULT: 1,
    SMALL: 2,
    MEDIUM: 3,
    LARGE: 4,
    EXTRA_LARGE: 5,
  },
}
