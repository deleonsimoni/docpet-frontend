import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  id;
  titulo;
  blogdetails: any = [];
  blogs: any = [];
  categories: any = [];
  reviews: any = [];
  name = '';
  email = '';
  usercomment = '';
  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.titulo = this.route.snapshot.queryParams['titulo'];
    this.getBlogdetails();
    this.getCategories();
    this.getComments();
    window.scrollTo(0, 0);
  }

  getBlogdetails() {
    this.blogs = [{
      
        id: 1,
        title: "Fazendo a sua visita clínica indolor?",
        link_blog: "fazendo-a-sua-visita-clinica-indolor",
        link_author: "gustavo-weigert/anestesiologia/rio-de-janeiro",
        especialidade: "Clínica Geral",
        doctor_name: "Gustavo Weigert",
        doctor_pic: "http://www.gugaweigert.com.br/vetzcoImagens/avatar-mini-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
        img: "http://www.gugaweigert.com.br/vetzcoImagens/imagem1.png",
        reviews:[
          {
            name: "Regina Weigert",
            email: "reginaweigert@gmail.com",
            comment: "Achei interessante a matéria!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            data: "2022-01-15"
          },
          {
            name: "João Silva",
            email: "reginaweigert@gmail.com",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            data: "2022-02-15"
          },
          {
            name: "Maria F Vargas",
            email: "reginaweigert@gmail.com",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            data: "2022-02-20"
          }
        ],
        type: "",
        createdAt: "2022-02-15"
      
    }];
    this.blogdetails = this.blogs[0];
    console.log(this.blogdetails);
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        name: "Alergologie",
        num_blog: "70",
        link_author: "alergologie",
        
      },
      {
        id: 2,
        name: "Cardiologia",
        num_blog: "62",
        link_author: "cardiologia",
        
      },
      {
        id: 3,
        name: "Clínica Geral",
        num_blog: "37",
        link_author: "clinica-geral",
        
      },
      {
        id: 4,
        name: "Dermatologia",
        num_blog: "32",
        link_author: "dermatologia",
        
      },
      {
        id: 5,
        name: "Anestesiologia",
        num_blog: "30",
        link_author: "anestesiologia",
        
      },
      {
        id: 6,
        name: "Medicina Preventiva",
        num_blog: "28",
        link_author: "medicina-preventiva",
        
      },
      {
        id: 7,
        name: "Medicina Felina",
        num_blog: "24",
        link_author: "medicina-felina",
        
      },
      {
        id: 8,
        name: "Nutrição",
        num_blog: "19",
        link_author: "Nutricao",
        
      },
      {
        id: 9,
        name: "Oftalmologia",
        num_blog: "11",
        link_author: "oftalmologia",
        
      },
      {
        id: 10,
        name: "Banho e Tosa",
        num_blog: "5",
        link_author: "banho-e-tosa",
        
      }
    ];
  }

  getComments() {
    this.reviews = this.blogdetails.reviews;
    
  }

  navigate(blog) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/blog-details/=' + blog.id);
    });
  }

  comment() {
    if (this.name === '' || this.email === '' || this.usercomment === '') {
      this.toastr.error('', 'Please enter mandatory field');
    } else {
      let params = {
        id: this.reviews.length + 1,
        name: this.name,
        email: this.email,
        comment: this.usercomment,
      };
      this.commonService.createComment(params).subscribe((res) => {
        this.toastr.success('', 'Comment successfully!');
        this.name = '';
        this.email = '';
        this.usercomment = '';
        this.getComments();
      });
    }
  }
}
