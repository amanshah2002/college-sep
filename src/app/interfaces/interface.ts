export interface loginData {
  id?: string;
  name?:string;
  lastName?: string;
  email?: string;
  password?: string;
  categoryType?: string;
  // type?:string;
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
  categoryType:string
}

export interface companyCategory {
  label:string,
  value:number
}

export interface jobPost {
  position: string;
  salary: string;
  experience: string;
  eduRequirements: string;
  language: string;
  jobPost: string;
}
