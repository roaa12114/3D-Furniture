import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ModelViewer = () => {
    const params = useParams();
    const furnitureId = params.id;

    const [modelUrls, setModelUrls] = useState(null);

    const fetchModel = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/furniture/get-furniture-model/${furnitureId}`);
            const data = res.data;
            console.log(data);
            setModelUrls({
                mtlUrl: data.mtl_file,
                objUrl: data.obj_file,
            });
        } catch (error) {
            console.error("Error fetching model data:", error);
        }
    };

    const loadFileAsBlob = async (url) => {
        try {
            const response = await axios.get(url, { responseType: 'blob' });
            return response.data; // This will be a Blob object
        } catch (error) {
            console.error(`Error loading file from ${url}:`, error);
            return null;
        }
    };
    
    useEffect(() => {
        fetchModel();
    }, []);

    useEffect(() => {
        // Ensure modelUrls is fetched before proceeding
        if (!modelUrls) return;

        const loadModel = async () => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0xffffff); // Set background color to white
            document.body.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(25, 25, 50); // Move the camera further back
            controls.update();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increase the intensity of the directional light
            directionalLight.position.set(0, 1, 1).normalize();
            scene.add(directionalLight);

            // Load MTL and OBJ files as Blob
            const mtlBlob = await loadFileAsBlob(modelUrls.mtlUrl);
            const objBlob = await loadFileAsBlob(modelUrls.objUrl);

            if (mtlBlob && objBlob) {
                const mtlLoader = new MTLLoader();

                // Create a URL for the MTL Blob
                const mtlUrl = URL.createObjectURL(mtlBlob);
                mtlLoader.load(mtlUrl, (materials) => {
                    materials.preload();

                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);

                    // Create a URL for the OBJ Blob
                    const objUrl = URL.createObjectURL(objBlob);
                    objLoader.load(objUrl, (object) => {
                        const material = new THREE.MeshPhongMaterial(); // Set a simple green color
                        object.traverse((child) => {
                            if (child.isMesh) {
                                child.material = material; // Apply the custom material to all meshes
                            }
                        });
                        object.scale.set(0.05, 0.05, 0.05); // Adjust the scale as needed
                        scene.add(object);
                    });
                });
            } else {
                console.error("Failed to load model files.");
            }

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };
            animate();

            return () => {
                document.body.removeChild(renderer.domElement); // Clean up when component unmounts
            };
        };

        loadModel();
    }, [modelUrls]);

    return (
        <div style={{ height: '100vh', width: '100vw' }} id="viewer">
            {modelUrls ? null : <p>Loading model...</p>} {/* Show loading text while model URLs are fetched */}
        </div>
    );
};

export default ModelViewer;
