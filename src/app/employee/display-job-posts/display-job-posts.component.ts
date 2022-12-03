import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { company, jobPost } from 'src/app/interfaces/interface';
import { startupCategory } from 'src/app/enums/enum.enum';

@Component({
  selector: 'sep-display-job-posts',
  templateUrl: './display-job-posts.component.html',
  styleUrls: ['./display-job-posts.component.scss'],
})
export class DisplayJobPostsComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  jobPosts: jobPost[] = [];
  selectedJob!: jobPost;
  companyType = '';

  ngOnInit(): void {
    this.getJobPosts();
  }

  getJobPosts = () => {
    this.companyService.getJobs().subscribe((data: jobPost[]) => {
      console.log(data);
      this.jobPosts = data;
      this.onSelectJobPost(this.jobPosts[0]);
      // this.createDownloadLink();
    });
  };

  // createDownloadLink = () => {
  //   //  let a = document.createElement('a');
  //   //   a.href = this.jobPosts[0].jobPost;
  //   //   a.download = this.jobPosts[0].jobPost;
  //   //   a.dispatchEvent(new MouseEvent('click'));

  //   //   setTimeout(() => {
  //   //     URL.revokeObjectURL.bind(URL, this.jobPosts[0].jobPost);
  //   //   }, 100);
  //   const filePath = this.jobPosts[0].jobPost;
  //   const blob = new Blob([filePath],{type:'text/csv'});
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  onSelectJobPost = (job: jobPost) => {
    Object.values(startupCategory).forEach((key: any) => {
      if (isNaN(key)) {
        +startupCategory[key] === job?.type ? (this.companyType = key) : null;
        console.log(+startupCategory[key], job.type);
      }
    });
    console.log(this.companyType);

    this.selectedJob = job;
  };
}

//TODO: add upload file code.
