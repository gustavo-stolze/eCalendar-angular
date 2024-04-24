import { IItem } from '../interfaces/item.interface';

export const tasksMock: IItem[] = [
  {
    date: new Date('2024-04-04'),
    location: 'Biblioteca da Faculdade, Centro',
    title: 'Estudar para prova',
    hourStart: '11:00',
    description: 'Alugar livros da matéria que terá prova',
  },
  {
    date: new Date('2024-04-04'),
    location: 'Academia',
    title: 'Treino academia',
    hourStart: '20:00',
    description: 'Treinar grupamentos musculares: peitoral e tríceps',
  },
  {
    date: new Date('2024-04-04'),
    location: 'Supermercado',
    title: 'Compras no mercado',
    hourStart: '21:30',
    description:
      'Comprar vegetais, arroz, carne vermelha, frango, feijão, frutas, pão, aveia, iogurte, ovos, produtos de limpeza',
  },
  {
    date: new Date('2024-05-03'),
    location: 'Casa',
    title: 'Aniversário',
    hourStart: '21:30',
    description: 'Meu níver po, esquecer',
  },
];
