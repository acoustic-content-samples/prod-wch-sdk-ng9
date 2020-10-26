import checker from 'license-checker';

const compatibileOSLicenses = [
  'Adobe-2006',
  'ADSL',
  'AFL-1.2',
  'AFL-2.1',
  'Afmparse',
  'Apache-1.0',
  'Apache-2.0',
  'Barr',
  'Borceux',
  'Bouncy-Castle',
  'BSD 0-Clause',
  'BSD 2-Clause',
  'BSD-2-Clause-FreeBSD',
  'BSD-2-Clause-Patent',
  'BSD-3-Clause-LBNL',
  'BSD-3-Clause-No-Nuclear-License-2014',
  'BSD-4-Clause',
  'BSD-Protection',
  'BSL-1.0',
  'bzip2-1.0.6',
  'Caldera',
  'CC-BY-1.0',
  'CC-BY-2.5',
  'CC-BY-4.0',
  'CCO-1.0',
  'CDLA-Permissive-1.0',
  'CeCILL-B',
  'CNRI-Jython',
  'CNRI-Python-GPL-Compatible',
  'Condor-1.1',
  'CPOL-1.02',
  'Crossword',
  'Cube',
  'DSDP',
  'ECL-1.0',
  'ECL2',
  'EFL-1.0',
  'eGenix',
  'Entessa',
  'EUDatagrid',
  'Fair',
  'FSFUL',
  'FTL',
  'Giftware',
  'Historical',
  'IJG',
  'iMatix',
  'Info-ZIP',
  'Intel-ACPI',
  'IU-Extreme-1.1.1',
  'JasPer-2.0',
  'JSON',
  'Leptonica',
  'Libpng',
  'MirOS',
  'MIT-enna',
  'MITNFA',
  'MS-PL',
  'MTLL',
  'Mup',
  'NAUMEN',
  'Net-SNMP',
  'NLPL',
  'NTP',
  'OFL-1.0',
  'OLDAP-2.0.1',
  'OLDAP-2.2',
  'OLDAP-2.2.2',
  'OLDAP-2.4',
  'OLDAP-2.6',
  'OLDAP-2.8',
  'PHP-3.0',
  'Plexus',
  'psfrag',
  'Public Domain',
  'Python-2.0',
  'RSA-MD',
  'Saxpath',
  'SCEA',
  'SGI-B-1.0',
  'SGI-B-2.0',
  'Spencer-86',
  'Spencer-99',
  'StandardML-NJ',
  'TCP-wrappers',
  'Unicode-DFS-2016',
  'UPL-1.0',
  'VovidaPL-1.0',
  'W3C',
  'Wsuipa',
  'Xerox',
  'xinetd',
  'Zed',
  'Zlib',
  'zlib-acknowledgement',
  'ZPL-2.0'
  // ======== not supported
  //   "ISC",
  //   "MIT", //must include copyright notice and the license
  //   "BSD-3-Clause OR MIT",
  //   "BSD-2-Clause",
  //   "CC-BY-3.0",
  //   "CC0-1.0",
  //   "(MIT AND CC-BY-3.0)",
];
const compatibileOSLicensesToString = compatibileOSLicenses.join(', ');
const licenseFile = __dirname;

const options = {
  start: licenseFile,
  exclude: compatibileOSLicenses //compatibileOSLicensesToString
};

// const orCase = (or) => {
//   const c = or.map((package) => ({
//     ...package,
//     licenses: package.licenses.split(' OR ')
//   }));
//   const d = c.map((package) => {
//     const q = package.licenses.map((license) =>
//       compatibileOSLicenses.includes(license)
//     );
//     const w = q.reduce((a, b) => a || b);

//     return w ? [] : package;
//   });
//   return d;
// };

// const andCase = (or) => {
//   const c = or.map((package) => ({
//     ...package,
//     licenses: package.licenses.split(' OR ')
//   }));
//   const d = c.map((package) => {
//     const q = package.licenses.map((license) =>
//       compatibileOSLicenses.includes(license)
//     );
//     const w = q.reduce((a, b) => a && b);
//     console.log(w);
//     return w ? [] : package;
//   });
//   console.log(d);
//   return d;
// };

checker.init(options, (err, dependencies) => {
  const dependencyArray = Object.keys(dependencies).map((key) => ({
    ...dependencies[key],
    name: key
  }));
  const notsupportedOSLicenses = dependencyArray;
  //         .filter(
  //     (dependency) => !compatibileOSLicensesToString.includes(dependency.licenses)
  //   );
  const or = notsupportedOSLicenses.filter(({ licenses }) =>
    licenses.includes('OR')
  );
  // const orr = orCase(or);

  const and = notsupportedOSLicenses.filter(({ licenses }) =>
    licenses.includes('AND')
  );
  // const andd = andCase(and);
  // const x = notsupportedOSLicenses.concat(notsupportedOSLicenses, orr, andd);
  console.log('x', notsupportedOSLicenses);
  if (err) {
  } else {
    if (notsupportedOSLicenses.length > 0) {
      const notsupportedOSLicensesNames = notsupportedOSLicenses
        .map(({ name, licenses }) => `${name}:  ${licenses} `)
        .join(',\n');

      throw new Error(
        `Not supported licenses in packages: \n${notsupportedOSLicensesNames}`
      );
    } else {
      console.log('Success!');
    }
  }
});
