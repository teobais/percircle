# percircle
> CSS Percentage Circle<br/><br/><hr/>
<i>I'm currently kinda busy with my thesis, so, the <code>TODO</code> section will remain here on top, till end of the month. This means that I will come back on active development on November, but obviously, this is not restrictive for anyone who would like contributing in any way.</i><hr/>
#TODO
>* Update <code>README.md</code> (sections Demo, Usage, Credits) according to <a href="https://github.com/toubou91/percircle/pull/10" target="_blank">#10</a>.
* Close all pending <a href="https://github.com/toubou91/percircle/issues" target="_blank">issues</a> that are now resolved with <a href="https://github.com/toubou91/percircle/pull/10" target="_blank">#10</a>.

#Demo
Default circles:
<p align="center">
  <img  src="_img/sample_light.gif" alt="Sample circles" />
</p>

Dark circles:
<p align="center">
  <img  src="_img/sample_dark.gif" alt="Dark circles" />
</p>

#Usage
####Load the module to your page
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

#### Define the circle objects
Big blue circle marked with a percent of 50%:
```html
<div data-percircle="50" class="c100 big">
    <span>50%</span>
    <div class="slice">
        <div class="bar"></div>
        <div class="fill"></div>
    </div>
</div>
```
<p align="center">
  <img  src="_img/big_blue_50.gif" alt="Big blue circle" />
</p>
<hr>

Default orange circle marked with a percent of 65%:
```html
<div data-percircle="65" class="c100 orange">
    <span>65%</span>
    <div class="slice">
        <div class="bar"></div>
        <div class="fill"></div>
    </div>
</div>
```
<p align="center">
  <img  src="_img/default_orange_65.gif" alt="Default orange circle" />
</p>
<hr>

Small pink circle marked with a percent of 82%:
```html
<div data-percircle="82" class="c100 small pink">
    <span>82%</span>
    <div class="slice">
        <div class="bar"></div>
        <div class="fill"></div>
    </div>
</div>
```

<p align="center">
  <img  src="_img/small_pink_82.gif" alt="Small pink circle" />
</p>

#Contribute
Feel free to submit a pull request for the <a href="https://github.com/toubou91/percircle/issues" target="_blank">existing</a> issues or even introduce bugs/enhancements by opening a <a href="https://github.com/toubou91/percircle/issues/new" target="_blank">new</a> issue.

#Credits
The original project was created from <a href="http://circle.firchow.net/" target="_blank">Andre Firchow</a> and as I didn't find any similar here, I uploaded it.

However, the project loaded all the css transformations, in the <code>percircle.css</code> file. Now, it makes use of the <a href="https://api.jquery.com/category/selectors/" target="_blank">jQuery selectors</a> in order to do so.
