export interface loginData {
  id?: string;
  email?: string;
  password?: string;
  type?: string;
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

interface companyCategory {
  label:string,
  value:number
}
