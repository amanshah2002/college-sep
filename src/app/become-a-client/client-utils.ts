import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientForm, clientInput, company, loginData } from "../interfaces/interface";


export function createForm(formConfig: ClientForm): FormGroup {
  let form = new FormGroup({});
  formConfig.inputs.forEach((input: clientInput) => {
    if(input.validators.required) {
      form.addControl(input.name, new FormControl('', Validators.required))
    }
    else {
      form.addControl(input.name, new FormControl(''))
    }
  })

  return form;
}
