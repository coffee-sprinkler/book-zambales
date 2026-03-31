export const MUNICIPALITIES = {
  OLONGAPO: 'olongapo',
  SUBIC: 'subic',
  SAN_ANTONIO: 'san_antonio',
  SAN_NARCISO: 'san_narciso',
  SAN_FELIPE: 'san_felipe',
  IBA: 'iba',
  PALAUIG: 'palauig',
  CABANGAN: 'cabangan',
  BOTOLAN: 'botolan',
  CASTILLEJOS: 'castillejos',
  SANTA_CRUZ: 'santa_cruz',
  MASINLOC: 'masinloc',
  CANDELARIA: 'candelaria',
} as const;

export type Municipality = (typeof MUNICIPALITIES)[keyof typeof MUNICIPALITIES];

export const MUNICIPALITY_VALUES = Object.values(MUNICIPALITIES);

export function isValidMunicipality(value: string): value is Municipality {
  return MUNICIPALITY_VALUES.includes(value as Municipality);
}

export const MUNICIPALITY_LABELS: Record<Municipality, string> = {
  iba: 'Iba (Capital)',
  olongapo: 'Olongapo City',
  subic: 'Subic',
  san_antonio: 'San Antonio',
  san_narciso: 'San Narciso',
  san_felipe: 'San Felipe',
  palauig: 'Palauig',
  cabangan: 'Cabangan',
  botolan: 'Botolan',
  castillejos: 'Castillejos',
  santa_cruz: 'Santa Cruz',
  masinloc: 'Masinloc',
  candelaria: 'Candelaria',
};
