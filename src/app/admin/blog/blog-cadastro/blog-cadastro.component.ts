import { UserService } from '../../../services/user.service';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog-cadastro',
  templateUrl: './blog-cadastro.component.html',
  styleUrls: ['./blog-cadastro.component.css']
})

export class BlogCadastroComponent implements OnInit {
  splitVal;
  url;
  base = 'Blog';
  page = 'blog-Cadastro';
  pathImage;
  isAddMode!: boolean;
  userLogged;
  id!: string;
  
  blogForm: FormGroup;
  

  hideFooter: boolean = true;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder, private blogService: BlogService,
              private toastService: ToastrService, 
              private userService: UserService ) {

  }

  ngOnInit(): void {
    this.userLogged = this.userService.getUser();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.pathImage = 'http://www.gugaweigert.com.br/vetzcoImagens/';

    this.blogForm = this.formBuilder.group(
      {
        _id: [null],
        title: [null, [Validators.required, Validators.minLength(5)]],
        link_blog:[null,[Validators.required]],
        link_author:[null,[Validators.required]],
        speciality:[null,[Validators.required]],
        doctor_name:[null,[Validators.required]],
        doctor_pic:[null],
        short_description:[null,[Validators.required]],
        description:[null,[Validators.required]],
        img:[null],
        reviews: this.createReviewsFormGroup(),
        
      }
  )

    if(!this.isAddMode && this.id){
      this.popular();
    }

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
    
  }
  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete(){
    this.url = null;
  }
  createReviewsFormGroup(): FormGroup{
    return this.formBuilder.group({
      nameUser:[null, [Validators.required]],
      email:[null, [Validators.required]],
      comment:[null, [Validators.required]],
      
    });
  }

  popular(){}

  salvar(){
    if (this.blogForm.valid) {
      const novoBlog = this.blogForm.getRawValue() as Blog;

      if(this.id){
        this.blogService.update(this.id, novoBlog).subscribe(
          () => {
            if(this.userLogged.isAdmin){
              this.toastService.success('Blog alterado com sucesso', 'Sucesso');
              this.router.navigate(['/admin/list-blog']);
            }
          },
          (error) => {
            this.toastService.error('Ocorreu um erro ao atualizar o blog: ' + error, 'Atenção')
          }
        );

      }else{
      this.blogService.create(novoBlog).subscribe(
          () => {
            this.toastService.success('Blog cadastrado com sucesso', 'Sucesso');
            this.router.navigate(['/admin/list-blog']);
          },
          (error) => {
            this.toastService.error('Ocorreu um erro ao cadastrar o blog: ' + error, 'Atenção')
          }
        );
      }
    }
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script-focus-label.js');
  }

  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
 
}
