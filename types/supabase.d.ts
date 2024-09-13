export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      appointment_profiles: {
        Row: {
          appointment_id: number
          created_at: string
          id: number
          profile_id: string
        }
        Insert: {
          appointment_id: number
          created_at?: string
          id?: number
          profile_id: string
        }
        Update: {
          appointment_id?: number
          created_at?: string
          id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_profiles_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string
          date: string
          id: number
          job_id: number | null
          name: string
          notes: string | null
          time: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          job_id?: number | null
          name?: string
          notes?: string | null
          time: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          job_id?: number | null
          name?: string
          notes?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      global_admins: {
        Row: {
          created_at: string
          id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id: string
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_admins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_employees: {
        Row: {
          commission_percentage: number
          created_at: string
          id: number
          job_id: number
          profile_id: string
          role: Database["public"]["Enums"]["job_employee_roles"]
        }
        Insert: {
          commission_percentage?: number
          created_at?: string
          id?: number
          job_id: number
          profile_id: string
          role?: Database["public"]["Enums"]["job_employee_roles"]
        }
        Update: {
          commission_percentage?: number
          created_at?: string
          id?: number
          job_id?: number
          profile_id?: string
          role?: Database["public"]["Enums"]["job_employee_roles"]
        }
        Relationships: [
          {
            foreignKeyName: "job_employees_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_media: {
        Row: {
          created_at: string
          id: number
          job_id: number
          name: string
          type: Database["public"]["Enums"]["job_media_types"]
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          job_id: number
          name: string
          type: Database["public"]["Enums"]["job_media_types"]
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          job_id?: number
          name?: string
          type?: Database["public"]["Enums"]["job_media_types"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_media_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_proposals: {
        Row: {
          amount: number | null
          created_at: string
          date: string
          id: number
          job_id: number
          measurements: Json | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          date?: string
          id?: number
          job_id: number
          measurements?: Json | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          date?: string
          id?: number
          job_id?: number
          measurements?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "job_proposals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_reviews: {
        Row: {
          created_at: string
          full_name: string
          id: number
          job_id: number
          message: string | null
          rating: number
          status: Database["public"]["Enums"]["record_status"]
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: number
          job_id: number
          message?: string | null
          rating?: number
          status?: Database["public"]["Enums"]["record_status"]
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: number
          job_id?: number
          message?: string | null
          rating?: number
          status?: Database["public"]["Enums"]["record_status"]
        }
        Relationships: [
          {
            foreignKeyName: "job_reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          city: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          id: number
          location_id: number | null
          notes: string | null
          state: string
          status: Database["public"]["Enums"]["job_statuses"]
          street_address: string
        }
        Insert: {
          city: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: number
          location_id?: number | null
          notes?: string | null
          state: string
          status?: Database["public"]["Enums"]["job_statuses"]
          street_address: string
        }
        Update: {
          city?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: number
          location_id?: number | null
          notes?: string | null
          state?: string
          status?: Database["public"]["Enums"]["job_statuses"]
          street_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      location_employees: {
        Row: {
          created_at: string
          default_commission_rate: number | null
          location_id: number
          profile_id: string
          role: Database["public"]["Enums"]["location_employee_roles"]
        }
        Insert: {
          created_at?: string
          default_commission_rate?: number | null
          location_id: number
          profile_id: string
          role?: Database["public"]["Enums"]["location_employee_roles"]
        }
        Update: {
          created_at?: string
          default_commission_rate?: number | null
          location_id?: number
          profile_id?: string
          role?: Database["public"]["Enums"]["location_employee_roles"]
        }
        Relationships: [
          {
            foreignKeyName: "location_employees_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: number
          name: string
          postal_code: string | null
          state: string | null
          status: Database["public"]["Enums"]["record_status"]
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: number
          name: string
          postal_code?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["record_status"]
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: number
          name?: string
          postal_code?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["record_status"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: {
          id: string
        }[]
      }
      is_global_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      job_employee_roles: "setter" | "closer" | "installer"
      job_media_types: "pdf" | "photo" | "video"
      job_statuses: "new" | "in_progress" | "complete"
      location_employee_roles: "admin" | "manager" | "employee"
      record_status: "draft" | "published" | "needs_review" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

