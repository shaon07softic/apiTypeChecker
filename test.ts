type test = {
  status: string;
  code: number;
  wallet_detail: {
    wallet_detail: { uuid: string; wallet_number: string };
    wallet_currency: {
      uuid: string;
      currency: { name: string; code: string; symbol: string };
      status: number;
      default: number;
      test: {};
    }[];
  };
};
