export const seoSitemap: ISitemapTag[] = [
    { 
        customUrl: '/home', 
        title: 'Encontre agora uma Clínica Veterinária! | VetzCo', 
        description: 'Seu PET está com problemas? Na VetzCo você encontra tudo que precisa, desde veterinários renomados até farmácias e laboratórios. Agende hoje sua consulta!', 
        image: 'clinica veterinaria, 550.000' 
    },
    { 
      customUrl: '/alergista-veterinario', 
      title: 'Alergista Veterinário: Encontre aqui! | VetzCo', 
      description: 'Some description about', 
      image: 'veterinario alergista sp 40, alergia veterinaria 40, alergista veterinário 30, alergia em pets 10, alergista veterinario 10' 
    }
  ];
  
  export interface ISitemapTag {
    customUrl: string;
    title: string | null;
    description: string | null;
    image: string | null;
  }
  