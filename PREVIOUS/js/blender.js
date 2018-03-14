// 共通で使用する変数
var mesh, renderer, scene, camera;

// 設定
var width = 1280,
    height = 640;


document.addEventListener( 'DOMContentLoaded', function(){

  // シーンの用意
  scene = new THREE.Scene();


  // カメラの設定
  var fov = 45, // 画角
      aspect = width / height, // アスペクト比
      near = 1, // 手前
      far = 700; // 奥行き
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far ); // カメラの準備
  camera.position.set( 0, 0, 50 ); // カメラ位置の設定


  // レンダラーの設定
  renderer = new THREE.WebGLRenderer(); // レンダラーの用意
  renderer.setSize( width, height ); // サイズを指定
  var bgColor = 0x000000;
  renderer.setClearColor(bgColor, 1); // 背景色を指定
  document.body.appendChild( renderer.domElement ); // bodyへ追加


  // ライトの設定
  var lightColor = 0xffffff; // ライトの色
  var directionalLight = new THREE.DirectionalLight( lightColor ); // ライトの色を指定
  directionalLight.position.set( 1, 1, 1 ); // ライトの位置の設定
  scene.add( directionalLight ); // ライトの追加
  // jsonファイルの読み込み
 var loader = new THREE.JSONLoader();
 var json = './face/test.json';// jsonパスの指定
 loader.load( json, function ( geometry, materials ) {
     var faceMaterial = new THREE.MeshFaceMaterial( materials );
     var materialColor = 0xff8700; // マテリアルの色
     faceMaterial.materials[0].color = new THREE.Color(materialColor); // マテリアルの色の設定
     faceMaterial.materials[0].wireframe = true; // ワイヤーフレーム表示にする

     mesh = new THREE.Mesh( geometry, faceMaterial );
     mesh.position.set( 0,0,0); // 位置の設定
     mesh.scale.set( 10, 10, 10 ); // スケールの設定

     scene.add( mesh ); // シーンへメッシュの追加

     renderLoop(); // レンダリング実行
 } );

});

// レンダリング処理
speed変数の数値を変えることで動く数値が大きくなるので早く回転してるように見えます。
function renderLoop () {
 var speed = 0.005; // 追加される値
 // メッシュの回転
 var meshRotaX = mesh.rotation.x + speed,
     meshRotaY = mesh.rotation.y + speed,
     meshRotaZ = mesh.rotation.z + speed;
 mesh.rotation.set(meshRotaX, meshRotaY, meshRotaZ);
 renderer.render( scene, camera ); // レンダリング
 requestAnimationFrame( renderLoop ); // ループ処理
}



});
