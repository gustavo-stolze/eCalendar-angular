import { IItem } from '../interfaces/item.interface';

export const tasksMock: IItem[] = [
  {
    id: 1271651127002,
    date: new Date('2024-04-04'),
    location: 'Biblioteca da Faculdade, Centro',
    title: 'Estudar para prova',
    hourStart: '11:00',
    description: 'Alugar livros da matéria que terá prova',
  },
  {
    id: 557743839003,
    date: new Date('2024-04-04'),
    location: 'Supermercado',
    title: 'Compras no mercado',
    hourStart: '21:30',
    description:
      'Comprar vegetais, arroz, carne vermelha, frango, feijão, frutas, pão, aveia, iogurte, ovos, produtos de limpeza',
  },
  {
    id: 1679374849720,
    date: new Date('2024-05-03'),
    location: 'Casa',
    title: 'Aniversário',
    hourStart: '21:30',
    description: 'Meu níver po, esquecer',
  },
];
