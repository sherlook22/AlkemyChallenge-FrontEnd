import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() accion:any;

  closeResult = '';

  constructor(
    private modal: NgbModal,
  ) {}

  ngOnInit(): void {    
  }

  open(content:any) {
    console.log(this.accion.accion);
        
    this.modal.open(content, { size: 'lg', centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
