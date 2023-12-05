export interface UserDb {
  id: number;
  name: string;
  name_seo: string | null;
  bio: string | null;
  is_verified: boolean;
  contract_address: string | null;
  image_id: number | null;
  created_at: string;
  updated_at: string | null;
}
