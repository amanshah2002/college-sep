import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { company, jobPost, loginData } from '../interfaces/interface';
import { AuthenticationService } from '../services/authentication.service';
import { SnacbarService } from '../services/snacbar.service';

@Component({
  selector: 'sep-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss'],
})
export class JobPostComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbarService: SnacbarService
  ) {}

  appearance: MatFormFieldAppearance = 'outline';
  jobPostArray: jobPost[] & company[] = [];

  jobPostForm1 = new FormGroup({
    position: new FormControl(null, Validators.required),
    salary: new FormControl(null, Validators.required),
  });

  jobPostForm2 = new FormGroup({
    experience: new FormControl(null, Validators.required),
    eduRequirements: new FormControl(null, Validators.required),
  });

  jobPostForm3 = new FormGroup({
    language: new FormControl(null, Validators.required),
    jobPost: new FormControl(null, Validators.required),
  });

  currentUser: any = {};

  ngOnInit(): void {
    this.authenticationService.getUser.subscribe((data: loginData) => {
      this.currentUser = data;
    });
  }

  onSubmit = () => {
    const parsedJobData = this.parseJobPost();
    this.parseJobArray(parsedJobData);
  };

  parseJobPost = () => {
    const companyData = {
      companyName: this.currentUser.name,
      email: this.currentUser.email,
      type: this.currentUser.type,
    };
    const jobPost: jobPost & Partial<company> = {
      ...companyData,
      ...this.jobPostForm1.value,
      ...this.jobPostForm2.value,
      ...this.jobPostForm3.value,
    };

    return jobPost;
  };

  parseJobArray = (jobPost: jobPost & Partial<company>) => {
    this.companyService.getJobs().subscribe((data) => {
      data ? this.jobPostArray.push(...data) : (this.jobPostArray = []);
      this.jobPostArray.push(jobPost);
      this.postJob();
    });
  };

  postJob = () => {
    this.companyService.postJob(this.jobPostArray).subscribe((data) => {
      this.router.navigate(['startups']).then(() => {
        this.snackbarService.open('Job post successfully uploaded!');
      });
    });
  };
}
