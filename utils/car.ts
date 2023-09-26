import { Car, Color } from 'interfaces/general';
import { nodesToHide } from '@/data/nodes';
import { changeColor, toggleNode, addTexture, setTexture } from '@/utils/sketchfab';
import { categories, matrix, colorList } from '@/data/colors';
import PrintNumber from '@/utils/number';

export const selectCar = async (newCar: Car) => {
  return;
  const nodesToShow: string[] = newCar.parts;

  nodesToHide.forEach((node) => {
    toggleNode(node, 'hide');
  });

  nodesToShow.forEach((node: string) => {
    toggleNode(node, 'show');
  });

  toggleRacePack(newCar.racePack);
  toggleNumber(newCar.radiatorNumber.parts, newCar.radiatorNumber.show);
  toggleBorranni(newCar.borranniUpgrade);
  changeColor('Livery_1', newCar['Livery'].id);
  changeColor('Livery_2', newCar['LiveryExtra'].id);
  changeColor('Pipin', newCar['Piping'].id);
  changeColor('Carroceria', newCar.Paintwork.id);
  changeColor('Number_A', newCar.Paintwork.id);
  changeColor('Asiento', newCar.Interior.id);
  changeColor('Textura_lona', newCar.Tonneau.id);
  const image = PrintNumber({
    type: 'mask',
    color: colorList[newCar.radiatorNumber.numberColor.id - 1],
    val: newCar.radiatorNumber.number,
    background:
      newCar.radiatorNumber.type == 'circle'
        ? { r: 0, g: 255, b: 255 }
        : colorList[newCar.Paintwork.id - 1],
    typography: newCar.radiatorNumber.typography,
    fontSize: newCar.radiatorNumber.fontSize
  });
  const textureUid = await addTexture(image);
  setTexture('Number_A', textureUid);
};

export const setDefaultCar = () => {
  changeColor('Livery_1', 33);
  changeColor('Pipin', 54);
  changeColor('Carroceria', 4);
  changeColor('Asiento', 36);
  changeColor('Number_A', 33);
};

export const validateColor = (car: any) => {
  let selectedPaintWork = matrix.filter((r) => {
    return r.id == car.Paintwork.id;
  })[0];

  const result = selectedPaintWork.Interior.find((i) => {
    return i.id == car.Interior.id;
  }) as { available: boolean };

  let defaultInteriorId = selectedPaintWork.Interior[0].id;
  let defaultInteriorColor = colorList[defaultInteriorId - 1];
  return {
    available: result.available,
    Interior: defaultInteriorColor
  };
};

export const toggleRacePack = (val: string) => {
  const defaultNodes = ['Head', 'Frenos'];
  defaultNodes.forEach((node) => {
    toggleNode(node, val == 'Pacco Gara' ? 'hide' : 'show');
  });

  toggleNode('Gara', val == 'Pacco Gara' ? 'show' : 'hide');
};

export const toggleBorranni = (val: boolean) => {
  toggleNode('Llantas', val ? 'hide' : 'show');
  toggleNode('Gara_Borranis', val ? 'show' : 'hide');
};

export const toggleNumber = (nodes: string[], val: boolean) => {
  if (!val) {
    nodes = ['Number_1', 'Number_2', 'Number_3', 'Number_4', 'Number_5', 'Number_6', 'Number_7'];
  }

  nodes.forEach((node) => {
    toggleNode(node, val ? 'show' : 'hide');
  });
};
