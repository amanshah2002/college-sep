import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { jobPost } from 'src/app/interfaces/interface';

@Component({
  selector: 'sep-display-job-posts',
  templateUrl: './display-job-posts.component.html',
  styleUrls: ['./display-job-posts.component.scss']
})
export class DisplayJobPostsComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getJobPosts();
  }

  getJobPosts = () => {
    this.companyService.getJobs().subscribe((data:jobPost[]) => {
      console.log(data);
    })
  }

}
