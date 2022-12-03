import { startupCategory } from 'src/app/enums/enum.enum';
import { Component, Input, OnInit } from '@angular/core';
import { jobPost } from 'src/app/interfaces/interface';

@Component({
  selector: 'sep-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  @Input()
  job!: jobPost;
 @Input() companyType = '';
  constructor() { }

  ngOnInit(): void {
  }

}
