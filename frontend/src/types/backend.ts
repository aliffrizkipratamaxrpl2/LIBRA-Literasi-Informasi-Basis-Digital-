export interface BackendBook {
  id: number | string;
  category_id?: number;
  title: string;
  writer: string;
  cover?: string;
  synopsis?: string;
  content?: string;
}

export interface BackendCategory {
  id: number | string;
  category: string;
}

export interface BackendPlan {
  id: number | string;
  plan: string;
  price: number;
  cycle: string;
  descriptions: string;
}

export interface BackendUserUpdate {
  username: string;
  email: string;
  pass: string;
  img?: string | File;
}
