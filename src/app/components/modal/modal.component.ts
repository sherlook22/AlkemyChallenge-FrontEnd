import { Component, Injectable, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, 
         NgbDateAdapter, 
         NgbDateParserFormatter, 
         NgbDateStruct, 
         NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { AuthService, OperationService, TypeService } from 'src/app/services';

/*#####################################################################################*/
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

/*#####################################################################################*/
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
  @Input() updOperation: any;
  @Input() delOperation: any;
  types : any;

  public operationForm : FormGroup;

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private _operationService: OperationService,
    private _authService: AuthService,
    private _typeService: TypeService
  ) {
    //The form should be create in another component
    this.operationForm = this.fb.group({
      id: [''],
      concept: ['', Validators.required],
      date   : ['', Validators.required],
      amount : ['', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]],
      type   : ['', Validators.required]
    });
    this.getTypes();
  }
/*#####################################################################################*/
  open(content:any) {
    this.operationForm.reset();
    this.accion.accion === 'update' ? this.chargeBaseInfo():'';
    this.modal.open(content, { 
      size: 'lg', 
      centered: true, 
      ariaLabelledBy: 'modal-basic-title' 
    });
  }
/*#####################################################################################*/
  chargeBaseInfo() {
    let {id, concept, date, amount, type} = this.updOperation;

    amount = amount <= 0 ? -amount : amount;
    let formatDate = date.split('-');
    formatDate = formatDate.reverse().join('/');

    this.operationForm.setValue({
      id: id,
      concept: concept,
      date: formatDate,
      amount: amount,
      type: type.id
    });
  }
/*#####################################################################################*/
  getTypes() {
    this._typeService.getTypes().subscribe((res:any) =>{
      this.types = res.res;
    })
  }
/*#####################################################################################*/
  operationAccion(modal: NgbActiveModal) {
    if(this.operationForm.invalid) {
      Object.values( this.operationForm.controls).forEach((ctls) => {
        ctls.markAsTouched();
      })
    }

    if(!this.operationForm.invalid) {
      this.accion === '' ? this.createOperation(modal) : this.updateOperation(modal);
    }
  }
/*#####################################################################################*/
  createOperation(modal: NgbActiveModal) {
    const user:any = this._authService.decodeToken();
    this._operationService.createOperation(this.operationForm.value, user.sub)
        .subscribe();
      modal.close()
      this.operationForm.reset();
  }
/*#####################################################################################*/  
  updateOperation(modal: NgbActiveModal) {
    this._operationService.updateOperation(this.operationForm.value)
      .subscribe()
    modal.close();
    this.operationForm.reset();
  }

  deleteOperation(modal: NgbActiveModal) {
    const { id } = this.delOperation;
    this._operationService.deleteOperation(id)
      .subscribe()
    modal.close();
    this.operationForm.reset();
  }

}
