import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { appliedJobDetails, investmentDetails, jobPost, loginData } from '../interfaces/interface';
import { JobDetailsDialogComponent } from '../shared/job-details-dialog/job-details-dialog.component';
import { InvestmentService } from '../services/investment.service';
import { ClientService } from '../services/client.service';
import openSocket, { io } from 'socket.io-client';

@Component({
  selector: 'sep-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})

export class ActivityComponent implements OnInit {
  user: loginData = {};
  appliedJobs: any[] = [];
  jobs: jobPost[] = [];
  showJobDetails = false;
  selectedJob!: jobPost;
  investmentData: investmentDetails[] = [];
  clientData: any[] = [];
  socket: any;

  constructor(
    private authService: AuthenticationService,
    private jobService: JobService,
    private companyService: CompanyService,
    private investmentService: InvestmentService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getUser();
    // this.getInvestmentActivities();
    this.getClientActivity();
  }

  getUser = () => {
    this.authService.getUser.subscribe((user) => {
      this.user = user;
      this.getJobPosts();
    });
  };

  getJobPosts = () => {
    this.jobService
      .getAppliedJobById(this.user._id)
      .subscribe((jobs: any) => {
        this.appliedJobs = jobs;
        console.log(this.appliedJobs);
      });
  };

  downloadResume = (job: any) => {
    console.log(job);

    const linkSource = job.resume;
    this.companyService.downloadPdf(linkSource).subscribe(data => {
      console.log('file', data);
    })
    // const downloadLink = document.createElement('a');
    // const fileName = `${job.name}-resume.pdf`;
    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.click();
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

  private getClientActivity = (): void => {
    this.clientService.getClientById(this.user._id as any).subscribe(data => {
      this.clientData = data;
      console.log(this.clientData);
    })
  }

 private getInvestmentActivities = (): void => {
    this.investmentService.getInvestmentById(this.user.email as string).subscribe(data => {
      this.investmentData = data;
    })
  }


}
