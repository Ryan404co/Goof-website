import type { SiteText } from './database.types';

/**
 * Look up a text by key from the loaded site_texts dictionary.
 * Returns the JSON value (string, array, or object) or `fallback` if missing.
 */
export function textValue(
	texts: Record<string, SiteText> | undefined | null,
	key: string,
	fallback: unknown = ''
): unknown {
	if (!texts) return fallback;
	const entry = texts[key];
	if (!entry) return fallback;
	return entry.value ?? fallback;
}

/** Convenience: coerce to string (for plain text fields). */
export function textString(
	texts: Record<string, SiteText> | undefined | null,
	key: string,
	fallback = ''
): string {
	const v = textValue(texts, key, fallback);
	return typeof v === 'string' ? v : String(v ?? fallback);
}

/** Convenience: coerce to a string array (for list fields). */
export function textList(
	texts: Record<string, SiteText> | undefined | null,
	key: string,
	fallback: string[] = []
): string[] {
	const v = textValue(texts, key, fallback);
	if (Array.isArray(v)) return v.map(String);
	return fallback;
}
