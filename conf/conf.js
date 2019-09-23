var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
var fs = require('fs-extra');


exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/calc.js'],

  params: {
    Url: 'https://juliemr.github.io/protractor-demo/',
    UserName: 'abc@test.com',
    Password: '123'
},

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  onPrepare: function() {      
    require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './',
      filePrefix: 'xmlresults'
  }));
  },

  onPrepare: function()
  {
    fs.emptyDir('screenshots/', function (err) {
      console.log(err);
  });

  jasmine.getEnv().addReporter({
      specDone: function(result) {
          if (result.status == 'failed') {
              browser.getCapabilities().then(function (caps) {
                  var browserName = caps.get('browserName');

                  browser.takeScreenshot().then(function (png) {
                      var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                      stream.write(new Buffer(png, 'base64'));
                      stream.end();
                  });
              });
          }
      }
  });
  },
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
       browserName = caps.get('browserName');
       browserVersion = caps.get('version');
       platform = caps.get('platform');

       

       testConfig = {
           reportTitle: 'Protractor Test Execution Report',
           outputPath: './',
           outputFilename: 'ProtractorTestReport',
           screenshotPath: './screenshots',
           testBrowser: browserName,
           browserVersion: browserVersion,
           modifiedSuiteName: false,
           screenshotsOnlyOnFailure: true,
           testPlatform: platform
       };
       new HTMLReport().from('xmlresults.xml', testConfig);
   });
}
};
