import { Contato } from './contato';
import { Endereco } from './endereco';
import { Estabelecimento } from './estabelecimento';
export interface Veterinario {
  id?: String,
  nome: String,
  crmv: String,
  atendePlano: Boolean,
  contato: Contato,
  endereco: Endereco,
  especialidade: [],
  estabelecimentos: [Estabelecimento],

  sobre:{
    type:String,
    require:true
  },

  formacoes:[{
      nomeInstituicao:String,
      curso:String,
      anoInicio:Number,
      anoFim: Number
  }],

  experiencias:[{
      nomeEstabelecimento:String,
      anoIncio:Number,
      anoFim:Number,
  }],

  conquistas:[{
      nome:String,
      mes:Number,
      ano:Number,
      descricao:String,
  }],
  location:{
    coordinates: [0, 0]
  }
}
