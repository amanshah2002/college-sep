import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { appliedJobDetails, jobPost, loginData } from '../interfaces/interface';
import { JobDetailsComponent } from '../employee/job-details/job-details.component';
import { JobDetailsDialogComponent } from '../shared/job-details-dialog/job-details-dialog.component';

@Component({
  selector: 'sep-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  user: loginData = {};
  appliedJobs: appliedJobDetails[] = [];
  jobs: jobPost[] = [];
  showJobDetails = false;
  selectedJob!: jobPost;

  constructor(
    private authService: AuthenticationService,
    private jobService: JobService,
    private companyService: CompanyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser = () => {
    this.authService.getUser.subscribe((user) => {
      this.user = user;
      this.getJobPosts();
    });
  };

  getJobPosts = () => {
    this.jobService
      .getAppliedJobById(this.user.email as string)
      .subscribe((jobs: appliedJobDetails[]) => {
        console.log('test');
        this.appliedJobs = jobs;
      });
  };

  downloadResume = (job: appliedJobDetails) => {
    const linkSource = `data: application/pdf;base64,${job?.resume}`;
    const downloadLink = document.createElement('a');
    const fileName = `${job.userName}-resume.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  onInfo = (job: appliedJobDetails) => {
    const id = job.jobPostId;
    this.companyService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      this.selectedJob = this.jobs[id];
      this.showJobDetails = true;
      const dialogRef = this.dialog.open(JobDetailsDialogComponent, {
        data: { job: this.jobs[id] },
      });
    });
  };
}
