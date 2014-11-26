#bo - Backbone Only

`bo` is a commandline application for generating and working with backbone projects. 

`bo`'s primary purpose at this point is generating simple backbone based projects for prototyping.

#Dependencies

`bo` makes use of the following fine tools/packages:

- grunt
- underscore
- jade
- commander
- backbone
- jquery
- bootstrap

#Usage

    Usage: bo [options] [command]
    
    Commands:
    
      new [options] <name>   Create a new project
      view [options] <name>  Create a new view
      coll [options] <name>  Create a new collection
      model [options] <name> Create a new model
      
    Options:
    
      -h, --help     output usage information
      -V, --version  output the version number

<u>*Notes:*</u>

1. None of the commands currently support templates.

#Generated Project

    bower_components/       # Generated by bower.
    connect/                # Connect middleware example.
    dist/                   # Generated distribution.
    node_modules/           # Generated by npm.
    src/                    # Project source.
    bower.json
    Gruntfile.js
    package.json
    README.md
