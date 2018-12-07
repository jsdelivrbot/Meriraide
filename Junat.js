let map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([24.41, 62.82]),
    zoom: 5.8,
    minZoom: 4,
    maxZoom: 10,
  })

});

let aloitus = true;
let currentZoom = 0;


function juna() {

  fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/').
      then((resp) => resp.json()).
      then(function(api) {

        let trainsArray = api;

        for (let i = 0; i < trainsArray.length; i++) {

          let junanNumero = trainsArray[i].trainNumber;
          let junanNopeus = trainsArray[i].speed;
          let junaLat = trainsArray[i].location.coordinates[0];
          let junaLong = trainsArray[i].location.coordinates[1];

          /*
          console.log('___________________________');
          console.log('Junan numero: '+ junanNumero);
          console.log('Junan nopeus: '+ junanNopeus);
          console.log('Koordinaatti x: ' + junaLat);
          console.log('Koordinaatti y: ' + junaLong);
         */

          let marker = new ol.Feature({
            geometry: new ol.geom.Point(
                ol.proj.fromLonLat([junaLat, junaLong]),
            ),
          });
          let vectorSource = new ol.source.Vector({
            features: [marker]
          });
          let markerVectorLayer = new ol.layer.Vector({
            source: vectorSource,
          });

          map.addLayer(markerVectorLayer);

          setTimeout(function() {
            map.removeLayer(markerVectorLayer)
          }, 5000);

          aloitus = false;

          if(currentZoom>=5) {
            marker.setStyle(new ol.style.Style({
              image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: 'junaicon1.png'
              }))
            }));
          }else if (currentZoom<5){
            marker.setStyle(new ol.style.Style({
              image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: 'junaicon2.png'
              }))
            }));
          }

        }

      });
}

if (aloitus) {
  juna();
}

function zoomi () {
  currentZoom = map.getView().getZoom();
}

setInterval(zoomi, 100);

setInterval(juna, 5000);
