import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OperationService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public operations: any;
  public amount: any;
  public subscription: Subscription;

  constructor(
    private _operationService: OperationService,
  ) {
    this.getOperations();

    this.subscription = this._operationService.refresh.subscribe(() => {
      this.getOperations();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getOperations() {
    this._operationService.getOperations()
      .subscribe((res:any) => {
        this.operations = res.res;
        this.amount = res.total;
      });
  }

}
