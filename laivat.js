
let map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([24.41, 62.82]),
    zoom: 5.8
  })

});
function laivat(){
fetch('https://meri.digitraffic.fi/api/v1/locations/latest/').
      then((resp) => resp.json()).
      then(function(api) {

        let shipsArray = api.features;

        for (let i=0;i<shipsArray.length;i++) {


          let laivaLat = shipsArray[i].geometry.coordinates[0];
          let laivaLong = shipsArray[i].geometry.coordinates[1];
          let speed = shipsArray[i].properties.sog;
          let mmsi = (shipsArray[i].mmsi).toString();
          let maaTunnus = '';

          for (let x=0;x<3;x++) {
            maaTunnus+= mmsi[x];
          }

          console.log('mmsi: ' + mmsi);
          console.log('maatunnus: '+ maaTunnus);
          console.log('Koordinaatti x: ' + laivaLat);
          console.log('Koordinaatti y: ' + laivaLong);

          if(laivaLong > 59 && laivaLat < 30 && laivaLat > 16 && speed>0) {
            if (maaTunnus == '230') {

            let marker = new ol.Feature({
              geometry: new ol.geom.Point(
                  ol.proj.fromLonLat([laivaLat, laivaLong]),
              ),
            });

            let vectorSource = new ol.source.Vector({
              features: [marker],

            });
            let markerVectorLayer = new ol.layer.Vector({
              source: vectorSource,
            });

            map.addLayer(markerVectorLayer);

            setTimeout(function() {
              map.removeLayer(markerVectorLayer)
            }, 4000);

            marker.setStyle(new ol.style.Style({
              image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: 'laivaicon1.png'
              }))
            }));
          }
          }
        }

      });

}
setInterval(laivat, 4000);







