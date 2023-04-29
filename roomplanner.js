let camera, scene, renderer, controls;
let objects = [];

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Create a cube as the room
    let geometry = new THREE.BoxGeometry(800, 800, 800);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    let room = new THREE.Mesh(geometry, material);
    room.position.set(0,0,0);
    scene.add(room);

    // Set up renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set up mouse controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minDistance = 500;
    controls.maxDistance = 5000;

    // Add event listener for dragging objects
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseDown(event) {

    event.preventDefault();

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {

        controls.enabled = false;

        // Select the first object in the list
        let selectedObject = intersects[0].object;

        // Calculate the offset between the object and the mouse pointer
        let intersectsPoint = intersects[0].point;
        let offset = new THREE.Vector3();
        offset.copy(intersectsPoint).sub(selectedObject.position);

        // Add event listeners for dragging and releasing the object
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);

        function onDocumentMouseMove(event) {

            event.preventDefault();

            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {

        controls.enabled = false;

        // Select the first object in the list
        let selectedObject = intersects[0].object;

        // Calculate the offset between the object and the mouse pointer
        let intersectsPoint = intersects[0].point;
        let offset = new THREE.Vector3();
        offset.copy(intersectsPoint).sub(selectedObject.position);

        // Add event listeners for dragging and releasing the object
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);

        function onDocumentMouseMove(event) {

            event.preventDefault();

            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            let intersects = raycaster.intersectObjects(objects);

            if (intersects.length > 0) {

                // Move the selected object to the mouse pointer
                selectedObject.position.copy(intersects[0].point.sub(offset));

            }

            render();

        }

        function onDocumentMouseUp(event) {

            controls.enabled = true;

            document.removeEventListener('mousemove', onDocumentMouseMove, false);
            document.removeEventListener('mouseup', onDocumentMouseUp, false);

        }

    }

    render();

}

function render() {

    renderer.render(scene, camera);

}

function animate() {

    requestAnimationFrame(animate);
    controls.update();
    render();

}

