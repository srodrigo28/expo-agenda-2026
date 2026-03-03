export interface Agendamento {
    id: string;
    nomeCliente: string;
    servico: string;
    horario: string;
    diaSemana: string;
}

export const agendamentosMock: Agendamento[] = [
    {
        id: '1',
        nomeCliente: 'Aline de Oliveira',
        servico: 'Reunião Inicial',
        horario: '07:00',
        diaSemana: 'Seg',
    },
    {
        id: '2',
        nomeCliente: 'João da Silva',
        servico: 'Reunião Inicial',
        horario: '09:00',
        diaSemana: 'Seg',
    },
    {
        id: '3',
        nomeCliente: 'Maria Souza',
        servico: 'Acompanhamento',
        horario: '14:30',
        diaSemana: 'Seg',
    },
    {
        id: '4',
        nomeCliente: 'Selma Oliveira',
        servico: 'Acompanhamento',
        horario: '16:30',
        diaSemana: 'Seg',
    },
    {
        id: '5',
        nomeCliente: 'Carlos Mendes',
        servico: 'Reunião de Alinhamento',
        horario: '10:00',
        diaSemana: 'Ter',
    },
    {
        id: '6',
        nomeCliente: 'Fernanda Lima',
        servico: 'Mentoria',
        horario: '15:00',
        diaSemana: 'Ter',
    }
];
