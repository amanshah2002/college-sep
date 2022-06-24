import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'register-company',component:RegisterCompanyComponent},
  {path:'startups',component:CompanyComponent,canActivate:[AuthGuard]},
  {path:'waiting-list',component:WaitingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
