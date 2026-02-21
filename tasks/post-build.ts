/* eslint-disable no-console */
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { IBuilderBaseOptions } from './types/builder-options.js';
import { IPackage } from './types/package.js';
import { readJSON, writeJSON } from './utils/fs.js';

/**
 * prepare the compiled dir for publishing
 * - generate package*.json files
 * - copy .env files
 * @param options
 */
export default function postBuild(options: IBuilderBaseOptions) {
  console.info(
    `[universal-builder] running the default post-build script. to skip use options.postBuild=false`,
  );

  let opts: IBuilderBaseOptions = {
    ...options,
  };

  let pkg = readJSON<IPackage>(`${opts.projectPath}/package.json`) || {},
    distPkg = existsSync(`${opts.projectPath}/dist/package.json`)
      ? readJSON<IPackage>(`${opts.projectPath}/dist/package.json`)
      : pkg,
    rootPkg = readJSON<IPackage>(`${opts.root}/package.json`) || {},
    dist = `${opts.projectPath}/${opts.outDir || 'dist'}`;

  if (!existsSync(dist)) {
    throw new Error(
      `[universal-builder] "${dist}" doesn't exist, be sure the app is built. if you're using a custom output dir, provide options.outDir`,
    );
  }

  // copy basic info from the project package or root package
  for (let property of [
    'engines',
    'packageManager',
    'repository',
    'author',
    'homepage',
    'bugs',
    'license',
    'contributors',
    'funding',
    // `add pnpm.overrides` to override deps when installing in the server
    'pnpm',
  ]) {
    if (!distPkg[property]) {
      if (pkg[property]) distPkg[property] = pkg[property];
      else if (rootPkg[property]) distPkg[property] = rootPkg[property];
    }
  }

  // add exports
  if (!distPkg.exports) {
    distPkg.exports = {};
  }

  if (!distPkg.exports['./package.json']) {
    distPkg.exports['./package.json'] = './package.json';
  }

  if (distPkg.exports['.']) {
    // convert .ts -> .js
    if (typeof distPkg.exports['.'] === 'string') {
      distPkg.exports['.'] = distPkg.exports['.'].replace(/\.ts$/, '.js');
    } else {
      for (let key in distPkg.exports['.']) {
        distPkg.exports['.'][key] = distPkg.exports['.'][key].replace(
          /\.ts$/,
          '.js',
        );
      }
    }
  } else {
    distPkg.exports['.'] = {
      types: './index.d.ts',
      default: './index.js',
    };
  }
  if (!distPkg.exports['./*']) {
    distPkg.exports['./*'] = existsSync(`${dist}/src`) ? './src/*' : './*';
  }

  writeJSON(`${dist}/package.json`, distPkg);

  // copy package lock files, to insure the exactly same version are installed when deploying the package
  ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'].map((el) => {
    let path = resolve(`${opts.root}/${el}`);
    if (existsSync(path)) {
      copyFileSync(path, resolve(`${dist}/${el}`));
    }
  });

  // copy .env files
  readdirSync(opts.projectPath)
    .filter((el) =>
      // matches `.env` and `.env.*`
      /^\.env($|\..+)/.test(el),
    )
    .map((el) => copyFileSync(`${opts.projectPath}/${el}`, `${dist}/${el}`));

  // copy meta files
  ['README.md'].map((file) => {
    if (existsSync(`${opts.projectPath}/${file}`)) {
      copyFileSync(`${opts.projectPath}/${file}`, `${dist}/${file}`);
    }
  });
}
