export interface Link {
  id: number,
  title: string,
  url: string
}

export interface Profile {
  displayName: string,
  bio: string,
  links: Link[]
}
