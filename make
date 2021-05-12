require("shelljs/make");

var archiver = require("archiver"),
    fs = require("fs"),
    path = require("path"),
    Mustache = require("mustache"),
    pkg = require("./package.json"),
    config = require("./config.json");

config.version = pkg.version;
config.repository = pkg.repository;

target.all = function() {
    target.gulp();
};

target.gulp = function() {
    createPackage("Gulp")
        .append(runMustache("Gulp/_Gulpfile.js", config), { name: "Gulpfile.js" })
        .append(runMustache("Gulp/_package.json", config), { name: "package.json" })
        .finalize();
};

function createPackage(distname) {
    mkdir("-p", "dist");

    var output = fs.createWriteStream(path.join("dist", distname) + ".zip");
    var archive = archiver("zip", {});

    output.on("close", function() {
        console.log("Written %d bytes to %s", archive.pointer(), output.path);
    });

    output.on("error", function(err) {
        console.error("Error: %s", err.toString());
    });

    archive.pipe(output);

    return archive;
}

function runMustache(path, vars) {
    var fileText = fs.readFileSync(path, { encoding: "utf8" });
    return Mustache.render(fileText, vars);
}
