// set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 200, window.innerHeight);
document.getElementById('canvas').appendChild(renderer.domElement);

// add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// create a function to load furniture objects
function loadObject(name, file, position, rotation, scale) {
	const loader = new THREE.GLTFLoader();
	loader.load(file, (gltf) => {
		const object = gltf.scene;
		object.name = name;
		object.position.copy(position);
		object.rotation.copy(rotation);
		object.scale.copy(scale);
		scene.add(object);
	});
}

// load some furniture objects
loadObject('table', 'models/table.gltf', new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1, 1, 1));
loadObject('chair', 'models/chair.glb', new THREE.Vector3(1, 0, 0), new THREE.Euler(0, Math.PI / 2, 0), new THREE.Vector3(1, 1, 1));
loadObject('couch', 'models/couch.glb', new THREE.Vector3(-1, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0), new THREE.Vector3(1, 1, 1));
loadObject('bed', 'models/bed.glb', new THREE.Vector3(0, 0, 1), new THREE.Euler(0, 0, 0), new THREE.Vector3(1, 1, 1));

// set up the drag-and-drop functionality for the furniture objects
const dragControls = new THREE.DragControls(scene.children.filter((child) => child.name !== 'floor'), camera, renderer.domElement);
dragControls.addEventListener('drag', (event) => {
event.object.rotation.x = 0;
event.object.rotation.z = 0;
});

// render the scene
function render() {
renderer.render(scene, camera);
requestAnimationFrame(render);
}
render();
