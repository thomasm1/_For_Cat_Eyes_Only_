/* flow */
export type Certification = {
  
  id: number,
  standard_name?: string,
  standard_body?: string,
  certification_status?: string,
  certification_number?: number,
  created_at: string,
  updated_at: string;
}

export type Transaction = {
  
  id: number,
  sender_id: string,
  receiver_id?: string,
  transaction_type: string,
  amount: number,
  created_at: string,
  updated_at: string;
}

export type Production = {
  
  id: number,
  content: string,
  created_at: string,
  updated_at: string,
  filename: string,
  standard_id?: number,
  tranche_size?: number;
}

export type User = {
  
  id: number,
  provider: string,
  uid: string,
  encrypted_password: string,
  reset_password_token?: string,
  reset_password_sent_at?: string,
  remember_created_at?: string,
  sign_in_count: number,
  current_sign_in_at?: string,
  last_sign_in_at?: string,
  current_sign_in_ip?: string,
  last_sign_in_ip?: string,
  name?: string,
  email?: string,
  avatar?: string,
  company?: string,
  tokens?: string,
  created_at: string,
  updated_at: string;
}

