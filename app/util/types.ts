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


export interface ConfirmDataType {
  startDate: Date | null;
  endDate: Date | null;
  totalNights: number | null;
  totalNumbers?: number | null;
  totalPrice : number;
  adult?: number | null;
  child?: number | null;
}


export interface UserType {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata:Record<string, unknown>;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: Record<string, unknown>;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}