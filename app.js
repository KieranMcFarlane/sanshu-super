var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();

let speed = 0
let position = 0
let block = document.getElementById('block')
let wrap = document.getElementById('wrap')
let elems = [...document.querySelectorAll('.n')]
window.addEventListener('wheel', (e)=>{
    speed += e.deltaY*0.0002
})

let objs = Array(5).fill({dist:0})

function raf(){
    position += speed
    speed *=0.8

    objs.forEach((o,i)=> {
        o.dist = Math.min(Math.abs(position - i), 1)
        o.dist = 1 - o.dist**2
        elems[i].style.transform = `scale(${1 + 0.4*o.dist})`
    })

    rounded = Math.round(position)
    let diff = (rounded - position)

    position += Math.sign(diff)*Math.pow(Math.abs(diff), 0.7)*0.015
    console.log(position, '=====')
    wrap.style.transform = `translate(0,${-position*100 + 50}px)`
    window.requestAnimationFrame(raf)
}

raf()