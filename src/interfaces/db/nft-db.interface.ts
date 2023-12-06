export interface INftDb {
  id: number;
  type_id: number;
  name: string;
  contract_address: string;
  image_id: number;
  name_seo: string;
  description: string;
  created_at: string;
  updated_at: string;
  character_id: number | null;
  season: string | null;
  moment: string | null;
  production_id: number;
  creator_id: number;
  current_owner_id: number;
  is_tradeable: boolean;
  floor_price: number;
  current_sale_price: number;
  top_price: number;
  last_sale_price: number;
  total_sales: number;
  token_id: string;
  chain: string;
  currency: string;
}
