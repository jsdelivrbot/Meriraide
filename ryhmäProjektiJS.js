
fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/').
    then((resp) => resp.json()).
    then(function(api) {
      let trainsArray = api;

      for (let i=0;i<trainsArray.length;i++) {


        let junanNumero = trainsArray[i].trainNumber;
        let junanNopeus = parseInt(trainsArray[i].speed);
        let koordinaattiX = trainsArray[i].location.coordinates[0];
        let koordinaattiY = trainsArray[i].location.coordinates[1];


        if (junanNopeus > 0) {
          console.log('___________________________');
          console.log('Junan numero: ' + junanNumero);
          console.log('Junan nopeus: ' + junanNopeus);
          console.log('Koordinaatti x: ' + koordinaattiX);
          console.log('Koordinaatti y: ' + koordinaattiY);
        }
          
      }

    });

