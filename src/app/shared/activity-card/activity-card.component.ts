import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sep-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {

  constructor() { }

  @Input() cardConfig: any;

  ngOnInit() {
  }

}
