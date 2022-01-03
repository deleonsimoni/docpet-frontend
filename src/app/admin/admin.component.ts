import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  Params,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonServiceService } from '../common-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  adminShow: boolean = true;
  user;

  constructor(
    @Inject(DOCUMENT) private document,
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    public Router: Router,
    private userService: UserService,
  ) {
    Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/admin/forgot-pass' ||
          event.url === '/admin/lock-screen' ||
          event.url === '/admin/login-form' ||
          event.url === '/admin/register' ||
          event.url === '/admin/error-first' ||
          event.url === '/admin/error-second'
        ) {
          this.adminShow = false;
        } else {
          this.adminShow = true;
        }
      }
    });
  }
  ngOnInit(): void {
    this.user = this.userService.getUser()

    this.commonService.nextmessage('admin');
    let scope = this;
    setTimeout(() => {
      if(this.user.isAdmin){
        scope.Router.navigateByUrl('/admin/dashboard-admin');

      }else if(this.user.role == 1){
        scope.Router.navigateByUrl('/admin/dashboard');
      }else if(this.user.role == 3){
        scope.Router.navigateByUrl('/admin/dashboard-adestrador');
      }else if(this.user.role == 4){
        scope.Router.navigateByUrl('/admin/dashboard-estetica');
      }

    }, 100);
  }

}
