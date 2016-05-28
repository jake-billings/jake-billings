/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'firebase': 'vendor/firebase/lib/firebase-web.js',
  'angularfire2': 'vendor/angularfire2'
};

/** User packages configuration. */
const packages: any = {
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  }
};

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button',
  'card',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`, defaultExtension: 'js'};
  map[`@angular2-material/${pkg}`] = `vendor/@angular2-material/${pkg}`;
});

// console.log(packages);

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+resume',
  'app/+gallery',
  'app/contact-info',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
