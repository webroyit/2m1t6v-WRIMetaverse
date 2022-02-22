const ratio = window.innerWidth / window.innerHeight;

// Creating the scene
const scene = new THREE.Scene();

/*  1) Field of view
    2) Ratio
    3) Clipping start, where the camera is going to start rendering stuff from
    4) Clipping end
*/
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();     // What the user should see
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );       // Add it to the DOM

// Instantiated geometry element
const geometry = new THREE.BoxGeometry();

const light = new THREE.AmbientLight(0x404040);

/*  Direction of the light
    1) Color
    2) Brightness Value
*/ 
const dLight = new THREE.DirectionalLight(0xffffff, 0.5);

// Apply the light
light.add(dLight);
scene.add(light);

// Instantiated material element
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

// Create a mesh
const cube = new THREE.Mesh( geometry, material );

// Add cube to scene
scene.add( cube );

// Move the camera to see the cube
camera.position.z = 6;

// For animation
// Every seconds this function is called
function animate() {
    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Infinite loop
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();