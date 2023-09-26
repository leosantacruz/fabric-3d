import { colorList } from '../data/colors';
import { Color } from '../interfaces/general';

let api: any = null;
let materials: any[] = [];
let nodes: any[] = [];

//Set Sektfhcab API to make it available
const initService = (apiRef: any, materialList: any[], nodeList: any[]) => {
  api = apiRef;
  materials = materialList;
  nodes = nodeList;
  console.log(materialList);
};

const getMaterials = () => {
  return materials;
};

const getNodeList = () => {
  return nodes;
};

const getCamera = () => {
  api.getCameraLookAt(function (err: any, camera: any) {
    console.log(camera.position); // [x, y, z]
    console.log(camera.target); // [x, y, z]
  });
};

const setCamera = ({ position, target }: { position: number[]; target: number[] }) => {
  api.setCameraLookAt(position, target, 2);
};

//Change the main car color
const changeColor = async (part: string, colorId: number) => {
  let index = materials.findIndex((m) => {
    return m.name === part;
  });
  let color = colorList[colorId - 1] as Color;

  //materials[index].channels.AlbedoPBR.color = [color.r / 255, color.g / 255, color.b / 255];
  materials[index].channels.AlbedoPBR.color = [
    convertRGBtoLinear(color.r),
    convertRGBtoLinear(color.g),
    convertRGBtoLinear(color.b)
  ];
  if (part == 'Carroceria' || part == 'Number_A') {
    setMetallic(materials[index], Boolean(color.metallic));
  }

  await api.setMaterial(materials[index]);
};

const fastChangeMainColor = ({ r, g, b }: any) => {
  materials[13].channels.AlbedoPBR.color = [
    convertRGBtoLinear(r),
    convertRGBtoLinear(g),
    convertRGBtoLinear(b)
  ];
  api.setMaterial(materials[13]);
};

const addTexture = async (base64: string) => {
  return new Promise<string>((resolve, reject) => {
    api.addTexture(base64, function (err: string, id: string) {
      if (!err) {
        resolve(id);
      } else {
        reject(err);
      }
    });
  });
};

const setTexture = (part: string, textureUid: string) => {
  let index = materials.findIndex((m) => {
    return m.name === part;
  });

  materials[index].channels.AlbedoPBR = { texture: { uid: textureUid } };
  materials[index].channels.AlbedoPBR.factor = 1;

  api.setMaterial(materials[index], () => {});
};

const setUVscale = (part: string) => {
  let index = materials.findIndex((m) => {
    return m.name === part;
  });
  api.setUVScale(materials[index], 'AlbedoPBR', 10, 10);
};

const toggleNode = (node: string, action: string) => {
  let instanceID = nodes.filter((r) => {
    return r.name === node;
  });
  if (instanceID[0]) {
    if (action == 'show') {
      api.show(instanceID[0].instanceID);
    } else {
      api.hide(instanceID[0].instanceID);
    }
  }
};

function convertColor(color: any) {
  return [color.r, color.g, color.b];
}

const generateScreenshot = async () => {
  let camera = {
    position: [-71.71309445654904, -57.16881106698193, 32.2789393429998],
    target: [2.701051515138964, 0.00007667749023099191, 4.360299098332644]
  };
  await api.setCameraLookAt(camera.position, camera.target, 0);
  let screenshot = await makeScreenshot();
  return screenshot;
};

const makeScreenshot = async () => {
  return new Promise<string>((resolve, reject) => {
    api.getScreenShot(700, 394, 'image/png', function (error: string, result: string) {
      if (error) {
        reject(error);
      } else {
        const base64WithoutHeader = result.substring(result.indexOf(',') + 1);
        resolve(base64WithoutHeader);
      }
    });
  });
};

function convertRGBtoLinear(color: number) {
  let value = color / 255;
  if (value <= 0 && value <= 0.04045) {
    return value / 12.92;
  } else {
    return ((value + 0.055) / 1.055) ** 2.4;
  }
}

async function setMetallic(material: any, value: boolean) {
  if (value) {
    material.channels.MetalnessPBR.factor = 1;
    material.channels.RoughnessPBR.factor = 0.6;
  } else {
    material.channels.MetalnessPBR.factor = 0;
    material.channels.RoughnessPBR.factor = 0.2;
  }
  await api.setMaterial(materials[13]);
}

function emissionAnimation(part: string) {
  let index = materials.findIndex((m) => {
    return m.name === part;
  });

  function changeEmitFactor(i: number) {
    materials[index].channels.EmitColor.enable = true;
    materials[index].channels.EmitColor.factor = i;
    api.setMaterial(materials[index], () => {});
  }

  let number = 0;
  let increment = 0.025;

  function animateNumber() {
    number += increment;

    if (number >= 0.4) {
      increment = -increment;
    }

    if (number > 0) {
      setTimeout(animateNumber, 10); // Llamar a la función nuevamente después de 10 milisegundos
    }

    changeEmitFactor(number);
  }
  animateNumber();
}
export {
  initService,
  changeColor,
  addTexture,
  setTexture,
  getMaterials,
  getNodeList,
  toggleNode,
  generateScreenshot,
  setMetallic,
  fastChangeMainColor,
  setUVscale,
  emissionAnimation,
  getCamera,
  setCamera
};
