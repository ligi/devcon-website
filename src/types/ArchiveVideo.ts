export interface ArchiveVideo {
  id: string
  slug: string
  edition: number
  title: string
  description: string
  youtubeUrl: string
  ipfsHash: string
  expertise: string,
  type: string
  track: string
  tags: Array<string>
  speakers: Array<string>
}

export function mapToArchiveVideo(source: any) { 
  return {
    id: source.id,
    slug: source.fields.slug,
    edition: source.frontmatter.edition,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    youtubeUrl: source.frontmatter.youtubeUrl,
    ipfsHash: source.frontmatter.ipfsHash,
    expertise: source.frontmatter.expertise,
    type: source.frontmatter.type,
    track: source.frontmatter.track,
    tags: source.frontmatter.tags,
    speakers: source.frontmatter.speakers
  }
}