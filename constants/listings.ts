export const LISTING_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const;

export type ListingStatus =
  (typeof LISTING_STATUS)[keyof typeof LISTING_STATUS];

export const LISTING_STATUS_VALUES = Object.values(LISTING_STATUS);

export function isValidListingStatus(value: string): value is ListingStatus {
  return LISTING_STATUS_VALUES.includes(value as ListingStatus);
}

export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  archived: 'Archived',
};
