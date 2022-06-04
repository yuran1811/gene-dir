# Auto Generate Directory Structure CLI

## Usage

### Basic Usage

```shell
node src
```

or run executor file (in releases tag)

```shell
gd
```

### Advanced Usage

```shell
node src -o f -t fs -n <folder_name> -tp <template_file_name> -nf -y
```

or

```shell
gd -o f -t fs -n <folder_name> -tp <template_file_name> -nf -y
```

```console
node src [options]

    Options:

    -y                                      no anything else
    -nf, --no-folder-inside                 no folder inside
    **-p, --path <path>**                   folder's directory
    **-n, --name <name>**                   folder's name
    **-tp, --custom-template <file>**       generate from file_name.cpp (if file does not exist, auto create this file)
    **-t, --template <template>**           gene with one of these template:
                                            -   fs : folder structure (includes: "sol.cpp, in, out")
    **-o, --option <option>**               gene with on of these options:
                                            -   f : Full (includes: "sol.cpp, in, out")
                                            -   io : Input / Ouput (includes: ".cpp, .INP, .OUT")
                                            -   ct : File for testing (includes: "brute.cpp, gen.cpp")
```

### Thanks for choosing this !
