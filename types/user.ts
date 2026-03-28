import { Database } from './supabase';

export type UserRole = Database['public']['Enums']['user_role'];

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type ProfileWithEmail = Profile & {
  email: string;
};
