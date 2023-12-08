export interface ProductionDb {
  id: number;
  creator_id: number;
  royalty_fees: number;
  title: string;
  name_seo: string | null;
  release_year: number | null;
  image_id: number | null;
  created_at: string;
  updated_at: string | null;
}


