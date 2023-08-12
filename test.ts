type test = {
  status: string;
  code: number;
  data: {
    id: string;
    uuid: string;
    mobile: {};
    one_time_user_id: string;
    email: string;
    email_verified_at: string;
    mobile_verified_at: {};
    full_name: string;
    profile: {
      uuid: string;
      first_name: string;
      last_name: string;
      dob: string;
      id_type: {};
      id_number: {};
      address: {};
      country_id: number;
      country: string;
      state: {};
      zip_code: {};
      district: {};
      user_avatar: string;
      two_factor_auth_status: string;
      two_factor_auth_type: {};
    };
    wallet: {
      uuid: string;
      wallet_Detail: { uuid: string; wallet_number: string };
    };
    account: {
      uuid: string;
      account_Detail: { uuid: string; system_account_number: string };
    };
    userLevel: {
      uuid: string;
      point: number;
      total_point: number;
      seen: number;
      level: {
        uuid: string;
        name: string;
        code_name: string;
        level_point: string;
        description: {};
        order: number;
        logo: string;
      };
      previous_level: {};
    };
    provider_id: {};
    provider_image: {};
    provider_name: {};
  };
};
