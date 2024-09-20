export interface Prof {
  id?: string;
  nom: string;
  prenom: string;
  adresse: string;
  email: string;
  telephone: string;
  photo?: string;
  ecole?: {
    id: string;
    nom: string;
    adresse: string;
  };
}
