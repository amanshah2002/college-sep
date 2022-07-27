export interface loginData {
  id?: string;
  name?:string;
  lastName?: string;
  email?: string;
  password?: string;
  type?: string;
  preferredStartupType?: companyCategory;
  business?: string;
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
}

export interface companyCategory {
  label:string,
  value:number
}
