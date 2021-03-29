export class Devoir {
    _id?: string;
    auteur: Eleve;
    matiere: Matiere;
    note: number;
    rendu: boolean;
    dateDeRendu: Date;
    remarque: string;
}