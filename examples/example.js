
var posix = require("posix"),
  sys = require("sys"),
  path = require("path"),
  xml = posix.cat(path.join(__dirname, "test.xml")),
  sax = require("../lib/sax"),
  strict = sax.parser(true),
  loose = sax.parser(),
  inspector = function (ev) { return function (data) {
    sys.error("");
    sys.error(ev+": "+sys.inspect(data));
    // for (var i in data) sys.error(i+ " "+sys.inspect(data[i]));
    sys.error(this.line+":"+this.column);
  }};

xml.addCallback(function (xml) {
  // strict.write(xml);
  
  sax.EVENTS.forEach(function (ev) {
    loose["on"+ev] = inspector(ev);
  });
  loose.onend = function () {
    sys.error("end");
    // sys.error(sys.inspect(loose));
  };
  
  loose.write(xml).close();
});