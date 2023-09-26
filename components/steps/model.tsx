import { useEffect, useState } from 'react';

import { useCarStore, useModelStore } from '@/store/store';

import { Color, Car, ColorFiltered, ModelStore } from 'interfaces/general';

import Dropdown from '../elements/dropdown';
import ColorSelector from '../elements/colorSelector';
import CustomSelector from '../elements/menuSwitch';
import CarSelector from '../carSelector';
import Summary from '../summary';

import { changeColor, toggleNode } from '@/utils/sketchfab';
import { selectCar, setDefaultCar, validateColor } from '@/utils/car';

import { ModelType } from '@/data/general';
import { categories, matrix, colorList } from '@/data/colors';
import { HistoricModelList } from '@/data/historic';
import { nodesToHide } from '@/data/nodes';

const CustomModel = () => {
  const store = useCarStore((state: any) => state);
  const modelStore = useModelStore((state: ModelStore) => state);

  const [selectedCar, setSelectedCar] = useState<Car>(HistoricModelList[0]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('Paintwork');
  const [selectedColor, setSelectedColor] = useState({
    name: 'Black matte',
    category: 'Paintwork',
    r: 28,
    g: 28,
    b: 28
  } as Color);

  const colorCategories = Array.from(new Set(categories.map((c) => c.name))).filter((c) => {
    if (modelStore.modelType === 'Solid Colour') {
      return (
        (c !== 'Livery' && c !== 'Tonneau') ||
        (store.car.racePack == 'Pacco Gara' && c === 'Tonneau')
      );
    } else {
      return c !== 'Tonneau' || (store.car.racePack == 'Pacco Gara' && c === 'Tonneau');
    }
  });

  //****************************************************************** */
  // COLOR FILTERED: Depending on the option the user chose and the matrix
  let colorFiltered = {
    Paintwork: [],
    Interior: [],
    Piping: [],
    Tonneau: [
      { id: 51, name: 'Rosso', r: 192, g: 61, b: 49 },
      { id: 52, name: 'Nero', r: 34, g: 44, b: 44 }
    ],
    Livery: []
  } as ColorFiltered;

  let matrixFilteredByType = matrix.filter((c) => {
    if (modelStore.modelType == 'Personalisable Liveries') {
      return c.Livery.length > 0;
    } else {
      return c;
    }
  });

  colorFiltered['Paintwork'] = matrixFilteredByType.map((c: any) => {
    return colorList.filter((r) => {
      return r.id == c.id;
    })[0];
  });

  let selectedPaintWork = matrix.filter((r) => {
    return r.id == store.car.Paintwork.id;
  })[0];

  colorFiltered['Livery'] = selectedPaintWork.Livery.map((c2: any) => {
    return colorList[c2 - 1];
  });

  colorFiltered['Interior'] = selectedPaintWork.Interior.filter((r) => {
    return r.available;
  }).map((c2: any) => colorList[c2.id - 1]);
  const selectedInteriorIndex = selectedPaintWork.Interior.findIndex((obj: any) => {
    return obj.id == store.car.Interior.id;
  });

  colorFiltered['Piping'] = selectedPaintWork.Interior[selectedInteriorIndex].p.map(
    (p1: any) => colorList[p1 - 1]
  );
  //****************************************************************** */

  const selectMenuOption = (selection: string) => {
    modelStore.updateColorCategory(selection);
    setSelectedOption(selection);
  };

  //It orders to change the color and the validation
  const selectColorOption = (newColor: Color) => {
    let materialID =
      categories[
        categories.findIndex((c) => {
          return c.name == selectedOption;
        })
      ].id;

    changeColorOption(newColor, materialID, selectedOption);

    if (materialID == 'Carroceria') {
      validateInteriorColor();
      if (modelStore.modelType === 'Personalisable Liveries') {
        validateLivery();
      }
    }

    validataPiping();
  };

  //It updates the color in the store and apply the changes
  const changeColorOption = (
    { id, name, r, g, b }: Color,
    colorId: string,
    categoryName: string
  ) => {
    changeColor(colorId, id);
    setSelectedColor({ id, name, r, g, b });

    let updatedCar = store.car;
    updatedCar[categoryName] = {
      id: id
    };
    store.updateCar(updatedCar);
  };

  const selectModel = (selection: string) => {
    selectMenuOption('Paintwork');
    modelStore.updateModelType(selection);
    setSelectedModel(selection);
  };

  const changeCar = (newCar: Car) => {
    newCar.racePack = store.car.racePack;
    selectCar(newCar);
    setSelectedCar(newCar);
    store.updateCar(newCar);
  };

  const defaultCar = () => {
    store.updateCar({
      ...store.car,
      model: { id: 99, name: 'custom' },
      Paintwork: { id: 4 },
      Livery: { id: 33 },
      LiveryExtra: { id: 33 },
      Interior: { id: 36 },
      Piping: { id: 54 },
      Tonneau: { id: 51 },
      raceNumber: {
        show: false,
        number: 33,
        parts: ['Number_1', 'Number_2', 'Number_3'],
        type: 'circle',
        numberColor: { id: 15 },
        typography: 'Bebas',
        fontSize: '275px'
      }
    });
    setDefaultCar();
  };

  useEffect(() => {
    selectMenuOption('Paintwork');
  }, []);

  useEffect(() => {
    if (selectedModel == 'Solid Colour') {
      defaultCar();

      nodesToHide.forEach((node) => {
        toggleNode(node, 'hide');
      });
    }
    if (selectedModel == 'Personalisable Liveries') {
      defaultCar();

      nodesToHide.forEach((node) => {
        toggleNode(node, 'hide');
      });
      toggleNode('Stripe_3', 'show');
      toggleNode('Stripe_1', 'show');
    }
    if (selectedModel == 'Historic Liveries') {
      //toggleNode('Gara', 'hide');
      let defaultHistoricModel = HistoricModelList[0];
      defaultHistoricModel.racePack = store.car.racePack;
      selectCar(defaultHistoricModel);
      store.updateCar(defaultHistoricModel);
    }
  }, [selectedModel]);

  //If there is no interior color for that paintwork we change it to the default colour for both interior and piping
  const validateInteriorColor = () => {
    let validation = validateColor(store.car) as {
      available: boolean;
      Interior: Color;
      Piping: Color;
    };
    if (validation?.available == false) {
      changeColorOption(validation.Interior, 'Asiento', 'Interior');
    }
  };

  const validateLivery = () => {
    const newLiveryColor = matrix
      .filter((r) => {
        return r.id == store.car.Paintwork.id;
      })[0]
      .Livery.map((c) => {
        return colorList[c - 1];
      })[0];

    changeColorOption(newLiveryColor, 'Livery_1', 'Livery');
  };

  const validataPiping = () => {
    const currentListPiping = matrix
      .filter((r) => {
        return r.id == store.car.Paintwork.id;
      })[0]
      .Interior.filter((i) => {
        return i.id == store.car.Interior.id;
      })[0].p;

    if (!currentListPiping.includes(store.car.Piping.id)) {
      let newColor = colorList[store.car.Interior.id - 1];
      changeColorOption(newColor, 'Pipin', 'Piping');
    }
  };

  return (
    <>
      <h4>Create your livery</h4>
      <label>
        <Dropdown
          optionChanged={(selected: string) => {
            selectModel(selected);
          }}
          selectedOption={modelStore.modelType}
          list={ModelType}
        />
      </label>

      {(modelStore.modelType === 'Personalisable Liveries' ||
        modelStore.modelType === 'Solid Colour') && (
        <>
          <CustomSelector
            selectedOption={modelStore.colorCategory}
            selectOption={selectMenuOption}
            options={colorCategories}
          />
          <ColorSelector
            selectedOption={selectedColor}
            selectOption={selectColorOption}
            options={colorFiltered[modelStore.colorCategory]}
            category={modelStore.colorCategory}
          />
        </>
      )}
      {modelStore.modelType === 'Historic Liveries' && (
        <>
          <div className="listModels">
            {HistoricModelList &&
              HistoricModelList.map((m, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      changeCar(m);
                    }}
                  >
                    <CarSelector car={m} active={store.car.model.id == m.model.id} />
                  </span>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default CustomModel;
