import { Component, Injectable, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, 
         NgbDateAdapter, 
         NgbDateParserFormatter, 
         NgbDateStruct, 
         NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { OperationService } from 'src/app/services';

//These two injectables manage the date picker
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : Number(date[1]),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ModalComponent{

  @Input() accion:any;
  public operationForm : FormGroup;

  closeResult = '';

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private _operationService: OperationService
  ) {
    //The form should be create in another component
    this.operationForm = this.fb.group({
      concept: ['', Validators.required],
      date   : ['', Validators.required],
      amount : ['', Validators.required],
      type   : ['', Validators.required]
    });
  }

  open(content:any) {
    this.operationForm.reset();

    this.modal.open(content, { 
      size: 'lg', 
      centered: true, 
      ariaLabelledBy: 'modal-basic-title' 
    });
  }

  createOrUpdateOperation(modal: NgbActiveModal) {
    if(this.operationForm.invalid) {
      Object.values( this.operationForm.controls).forEach((ctls) => {
        ctls.markAsTouched();
      })
    }

    if(!this.operationForm.invalid) {
      
      this._operationService.createOperation(this.operationForm.value)
        .subscribe((res) => {
          console.log(res);
        });
      modal.close()
      this.operationForm.reset();
    }
  }

}
