/* jshint node: true */
/* globals THREE */

// window.THREE = require("three");

let scene, renderer, camera, clock, width, height, video;
let particles, videoWidth, videoHeight, imageCache;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const classNameForLoading = "loading";

const init = () => {
    document.body.classList.add(classNameForLoading);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    renderer = new THREE.WebGLRenderer();
    document.getElementById("world").appendChild(renderer.domElement);

    clock = new THREE.Clock();

    initCamera();

    onResize();

    navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
        getUserMedia: (c) => {
            return new Promise(function (y, n) {
                (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
    } : null);

    if (navigator.mediaDevices) {
        initVideo();
    } else {
        showAlert();
    }

    draw();
};

const initCamera = () => {
    const fov = 30;
    const aspect = width / height;

    camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 10000);
    const z = Math.min(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0, z);
    camera.lookAt(0, 0, 0);

    scene.add(camera);
};

const initVideo = () => {
    video = document.getElementById("video");
    video.autoplay = true;

    const option = {
        video: true,
        audio: false
    };
    navigator.mediaDevices.getUserMedia(option)
        .then((stream) => {
            video.srcObject = stream;
            video.addEventListener("loadeddata", () => {
                videoWidth = video.videoWidth;
                videoHeight = video.videoHeight;

                createParticles();
            });
        })
        .catch((error) => {
            console.log(error);
            showAlert();
        });
};

const createParticles = () => {
    const imageData = getImageData(video);
    const geometry = new THREE.Geometry();
    geometry.morphAttributes = {};  // This is necessary to avoid error.
    const material = new THREE.PointsMaterial({
        size: 1,
        color: 0xff3b6c,
        sizeAttenuation: false
    });

    for (let y = 0; y < imageData.height; y += 1) {
        for (let x = 0; x < imageData.width; x += 1) {
            const vertex = new THREE.Vector3(
                x - imageData.width / 2,
                -y + imageData.height / 2,
                0
            );
            geometry.vertices.push(vertex);
        }
    }

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
};

const getImageData = (image, useCache) => {
    if (useCache && imageCache) {
        return imageCache;
    }

    const w = image.videoWidth;
    const h = image.videoHeight;

    canvas.width = w;
    canvas.height = h;

    ctx.translate(w, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(image, 0, 0);
    imageCache = ctx.getImageData(0, 0, w, h);

    return imageCache;
};

const draw = (t) => {
    clock.getDelta();

    // video
    if (particles) {
        particles.material.color.r = 1;
        particles.material.color.g = 1;
        particles.material.color.b = 1;

        const density = 1;
        const useCache = parseInt(t) % 2 === 0;  // To reduce CPU usage.
        const imageData = getImageData(video, useCache);
        for (let i = 0; i < particles.geometry.vertices.length; i++) {
            const particle = particles.geometry.vertices[i];
            if (i % density !== 0) {
                particle.z = 10000;
                continue;
            }
            let index = i * 4;
            let gray = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
            particle.z = gray;
        }
        particles.geometry.verticesNeedUpdate = true;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(draw);
};

const showAlert = () => {
    document.getElementById("message").classList.remove("hidden");
};

const onResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

window.addEventListener("resize", onResize);

init();