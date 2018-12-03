const junaApi = 'https://rata.digitraffic.fi/api/v1/train-locations/latest/';

fetch(junaApi).
    then((resp) => resp.json()).
    then(function(api) {
      let trainsArray = api;

      for (let i=0;i<trainsArray.length;i++) {
        
        let junanNumero = trainsArray[i].trainNumber;
        let junanNopeus = parseInt(trainsArray[i].speed);
        let koordinaatti1 = trainsArray[i].location.coordinates[0];
        let koordinaatti2 = trainsArray[i].location.coordinates[1];
        
        if (junanNopeus > 0 ) {
          console.log('___________________________');
          console.log('Junan numero: ' + junanNumero);
          console.log('Junan nopeus: ' + junanNopeus);
          console.log('WGS84: '+ koordinaatti1+' ' +koordinaatti2);
          //wgs84 pitää muuttaa toiseen formaattiin
        }
      }

    });

