function main(configFile, dataFile) {
    /* 
    * Takes screenshots from the given URL's and at given breakpoints. 
    * Saves the results and the diff inside the given folder or in ./output if none given.
    */

    // modules
    var assert = require('assert');
    var fs = require('fs');
    var sanitize = require("sanitize-filename")
    var webdriver = require('webdriverio');

    // init Webdriver
    var options = {desiredCapabilities:{browserName: 'safari'}}
    var client = webdriver.remote(options)

    // read in data files
    var configFileStr = fs.readFileSync(configFile).toString();
    var configFileData = JSON.parse(configFileStr);

    var dataFileStr = fs.readFileSync(dataFile).toString();
    var dataFileData = JSON.parse(dataFileStr);

    // set up the data
    var urls = dataFileData.links;
    var breakpoints = configFileData.breakpoints;
    var imageSaveDir = configFileData.imageSaveDir || './output';
    var misMatchTolerance = configFileData.misMatchTolerance || 0.05;

    // init WebdriverCSS
    require('webdrivercss').init(client, {
        screenWidth:breakpoints,
        misMatchTolerance: 0.05,
        screenshotRoot: imageSaveDir
    });
    
    var initClient = client.init();
    recurse(initClient, urls.length-1)

    function recurse(client, counter) {
        if (counter < 0) {
            client.end();
            return;
        }
        client
            .url(urls[counter].url)
            .getTitle().then(function(title) {
                var sanitizedTitle = sanitize(title);
                client.webdrivercss(sanitizedTitle, 
                    [
                        {
                            name:'all',
                            elem:'html'
                        }
                    ], 
                    function(err, res) {
                        //assert.ifError(err)
                        //assert.ok(res.x[0].isWithinMisMatchTolerance);
                        recurse(client, counter-1)
                    })
            })
    }
}

module.exports = main;