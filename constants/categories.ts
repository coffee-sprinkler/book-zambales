import { Waves, Zap, Mountain, Map, Briefcase, Compass } from 'lucide-react';

export const CATEGORIES = {
  RESORT: 'resort',
  ACTIVITY: 'activity',
  HIKING: 'hiking',
  TOUR_PACKAGE: 'tour_package',
  SERVICE: 'service',
  DESTINATION: 'destination',
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export const CATEGORY_VALUES = Object.values(CATEGORIES);

export function isValidCategory(value: string): value is Category {
  return CATEGORY_VALUES.includes(value as Category);
}

export const CATEGORY_LABELS: Record<Category, string> = {
  resort: 'Resorts',
  activity: 'Activities',
  hiking: 'Hiking',
  tour_package: 'Tour Packages',
  service: 'Services',
  destination: 'Destinations',
};

export const CATEGORY_NAV = [
  {
    label: CATEGORY_LABELS.resort,
    value: CATEGORIES.RESORT,
    href: `/listings?category=${CATEGORIES.RESORT}`,
    icon: Waves,
  },
  {
    label: CATEGORY_LABELS.activity,
    value: CATEGORIES.ACTIVITY,
    href: `/listings?category=${CATEGORIES.ACTIVITY}`,
    icon: Zap,
  },
  {
    label: CATEGORY_LABELS.hiking,
    value: CATEGORIES.HIKING,
    href: `/listings?category=${CATEGORIES.HIKING}`,
    icon: Mountain,
  },
  {
    label: CATEGORY_LABELS.tour_package,
    value: CATEGORIES.TOUR_PACKAGE,
    href: `/listings?category=${CATEGORIES.TOUR_PACKAGE}`,
    icon: Map,
  },
  {
    label: CATEGORY_LABELS.service,
    value: CATEGORIES.SERVICE,
    href: `/listings?category=${CATEGORIES.SERVICE}`,
    icon: Briefcase,
  },
  {
    label: CATEGORY_LABELS.destination,
    value: CATEGORIES.DESTINATION,
    href: `/listings?category=${CATEGORIES.DESTINATION}`,
    icon: Compass,
  },
] as const;
