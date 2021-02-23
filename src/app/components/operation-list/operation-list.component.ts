import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit {

  @Input() operationList: any;
  update = {
    name: "Update Operation",
    accion: "update"
  };
  
  delete = {
    name: "Delete Operation",
    accion: "delete"
  };

  constructor() { }

  ngOnInit(): void {}

}
