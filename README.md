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
node src -nf -p <path> -n <folder_name> -tp <template_file_name> -t fs -o f -y
```

or

```shell
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

### Thanks for choosing this !
