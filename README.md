# percircle
> CSS percentage circle built with jQuery selectors

#Demo
Dark circles:
<p align="center">
  <img  src="_img/dark_circles.gif" alt="Dark circles" />
</p>

Custom circles:
<p align="center">
  <img  src="_img/custom_three.gif" alt="Custom circles" />
</p>

Default circles:
<p align="center">
  <img  src="_img/light_circles.gif" alt="Sample circles" />
</p>

#Usage
####1. Load the module to your page
```html
<!DOCTYPE HTML>
<html>
<head>
  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  <script type="text/javascript" src="js/percircle.js"></script>
  <link rel="stylesheet" href="css/percircle.css">
</head>
</html>
```

####2. Define the circle objects
Big blue circle marked with a percent of 50%:
```html
<div id="bluecircle" data-percent="17" class="big">
</div>
```
<p align="center">
  <img  src="_img/big_blue_17.gif" alt="Big blue circle" />
</p>
<hr>

Default orange circle marked with a percent of 37%:
```html
<div id="orangecircle" data-percent="37" class="orange">
</div>
```
<p align="center">
  <img  src="_img/default_orange_37.gif" alt="Default orange circle" />
</p>
<hr>

Small pink circle marked with a percent of 94%:
```html
<div id="pinkcircle" data-percent="94" class="small pink">
</div>
```

<p align="center">
  <img  src="_img/small_pink_94.gif" alt="Small pink circle" />
</p>
<hr>

Big red dark circle, 43% filled, without animation:
```html
<div id="redcircle" data-percent="43" data-animate="false" class="dark red big">
</div>
```

<p align="center">
  <img  src="_img/animation_off.gif" alt="Animation off" />
</p>
<hr>
####3. Let the script get the job done
```html
<script type="text/javascript">
    $(function(){
        $("[id$='circle']").percircle();
    });
</script>
```
<hr>

###Custom circles
```html
<div id="custom" class="yellow big"></div> 
<div id="clock" class="purple big"></div>
```
<p align="center">
  <img  src="_img/custom.gif" alt="Custom" />
</p>

<hr>

#TODO
- [ ] Resolve <a href="https://github.com/toubou91/percircle/pull/17">#17</a>
- [x] Update <code>README.md</code> (sections Demo, Usage, Credits) according to <a href="https://github.com/toubou91/percircle/pull/10" target="_blank">#10</a>.~~
- [x] Close all pending <a href="https://github.com/toubou91/percircle/issues" target="_blank">issues</a> that are now resolved with <a href="https://github.com/toubou91/percircle/pull/10" target="_blank">#10</a>.~~

#Contribute
Feel free to submit a pull request for the <a href="https://github.com/toubou91/percircle/issues" target="_blank">existing</a> issues or even introduce bugs/enhancements by opening a <a href="https://github.com/toubou91/percircle/issues/new" target="_blank">new</a> issue.

#Credits
The original project was created from <a href="http://circle.firchow.net/" target="_blank">Andre Firchow</a> and as I didn't find any similar here, I uploaded it.

However, the project loaded all the css transformations, in the <code>percircle.css</code> file. Now, it makes use of the <a href="https://api.jquery.com/category/selectors/" target="_blank">jQuery selectors</a> in order to do so.
