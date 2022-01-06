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
  /* { 
     customUrl: '/doctor/TesteGuga', 
     title: 'Consulta com '+Globals['DOCTOR_NAME']+'em'+Globals['DESC_SEARCH_DOCTOR']+'. Agende hoje sua consulta! | VetzCo', 
     description: 'Seu PET está com problemas? precisa de uma consulta em '+Globals['DESC_SEARCH_DOCTOR']+'? Na VetzCo temos a especialista '+Globals['DOCTOR_URL']+'. Agende hoje sua consulta!', 
     image: Globals['KEYWORDS_META'] 
   },
   { 
     customUrl: '/list/' + Globals['LIST_SEARCH_URL'], 
     title: Globals['DESC_SEARCH_DOCTOR'] + ' Veterinário: Encontre aqui! | VetzCo', 
     description: 'Seu PET está com problemas? Na VetzCo você encontra uma variedade de veterinários e clínicas especializadas em '+Globals['DESC_SEARCH_DOCTOR']+' animal. Agende hoje sua consulta!', 
     image: Globals['KEYWORDS_META'] 
   }
   */
 ];
 
 export interface ISitemapTag {
   customUrl: string;
   title: string | null;
   description: string | null;
   image: string | null;
 }
 


  

  
  