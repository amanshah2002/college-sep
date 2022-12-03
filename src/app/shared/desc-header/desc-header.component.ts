import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sep-desc-header',
  templateUrl: './desc-header.component.html',
  styleUrls: ['./desc-header.component.scss']
})
export class DescHeaderComponent implements OnInit {

  @Input() header = '';
  @Input() subHeader = '';

  constructor() { }

  ngOnInit(): void {
  }

}
