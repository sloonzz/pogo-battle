// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBL8meCOxmmAOAZnB1_tno3EjwMETEekNk',
    authDomain: 'pogo-battle-7868d.firebaseapp.com',
    databaseURL: 'https://pogo-battle-7868d.firebaseio.com',
    projectId: 'pogo-battle-7868d',
    storageBucket: 'pogo-battle-7868d.appspot.com',
    messagingSenderId: '774838234136',
    appId: '1:774838234136:web:b0a5629924d9caab62a76d',
    measurementId: 'G-4JLEPVZYMQ'
  },
  pokemonApi: {
    baseUrl: 'https://pokeapi.co/api/v2/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
