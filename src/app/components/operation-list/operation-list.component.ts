import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit {

  @Input() operationList: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.operationList);
  }

}
