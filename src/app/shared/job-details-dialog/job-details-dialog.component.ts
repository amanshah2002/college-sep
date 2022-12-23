import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jobPost } from 'src/app/interfaces/interface';

@Component({
  selector: 'sep-job-details-dialog',
  templateUrl: './job-details-dialog.component.html',
  styleUrls: ['./job-details-dialog.component.scss']
})
export class JobDetailsDialogComponent implements OnInit {

  job!: jobPost;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {job: jobPost}) { }

  ngOnInit() {
    this.job = this.data.job;
  }

}
