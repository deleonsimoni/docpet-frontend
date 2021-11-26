import { Contato } from './contato';
import { Endereco } from './endereco';
import { Estabelecimento } from './estabelecimento';
export interface Veterinario {
  id?: String,
  nome: String,
  crmv: String,
  img: String;
  atendePlano: Boolean,
  contato: Contato,
  endereco: Endereco,
  especialidade: [],
  estabelecimentos: [Estabelecimento]
  location:{
    coordinates: [0, 0]
  }
}
