import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from './../services/blog.service';
import { EspecialidadeService } from 'src/app/services/especialidades.service';

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
  urlatual: any = [];
  pathImage;
  especialidadeId;
  nomeEspecialidade;
  constructor(
    private toastr: ToastrService,
    private blogService: BlogService,
    private especialidadeSevice: EspecialidadeService,
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.titulo = this.route.snapshot.queryParams['titulo'];
    
    var urls  = window.location.href; 
    this.pathImage = "http://www.gugaweigert.com.br/vetzcoImagens/";
    this.urlatual = urls.split('/');
    this.titulo = this.urlatual[4];
    console.log('titulo: '+this.urlatual[4]);
    this.getBlogdetails();
    this.getCategories();
    this.getComments();
    window.scrollTo(0, 0);
  }

  getBlogdetails() {
    this.blogService.getByTitle(this.titulo).subscribe(
      (res) => {
        this.blogdetails = res[0];
        console.log(this.blogdetails);
        
      },
      //(error) => (this.errorMessage = <any>error)
    );
    
    
  }

  getCategories() {
    this.blogService.getAllTotalEspcBlog().subscribe(
      (res) => {
        this.categories = res;
        console.log(res);
        
      },
      //(error) => (this.errorMessage = <any>error)
    );
    
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
      this.toastr.error('', 'Campo obrigatório');
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
  formataUrldados(dado){
    if(dado){
      return dado.trim().split(' ').join('-').toLowerCase();
      
    }

    return "";
  }
  
  formataUrllink(autor){
    if(autor){
      let especial = this.nomeEspecialidade;
      let uf = this.blogdetails.place;
      let especFormat = especial.trim().split(' ').join('-');
      let ufFormat = uf.trim().split(' ').join('-');
      let autorFormat = autor.trim().split(' ').join('-');
      let formatado = (autorFormat+"/"+especFormat+"/"+ufFormat).toLowerCase();
      
      return formatado;
      
      
    }

    return "";
  }
}
