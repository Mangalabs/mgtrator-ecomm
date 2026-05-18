const HIDDEN_PRODUCT_TITLE_TAGS = [
  'ORIGINAL',
  'IMPORTADA',
  'IMPORTADO',
  'IMP',
  'DIR',
] as const

const TAG_BOUNDARY = String.raw`[\s\-_/.,;:()[\]{}]+`
const HIDDEN_TAG_PATTERN = new RegExp(
  String.raw`(?:^|${TAG_BOUNDARY})(${HIDDEN_PRODUCT_TITLE_TAGS.join('|')})(?=$|${TAG_BOUNDARY})`,
  'gi',
)

export const getHiddenProductTitleTags = (title: string): string[] => {
  const matches = title.matchAll(HIDDEN_TAG_PATTERN)
  const tags = Array.from(matches, (match) => match[1].toUpperCase())
  return Array.from(new Set(tags))
}

export const sanitizeProductTitle = (title: string): string => {
  const cleaned = title
    .replace(HIDDEN_TAG_PATTERN, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s\-_/.,;:()[\]{}]+|[\s\-_/.,;:()[\]{}]+$/g, '')
    .trim()

  return cleaned || title.trim()
}

export const sanitizeProductSearch = (search: string): string =>
  search
    .replace(HIDDEN_TAG_PATTERN, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s\-_/.,;:()[\]{}]+|[\s\-_/.,;:()[\]{}]+$/g, '')
    .trim()
