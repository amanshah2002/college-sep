import { JobService } from 'src/app/services/job.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { appliedJobDetails, loginData } from '../interfaces/interface';
import { accountType } from '../enums/enum.enum';

@Component({
  selector: 'sep-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  user:loginData = {};
  jobs: appliedJobDetails[] = [];

  constructor(private authService: AuthenticationService, private jobService: JobService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser = () => {
    this.authService.getUser.subscribe(user => {
      this.user = user;
      this.getJobPosts();
    });
  }

  getJobPosts = () => {
    this.jobService.getAppliedJobById(this.user.email as string).subscribe((jobs: appliedJobDetails[]) => {
      console.log(jobs);
      this.jobs = jobs
    })
  }

  downloadResume = (job: appliedJobDetails) => {
    console.log(job);
    const linkSource = `data: application/pdf;base64,${job?.resume}`;
    const downloadLink  = document.createElement('a');
    const fileName = `${job.userName}-resume.pdf`;
     downloadLink.href= linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
}
//TODO: add job post details in activity card
