import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
  styleUrls: ['./operation-info.component.scss']
})
export class OperationInfoComponent implements OnInit {

  @Input() total: any;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this._authService.logOut();
    this.router.navigate(['/login']);
  }

}
