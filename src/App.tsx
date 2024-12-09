import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import aVertex from "./shaders/alphabet/vertex.glsl?raw";
import aFragment from "./shaders/alphabet/fragment.glsl?raw";
import cVertex from "./shaders/cube/vertex.glsl?raw";
import cFragment from "./shaders/cube/fragment.glsl?raw";
import dVertex from "./shaders/digit/vertex.glsl?raw";
import dFragment from "./shaders/digit/fragment.glsl?raw";

const Scene = () => { 
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const centralCubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const centralCubeMaterial = new THREE.ShaderMaterial({
      vertexShader: cVertex,
      fragmentShader: cFragment,
    });
    const centralCubeMesh = new THREE.Mesh(centralCubeGeo, centralCubeMaterial);
    centralCubeMesh.position.set(0, 0, 0);
    scene.add(centralCubeMesh);

    const alphabetMaterial = () => new THREE.ShaderMaterial({
      uniforms: {
        lightPosition: {
          value: centralCubeMesh.position
        },
        baseColor: {
          value: new THREE.Color(0x1e90ff)
        },
        ambientIntensity: {
          value: 0.325
        }
      },
      vertexShader: aVertex,
      fragmentShader: aFragment
    });

    const digitMaterial = () => new THREE.ShaderMaterial({
      uniforms: {
        lightPosition: {
          value: centralCubeMesh.position
        },
        baseColor: {
          value: new THREE.Color(0xff5704)
        },
        ambientIntensity: {
          value: 0.325
        }
      },
      vertexShader: dVertex,
      fragmentShader: dFragment
    });

    const fontLoader = new FontLoader();
    fontLoader.load(
      "/fonts/helvetiker_regular.typeface.json",
      (font: any) => {
        const fontGeo: TextGeometry = new TextGeometry("N", {
          font,
          size: 1,
          depth: 0.2,
        });
        const fontMaterial = alphabetMaterial();
        const fontMesh = new THREE.Mesh(fontGeo, fontMaterial);
        fontMesh.position.set(-2, 0, 0);
        scene.add(fontMesh);
        
        const digitGeo: TextGeometry = new TextGeometry("5", {
          font,
          size: 1,
          depth: 0.2,
        });
        const dMaterial = digitMaterial();
        const digitMesh = new THREE.Mesh(digitGeo, dMaterial);
        digitMesh.position.set(2, 0, 0);
        scene.add(digitMesh);
      },
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const keyControl = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w':
          centralCubeMesh.position.y += 0.1;
          break;
        case 's':
          centralCubeMesh.position.y -= 0.1;
          break;
        case 'a':
          camera.position.x -= 0.1;
          break;
        case 'd':
          camera.position.x += 0.1;
          break;
      }
    };
    window.addEventListener("keydown", keyControl);
    
    return () => {
      window.removeEventListener("keydown", keyControl);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Scene;
