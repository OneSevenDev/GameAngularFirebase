// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDYW65_eVvvhVOy1lWMdzfocMOVO-3Drrg',
    authDomain: 'gameangularfirebase.firebaseapp.com',
    databaseURL: 'https://gameangularfirebase.firebaseio.com',
    projectId: 'gameangularfirebase',
    storageBucket: '',
    messagingSenderId: '693162419831',
    appId: '1:693162419831:web:0712c1a0c44daf33'
  },
  maxGamer: 2,
  timerResponse: 10 // en segundo
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
