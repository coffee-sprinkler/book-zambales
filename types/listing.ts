import { Database } from '@/types/supabase';

export type ListingCategory = Database['public']['Enums']['listing_category'];
export type ListingStatus = Database['public']['Enums']['listing_status'];
export type ListingImage =
  Database['public']['Tables']['listing_images']['Row'];
export type Listing = Database['public']['Tables']['listings']['Row'];
