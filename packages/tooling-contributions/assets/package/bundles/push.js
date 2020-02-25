const { argv } = require('process');
const { normalize, parse, join } = require('path');
const { copyFile, readdir, mkdir, readFile } = require('fs').promises;
const { tmpdir } = require('os');
const { sync: spawn } = require('cross-spawn');

// use some unique folder name
const dataDir = normalize(join(tmpdir(), `acoustic-content-${Date.now()}`));

const toolsArgs = [
  'wchtools-cli',
  'push',
  '-AfI',
  '--dir',
  dataDir,
  ...argv.splice(2)
];

const rmArgs = ['rimraf', dataDir];

const opts = {
  stdio: 'inherit'
};

const DIRS = {};

const mkdirp = (aName) =>
  DIRS[aName] || (DIRS[aName] = mkdir(aName, { recursive: true }));

const copyRec = (aRel, aSrc, aDst) =>
  Promise.all([
    readdir(join(aSrc, aRel), { withFileTypes: true }),
    mkdirp(join(aDst, aRel))
  ]).then(([list]) =>
    Promise.all(
      list.map((list) =>
        list.isFile()
          ? copyFile(join(aSrc, aRel, list.name), join(aDst, aRel, list.name))
          : list.isDirectory()
          ? copyRec(join(aRel, list.name), aSrc, aDst)
          : undefined
      )
    )
  );

const readPkg = (aPath) =>
  readFile(join(aPath, 'package.json'), 'utf8').then((data) =>
    JSON.parse(data)
  );
const findPkg = (aDir) =>
  readPkg(aDir).then(
    () => aDir,
    () => findPkg(parse(aDir).dir)
  );
const readDep = (aDep) => findPkg(parse(require.resolve(aDep)).dir);
const copy = (aSrc, aDst) => copyRec('', aSrc, aDst);

const findData = (aDir) =>
  readPkg(aDir).then(({ dependencies = {}, config = {} }) =>
    Promise.all(
      Object.keys(dependencies).map((dep) => readDep(dep).then(findData))
    ).then((all) =>
      [config.data && join(aDir, config.data)].concat(...all).filter(Boolean)
    )
  );

const deps$ = findData(join(__dirname, '..')).then((all) =>
  Array.from(new Set(all))
);

const copy$ = deps$.then((dirs) =>
  Promise.all(dirs.map((dir) => copy(dir, dataDir)))
);
const deploy$ = copy$.then(() => spawn('npx', toolsArgs, opts));
const remove$ = deploy$.then(() => spawn('npx', rmArgs, opts));

remove$.catch(console.error);
