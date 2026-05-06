export interface LinkResponse {
  id?: string;
  title?: string;
  url?: string;
  sortOrder?: number;
  clickCount?: number;
  isActive?: boolean;
}

export interface LinkCreateRequest {
  title: string,
  url: string,
  sortOrder: number,
  isActive: boolean
}

export interface LinkUpdateRequest {
  title?: string,
  url?: string,
  sortOrder?: number,
  isActive?: boolean
}

