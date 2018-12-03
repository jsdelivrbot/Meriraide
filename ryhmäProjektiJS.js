

fetch('https://rata.digitraffic.fi/api/v1/train-locations/latest/').
    then((resp) => resp.json()).
    then(function(api) {
      let trainsArray = api;

      for (let i=0;i<trainsArray.length;i++) {


        let junanNumero = trainsArray[i].trainNumber;
        let koordinaattiX = trainsArray[i].location.coordinates[0];
        let koordinaattiY = trainsArray[i].location.coordinates[1];
        


        console.log('Junan numero: '+junanNumero);
        console.log('Koordinaatti x: ' + koordinaattiX);
        console.log('Koordinaatti y: ' + koordinaattiY);


      }

    });
