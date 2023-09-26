import { useRef, useEffect, useState } from 'react';
import { useCarStore } from '../store/store';
import { changeColor, getNodeList, toggleNode, fastChangeMainColor } from '@/utils/sketchfab';
import { Color } from '../interfaces/general';
const Debug = () => {
  const ref = useRef();
  const [mainColor, setMainColor] = useState({ r: 0, g: 0, b: 0 });
  const store = useCarStore((state: any) => state);
  const nodes: any = getNodeList().filter((r) => {
    if (r.name) {
      const regex = /^(?!.*livery.*$)(?!(.*number_a.*)).*((stripe|lip|number|tail)).*$/;
      return regex.test(r.name.toLowerCase());
    }
  });
  const nodesNoDuplicates = [...new Set(nodes.map((node: any) => node.name))];

  const updateColor = async ({ id, r, g, b, name }: Color) => {
    let updatedCar = store.car;
    await changeColor('Interior', id);
    updatedCar.mainColor = { name: name, category: '', r, g, b };
    store.updateCar(updatedCar);
  };

  const selectPart = (newPart: string) => {
    let updatedCar = store.car;
    if (!store.car.parts.includes(newPart)) {
      updatedCar.parts.push(newPart);
      toggleNode(newPart, 'show');
    } else {
      updatedCar.parts = updatedCar.parts.filter((part: string) => part !== newPart);
      toggleNode(newPart, 'hide');
    }
    store.updateCar(updatedCar);
  };
  const newColor = (ev: any) => {
    const c = ev.target.value;
    const r = parseInt(c.substr(1, 2), 16);
    const g = parseInt(c.substr(3, 2), 16);
    const b = parseInt(c.substr(5, 2), 16);
    setMainColor({ r, g, b });
    const color = {
      r,
      g,
      b
    };
    fastChangeMainColor(color);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(store.car));
  };

  return (
    <>
      <div id="debug">
        <h4>Main Color</h4>
        <h3>
          [{mainColor['r']},{mainColor['g']},{mainColor['b']}]
        </h3>
        <input className="inputColor" type="color" onChange={newColor} />
        <h4>Car options</h4>
        <div className="data">
          <h1> {store.car.model.name}</h1>
          <pre> {JSON.stringify(store, null, 2)}</pre>
        </div>
        {/*
        <h4>Color options</h4>
        {colors &&
          colors.map((c: Color, index: number) => (
            <button
              key={index}
              onClick={() => {
                updateColor(c);
              }}
            >
              {c.name}
            </button>
          ))} 

        <h4>Camera option</h4>
        <button>Change camera 1</button>
        <button>Change camera 2</button>
        <button>Change camera 3</button>
      */}
        <div className="debugMenuBox">
          {nodesNoDuplicates &&
            nodesNoDuplicates.map((n: any) => {
              return (
                <>
                  <div
                    className={store.car.parts.includes(n) ? 'active' : 'nada'}
                    onClick={() => {
                      selectPart(n);
                    }}
                  >
                    <h4>{n}</h4>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Debug;
