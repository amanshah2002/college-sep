export interface loginData {
  _id?: string;
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
  resume?:string;
  token?: string;
}

export interface message {
  to: string,
  from: string,
  message: string
}

export interface company {
  _id?: any,
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
  categoryType:string,
  status: string;
}

export interface companyCategory {
  label:string,
  value:number
}

export interface jobPost {
  email: string;
  type: number;
  position: string;
  salary: string;
  experience: string;
  eduRequirements: string;
  language: string;
  jobPost: string;
  jobDesc: string;
  companyId: string
}

export interface appliedJobDetails{
  companyId: string;
  jobPostId: number;
  userEmail: string;
  id?: string;
  resume: string;
  userName: string;
}

export interface feedback {
  feedback: string;
  rating: number;
  userEmail: string;
}

export interface investmentDetails {
  name:string,
  investorEmail: string,
  amount: number,
  companyName: string,
  panNumber: string,
  companyFounder: string,
  companyEmail: string,
  companyDescription: string,
}
export interface clientData {
  clientForm: ClientForm,
  clientPage: ClientPage
}

export interface ClientPage {
  header: string,
  subHeader: string
}


export interface ClientForm {
  inputs: clientInput[]
}

export interface clientInput {
  name: string,
  label: string,
  readOnly: boolean,
  validators: clientValidators
}
export interface clientValidators {
  required: boolean
}

