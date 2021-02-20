import { Component, OnInit } from '@angular/core';
import { OperationService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public operations: any;
  public amount: any;

  constructor(
    private _operationService: OperationService,
  ) {
    this._operationService.getOperations()
      .subscribe((res:any) => {
        this.operations = res.res;
        this.amount = res.total;
      });
  }

  ngOnInit(): void { }
  
  openModal() {
    
  }
}
