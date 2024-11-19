export interface IPolicy {
    id: number;
    title: string;
    description: string;
    owner: string;
    date: string;
    vote: number;
    category: 'General' | 'Food' | 'Library' | 'Meditation' | 'Education' | 'Visa & Travel' | 'Students Lounge';
}
