import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class FormContatoComponent implements OnInit {

  base = 'Form';
  page = 'Cadastre-se';

  constructor() { }

  ngOnInit(): void {
  }

}
