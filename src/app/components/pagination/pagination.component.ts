import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() page = new EventEmitter();
  @Input() totalPages: any;
  @Input() currentPage: any;

  constructor() { }

  ngOnInit(): void {
  }

  changePage(page: any) {
    this.page.emit(page);
  }

  getArray() {
    return Array(this.totalPages);
  }

}
