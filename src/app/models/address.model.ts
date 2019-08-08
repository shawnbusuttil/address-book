export interface Address {
  id: number;
  name: string;
  addressDetails: {
    zip: string,
    street: string,
    country: string
  };
}
