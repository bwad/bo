#!/usr/bin/env node

var app = require('commander')
, spawn = require('child_process').spawn
, pkg = require('../package.json')
, version = pkg.version
, project_path = process.cwd()
, bo = require('../lib');

app
  .version(version)

app
  .command('new <name>')
  .description('Create a new project')
  .option('-i, --install', 'Run npm install after createing project.')
  .option('-t, --template <name>', 'Specify a project template.')
  .action(function(name, cmd){    
    //name is the name of the project.
    //cmd is the command object (access to command options).
    bo.project({
      name: name,
      options: {
        // TODO: Validate that speicified project template exists!
        template: cmd.template || 'default'
      }
    });
  });
   
app
  .command('view <name>')
  .description('Create a new view')
  .option('-t, --template <name>', 'Specify a view template.')
  .action(function(name, cmd){    
    bo.view({name: name});
  });
  
app
  .command('coll <name>')
  .description('Create a new collection')
  .option('-t, --template <name>', 'Specify a collection template.')
  .action(function(name, cmd){    
    bo.collection({name: name});
  });
  
app
  .command('model <name>')
  .description('Create a new model')
  .option('-t, --template <name>', 'Specify a model template.')
  .action(function(name, cmd){    
    bo.model({name: name});
  });


// Handle case where no arguments/options are provided => just print help.
if(process.argv.length < 3 ) { 
  app.parse([].slice.call(process.argv,0,2)); // Required to setup help info.
  app.help(); 
}

app.parse(process.argv);
