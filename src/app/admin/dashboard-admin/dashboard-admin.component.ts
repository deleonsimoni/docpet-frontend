import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  user;
  totalUsers;
  totalVets;
  totalClinics;
  totalAccess;

  totalAccessVets;
  totalAccessClinics;
  totalAccessTutors;
  totalAccessAdestradores;
  totalAccessEsteticas;


  constructor(
    private userService: UserService,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {

    this.user = this.userService.getUser();

    this.dashboardService.getDashboardAdmin().subscribe(
      (counts: any) => {
        this.totalAccess = counts.counts.totalAccess.access;
        this.totalVets = counts.counts.totalVets;
        this.totalClinics = counts.counts.totalClinics;
        this.totalUsers = counts.counts.totalUsers;

        this.totalAccessVets = counts.counts.totalLogins.filter(e => e.typeUser == 1).length || 0;
        this.totalAccessClinics = counts.counts.totalLogins.filter(e => e.typeUser == 2).length || 0;
        this.totalAccessTutors = counts.counts.totalLogins.filter(e => e.typeUser == 0).length || 0;
        this.totalAccessAdestradores = counts.counts.totalLogins.filter(e => e.typeUser == 3).length || 0;
        this.totalAccessEsteticas = counts.counts.totalLogins.filter(e => e.typeUser == 4).length || 0;


        //let graph = this.getSumByKey(counts.counts.totalLogins);


      },
      (error) => {
        console.log(error);
      }
    );

    /* Morris Area Chart */
    Morris.Area({
      element: 'morrisArea',
      data: [
        { y: '2013', a: 60 },
        { y: '2014', a: 100 },
        { y: '2015', a: 240 },
        { y: '2016', a: 120 },
        { y: '2017', a: 80 },
        { y: '2018', a: 100 },
        { y: '2019', a: 300 },
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Revenue'],
      lineColors: ['#1b5a90'],
      lineWidth: 2,

      fillOpacity: 0.5,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

    /* Morris Line Chart */
    Morris.Line({
      element: 'morrisLine',
      data: [
        { y: '2015', a: 100, b: 30 },
        { y: '2016', a: 20, b: 60 },
        { y: '2017', a: 90, b: 120 },
        { y: '2018', a: 50, b: 80 },
        { y: '2019', a: 120, b: 150 },
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Doctors', 'Patients'],
      lineColors: ['#1b5a90', '#ff9d00'],
      lineWidth: 1,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });
  }



}
