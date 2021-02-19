import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
  styleUrls: ['./operation-info.component.scss']
})
export class OperationInfoComponent implements OnInit {

  @Input() total: any;

  constructor() { }

  ngOnInit(): void {
  }

}
