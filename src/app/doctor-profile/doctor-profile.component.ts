import { EstabelecimentoService } from './../services/estabelecimento.service';
import { VeterinarioService } from './../services/veterinario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Veterinario } from '../models/veterinario';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  docNameFormated;
  doctorDetails;
  estabelecimentos;
  like = false;
  review: any = {};
  user;
  isLoading = true;


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
    private veterinarioService: VeterinarioService,
    private estabelecimentoService: EstabelecimentoService,
    private userService: UserService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    public router: Router,

  ) { }
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.docNameFormated = this.route.snapshot.params['nome'];
    this.getDoctorsDetails();
    this.user = this.userService.getUser();
    window.scrollTo(0, 0);


  }

  getImageDoctor(doctorDetails) {
    return doctorDetails?.img ? doctorDetails.img : 'https://image.freepik.com/vetores-gratis/medico-icone-ou-avatar-em-branco_136162-58.jpg'
  }

  likeIt() {

    this.like = !this.like;

  }

  listReviews() {

    this.veterinarioService.getReview(this.doctorDetails._id).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.doctorDetails.reviews = data.reviews.reviews;

      },
      (error) => {
        this.isLoading = false;
        this.toast.error('Ocorreu um erro ao enviar o feedback', 'Erro');
      }
    );

  }

  sendReview() {

    this.review.user = this.user.id;

    this.veterinarioService.createReview(this.doctorDetails._id, this.review).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.toast.success('Feedback enviado com sucesso', ':)');
        this.listReviews();

      },
      (error) => {
        this.isLoading = false;
        this.toast.error('Ocorreu um erro ao enviar o feedback', 'Erro');
      }
    );

  }

  getDataFormatada(data) {
    var date2 = new Date();
    var date1 = new Date(data);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  getDoctorsDetails() {
    if (this.docNameFormated) {
      this.veterinarioService.getByName(this.docNameFormated).subscribe(
        (res) => {
          this.doctorDetails = res;
          //this.dtTrigger.next();
        },
        //(error) => (this.errorMessage = <any>error)
      );

    }

  }

  getMes(i) {
    return this.meses[i - 1].abreviado;
  }
}
