import { Eleve } from "./eleve.model";
import { Matiere } from "./matiere.model";

export class Devoir {
    _id?: string;
    auteur: Eleve;
    matiere: Matiere;
    nomDevoir: string;
    note: number;
    rendu: boolean;
    dateDeRendu: Date;
    remarque: string;
}