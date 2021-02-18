import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationInfoComponent } from './operation-info/operation-info.component';
import { OperationListComponent } from './operation-list/operation-list.component';



@NgModule({
  declarations: [
    OperationInfoComponent,
    OperationListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OperationInfoComponent,
    OperationListComponent
  ]
})
export class ComponentsModule { }
