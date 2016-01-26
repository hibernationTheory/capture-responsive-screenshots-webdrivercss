# Capture Responsive Screenshots using Webdrivercss

## What does it do?

Captures screenshots at different breakpoints from given URLs as defined in a config file. Also checks for visual regressions. Uses WebdriverCSS.

## How does it do it?

While looking into Webdriver.io to capture screenshots, I have noticed it falls short of capturing full page screenshots for all the browsers. (ex: It only captures the visible portion of the page in Safari). Looking for workarounds, WebdriverCSS proved to be the easiest alternative. The only catch you need to be awayre is WebdriverCSS is using Webdriver.io v2. As a pleasent side effect, WebdriverCSS not only colelcts screenshots but does visual regression testing as well.

## How to use it

Require the package. Invoke it by pointing to two data files. One should contain the url data the tool should capture screenshots from, the other one is a config files that configures various aspect of the capture and regression testing progress (tolerance, output dir, etc...)
Ex: captureScreenshots('./config.json', './data.json');

### Example Config File
```
{
	"breakpoints":[320, 768, 1200],
	"imageSaveDir":"./output", // default
	"misMatchTolerance":0.05 // default
}
```

### Example Data File
{
	"links": [
		{
			"url": "http://www.google.com"
		},
		{
			"url": "http://www.bing.com"
		},
		{
			"url": "http://www.yahoo.com"
		}
	]
}