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
  public totalPages: any;
  public currentPage: any;
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

  paginate(p:any) {
    this.getOperations(p);
  }
  
  getOperations(page=1) {
    this._operationService.getOperations(page)
      .subscribe((res:any) => {
        this.operations = res.res.operations;
        this.amount = res.total;
        this.totalPages = res.res.totalPages;
        this.currentPage = res.res.currentPage;
      });
  }

}
