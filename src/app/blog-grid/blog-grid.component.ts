import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { BlogService } from './../services/blog.service';
import { EspecialidadeService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css'],
})
export class BlogGridComponent implements OnInit {
  blogs: any = [];
  categories: any = [];
  blog = true;
  urlatual: any = [];
  existe_especialidade = false;
  especialidade;
  especialidadeId;
  titleFormated;
  pathImage;
  numblog = 4;
  numpag = 1;
  onePage = false;
  morePage = false;
  constructor(private blogService: BlogService,private especialidadeSevice: EspecialidadeService,
    private route: ActivatedRoute,public commonService: CommonServiceService, public router: Router) {}

  ngOnInit(): void {
    var urls  = window.location.href; 
    this.pathImage = "http://www.gugaweigert.com.br/vetzcoImagens/";
    this.urlatual = urls.split('/');
    console.log(this.urlatual[4]);
    if (this.urlatual.length == 5){
      this.especialidade = this.urlatual[4];
      this.titleFormated = this.urlatual[3];
      this.existe_especialidade = true;
      this.getBlogsEspecialidade();
    }else{
      this.especialidade = "";
      this.titleFormated = this.urlatual[3];
      this.existe_especialidade = false;
      this.getBlogs();
    }
    this.getCategories();
    
    window.scrollTo(0, 0);
  }

  getBlogs() {
    //tamanho da imagem 1200X800
    this.blogService.getAll().subscribe(
      (res) => {
        this.blogs = res;
        console.log(res);
        console.log(this.blogs);
        this.numblog = this.blogs.length;
        console.log(this.numblog);
        this.numpag = this.numblog / 4;
        console.log(this.numpag);
      },
      //(error) => (this.errorMessage = <any>error)
    );
    if (this.numpag == 1){
      this.onePage = true;
      this.morePage = false;
    }else if(this.numpag > 1){
      this.onePage = false;
      this.morePage = true;
    }else{
      this.onePage = true;
      this.morePage = false;
    } 
  }
  getBlogsEspecialidade() {
    this.especialidade = this.urlatual[4].replace(/-/g, ' ').toUpperCase();
      console.log("esp: "+this.especialidade);
      this.blogService.getByEspecialidadeName(this.urlatual[4]).subscribe(
        (res) => {
          this.blogs = res;
          console.log(res);
          console.log(this.blogs);
          this.numblog = this.blogs.length;
          console.log(this.numblog);
          this.numpag = this.numblog / 4;
          console.log(this.numpag);
        },
        );
        if (this.numpag == 1){
          this.onePage = true;
          this.morePage = false;
        }else if(this.numpag > 1){
          this.onePage = false;
          this.morePage = true;
        }else{
          this.onePage = true;
          this.morePage = false;
        } 
     
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
  
  formataUrldados(dado){
    if(dado){
      return dado.trim().split(' ').join('-').toLowerCase();
    }

    return "";
  }
}
