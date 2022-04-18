# Auto Generate Directory Structure CLI

## Usage

### Basic Usage

```cmd
npx gene-dir
```

### Advanced Usage

```cmd
npx gene-dir -o f -t fs -n folder_name -tp template_file_name -nf -y
```

-   -nf : no folder inside
-   -y : no anything else
-   **-tp [file_name]**: generate from file_name.cpp (if file does not exist, auto create this file)
-   **-n [name]** : folder's name
-   **-o [option]** : gene with options
    The options can be one of these:
    -   f : Full (includes: "sol.cpp, in, out")
    -   io : Input / Ouput (includes: ".cpp, .INP, .OUT")
    -   ct : File for testing (includes: "brute.cpp, gen.cpp")
-   **-t [template]** : gene with template
    The template can be one of these:
    -   fs : folder structure (includes: "sol.cpp, in, out")

### Thanks for choosing this !
