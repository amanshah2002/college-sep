import { AdminGuard } from './guards/admin.guard';
import { CompanyGuard } from './guards/company.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { DisplayJobPostsComponent } from './employee/display-job-posts/display-job-posts.component';
import { ActivityComponent } from './activity/activity.component';
import { JobPostComponent } from './job-post/job-post.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { LoginGuard } from './guards/login.guard';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AwaitConfirmationComponent } from './await-confirmation/await-confirmation.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'register-company/:id',component:RegisterCompanyComponent},
  {path: 'startups',component:CompanyComponent,canActivate:[AuthGuard]},
  {path: 'edit-account',component:EditAccountComponent,canActivate:[AuthGuard]},
  {path: 'waiting-list',component:WaitingListComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'await-confirmation',component:AwaitConfirmationComponent},
  {path: 'create-job-post', component: JobPostComponent, canActivate:[AuthGuard,CompanyGuard]},
  {path: 'activity', component: ActivityComponent, canActivate:[AuthGuard]},
  {path: 'job-posts', component: DisplayJobPostsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
