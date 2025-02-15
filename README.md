<h1 align="center">gene-dir</h1>
<p align="center" style="font-size:16px"><strong>Auto Generate Directory Structure CLI</strong></p>
<p align="center">  
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="400" />
</p>

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/yuran1811/gene-dir">
  <img alt="Forks" src="https://badgen.net/github/forks/yuran1811/gene-dir">
  <img alt="Issues" src="https://badgen.net/github/issues/yuran1811/gene-dir">
  <img alt="Commits" src="https://badgen.net/github/commits/yuran1811/gene-dir">
  <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/yuran1811/gene-dir">
</p>

<div align="center"><a href="" target="_blank">Live Demo</a></div>

## Introduction

- `gene-dir` is an auto-generate directory structure cli.

## Features

- Generate using custom file template
- Generate with template
  - fs : folder structure (includes: "sol.cpp, in, out")
- Generate with 3 types
  - f : Full (includes: "sol.cpp, in, out")
  - io : Input / Ouput (includes: ".cpp, .INP, .OUT")
  - ct : File for testing (includes: "brute.cpp, gen.cpp")

## Tech Stack

<img src="https://skill-icons-livid.vercel.app/icons?i=nodejs&gap=60" height="36" />

## Usage

### Basic Usage

```bash
node src
```

or run executor file (in releases tag)

```bash
gd
```

### Advanced Usage

```bash
node src -nf -p <path> -n <folder_name> -tp <template_file_name> -t fs -o f -y
```

or

```bash
gd -nf -p <path> -n <folder_name> -tp <template_file_name> -t fs -o f -y
```

```console
node src [options]

    Options:

    -y                              no anything else
    -nf, --no-folder-inside         no folder inside
    -p, --path <path>               folder's directory
    -n, --name <name>               folder's name
    -tp, --custom-template <file>   autogene from <file>.cpp (if not exist, auto create)
    -t, --template <template>       gene with one of these template:
                                    -   fs : folder structure (includes: "sol.cpp, in, out")
    -o, --option <option>           gene with one of these options:
                                    -   f : Full (includes: "sol.cpp, in, out")
                                    -   io : Input / Ouput (includes: ".cpp, .INP, .OUT")
                                    -   ct : File for testing (includes: "brute.cpp, gen.cpp")
```

## Development

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed or downloaded on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)

**Cloning the Repository**

```bash
git clone https://github.com/yuran1811/gene-dir.git
cd gene-dir
```

**Installation**

Install the project dependencies:

```bash
npm install
```

or

```bash
yarn
```

**Running the Project**

```bash
npm start
```

or

```bash
yarn start
```
