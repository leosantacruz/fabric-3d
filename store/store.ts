import { create } from 'zustand';
import { Car, ModelStore } from '../interfaces/general';

export const useCarStore = create<{ car: Car }>((set) => ({
  car: {
    model: {
      id: 1,
      name: 'LM 01A'
    },
    URL: 'LM 01A.jpeg',
    Paintwork: {
      id: 15
    },
    Livery: {
      id: 4
    },
    LiveryExtra: {
      id: 33
    },
    Interior: {
      id: 41
    },
    Piping: {
      id: 55
    },
    Tonneau: {
      id: 53
    },
    radiatorNumber: {
      show: false,
      parts: ['Number_6', 'Number_7'],
      number: '',
      type: 'transparent',
      numberColor: {
        id: 33
      },
      typography: 'Acumin Variable Concept Condensed Black',
      fontSize: '195px'
    },
    roundelNumber: {
      show: false,
      parts: ['Number_6', 'Number_7'],
      number: '',
      type: 'transparent',
      numberColor: {
        id: 33
      },
      typography: 'Acumin Variable Concept Condensed Black',
      fontSize: '195px'
    },
    flag: {
      show: false,
      parts: ['Number_6', 'Number_7']
    },
    parts: ['Lip_1', 'Lip_2'],
    racePack: 'Base',
    borranniUpgrade: false
  },

  updateCar: (val: Car) => set(() => ({ car: val }))
}));

export const useModelStore = create<ModelStore>((set) => ({
  modelType: 'Historic Liveries',
  colorCategory: 'Paintwork',

  updateModelType: (val: string) => set(() => ({ modelType: val })),
  updateColorCategory: (val: string) => set(() => ({ colorCategory: val } as ModelStore))
}));
