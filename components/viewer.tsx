declare global {
  interface Window {
    Sketchfab: any;
  }
}
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Debug from '../components/debug';
import QR from './qrcode';
import AR from './arbutton';
interface ViewerInterface {
  apiRef: any;
  modelId: string;
  setIsModelLoaded: (value: boolean) => void;
  setMaterials: (value: any[]) => void;
  setNodes: (value: { instanceID: string; name: string }[]) => void;
}
const Viewer = ({ apiRef, modelId, setIsModelLoaded, setMaterials, setNodes }: ViewerInterface) => {
  const router = useRouter();

  useEffect(() => {
    let iframe = document.getElementById('api-frame');
    let client = new window.Sketchfab(iframe);
    client.init(modelId, {
      autostart: 1,
      navigation: 0,
      ui_controls: 0,
      ui_stop: 0,
      ui_animations: 0,
      ui_general_controls: 0,
      ui_infos: 0,
      ui_loading: 0,
      ui_watermark: 0,
      transparent: 0,
      success: (callback: any) => {
        apiRef.current = callback;
        callback.addEventListener('viewerready', function () {
          setIsModelLoaded(true);

          apiRef.current.getNodeMap((err: any, nodes: any) => {
            if (!err) {
              let nodeList = Object.values(nodes).map((item: any) => {
                return { instanceID: item.instanceID, name: item.name };
              });
              setNodes(nodeList);
            }
          });

          apiRef.current.getMaterialList(function (err: any, materials: any) {
            if (!err) {
              setMaterials(materials);
              //console.log(materials);
            }
          });
        });
      }
    });
  }, [apiRef, modelId, setIsModelLoaded, setMaterials]);

  return (
    <>
      <div id="viewer">
        {router.query.debug && <Debug />}
        <div id="numbers">
          <canvas width="400" height="400" id="numberCanvas"></canvas>
        </div>

        <iframe title="Sketchfab Viewer" src="" id="api-frame" width="400"></iframe>
      </div>
    </>
  );
};

export default Viewer;
