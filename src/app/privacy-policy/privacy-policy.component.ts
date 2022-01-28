import { EstabelecimentoService } from '../services/estabelecimento.service';
import { AdestradorService } from '../services/adestrador.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Veterinario } from '../models/veterinario';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../global';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
})
export class PrivacyPolicyComponent implements OnInit {
  id;
  nameFormated;
  adestradorDetails;
  estabelecimentos;
  especialidadeFormated;
  municipioFormated;

  like = false;
  review: any = {};
  user;
  isLoading = true;
  totalStar = 0;
  totalStarFormated = 0;
  isLikedComment = 0;
  totalLike = 100;
  toastr;


  meses = [{ id: 1, mes: 'Janeiro', abreviado: 'Jan' },
  { id: 2, mes: 'Fevereiro', abreviado: 'Fev' },
  { id: 3, mes: 'Março', abreviado: 'Mar' },
  { id: 4, mes: 'Abril', abreviado: 'Abr' },
  { id: 5, mes: 'Maio', abreviado: 'Mai' },
  { id: 6, mes: 'Junho', abreviado: 'Jun' },
  { id: 7, mes: 'Julho', abreviado: 'Jul' },
  { id: 8, mes: 'Agosto', abreviado: 'Ago' },
  { id: 9, mes: 'Setembro', abreviado: 'Set' },
  { id: 10, mes: 'Outubro', abreviado: 'Out' },
  { id: 11, mes: 'Novembro', abreviado: 'Nov' },
  { id: 12, mes: 'Dezembro', abreviado: 'Dez' },
  ];

  constructor(
    private adestradorService: AdestradorService,
    private estabelecimentoService: EstabelecimentoService,
    private userService: UserService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    public router: Router,

  ) { }
 
  ngOnInit(): void {
    


  }


  



}