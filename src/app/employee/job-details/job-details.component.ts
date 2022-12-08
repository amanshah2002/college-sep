import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
 @Output() jobClicked = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onApplyJob = () => {
    this.jobClicked.emit();
  }

}
