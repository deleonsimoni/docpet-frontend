import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name = '';
  mobile = '';
  password = '';
  passwordconfirm = '';
  role = 0;
  isPatient: boolean = false;
  doctors: any = [];
  patients: any = [];
  reg_type = 'Cadastro de Profissional';
  doc_patient = 'É um Pet?';
  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getpatients();
    this.getDoctors();
  }

  changeRegType() {
    if (this.reg_type === 'Cadastro de Profissional') {
      this.reg_type = 'Cadastro de Pet';
      this.doc_patient = 'É um profissional?';
      this.isPatient = false;
    } else {
      this.reg_type = 'Cadastro de Profissional';
      this.doc_patient = 'É um Pet?';
      this.isPatient = true;
    }
  }

  signup() {
    if (this.name === '' || this.mobile === '' || this.password === '') {
      this.toastr.error('', 'Preencha este campo que é obrigatorio!');
    } else {
      if (!this.isPatient) {
        let params = {
          id: this.doctors.length + 1,
          doctor_name: this.name,
          password: this.password,
        };
        this.commonService.createDoctor(params).subscribe((res) => {
          this.toastr.success('', 'Register successfully!');
          this.router.navigate(['/doctor-register-step1']);
        });
      } else {
        let params = {
          id: this.patients.length + 1,
          name: this.name,
          password: this.password,
        };
        this.commonService.createPatient(params).subscribe((res) => {
          this.toastr.success('', 'Register successfully!');
          this.router.navigate(['/patient-register-step1']);
        });
      }
    }
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
    });
  }

  getpatients() {
    this.commonService.getpatients().subscribe((res) => {
      this.patients = res;
    });
  }
}
