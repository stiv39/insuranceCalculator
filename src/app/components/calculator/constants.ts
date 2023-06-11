import { Option } from './types'

export const VARIANT_KRATKODOBE: Option = {
  value: 'krátkodobé poistenie',
  label: 'Krátkodobé poistenie',
}
export const VARIANT_CELOROCNE: Option = {
  value: 'celoročné poistenie',
  label: 'Celoročné poistenie',
}

export const BALIK_ZAKLAD: Option = { value: 'základný', label: 'Základný' }
export const BALIK_ROZSIRENY: Option = {
  value: 'rozšírený',
  label: 'Rozšírený',
}
export const BALIK_EXTRA: Option = { value: 'extra', label: 'Extra' }

export const STORNO_POISTENIE = 'storno cesty'
export const SPORTOVE_AKTIVITY = 'športové aktivity'

export const VARIANT_KRATKODOBE_STORNO_POISTENIE_SADZBA = 0.5
export const VARIANT_KRATKODOBE_SPORTOVE_AKTIVITY_SADZBA = 0.3

export const VARIANT_CELOROCNE_STORNO_POISTENIE_SADZBA = 0.2
export const VARIANT_CELOROCNE_SPORTOVE_AKTIVITY_SADZBA = 0.1

export const CELOROCNE_POISTENIE_POCET_DNI = 1

export const VARIANT_KRATKODOBE_BALIK_ZAKLAD_SADZBA = 1.2
export const VARIANT_KRATKODOBE_BALIK_ROZSIRENY_SADZBA = 1.8
export const VARIANT_KRATKODOBE_BALIK_EXTRA_SADZBA = 2.4

export const VARIANT_CELOROCNE_BALIK_ZAKLAD_SADZBA = 39
export const VARIANT_CELOROCNE_BALIK_ROZSIRENY_SADZBA = 49
export const VARIANT_CELOROCNE_BALIK_EXTRA_SADZBA = 59
