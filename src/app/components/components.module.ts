import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationInfoComponent } from './operation-info/operation-info.component';
import { OperationListComponent } from './operation-list/operation-list.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    OperationInfoComponent,
    OperationListComponent,
    ModalComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    OperationInfoComponent,
    OperationListComponent,
    ModalComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }
