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
  estabelecimentos: [Estabelecimento]
}
