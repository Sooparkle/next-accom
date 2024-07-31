export interface AccomDataType {
  id: number;
  accom_name: string;
  accom_type: string;
  accom_info: string;
  accom_benefit: string;
  description: string;
  img_url: string;
  price: string;
  score: number;
  min_occupancy: number;
  max_occupancy: number;
  extra_adult: number;
  extra_child: number;
  city: string;
  cityGu: string;
  province: string;
  phone: string;
  cancel: string;
  availavility: null | boolean;
  event: boolean;
  created_at: string;
  updated_at: string;
  rooms?:boolean;
}