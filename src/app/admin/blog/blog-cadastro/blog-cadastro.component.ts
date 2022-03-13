import { UserService } from '../../../services/user.service';
import { Component, ElementRef, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { INgxSelectOption } from 'ngx-select-ex';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { EspecialidadeService } from 'src/app/services/especialidades.service';
import { escapeSelector } from 'jquery';
import { HttpClient } from '@angular/common/http';


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
  bt_salvar:boolean = false;
  userLogged;
  id!: string;
  var_id = "";
  var_title;
  var_place;
  var_link_blog;
  var_link_author;
  var_especialidade;
  var_doctor_name;
  var_doctor_pic;
  var_short_description;
  var_description;
  var_img;
  public review: any[];
  public blog: any[];
  public places: any[];
  public especialidades: any[];
  public especialidadesTotal: any[];
  public especialidadeEscolhida: any = [];
  blogForm: FormGroup;
  public novoBlog: any[];
  especialidadeId: number;
  nomeEspecialidade;
  nomeArquivoSelecionado;
  arquivoMovManual;
  hideFooter: boolean = true;
  placeId;
  constructor(private router: Router,
              private http: HttpClient,
              private especialidadeSevice: EspecialidadeService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder, 
              private blogService: BlogService,
              private toastService: ToastrService, 
              private userService: UserService ) {

  }

  ngOnInit(): void {
    this.userLogged = this.userService.getUser();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.pathImage = 'http://www.gugaweigert.com.br/vetzcoImagens/';
    this.listarEspecialidades();
    if(!this.isAddMode && this.id){
      this.listarBlog();  
    }
    this.places=[
      {"description":"São Paulo", "placeId":"ChIJ0WGkg4FEzpQRrlsz_whLqZs"},
      {"description":"Rio de Janeiro", "placeId":"ChIJW6AIkVXemwARTtIvZ2xC3FA"},
      {"description":"Brasília", "placeId":"ChIJ1wSIEPI6WpMRVlAUyZAjuj4"},
      {"description":"Salvador", "placeId":"ChIJvS5CUCARFgcRndtzlTaEHPc"},
      {"description":"Fortaleza", "placeId":"ChIJP3hMRj9MxwcRyjdrDArGYUY"},
      {"description":"Belo Horizonte", "placeId":"ChIJMyzPysqQpgARlznSOl55NVs"},
      {"description":"Manaus", "placeId":"ChIJt0d2s8gbbJIRzKll959cSCs"},
      {"description":"Curitiba", "placeId":"ChIJ3bPNUVPj3JQRCejLuqVrL20"},
      {"description":"Recife", "placeId":"ChIJi0DllG8ZqwcRpuO9gvcOgOU"},
      {"description":"Goiânia", "placeId":"ChIJZwjYWL32XpMRjmfSIK0rae8"},
      {"description":"Belém", "placeId":"ChIJ4Wx1hK9hpJIRNUyGFQJUDVc"},
      {"description":"Porto Alegre", "placeId":"ChIJHctqVtKcGZURH-mHn6gRMWA"},
      {"description":"São Luís", "placeId":"ChIJIW1_b_CP9gcRR96jWeQCMZg"},
    ];
    this.blogForm = this.formBuilder.group(
      {
        _id: [null],
        title: [null, [Validators.required, Validators.minLength(5)]],
        link_blog:[null,[Validators.required]],
        link_author:[null,[Validators.required]],
        especialidade:[null,[Validators.required]],
        doctor_name:[null,[Validators.required]],
        doctor_pic:[null],
        short_description:[null,[Validators.required]],
        description:[null,[Validators.required]],
        img:[null],
        place:[null,[Validators.required]],
        
        
      }
    
    )
    console.log(this.blogForm);
    

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
   // this.listarBlog();  
  }
  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      
      this.arquivoMovManual = event.target.files[0];
      this.var_img = this.arquivoMovManual.name;

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(reader);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        
      console.log(this.var_img);
      }
    }
  }
  inputFileChange() {
    if (this.arquivoMovManual) {
      const formData = new FormData();
      formData.append('img', this.arquivoMovManual);
      this.http.post('http://localhost:3001/v1/uploads', formData)
      .subscribe(resposta => console.log('upload ok'));
      
      
    }
  }
      
  public delete(){
    this.url = null;
  }
  listarCompleto(query) {
    this.especialidades = [];

    this.especialidadeSevice.getCompletedFind(query)
      .subscribe(
        data => {
          data.forEach(item => item.nomeFormated = item['nome'] + ' ' + item['nomeFormated'] + ' ' + this.createEdgeNGrams(item['nomeFormated']));
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }
  listarEspecialidades() {

    this.especialidadeSevice.getAll()
      .subscribe(
        data => {
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }
  listarBlog() {

    this.blogService.get(this.id)
      .subscribe(
        data => {
          let estblogb = data as Blog;
          this.blogForm.patchValue(estblogb);
          this.blog = data;

          console.log(this.blog);
          this.bt_salvar = true;
          
          if(estblogb.img){
            this.url = this.pathImage+estblogb.img;
          }
      
      
        },
        error => {
          console.log(error);
        });
        
  }
  inputTyped(text: string) {
    
      this.listarEspecialidades();
    
  }
  createEdgeNGrams(str) {
    if (str && str.length > 3) {
      const minGram = 3
      const maxGram = str.length

      return str.split(" ").reduce((ngrams, token) => {
        if (token.length > minGram) {
          for (let i = minGram; i <= maxGram && i <= token.length; ++i) {
            ngrams = [...ngrams, token.substr(0, i)]
          }
        } else {
          ngrams = [...ngrams, token]
        }
        return ngrams
      }, []).join(" ")
    }

    return str
  }
  normalizeNome(options: INgxSelectOption[]) {
    let tipo = 0;
    if (options) {
      tipo = options[0].data.type;
      options[0].text = options[0].data.nome;

    }

  }
  createReviewsFormGroup(): FormGroup{
    return this.formBuilder.group({
      nameUser:[null, [Validators.required]],
      email:[null, [Validators.required]],
      comment:[null, [Validators.required]],
      
    });
  }
  createEspecialidadeFormGroup(): FormGroup{
    return this.formBuilder.group({
      _id:[null, [Validators.required]]
      
    });
  }

  

  salvar(){
    if (this.blogForm.valid) {
      const novoBlog = this.blogForm.getRawValue() as Blog;
      console.log(novoBlog);
      if(this.id){
        novoBlog.img = this.var_img;
        this.blogService.update(this.id, novoBlog).subscribe(
          () => {
            if(this.userLogged.isAdmin){
              this.router.navigate(['/admin/list-blog']);
            }else{
              this.router.navigate(['/admin/dashboard']);
            }
          },
          (error) => {
            console.log(error);
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
  formataUrldados(dado){
    if(dado){
      let semacento = this.removerAcentos(dado);
      let formatado = semacento.trim().split(' ').join('-').toLowerCase();
      this.blogForm.get('link_blog').setValue(formatado);
    }

    return "";
  }
  
  formataUrllink(autor){
    if(autor){
      let nomeautor = this.removerAcentos(autor);
      let espec = this.removerAcentos(this.nomeEspecialidade);
      let uf = this.removerAcentos(this.var_place);
      let especFormat = espec.trim().split(' ').join('-');
      let ufFormat = uf.trim().split(' ').join('-');
      let autorFormat = nomeautor.trim().split(' ').join('-');
      let formatado = (autorFormat+"/"+especFormat+"/"+ufFormat).toLowerCase();
      
      this.blogForm.get('link_author').setValue(formatado);
      
      
    }

    return "";
  }
  public removerAcentos(texto)
{
    let comAcentos = ['Ä','Å','Á','Â','À','Ã','ä','á','â','à','ã','É','Ê','Ë','È','é','ê','ë','è','Í','Î','Ï','Ì','í','î','ï','ì','Ö','Ó','Ô','Ò','Õ','ö','ó','ô','ò','õ','Ü','Ú','Û','ü','ú','û','ù','Ç','ç'];
   /* let semAcentos = ['A','A','A','A','A','A','a','a','a','a','a','E','E','E','E','e','e','e','e','I','I','I','I','i','i','i','i','O','O','O','O','O','o','o','o','o','o','U','U','U','u','u','u','u','C','c'];
    let i = 0;
    let textosemacento = "";
    for (i = 0; i < comAcentos.length; i++)
    {
        textosemacento = texto.Replace(comAcentos[i], semAcentos[i]);
    }
    return textosemacento;
    */
    var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    console.log(semAcento);
    return semAcento.normalize('NFD').replace(/[^\w\s]/gi, ' ');
}
  onGetEspecialidade(){ // Função que foi chamada
    this.especialidadeId = this.blogForm.get('especialidade').value;
    this.especialidadeSevice.get(this.especialidadeId)
    .subscribe(
      data => {
        this.nomeEspecialidade = data.nome;
        console.log("estou na especialidade campo... " + data.nome);
      },
      error => {
        console.log(error);
      });
     // Imprimiu o valor no Console log.
    
  }
  onGetlocal(){
    this.placeId = this.blogForm.get('place').value;
    this.var_place = this.removerAcentos(this.places.find(x=>x.placeId == this.placeId).description);
    console.log(this.var_place);
  }
  

  selecionarArquivoMovManual(event) {
    //console.log(event.target.files[0].name);
    this.arquivoMovManual = event.target.files[0];
    this.nomeArquivoSelecionado = this.arquivoMovManual.name;
  }
}
