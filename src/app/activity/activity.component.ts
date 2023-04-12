import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { appliedJobDetails, investmentDetails, jobPost, loginData } from '../interfaces/interface';
import { JobDetailsDialogComponent } from '../shared/job-details-dialog/job-details-dialog.component';
import { InvestmentService } from '../services/investment.service';

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
  investmentData!: investmentDetails[];

  constructor(
    private authService: AuthenticationService,
    private jobService: JobService,
    private companyService: CompanyService,
    private investmentService: InvestmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getInvestmentActivities();
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
        this.appliedJobs = jobs;
      });
  };

 private getInvestmentActivities = (): void => {
    this.investmentService.getInvestments().subscribe(data => {
      this.investmentData = data;
    })
  }

  downloadResume = (job: appliedJobDetails) => {
    const linkSource = `data: application/pdf;base64,${job?.resume}`;
    const downloadLink = document.createElement('a');
    const fileName = `${job.userName}-resume.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  onInfo = (data: appliedJobDetails) => {
      const id = data.jobPostId;
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
