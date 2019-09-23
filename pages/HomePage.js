var homePage = function(){
    //this.first = first;
    //this.second = second;
    let inputFirst = element(by.model('first'));
    let inputSecond = element(by.model('second'));   
    let inputParamPlus = element(by.cssContainingText('option', '+'));
    let inputParamMinus = element(by.cssContainingText('option', '-'));
    let btnGo = element(by.id('gobutton'));
    this.result = element(by.css('h2.ng-binding'));    

    this.get = function(url)
    {
        browser.get(url);
    }

    this.subtract = function (first, second){
        inputFirst.click();
        inputFirst.sendKeys(first);  
        inputSecond.click();
        inputSecond.sendKeys(second);
        inputParamMinus.click();
    }

    this.add = function (first, second){
        inputFirst.click();
        inputFirst.sendKeys(first);  
        inputSecond.click();
        inputSecond.sendKeys(second);
        inputParamPlus.click();
    }
    this.go = function()
    {
        btnGo.click();
    }
};
module.exports = homePage
