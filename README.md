# Auto Generate Directory Structure CLI

## Usage

```cmd
npx gene-dir -o f -t fs -n folder_name -tp template_file_name
```

-   **-tp [file_name]**: generate from file_name.cpp (if file does not exist, auto create this file)
-   **-n [name]** : folder's name
-   **-o [option]** : gene with options
    The options can be one of these:
    -   f : Full (includes: "sol.cpp, in1, in2, in3, out")
    -   m : Minimal (includes: "sol.cpp")
    -   io : Input / Ouput (includes: "sol.cpp, .INP, .OUT")
    -   ct : File for testing (includes: "brute.cpp, gene.cpp")
-   **-t [template]** : gene with template
    The template can be one of these:
    -   fs : folder structure (includes: "sol.cpp, in1, in2, in3, out")

### Thanks for choosing this !
