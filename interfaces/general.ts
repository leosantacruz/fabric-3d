export interface Color {
  id: number;
  name: string | null;
  category?: string;
  r: number;
  g: number;
  b: number;
  metallic?: boolean;
}

export interface ColorFiltered {
  Paintwork: Color[];
  Interior: Color[];
  Piping: Color[];
  Tonneau: Color[];
  Livery: Color[];
}

interface INumber {
  show: boolean;
  parts: string[];
  number: string;
  type: string;
  numberColor: { id: number };
  typography: string;
  fontSize: string;
}
export interface Car {
  model: {
    id: number;
    name: string;
  };
  URL: string | null;
  Paintwork: { id: number };
  Livery: { id: number };
  LiveryExtra: { id: number };
  Interior: { id: number };
  Piping: { id: number };
  Tonneau: { id: number };
  radiatorNumber: INumber;
  roundelNumber: INumber;
  flag: {
    show: boolean;
    parts: string[];
  };
  parts: string[];
  racePack: string;
  borranniUpgrade: boolean;
}

export interface ModelStore {
  modelType: string;
  colorCategory: 'Interior' | 'Paintwork' | 'Tonneau' | 'Piping';
  updateColorCategory: (val: string) => void;
  updateModelType: (val: string) => void;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
}
