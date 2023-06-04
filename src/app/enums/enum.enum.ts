export enum startupCategory {
  tech = 1,
  AI = 2,
  agriculture = 3,
  finance = 4,
  NGO = 5,
  eCommerce = 6,
  construction = 7,
  IT = 8,
  marketing = 9,
  garment = 10,
  chemical = 11,
  petroleum = 12,
  jewelry = 13,
  other = 14,
}

export enum apis {
  // signUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4_HC3tgYLIi2eJjU00GXJYLrhpjCIcUo'
  signup = 'auth/signup',
  login = 'auth/login',
  getAllUsers = 'auth/users',
  registerCompany = 'companies/approve',
  deleteCompany = 'companies/reject',
  waitingList = 'companies/waitingList',
  getCompanies = 'companies',
  postJob = 'jobPost/create',
  getJobs = 'jobPost/get',
  getCountry = 'https://api.countrystatecity.in/v1/countries',
  applyJob = 'employee/apply-job',
  feedback = 'feedback',
  invest = 'invest.json',
  client = 'assignWork'
}

export enum emailjsIds {
  waitingListServiceId = 'service_6yspp6l',
  waitingListTemplateIds = 'template_pwi242l',
  waitingListPublicKey = '1zcOXHZVDdsQUjkkk',
  companyAddedServiceId = 'service_d0o0cjx',
  companyAddedTemplateId = 'template_tpq5t6m',
  companyAddedPublicKey = 'enyBqtDwCIoElFhZS',
  rejectApproveTemplateId = 'template_qoz3r65',
}

export enum accountType {
  investor = 'Investor',
  company = 'Company',
  employee = 'Employee',
  client = 'Client',
  Admin = 'admin',
}

export enum companyAction {
  approved = 'Approved',
  deleted = 'Delete',
  update = 'Update',
}

export enum rating {
  lowLikely = 'Not Happy',
  midLikely = 'Happy',
  highLikely = 'Extremely Happy',
}

export enum snackbarMessage {
  postClient = "The company has been notified about your interest to work with them, they will get back to you soon!",
  error = "Oops something went wrong, please try again!"
}

export enum emailMessage {
  postClient = " has shown interest to work with you please check your activity tab."
}

export enum companyStatus {
  approved = 'Approved',
  inProgress = 'In progress'
}
