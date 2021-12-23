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
  totalStar = 0;
  totalStarFormated = 0;
  isLikedComment = 0;
  totalLike = 100;


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
        this.countScore(this.doctorDetails);
      },
      (error) => {
        this.isLoading = false;
        this.toast.error('Ocorreu um erro ao enviar o feedback', 'Erro');
      }
    );

  }

  sendReview() {

    if (!this.review.score) {
      this.toast.warning('Selecione a quantidade de estrelas', 'Atenção');
      return;
    }

    if (!this.user && !this.review.nameUser) {
      this.toast.warning('Digite seu nome', 'Atenção');
      return;
    }


    if (!this.review.description) {
      this.toast.warning('Digite a descrição', 'Atenção');
      return;
    }

    if (this.isLikedComment > 0) {
      if (this.isLikedComment == 1) {
        this.review.like = true;
      } else {
        this.review.like = false;
      }
    }

    if (this.user) {
      this.review.user = this.user.id;
    }

    this.veterinarioService.createReview(this.doctorDetails._id, this.review).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.toast.success('Feedback enviado com sucesso', ':)');
        this.listReviews();
        this.review = {
          nameUser: '',
          score: 0,
          description: '',
        }
        this.isLikedComment = 0;

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
          this.countScore(this.doctorDetails);
          //this.dtTrigger.next();
        },
        //(error) => (this.errorMessage = <any>error)
      );

    }

  }

  countScore(doctorDetails) {

    //calculate rates
    if (doctorDetails.reviews.length > 0) {

      //star
      //this.totalStar = this.doctorDetails.reviews.reduce((previous, next) => (previous.score + next.score));
      let to = 0;
      for (let item of doctorDetails.reviews) {
        if (item.score) {
          to += item.score;
        }
      }

      if (to > 0) {
        this.totalStar = (to / 5);
        this.totalStarFormated = Math.round((to / 5));

        if (this.totalStarFormated >= 5) {
          this.totalStar = 5;
          this.totalStarFormated = 5;
        }

      }

      //like
      let totalLike = 0;
      let totalDislike = 0;

      for (let item of doctorDetails.reviews) {
        if (item.like === true) {
          totalLike+=1;
        } else if (item.like === false){
          totalDislike+=1;
        }
      }

      this.totalLike = (totalLike/(totalLike + totalDislike)) * 100;

      if(isNaN(this.totalLike) || this.totalLike < 0){
        this.totalLike = 0;
      } else {
        this.totalLike = Math.round(this.totalLike);
      }

    }

  }

  getMes(i) {
    return this.meses[i - 1].abreviado;
  }
}
