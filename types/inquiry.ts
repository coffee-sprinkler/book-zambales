import { Database } from '@/types/supabase';

export type InquiryStatus = Database['public']['Enums']['inquiry_status'];
export type Inquiry = Database['public']['Tables']['inquiries']['Row'];
