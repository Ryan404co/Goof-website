import { z } from 'zod';

const slugSchema = z.string().regex(/^[a-z0-9-]+$/, 'Ongeldige slug (alleen kleine letters, cijfers en streepjes)');
const urlSchema = z.string().url();
const urlOrEmpty = z.union([urlSchema, z.literal('')]);
const statusSchema = z.enum(['draft', 'published']);

const projectImageSchema = z.object({
	url: urlSchema,
	alt: z.string().max(300).optional().default('')
});

export const projectCreateSchema = z.object({
	slug: slugSchema,
	name: z.string().min(1).max(300),
	klant: z.string().max(200).nullable().optional(),
	jaar: z.string().max(20).nullable().optional(),
	tags: z.array(z.string().min(1).max(80)).max(30).optional().default([]),
	project_titel: z.string().max(500).nullable().optional(),
	project_beschrijving: z.string().max(20000).nullable().optional(),
	hoofd_afbeelding_url: urlOrEmpty.nullable().optional(),
	hoofd_afbeelding_alt: z.string().max(300).nullable().optional(),
	afbeeldingen: z.array(projectImageSchema).max(50).optional().default([]),
	meta_description: z.string().max(500).nullable().optional()
});

export const projectUpdateSchema = projectCreateSchema.partial().extend({
	status: statusSchema.optional(),
	sort_order: z.number().int().min(0).max(10000).optional()
});

export const siteTextUpdateSchema = z.object({
	value: z.unknown()
});

export const mediaCreateSchema = z.object({
	filename: z.string().min(1).max(300),
	storage_path: z.string().min(1).max(500),
	public_url: urlSchema,
	mime_type: z.string().min(1).max(120),
	file_size: z.number().int().min(0),
	width: z.number().int().min(0).nullable().optional(),
	height: z.number().int().min(0).nullable().optional(),
	alt_text: z.string().max(300).nullable().optional()
});

export type ProjectCreate = z.infer<typeof projectCreateSchema>;
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;
export type SiteTextUpdate = z.infer<typeof siteTextUpdateSchema>;
export type MediaCreate = z.infer<typeof mediaCreateSchema>;
