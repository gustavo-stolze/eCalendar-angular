import { IItem } from '../interfaces/item.interface';

export const tasksMock: IItem[] = [
  {
    id: 1271651127002,
    date: new Date('2024-04-04'),
    location: 'Biblioteca da Faculdade, Centro',
    title: 'Estudar para prova',
    description: 'Alugar livros da matéria que terá prova',
  },
  {
    id: 557743839003,
    date: new Date('2024-04-04'),
    location: 'Supermercado',
    title: 'Compras no mercado',
    description:
      'Comprar vegetais, arroz, carne vermelha, frango, feijão, frutas, pão, aveia, iogurte, ovos, produtos de limpeza',
  },
  {
    id: 1679374849720,
    date: new Date('2024-05-04'),
    location: 'Casa',
    title: 'Aniversário',
    description: 'Meu níver po, esquecer',
  },
];
