// Hand-written types matching supabase/migrations/001_goof_cms_schema.sql.
// Regenerate from Supabase later via `supabase gen types typescript` if desired.

export type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

export type SiteTextFieldType = 'text' | 'textarea' | 'list' | 'rich' | 'url' | 'email' | 'tel';

export interface SiteText {
	key: string;
	page: string;
	field_type: SiteTextFieldType;
	label: string;
	value: Json;
	sort_order: number;
	updated_at: string;
}

export interface ProjectImage {
	url: string;
	alt?: string;
}

export type ProjectStatus = 'draft' | 'published';

export interface Project {
	id: string;
	slug: string;
	name: string;
	klant: string | null;
	jaar: string | null;
	tags: string[];
	project_titel: string | null;
	project_beschrijving: string | null;
	hoofd_afbeelding_url: string | null;
	hoofd_afbeelding_alt: string | null;
	afbeeldingen: ProjectImage[];
	meta_description: string | null;
	status: ProjectStatus;
	sort_order: number;
	created_at: string;
	updated_at: string;
}

export interface Media {
	id: string;
	filename: string;
	storage_path: string;
	public_url: string;
	mime_type: string;
	file_size: number;
	width: number | null;
	height: number | null;
	alt_text: string | null;
	created_at: string;
}

export interface Database {
	__InternalSupabase: {
		PostgrestVersion: '12';
	};
	public: {
		Tables: {
			site_texts: {
				Row: SiteText;
				Insert: {
					key: string;
					page: string;
					field_type?: SiteTextFieldType;
					label: string;
					value?: Json;
					sort_order?: number;
					updated_at?: string;
				};
				Update: {
					key?: string;
					page?: string;
					field_type?: SiteTextFieldType;
					label?: string;
					value?: Json;
					sort_order?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			projects: {
				Row: Project;
				Insert: {
					id?: string;
					slug: string;
					name: string;
					klant?: string | null;
					jaar?: string | null;
					tags?: string[];
					project_titel?: string | null;
					project_beschrijving?: string | null;
					hoofd_afbeelding_url?: string | null;
					hoofd_afbeelding_alt?: string | null;
					afbeeldingen?: ProjectImage[];
					meta_description?: string | null;
					status?: ProjectStatus;
					sort_order?: number;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					slug?: string;
					name?: string;
					klant?: string | null;
					jaar?: string | null;
					tags?: string[];
					project_titel?: string | null;
					project_beschrijving?: string | null;
					hoofd_afbeelding_url?: string | null;
					hoofd_afbeelding_alt?: string | null;
					afbeeldingen?: ProjectImage[];
					meta_description?: string | null;
					status?: ProjectStatus;
					sort_order?: number;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			media: {
				Row: Media;
				Insert: {
					id?: string;
					filename: string;
					storage_path: string;
					public_url: string;
					mime_type: string;
					file_size?: number;
					width?: number | null;
					height?: number | null;
					alt_text?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					filename?: string;
					storage_path?: string;
					public_url?: string;
					mime_type?: string;
					file_size?: number;
					width?: number | null;
					height?: number | null;
					alt_text?: string | null;
					created_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
