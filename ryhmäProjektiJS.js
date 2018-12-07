const junaApi = 'https://rata.digitraffic.fi/api/v1/train-locations/latest/';

fetch(junaApi).
    then((resp) => resp.json()).
    then(function(api) {
      let trainsArray = api;

      for (let i=0;i<trainsArray.length;i++) {

        let junanNumero = trainsArray[i].trainNumber;
        let junanNopeus = parseInt(trainsArray[i].speed);
        let junaLat = trainsArray[i].location.coordinates[1];
        let junaLong = trainsArray[i].location.coordinates[0];

        if (junanNopeus > 0 ) {
          console.log('___________________________');
          console.log('Junan numero: ' + junanNumero);
          console.log('Junan nopeus: ' + junanNopeus);
          console.log('Junan paikka: '+ junaLat+' ' +junaLong);
        }
      }

    });
