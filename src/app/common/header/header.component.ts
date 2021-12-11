import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { CommonServiceService } from './../../common-service.service';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth: boolean = false;
  comrytmenu: boolean = true;
  isPatient: boolean = false;
  hi4: boolean = false;
  hi6: boolean = false;
  hi7: boolean = false;
  hi8: boolean = false;
  comlogo: boolean = true;
  whitelogo: boolean = false;
  page;
  splitVal;
  headerTop: boolean = false;
  user;
  base;
  url1;
  constructor(
    @Inject(DOCUMENT) private document,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public commonService: CommonServiceService,
    public userService: UserService

  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        var res = event.url.split('/');
        this.base = res[1];
        this.page = res[2];
        if (event.url == '/home-slider-one') {
          this.headerTop = true;
        } else {
          this.headerTop = false;
        }
        if (event.url == '/doctor/dashboard'){
          this.auth = true;
        }
        if (event.url == '/doctor/appointment'){
          this.auth = true;
        }
        if (event.url == '/doctor/scheduletiming'){
          this.auth = true;
        }
        // if (event.url == '/home-four'){
        //   this.comrytmenu = false;
        //   this.hi4 = true;
        //   this.comlogo = false;
        //   this.whitelogo = true;
        // }
        // else if (event.url == '/home-six'){
        //   this.comrytmenu = false;
        //   this.hi7 = false;
        //   this.hi6 = true;
        // }
        // else if (event.url == '/home-seven'){
        //   this.comrytmenu = false;
        //   this.hi6 = false;
        //   this.hi7 = true;
        //   this.comlogo = false;
        //   this.whitelogo = true;
        // }
        // else if (event.url == '/home-eight'){
        //   this.comrytmenu = false;
        //   this.hi6 = false;
        //   this.hi7 = false;
        //   this.hi8 = true;
        //   this.comlogo = true;
        //   this.whitelogo = false;
        // }
        // else {
        //   this.comrytmenu = true;
        //   this.hi4 = false;
        //   this.hi7 = false;
        //   this.hi8 = false;
        // }
      }
    });
    this.url1 = this.router.url;
    this.commonService.message.subscribe((res) => {
      if (res === 'patientLogin') {
        this.auth = true;
        // this.isPatient = true;
      }
      if (res === 'doctorLogin') {
        this.auth = true;
        // this.isPatient = false;
      }

      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
      }
    });
  }

  ngOnInit(): void {

    this.user = this.userService.getUser();

    if (localStorage.getItem('auth') === 'true') {
      this.auth = true;
      this.isPatient =
        localStorage.getItem('patient') === 'true' ? true : false;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });

        $(window).scroll(function(){
        var scroll = $(window).scrollTop();
          if (scroll > 95) {
          $(".header-trans").css("background" , "#FFFFFF");
          }

          else{
            $(".header-trans").css("background" , "transparent");
          }
          if (scroll > 95) {
            $(".header-trans.custom").css("background" , "#2b6ccb");
            }

            else{
              $(".header-trans.custom").css("background" , "transparent");
            }
        })
  }

  sair(){
    this.userService.logout();
    this.router.navigate(['/']);

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.loadDynmicallyScript('assets/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }
  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage('main');
  }

  mapGrid() {
    this.router.navigate(['/map-grid']);
  }

  mapList() {
    this.router.navigate(['/map-list']);
  }

  addStyle(val) {
    if (val === 'home') {
      if (document.getElementById('home').style.display == 'block') {
        document.getElementById('home').style.display = 'none';
      } else {
        document.getElementById('home').style.display = 'block';
      }
    }
    if (val === 'doctor') {
      if (document.getElementById('doctor').style.display == 'block') {
        document.getElementById('doctor').style.display = 'none';
      } else {
        document.getElementById('doctor').style.display = 'block';
      }
    }
    if (val === 'patient') {
      if (document.getElementById('patient').style.display == 'block') {
        document.getElementById('patient').style.display = 'none';
      } else {
        document.getElementById('patient').style.display = 'block';
      }
    }
    if (val === 'pharmacy') {
      if (document.getElementById('pharmacy').style.display == 'block') {
        document.getElementById('pharmacy').style.display = 'none';
      } else {
        document.getElementById('pharmacy').style.display = 'block';
      }
    }
    if (val === 'pages') {
      if (document.getElementById('pages').style.display == 'block') {
        document.getElementById('pages').style.display = 'none';
      } else {
        document.getElementById('pages').style.display = 'block';
      }
    }
    if (val === 'blog') {
      if (document.getElementById('blog').style.display == 'block') {
        document.getElementById('blog').style.display = 'none';
      } else {
        document.getElementById('blog').style.display = 'block';
      }
    }
    if (val === 'admin') {
      if (document.getElementById('admin').style.display == 'block') {
        document.getElementById('admin').style.display = 'none';
      } else {
        document.getElementById('admin').style.display = 'block';
      }
    }
  }

  doctor(name) {
    this.page = name;
    this.router.navigate(['/doctor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.router.navigate(['/login']);
  }

  home() {
    this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    } else if (name === 'Pharmacy Admin') {
      this.router.navigate(['/pharmacy-admin']);
      this.commonService.nextmessage('pharmacy-admin');
    }
  }
}
