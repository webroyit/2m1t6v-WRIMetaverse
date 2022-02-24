import keyInput from "./keyInput.js";

const ratio = window.innerWidth / window.innerHeight;

// Creating the scene
const scene = new THREE.Scene();

/* 
    1) Field of view
    2) Ratio
    3) Clipping start, where the camera is going to start rendering stuff from
    4) Clipping end
*/
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();     // What the user should see
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );       // Add it to the DOM

/*
    Instantiated geometry element
    1) Width
    2) Height
    3) Depth
*/
const geometry = new THREE.BoxGeometry(50, 0.1, 50);

const light = new THREE.AmbientLight(0x404040);

/* 
    Direction of the light
    1) Color
    2) Brightness Value
*/ 
const dLight = new THREE.DirectionalLight(0xffffff, 0.5);

// Apply the light
light.add(dLight);
scene.add(light);

// Instantiated material element
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );

// Create a mesh
const ground = new THREE.Mesh( geometry, material );

// Add ground to scene
scene.add( ground );

/*
    Move the camera to see the ground
    1) X
    2) Y
    3) Z
*/
camera.position.set(5, 15, 15);

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
box.position.set(-2, 0, 8);

scene.add( box );

// For animation
// Every seconds this function is called
function animate() {
	requestAnimationFrame( animate );   // Infinite loop

    // For Up
    if(keyInput.isPressed(38)){
        camera.position.y += 0.05;
        camera.position.x += 0.05;
    }

    // For Down
    if(keyInput.isPressed(40)){
        camera.position.y -= 0.05;
        camera.position.x -= 0.05;
    }
    
    camera.lookAt(ground.position);     // Set the camera to look at ground
	renderer.render( scene, camera );
}

animate();