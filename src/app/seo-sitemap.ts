export const seoSitemap: ISitemapTag[] = [
  { 
       customUrl: '/home', 
       title: 'Encontre agora uma Clínica Veterinária! | VetzCo', 
       description: 'Seu PET está com problemas? Na VetzCo você encontra tudo que precisa, desde veterinários renomados até farmácias e laboratórios. Agende hoje sua consulta!', 
       image: 'clinica veterinaria, 550.000' 
   },
   { 
     customUrl: '/cadastro', 
     title: 'Cadastre-se para intregar a plataforma de veterinários e clínicas | VetzCo', 
     description: 'Nossa missão é ajudar médicos veterinários e locais de pet a criarem identidade digital', 
     image: 'plataforma de veterinários, clínicas veterinárias, pets, petshop' 
   },
   { 
     customUrl: '/login', 
     title: 'Faça login para acessar sua conta na plataforma de veterinários, clínicas e locais de pet | VetzCo', 
     description: 'Acesso restrito a plataforma de veterinários, clínicas e locais de pet', 
     image: 'login, acesso restrito' 
   },
   { 
     customUrl: '/forgot-password', 
     title: 'Esqueceu sua senha? Recupere aqui | VetzCo', 
     description: 'Recuperação de senha para acesso a plataforma Vetzco!', 
     image: 'recuperar senha, esqueceu a senha' 
   },
   { 
     customUrl: '/admin', 
     title: 'aplicação de administração | VetzCo', 
     description: 'Área restrita para manter conteúso da Vetzco', 
     image: '' 
   }
   
 ];
 
 export interface ISitemapTag {
   customUrl: string;
   title: string | null;
   description: string | null;
   image: string | null;
 }
 


  

  
  