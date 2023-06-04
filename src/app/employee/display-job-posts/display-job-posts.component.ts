import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import {
  appliedJobDetails,
  jobPost,
  loginData,
} from 'src/app/interfaces/interface';
import { emailjsIds, startupCategory } from 'src/app/enums/enum.enum';
import { JobService } from 'src/app/services/job.service';
import { SnacbarService } from 'src/app/services/snacbar.service';
import { EmailService } from 'src/app/services/email.service';



@Component({
  selector: 'sep-display-job-posts',
  templateUrl: './display-job-posts.component.html',
  styleUrls: ['./display-job-posts.component.scss'],
})
export class DisplayJobPostsComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private jobService: JobService,
    private snackbarService: SnacbarService,
    private authService: AuthenticationService,
    private emailService: EmailService
  ) {}

  jobPosts: any[] = [];
  selectedJob!: jobPost;
  companyType = '';
  user: loginData = {};

  ngOnInit(): void {
    this.getJobPosts();
    this.getCurrentUser();
  }

  getJobPosts = () => {
    this.companyService.getJobs().subscribe((data: jobPost[]) => {
      console.log(data);
      this.jobPosts = data;
      this.onSelectJobPost(this.jobPosts[0]);
    });
  };

  getCurrentUser = () => {
    this.authService.getUser.subscribe((user) => {
      this.user = user;
    });
  };

  onSelectJobPost = (job: any) => {
    Object.values(startupCategory).forEach((key: any) => {
      if (isNaN(key)) {
        +startupCategory[key] === job?.companyId.type ? (this.companyType = key) : null;
      }
    });
    this.selectedJob = job;
  };

  onApplyJob = (job: any) => {
    const appliedJobIds: any = {
      jobPostId: job._id,
      companyId: job.companyId._id,
      userId: this.user._id
    };

    this.jobService.postAppliedJob(appliedJobIds).subscribe(() => {
      this.snackbarService.open(
        `Job applied in ${job.companyId.name}`
      );

      const payload = {
        message: `${this.user.name} has applied for a job in your company, please contact them at ${this.user.email} or view your activity tab!`,
        email: job.companyId.email,
      };
      this.emailService.send(
        emailjsIds.companyAddedServiceId,
        emailjsIds.rejectApproveTemplateId,
        payload,
        emailjsIds.companyAddedPublicKey
      );
    });
  };
}
