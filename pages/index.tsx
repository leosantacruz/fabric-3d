'use client';
import axios from 'axios';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useCarStore } from '@/store/store';

import { Car } from 'interfaces/general';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Viewer from '@/components/viewer';
import LoadingScreen from '@/components/loadingScreen';
import PleaseRotate from '@/components/pleaseRotate';

import { selectCar } from '@/utils/car';
import { initService } from '@/utils/sketchfab';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default function Home({ data }: any) {
  const store = useCarStore((state: any) => state);

  const router = useRouter();

  const apiRef: any = useRef(null);
  const [modelId, setModelId] = useState('c2bfcd58cc28476bbb892eb19f753617');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [materials, setMaterials] = useState<any>([]);
  const [nodes, setNodes] = useState<any>([]);
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  useEffect(() => {
    if (materials[0] && nodes[0]) {
      initService(apiRef.current, materials, nodes);
      getData();
    }
  }, [materials, nodes]);

  //Load the default car model
  const setDefaultCar = async (newCar: Car) => {
    selectCar(newCar);
    store.updateCar(newCar);
    setShowLoading(false);
  };

  interface Props {
    changeScenario: (val: String) => void;
  }

  const changeScenario = (val: string) => {
    setModelId(val);
  };

  const getData = async () => {
    if (router.query.id) {
      await axios
        .get(publicRuntimeConfig.NEXT_PUBLIC_CDN + 'json/' + router.query.id + '.json')
        .then(({ data }) => {
          setDefaultCar(data.options);
        });
    } else {
      setDefaultCar(store.car);
    }
  };

  return (
    <>
      <div className="container">
        <Head>
          <title>Lelièvre | Configurateur</title>
        </Head>
        <PleaseRotate />
        <Header />
        {showLoading && <LoadingScreen />}
        <Viewer
          apiRef={apiRef}
          modelId={modelId}
          setIsModelLoaded={setIsModelLoaded}
          setMaterials={setMaterials}
          setNodes={setNodes}
        />
        {materials.length > 0 && <Sidebar changeScenario={changeScenario}></Sidebar>}
      </div>
    </>
  );
}
