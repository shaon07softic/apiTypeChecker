type test = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  birthdate: string;
  company_name: string;
  department: string;
  job_title: string;
  address: {
    street: string;
    street_name: string;
    city: string;
    state: string;
    country: string;
    country_code: string;
    postal_code: string;
  }[];
  phone: string;
  avatar: string;
  email_verified: boolean;
  password: string;
  last_login: string;
  last_login_ip: string;
  subscribed: boolean;
}[];
