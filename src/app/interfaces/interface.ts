export interface loginData {
  id?: string;
  name?:string;
  lastName?: string;
  email?: string;
  password?: string;
  type?: string;
  preferredStartupType?: companyCategory;
  business?: string;
  state?:string;
  country?:string;
  city?:string;
  zipCode?:string;
  address?:string;
  contactNumber?:string;
}

export interface company {
  name: string;
  founder: string;
  email: string;
  password: string;
  website: string;
  qrCode: string;
  description: string;
  product: string;
  type: companyCategory;
  dateOfReg: any;
  message?:string;
}

export interface companyCategory {
  label:string,
  value:number
}

// export interface countries {
//   isoCode: string;
//   name: string;
//   phonecode: string;
//   flag: string;
//   currency: string;
//   latitude: string;
//   longitude: string;
//   timezones: Timezone[];
// }

// export interface Timezone {
//   zoneName: string;
//   gmtOffset: number;
//   gmtOffsetName: string;
//   abbreviation: string;
//   tzName: string;
// }
