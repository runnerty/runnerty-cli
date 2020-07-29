# Runnerty CLI Tool

<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">A new way for processes managing</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][david-badge]][david-badge-url]
<a href="#badge">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

## What is?

Early version of Runnerty CLI

You can simple use it via **npx**

```bash
npx runnerty-cli new my-workflow
```

## Instalation

```bash
npm i -g runnerty-cli
```

## Usage

### Create new runnerty project

```bash
rty new my-workflow
```

### Migrate CRON file to runnerty project

From "crontab -l" of the system:
```bash
rty migrate my-workflow 
```

From a crontab file:
```bash
rty migrate my-workflow my-crontab-file.txt
```

### For more options

```bash
rty --help
```

[runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/runnerty-cli.svg
[npm-url]: https://www.npmjs.com/package/runnerty-cli
[npm-image]: https://img.shields.io/npm/v/runnerty-cli.svg
[david-badge]: https://david-dm.org/runnerty/runnerty-cli.svg
[david-badge-url]: https://david-dm.org/runnerty/runnerty-cli