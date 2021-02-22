import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationInfoComponent } from './operation-info/operation-info.component';
import { OperationListComponent } from './operation-list/operation-list.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OperationInfoComponent,
    OperationListComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    OperationInfoComponent,
    OperationListComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
