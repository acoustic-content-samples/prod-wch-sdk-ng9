import * as checker from 'license-checker';

const compatibileOSLicenses: string[] = [
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
  'BSD-0 Clause',
  'BSD 2-Clause',
  'BSD-2-Clause-FreeBSD',
  'BSD-2-Clause-Patent',
  'BSD-3 Clause',
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
  'CC0-1.0',
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
  'MIT', //must include copyright notice and the license
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
];
const compatibileOSLicensesToString = compatibileOSLicenses.join(', ');
const packagesFile =
  __dirname.includes('/scripts') && __dirname.replace('/scripts', '');

const options = {
  start: packagesFile,
  //@ts-ignore
  exclude: compatibileOSLicensesToString
};

const prepareDependencies = (dependencies, operator: string) =>
  dependencies.map((dependency) => ({
    ...dependency,
    licenses: prepareLicensesNames(dependency.licenses, operator)
  }));
const removeChars = (license: string): string =>
  license.replace('(', '').replace(')', '');

const prepareLicensesNames = (name: string, operator: string) => {
  const nameWithoutSpecialChars = removeChars(name);
  return nameWithoutSpecialChars.split(` ${operator} `);
};

const selectNotSupportedOrLicenses = (dependencies) => {
  const preparedDependencies = prepareDependencies(dependencies, 'OR');

  return preparedDependencies.map((dependency) => {
    const licensesArray = dependency.licenses.map((license) =>
      compatibileOSLicenses.includes(license)
    );
    return licensesArray.reduce((a, b) => a || b) ? [] : dependency;
  });
};

const selectNotSupportedANDicenses = (dependencies) => {
  const preparedDependencies = prepareDependencies(dependencies, 'AND');

  return preparedDependencies.map((dependency) => {
    const licensesArray = dependency.licenses.map((license) =>
      compatibileOSLicenses.includes(license)
    );

    return licensesArray.reduce((a, b) => a && b) ? [] : dependency;
  });
};

checker.init(options, (err, dependencies) => {
  const dependencyArray = Object.keys(dependencies).map((key) => ({
    ...dependencies[key],
    name: key
  }));
  const notsupportedOSLicenses = dependencyArray.filter(
    (dependency) => !compatibileOSLicensesToString.includes(dependency.licenses)
  );

  const orLicenses = notsupportedOSLicenses.filter(({ licenses }) =>
    licenses.includes('OR')
  );
  const notSupportedOrLicenses = selectNotSupportedOrLicenses(orLicenses);

  const andLicenses = notsupportedOSLicenses.filter(({ licenses }) =>
    licenses.includes('AND')
  );
  const notSupportedAndLicenses = selectNotSupportedANDicenses(andLicenses);
  const allNotsupportedOSLicenses = notsupportedOSLicenses.concat(
    notSupportedOrLicenses,
    notSupportedAndLicenses
  );

  if (err) {
    throw new Error(err);
  } else {
    if (allNotsupportedOSLicenses.length > 0) {
      const notsupportedOSLicensesNames = allNotsupportedOSLicenses
        .map(({ name, licenses }) => `${name}:  ${licenses} `)
        .join(',\n');

      throw new Error(
        `Not supported licenses in packages:

        \n${notsupportedOSLicensesNames}`
      );
    } else {
      // @ts-ignore
      console.log('Success!');
    }
  }
});
