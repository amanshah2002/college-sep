export enum startupCategory {
  tech = 1,
  AI = 2,
  agriculture = 3,
  finance = 4,
  NGO = 5,
  eCommerce = 6
}


export enum apis {
  // signUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4_HC3tgYLIi2eJjU00GXJYLrhpjCIcUo'
  authenticateApi = 'authenticate.json',
  registerCompany = 'register-company.json',
  waitingList = 'waiting-list.json',
  postJob = 'job-posts.json',
  getCountry = 'https://api.countrystatecity.in/v1/countries',
  applyJob = 'job-apply.json',
}

export enum emailjsIds{
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
}

export enum companyAction {
  approved = 'Approved',
  deleted = 'Delete',
  update = 'Update',
}
