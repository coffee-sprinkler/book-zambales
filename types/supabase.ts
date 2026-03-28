export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.4';
  };
  public: {
    Tables: {
      inquiries: {
        Row: {
          check_in: string | null;
          check_out: string | null;
          created_at: string;
          guest_email: string;
          guest_name: string;
          guest_phone: string | null;
          host_notes: string | null;
          id: string;
          listing_id: string;
          message: string | null;
          pax_count: number | null;
          status: Database['public']['Enums']['inquiry_status'];
          traveler_id: string | null;
          updated_at: string;
        };
        Insert: {
          check_in?: string | null;
          check_out?: string | null;
          created_at?: string;
          guest_email: string;
          guest_name: string;
          guest_phone?: string | null;
          host_notes?: string | null;
          id?: string;
          listing_id: string;
          message?: string | null;
          pax_count?: number | null;
          status?: Database['public']['Enums']['inquiry_status'];
          traveler_id?: string | null;
          updated_at?: string;
        };
        Update: {
          check_in?: string | null;
          check_out?: string | null;
          created_at?: string;
          guest_email?: string;
          guest_name?: string;
          guest_phone?: string | null;
          host_notes?: string | null;
          id?: string;
          listing_id?: string;
          message?: string | null;
          pax_count?: number | null;
          status?: Database['public']['Enums']['inquiry_status'];
          traveler_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'inquiries_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'listings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'inquiries_traveler_id_fkey';
            columns: ['traveler_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      listing_images: {
        Row: {
          created_at: string;
          id: string;
          is_cover: boolean | null;
          listing_id: string;
          sort_order: number | null;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_cover?: boolean | null;
          listing_id: string;
          sort_order?: number | null;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_cover?: boolean | null;
          listing_id?: string;
          sort_order?: number | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'listing_images_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'listings';
            referencedColumns: ['id'];
          },
        ];
      };
      listing_tags: {
        Row: {
          listing_id: string;
          tag_id: string;
        };
        Insert: {
          listing_id: string;
          tag_id: string;
        };
        Update: {
          listing_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'listing_tags_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'listings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'listing_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      listings: {
        Row: {
          category: Database['public']['Enums']['listing_category'];
          created_at: string;
          description: string | null;
          host_id: string;
          id: string;
          inclusions: string | null;
          is_featured: boolean | null;
          location: string;
          price_from: number | null;
          price_to: number | null;
          slug: string;
          status: Database['public']['Enums']['listing_status'];
          title: string;
          updated_at: string;
        };
        Insert: {
          category: Database['public']['Enums']['listing_category'];
          created_at?: string;
          description?: string | null;
          host_id: string;
          id?: string;
          inclusions?: string | null;
          is_featured?: boolean | null;
          location: string;
          price_from?: number | null;
          price_to?: number | null;
          slug: string;
          status?: Database['public']['Enums']['listing_status'];
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: Database['public']['Enums']['listing_category'];
          created_at?: string;
          description?: string | null;
          host_id?: string;
          id?: string;
          inclusions?: string | null;
          is_featured?: boolean | null;
          location?: string;
          price_from?: number | null;
          price_to?: number | null;
          slug?: string;
          status?: Database['public']['Enums']['listing_status'];
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'listings_host_id_fkey';
            columns: ['host_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone: string | null;
          role: Database['public']['Enums']['user_role'];
          updated_at: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      ratings: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          listing_id: string;
          reviewer_id: string;
          score: number;
          updated_at: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          listing_id: string;
          reviewer_id: string;
          score: number;
          updated_at?: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          listing_id?: string;
          reviewer_id?: string;
          score?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ratings_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'listings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ratings_reviewer_id_fkey';
            columns: ['reviewer_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      tags: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      listing_ratings_summary: {
        Row: {
          avg_score: number | null;
          listing_id: string | null;
          review_count: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ratings_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'listings';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      inquiry_status: 'pending' | 'responded' | 'confirmed' | 'cancelled';
      listing_category:
        | 'resort'
        | 'activity'
        | 'hiking'
        | 'tour_package'
        | 'service'
        | 'destination';
      listing_status: 'draft' | 'active' | 'archived';
      user_role: 'user' | 'host' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      inquiry_status: ['pending', 'responded', 'confirmed', 'cancelled'],
      listing_category: [
        'resort',
        'activity',
        'hiking',
        'tour_package',
        'service',
        'destination',
      ],
      listing_status: ['draft', 'active', 'archived'],
      user_role: ['user', 'host', 'admin'],
    },
  },
} as const;
