export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      badges: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          key: string
          label: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          key: string
          label: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          key?: string
          label?: string
        }
        Relationships: []
      }
      blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          reason: string | null
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          reason?: string | null
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocks_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocks_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campus_quick_links: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          sort_order: number
          title: string
          url: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          sort_order?: number
          title: string
          url: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          sort_order?: number
          title?: string
          url?: string
        }
        Relationships: []
      }
      community_alerts: {
        Row: {
          area: string | null
          body: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          severity: string
          title: string
          updated_at: string
        }
        Insert: {
          area?: string | null
          body: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          severity?: string
          title: string
          updated_at?: string
        }
        Update: {
          area?: string | null
          body?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          severity?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_alerts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_alerts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_requests: {
        Row: {
          context: Database["public"]["Enums"]["conversation_context"]
          context_id: string | null
          created_at: string
          id: string
          requester_id: string
          requester_note: string | null
          responded_at: string | null
          response_note: string | null
          status: Database["public"]["Enums"]["contact_request_status"]
          target_id: string
          updated_at: string
        }
        Insert: {
          context?: Database["public"]["Enums"]["conversation_context"]
          context_id?: string | null
          created_at?: string
          id?: string
          requester_id: string
          requester_note?: string | null
          responded_at?: string | null
          response_note?: string | null
          status?: Database["public"]["Enums"]["contact_request_status"]
          target_id: string
          updated_at?: string
        }
        Update: {
          context?: Database["public"]["Enums"]["conversation_context"]
          context_id?: string | null
          created_at?: string
          id?: string
          requester_id?: string
          requester_note?: string | null
          responded_at?: string | null
          response_note?: string | null
          status?: Database["public"]["Enums"]["contact_request_status"]
          target_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_requests_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_requests_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          context: Database["public"]["Enums"]["conversation_context"]
          context_id: string | null
          created_at: string
          created_by: string | null
          id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          context?: Database["public"]["Enums"]["conversation_context"]
          context_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          context?: Database["public"]["Enums"]["conversation_context"]
          context_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_vendors: {
        Row: {
          created_at: string
          student_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          student_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          student_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_vendors_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_vendors_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      housing_areas: {
        Row: {
          area: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          notes: string | null
        }
        Insert: {
          area: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
        }
        Update: {
          area?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      lost_found_posts: {
        Row: {
          brand: string | null
          category: string | null
          color: string | null
          created_at: string
          description: string | null
          event_at: string | null
          id: string
          image_paths: string[]
          location_text: string | null
          ocr_evidence: string | null
          ocr_risk_score: number | null
          owner_id: string
          post_type: Database["public"]["Enums"]["lost_found_type"]
          privacy_review_status: Database["public"]["Enums"]["privacy_review_status"]
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          event_at?: string | null
          id?: string
          image_paths?: string[]
          location_text?: string | null
          ocr_evidence?: string | null
          ocr_risk_score?: number | null
          owner_id: string
          post_type: Database["public"]["Enums"]["lost_found_type"]
          privacy_review_status?: Database["public"]["Enums"]["privacy_review_status"]
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          event_at?: string | null
          id?: string
          image_paths?: string[]
          location_text?: string | null
          ocr_evidence?: string | null
          ocr_risk_score?: number | null
          owner_id?: string
          post_type?: Database["public"]["Enums"]["lost_found_type"]
          privacy_review_status?: Database["public"]["Enums"]["privacy_review_status"]
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lost_found_posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lost_found_posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lost_found_saved_searches: {
        Row: {
          created_at: string
          criteria: Json
          id: string
          name: string
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          criteria?: Json
          id?: string
          name: string
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          criteria?: Json
          id?: string
          name?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lost_found_saved_searches_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lost_found_saved_searches_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lost_found_search_logs: {
        Row: {
          created_at: string
          criteria: Json
          id: string
          query_text: string | null
          result_count: number | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          criteria?: Json
          id?: string
          query_text?: string | null
          result_count?: number | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          criteria?: Json
          id?: string
          query_text?: string | null
          result_count?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lost_found_search_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lost_found_search_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_posts: {
        Row: {
          category: string | null
          condition: string | null
          created_at: string
          description: string | null
          exchange_terms: string | null
          id: string
          image_paths: string[]
          listing_type: Database["public"]["Enums"]["marketplace_type"]
          location_text: string | null
          owner_id: string
          price_vnd: number | null
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          condition?: string | null
          created_at?: string
          description?: string | null
          exchange_terms?: string | null
          id?: string
          image_paths?: string[]
          listing_type: Database["public"]["Enums"]["marketplace_type"]
          location_text?: string | null
          owner_id: string
          price_vnd?: number | null
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          condition?: string | null
          created_at?: string
          description?: string | null
          exchange_terms?: string | null
          id?: string
          image_paths?: string[]
          listing_type?: Database["public"]["Enums"]["marketplace_type"]
          location_text?: string | null
          owner_id?: string
          price_vnd?: number | null
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          score: number
          source_id: string
          source_type: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          score?: number
          source_id: string
          source_type: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          score?: number
          source_id?: string
          source_type?: string
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          image_path: string | null
          quick_message_key: string | null
          sender_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          image_path?: string | null
          quick_message_key?: string | null
          sender_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          image_path?: string | null
          quick_message_key?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_share_audit_logs: {
        Row: {
          action: string
          contact_request_id: string | null
          created_at: string
          id: string
          phone_owner_id: string
          viewer_id: string
        }
        Insert: {
          action: string
          contact_request_id?: string | null
          created_at?: string
          id?: string
          phone_owner_id: string
          viewer_id: string
        }
        Update: {
          action?: string
          contact_request_id?: string | null
          created_at?: string
          id?: string
          phone_owner_id?: string
          viewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "phone_share_audit_logs_contact_request_id_fkey"
            columns: ["contact_request_id"]
            isOneToOne: false
            referencedRelation: "contact_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phone_share_audit_logs_phone_owner_id_fkey"
            columns: ["phone_owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phone_share_audit_logs_phone_owner_id_fkey"
            columns: ["phone_owner_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phone_share_audit_logs_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phone_share_audit_logs_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string
          email: string | null
          housing_area_id: string | null
          id: string
          last_active_at: string
          phone: string | null
          phone_share_enabled: boolean
          reputation_score: number
          role: Database["public"]["Enums"]["app_role"]
          university_id: string | null
          updated_at: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          email?: string | null
          housing_area_id?: string | null
          id: string
          last_active_at?: string
          phone?: string | null
          phone_share_enabled?: boolean
          reputation_score?: number
          role?: Database["public"]["Enums"]["app_role"]
          university_id?: string | null
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          email?: string | null
          housing_area_id?: string | null
          id?: string
          last_active_at?: string
          phone?: string | null
          phone_share_enabled?: boolean
          reputation_score?: number
          role?: Database["public"]["Enums"]["app_role"]
          university_id?: string | null
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_housing_area_id_fkey"
            columns: ["housing_area_id"]
            isOneToOne: false
            referencedRelation: "housing_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      quick_messages: {
        Row: {
          body: string
          context: Database["public"]["Enums"]["conversation_context"] | null
          created_at: string
          id: string
          is_active: boolean
          key: string
          label: string
          role: Database["public"]["Enums"]["app_role"] | null
          sort_order: number
        }
        Insert: {
          body: string
          context?: Database["public"]["Enums"]["conversation_context"] | null
          created_at?: string
          id?: string
          is_active?: boolean
          key: string
          label: string
          role?: Database["public"]["Enums"]["app_role"] | null
          sort_order?: number
        }
        Update: {
          body?: string
          context?: Database["public"]["Enums"]["conversation_context"] | null
          created_at?: string
          id?: string
          is_active?: boolean
          key?: string
          label?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          sort_order?: number
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          reason: string
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["report_status"]
          target_id: string
          target_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          reason: string
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_id: string
          target_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_id?: string
          target_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reputation_events: {
        Row: {
          created_at: string
          created_by: string | null
          event_type: Database["public"]["Enums"]["reputation_event_type"]
          id: string
          note: string | null
          points: number
          source_id: string | null
          source_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          event_type: Database["public"]["Enums"]["reputation_event_type"]
          id?: string
          note?: string | null
          points: number
          source_id?: string | null
          source_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          event_type?: Database["public"]["Enums"]["reputation_event_type"]
          id?: string
          note?: string | null
          points?: number
          source_id?: string | null
          source_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reputation_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reputation_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reputation_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reputation_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ride_posts: {
        Row: {
          campus: string | null
          created_at: string
          depart_at: string | null
          destination: string
          id: string
          origin: string
          owner_id: string
          safety_note: string | null
          schedule_note: string | null
          seats_available: number | null
          status: Database["public"]["Enums"]["post_status"]
          transport_type: string | null
          updated_at: string
        }
        Insert: {
          campus?: string | null
          created_at?: string
          depart_at?: string | null
          destination: string
          id?: string
          origin: string
          owner_id: string
          safety_note?: string | null
          schedule_note?: string | null
          seats_available?: number | null
          status?: Database["public"]["Enums"]["post_status"]
          transport_type?: string | null
          updated_at?: string
        }
        Update: {
          campus?: string | null
          created_at?: string
          depart_at?: string | null
          destination?: string
          id?: string
          origin?: string
          owner_id?: string
          safety_note?: string | null
          schedule_note?: string | null
          seats_available?: number | null
          status?: Database["public"]["Enums"]["post_status"]
          transport_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_posts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_menu_items: {
        Row: {
          created_at: string
          menu_item_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          menu_item_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          menu_item_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_menu_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "vendor_menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_menu_items_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_menu_items_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          area: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          owner_id: string | null
          price_hint: string | null
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          area?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          owner_id?: string | null
          price_hint?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          area?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          owner_id?: string | null
          price_hint?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_verifications: {
        Row: {
          admin_note: string | null
          card_back_path: string | null
          card_front_path: string
          created_at: string
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"]
          student_id: string
          submitted_note: string | null
          university_id: string | null
          updated_at: string
        }
        Insert: {
          admin_note?: string | null
          card_back_path?: string | null
          card_front_path: string
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          student_id: string
          submitted_note?: string | null
          university_id?: string | null
          updated_at?: string
        }
        Update: {
          admin_note?: string | null
          card_back_path?: string | null
          card_front_path?: string
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          student_id?: string
          submitted_note?: string | null
          university_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_verifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_verifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_verifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_verifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_verifications_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          campus: string | null
          city: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          short_name: string
        }
        Insert: {
          campus?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          short_name: string
        }
        Update: {
          campus?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          short_name?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge_id: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_distance_seed: {
        Row: {
          area_name: string
          created_at: string
          distance_meters: number
          id: string
          vendor_id: string
          walking_minutes: number | null
        }
        Insert: {
          area_name: string
          created_at?: string
          distance_meters: number
          id?: string
          vendor_id: string
          walking_minutes?: number | null
        }
        Update: {
          area_name?: string
          created_at?: string
          distance_meters?: number
          id?: string
          vendor_id?: string
          walking_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_distance_seed_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_menu_images: {
        Row: {
          created_at: string
          id: string
          image_path: string
          label: string | null
          sort_order: number
          vendor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_path: string
          label?: string | null
          sort_order?: number
          vendor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_path?: string
          label?: string | null
          sort_order?: number
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_menu_images_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_menu_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          is_available: boolean
          name: string
          price_vnd: number
          sort_order: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          is_available?: boolean
          name: string
          price_vnd?: number
          sort_order?: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          is_available?: boolean
          name?: string
          price_vnd?: number
          sort_order?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_menu_items_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_posts: {
        Row: {
          body: string | null
          created_at: string
          deal_label: string | null
          ends_at: string | null
          id: string
          image_path: string | null
          starts_at: string | null
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          deal_label?: string | null
          ends_at?: string | null
          id?: string
          image_path?: string | null
          starts_at?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          deal_label?: string | null
          ends_at?: string | null
          id?: string
          image_path?: string | null
          starts_at?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_posts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address_text: string | null
          area: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          is_active: boolean
          is_open: boolean
          name: string
          owner_id: string
          phone: string | null
          reputation_score: number
          updated_at: string
        }
        Insert: {
          address_text?: string | null
          area?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          is_active?: boolean
          is_open?: boolean
          name: string
          owner_id: string
          phone?: string | null
          reputation_score?: number
          updated_at?: string
        }
        Update: {
          address_text?: string | null
          area?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          is_active?: boolean
          is_open?: boolean
          name?: string
          owner_id?: string
          phone?: string | null
          reputation_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "safe_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      safe_profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          housing_area_id: string | null
          id: string | null
          last_active_at: string | null
          phone: string | null
          phone_share_enabled: boolean | null
          reputation_score: number | null
          role: Database["public"]["Enums"]["app_role"] | null
          university_id: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          housing_area_id?: string | null
          id?: string | null
          last_active_at?: string | null
          phone?: never
          phone_share_enabled?: boolean | null
          reputation_score?: number | null
          role?: Database["public"]["Enums"]["app_role"] | null
          university_id?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          housing_area_id?: string | null
          id?: string | null
          last_active_at?: string | null
          phone?: never
          phone_share_enabled?: boolean | null
          reputation_score?: number | null
          role?: Database["public"]["Enums"]["app_role"] | null
          university_id?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_housing_area_id_fkey"
            columns: ["housing_area_id"]
            isOneToOne: false
            referencedRelation: "housing_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      approve_student_verification: {
        Args: { admin_note_text?: string; target_verification_id: string }
        Returns: undefined
      }
      can_view_phone: { Args: { phone_owner: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_conversation_participant: {
        Args: { target_conversation_id: string }
        Returns: boolean
      }
      owns_vendor: { Args: { target_vendor_id: string }; Returns: boolean }
      reject_student_verification: {
        Args: { admin_note_text: string; target_verification_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "student" | "admin" | "vendor"
      contact_request_status: "pending" | "approved" | "rejected" | "cancelled"
      conversation_context:
        | "general"
        | "ride"
        | "marketplace"
        | "lost_found"
        | "vendor"
        | "food_order"
        | "service"
      lost_found_type: "lost" | "found"
      marketplace_type: "sell" | "exchange" | "free" | "borrow" | "lend"
      post_status: "draft" | "active" | "paused" | "closed" | "removed"
      privacy_review_status:
        | "auto_pass"
        | "admin_review"
        | "auto_rejected"
        | "approved"
        | "rejected"
      report_status: "open" | "reviewing" | "resolved" | "dismissed"
      reputation_event_type:
        | "student_verified"
        | "helpful_post"
        | "successful_meetup"
        | "positive_feedback"
        | "report_penalty"
        | "admin_adjustment"
      verification_status:
        | "not_submitted"
        | "pending"
        | "approved"
        | "rejected"
        | "resubmit_requested"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "admin", "vendor"],
      contact_request_status: ["pending", "approved", "rejected", "cancelled"],
      conversation_context: [
        "general",
        "ride",
        "marketplace",
        "lost_found",
        "vendor",
        "food_order",
        "service",
      ],
      lost_found_type: ["lost", "found"],
      marketplace_type: ["sell", "exchange", "free", "borrow", "lend"],
      post_status: ["draft", "active", "paused", "closed", "removed"],
      privacy_review_status: [
        "auto_pass",
        "admin_review",
        "auto_rejected",
        "approved",
        "rejected",
      ],
      report_status: ["open", "reviewing", "resolved", "dismissed"],
      reputation_event_type: [
        "student_verified",
        "helpful_post",
        "successful_meetup",
        "positive_feedback",
        "report_penalty",
        "admin_adjustment",
      ],
      verification_status: [
        "not_submitted",
        "pending",
        "approved",
        "rejected",
        "resubmit_requested",
      ],
    },
  },
} as const
