# tabs-manager-light
A lightweight JS script for tab management. 

**Version 2.0.0**  
jQuery requirements removed.

Based on Remy Sharp's post, ["How tabs should work"](https://24ways.org/2015/how-tabs-should-work/)

## How it works
Start with a simple tab markup:
```html
<ul>
  <li><a href="#foo" role="tab" aria-controls="foo" class="tab">FOO</a></li>
  <li><a href="#baz" role="tab" aria-controls="baz" class="tab">BAZ</a></li>
</ul>
<div id="foo">
  FOO PANEL: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque odit, consequuntur vel in distinctio animi tenetur at id corporis illum, eveniet fugit voluptate iste soluta impedit dolorum inventore ipsam blanditiis.
</div>
<div id="baz">
  BAZ PANEL: Nullam sagittis tortor consequat tempor tincidunt. Nullam varius neque vel aliquet tempus. Nunc accumsan justo sed condimentum porta. Phasellus laoreet, odio in consequat lobortis, erat augue pharetra lorem, et tincidunt justo lectus a mi. Vestibulum tempor libero a pretium mattis.
</div>

```
With plain JavaScript cast the `tabsManagerLight` function with the tab's class selector as the first argument:
```javascript
tabsManagerLight('.tab');
```
If you want to customize the script's options simply write them in an object after the thirst argument:
```javascript
tabsManagerLight('.tab', {
  tabCurrentClass: 'current-tab',
  panelOpenClass: 'open-panel'
});
```
That's all! Show, hide and styles will'be managed via css.

**Have fun.**

## Options

### tabCurrentClass
Type: `string`  
Default: `is-current`

### panelOpenClass
Type: `string`  
Default: `is-open`

## Borwsers support
IE9+  
Firefox 1  
Chrome 1  
Safari 1  
Opera 7  
