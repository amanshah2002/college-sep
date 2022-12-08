import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import {
  appliedJobDetails,
  jobPost,
  loginData,
} from 'src/app/interfaces/interface';
import { startupCategory } from 'src/app/enums/enum.enum';
import { JobService } from 'src/app/services/job.service';
import { SnacbarService } from 'src/app/services/snacbar.service';

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
    private authService: AuthenticationService
  ) {}

  jobPosts: jobPost[] = [];
  selectedJob!: jobPost;
  companyType = '';
  user:loginData = {};

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
    this.authService.getUser.subscribe(user => {
      this.user = user;
    })
  }

  onSelectJobPost = (job: jobPost) => {
    Object.values(startupCategory).forEach((key: any) => {
      if (isNaN(key)) {
        +startupCategory[key] === job?.type ? (this.companyType = key) : null;
        console.log(+startupCategory[key], job.type);
      }
    });
    this.selectedJob = job;
  };

  onApplyJob = () => {
    console.log('test');

    const appliedJobIds: appliedJobDetails = {
      jobPostId: this.jobPosts.indexOf(this.selectedJob),
      companyId: this.selectedJob.email,
      userEmail: this.user.email as string
    };

    this.jobService.postAppliedJob(appliedJobIds).subscribe(() => {
      this.snackbarService.open(`Job applied in ${this.selectedJob.companyName}`)
    });
  };
}

//TODO: add upload file code.
