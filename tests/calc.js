var homePage = require('../pages/HomePage');
var page = new homePage();
describe("demo test", function(){
    var op;
    it("add test", function(){
        
        browser.get(browser.params.Url);
       // page.get("https://juliemr.github.io/protractor-demo/");
        page.add(10,6);
        page.go();
        browser.sleep(4000);
        op = page.result.getText();
        expect(op).toEqual('16');
    });

    it("subtract test", function(){
        //var page = new homePage();
        browser.get(browser.params.Url);
        //page.get("https://juliemr.github.io/protractor-demo/");
        page.subtract(10,6);
        page.go();
        browser.sleep(4000);
        op = page.result.getText();
        expect(op).toEqual('2');
    });
});

