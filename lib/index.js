// bo/lib/index.js

var grunt = require('grunt')
, path = require('path')
, join = path.join
, gf = grunt.file
, _ = require('underscore')
, projects_path = join(__dirname, 'projects')
, templates_path = join(__dirname, 'templates');

module.exports = {
  
  //===========================================================================
  // Project generator
  //===========================================================================
  project: function(args) {
    var home = args.name
    , template_option = args.options.template || 'default'
    , pdir = join(projects_path, template_option)
    , src = join(home, 'src')
    , proj = gf.readJSON(join(pdir, 'project.json'))
    , data = _.extend({}, proj.data, args.options)
          
    gf.mkdir(home)     // Project directory
   
    var proj = gf.readJSON(join(pdir, 'project.json'))
    proj.mkdirp.forEach(function (d) { gf.mkdir(join(src, d)) });
    proj.files.forEach(function (f) {
      gf.copy(join(pdir, f) , join(home, f));
    });
    proj.app.forEach(function (f) {
      template(pdir, f.template, home, f.dest);
    });
    
  }, // end project()
  
  //===========================================================================
  // View generator
  //===========================================================================
  view: function (args) {
    console.log("  view name: %s", args.name);
    var home = process.cwd()
    , src = join(home, 'src')
    , Name = args.name.charAt(0).toUpperCase() + args.name.slice(1);
    
    //View
    console.log("  Writing view: " + Name + 'View' + '.js')
    var data = {
      view: Name,
      el: '#'+ args.name,
      templateID: args.name
    };
    var v = _.template(gf.read(join(templates_path, 'view.js')), data )
    gf.write(join(src, 'views', Name + 'View' + '.js'), v)    
    
    // Template
    console.log("  Writing tempalate: " + Name + 'Tmpl' + '.jade')
    data = {
      name: args.name
    };
    var v = _.template(gf.read(join(templates_path, 'template.jade')), data )
    gf.write(join(src, 'templates', Name + 'Tmpl' + '.jade'), v)    
    
  }, // end view()
  
  //===========================================================================
  // Collection generator
  //===========================================================================
  collection: function (args) {
    var home = process.cwd()
    , src = join(home, 'src')
    , name = args.name
    , Name = name.charAt(0).toUpperCase() + name.slice(1);
    
    //View
    console.log("  Writing collection: " + Name + 'Collection.js')
    var data = {
      name: name,
      Name: Name
    };
    var v = _.template(gf.read(join(templates_path, 'collection.js')), data )
    gf.write(join(src, 'collections', Name + 'Collection.js'), v)    
    
    this.model(args)
        
  }, // end collection()

  //===========================================================================
  // Model generator
  //===========================================================================
  model: function (args) {
    var home = process.cwd()
    , src = join(home, 'src')
    , name = args.name
    , Name = name.charAt(0).toUpperCase() + name.slice(1);
    
    //View
    console.log("  Writing model: " + Name + 'Model.js')
    var data = {
      name: name,
      Name: Name
    };
    var v = _.template(gf.read(join(templates_path, 'model.js')), data )
    gf.write(join(src, 'models', Name + 'Model.js'), v)    
        
  } // end model()


} // end module.exports

function template(src_base, src, dst_base, dst) {
  var dst = _.reduce(dst, function(memo, d) {return join(memo, d)}, '')
  var src = _.reduce(src, function(memo, d) {return join(memo, d)}, '')
  gf.copy(join(src_base, src), join(dst_base, dst));
}