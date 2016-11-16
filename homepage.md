
GameDevUtils.com is a suite of tools that I developed for my game programming students. There are certainly 
better products out there, but I wanted my students to have access to free tools and, more importantly, 
access to the source code for those tools. I also didn't want the tools to look like poop that was 
designed in the 80's.

<table border="0" cellpadding="0" cellspacing="0" style="width:600px; margin-left: auto; margin-right: auto;">
	<tr>
		<td style="width:300px;">
			<img src="images/homepage/iconSpriteSheets.png" alt="Sprite Sheets"/>
		</td>
		<td style="text-align:center; white-space:nowrap;">
			<p>A tool to merge several art assets (objects <br/>
			   within the game) into a single image, saving <br/>
			   memory and reducing CPU-to-GPU chatter.
			</p>
			<p><a href="#popupFeatureSheets" role="button" data-toggle="modal" class="btn btn-primary">Show Features</a> <a href="{{ site.baseurl }}/webapps/sheets/" class="btn btn-primary">Go!</a></p>
		</td>
	</tr><tr>
		<td style="width:300px;">
			<img src="images/homepage/iconSpriteFonts.png" alt="Sprite Sheets"/>
		</td>
		<td style="text-align:center; white-space:nowrap;">
			<p>A tool to convert public domain TTF &amp; OTF <br/>
			   fonts into bitmap fonts - a format that is <br/>
			   more easily consumed by game engines.
			</p>
			<p><a href="#popupFeatureFonts" role="button" data-toggle="modal" class="btn btn-primary">Show Features</a> <a href="{{ site.baseurl }}/webapps/fonts/" class="btn btn-primary">Go!</a></p>
		</td>
	</tr><tr>
		<td style="width:300px;">
			<img src="images/homepage/iconTileEditor.png" alt="Sprite Sheets"/>
		</td>
		<td style="text-align:center; white-space:nowrap;">
			<p>A tool that manages the placement of a fixed <br/>
			   set of tiled images. By painting these tiles <br/>
			   into place, entire game worlds can be made.
			</p>
			<p><a id="cmdShowFeaturesTileEditor" href="#null" class="btn btn-default disabled">Show Features</a> <a href="{{ site.baseurl }}/webapps/tiles/" class="btn btn-default disabled">Go!</a></p>
		</td>
	</tr><tr>
		<td style="width:300px;">
			<img src="images/homepage/iconAnimation.png" alt="Sprite Animation"/>
		</td>
		<td style="text-align:center; white-space:nowrap;">
			<p>A tool to assemble sprites into frame-based <br/>
			   or bones-based animation sequences. <br/>
			   Future version to include UV deformation.
			</p>
			<p><a id="cmdShowFeaturesTileEditor" href="#null" class="btn btn-default disabled">Show Features</a> <a href="{{ site.baseurl }}/webapps/bones/" class="btn btn-default disabled">Go!</a></p>
		</td>
	</tr><tr>
		<td style="width:300px;">
			<img src="images/homepage/iconEffects.png" alt="Sprite Effects"/>
		</td>
		<td style="text-align:center; white-space:nowrap;">
			<p>A tool to create visual effects as parametrized <br/>
			   animations that can be placed in the game world <br/>
			   and have their playback tweaked at run-time.
			</p>
			<p><a id="cmdShowFeaturesTileEditor" href="#null" class="btn btn-default disabled">Show Features</a> <a href="{{ site.baseurl }}/webapps/effects/" class="btn btn-default disabled">Go!</a></p>
		</td>
	</tr>
</table>

## What Makes GameDevUtils.com So Special?

It's certainly not its features. The commercial offerings provide options and functionality that 
aren't (yet) supported in this suite of tools. The biggest benefits of this suite are that it's 
open source, and that it doesn't require you to install anything. Everything runs in your browser.

<div style="margin-left:30px;">

<h3>Everything Runs in Your Browser</h3>

<p>You read that right. Everything runs in your browser. The technology that drives GameDevUtils.com is 
vanilla HTML5 and JavaScript. That means that you can use the app from any operating system, 
using any modern web browser.</p>

<p>You don't have to be an administrator on your computer. You don't have to worry about updates.</p>

<p>At least, that's the idea. I've been developing on my MacBook Pro, using Google's Chrome web 
browser. I'll be doing more extensive testing in the near future.</p>

<h3>Your Assets, on Your Computer</h3>

<p>There is no server component to GameDevUtils.com. Assets are loaded into your browser from your local
file system. Project files are loaded from and saved to your computer. Published resources are
generated on and saved to your computer.</p>

<p>Your data is never transmitted to the server. I don't need to see it, and I don't need to pay
for dedicated servers that churn through data or bandwidth for that data to travel to and from 
those servers.</p>

<p>In fact, if you really want to be cautious (*cough* *cough* tinfoil hat *cough*), you
can download the static HTML and Javascript and run them on your computer - even without an
internet connection.</p>

<h3>Stop, Collaborate, and Listen! (Share Your Work)</h3>

<p>Project files and published resources are generated as self-contained plaintext or compressed 
(ZIP DEFLATE) files. Just share the file via email, DropBox, or however you normally 
share files with teammates.</p>

<p>Resources are embedded in the project file, not linked. GameDevUtils.com embeds the source image 
data and configured options. Once assets have been added to the project, they're never 
referenced from your filesystem again. Share away.</p>

<h3>FUTURE: Prefer a Command Line Interface?</h3>

<p>One of the selling points of the commercial offerings is that they provide a command line interface for their tools. Today, GameDevUtils.com is a browser-based suite of tools.</p>

<p>I have plans to refactor the logic that drives the web apps into [NodeJS](https://nodejs.org/) modules, and share that code between the web and console versions of the tools.</p>

<p>Why all the effort? I want to support build pipelines. Just plug some scripts into your favorite continuous integration solution and build your assets alongside your code!</p>

<h3>FUTURE: Want to Work in the Cloud?</h3>

<p>The beauty of GameDevUtils.com is that there are no dependencies on the client. It's OS and, to a great extent, browser independent. Also nice is that your data need never leave your computer. That is, until you want to work with a team. If you think emailing ZIP files is clunky (I certainly do), then there's a new option coming your way soon!</p>

<p>You're probably already using one of the many popular cloud storage providers. If so, you can tell GameDevUtils.com to reference assets as file links rather than embedding those resources in the project files. That makes the project files smaller, and it makes it easier to edit an asset without having to remove it from the project and add it back.</p>

<ul>
  <li>Google Drive</li>
  <li>Dropbox</li>
  <li>OneDrive</li>
  <li>iCloud</li>
  <li>GitHub</li>
  <li>Bitbucket</li>
</ul>

<p>I know what you're thinking ... *Hey! GitHub and Bitbucket aren't cloud storage providers!*</p>

<p>You're absolutely right. But, after the cloud storage support is in place, I hope to provide GitHub and BitBucket integration for the ultimate in team collaboration.</p>

</div>

## Want to Help?

Kick the tires. Try things out. If you find something wonky, or just want to suggest a new feature, [open an issue](https://github.com/groundh0g/gamedevutils.com/issues).

If you're looking to contribute, I ask that you keep edits small and as self-contained as possible. The planned support for a command line interface will involve a lot of churn in the code.

Simple bug fixes are another story, though. Issue your pull request against the [gh-pages branch](https://github.com/groundh0g/gamedevutils.com/tree/gh-pages) for now. Once the code has been modularized for web and console, it should live in the master branch.

------
Thanks for Visiting!<br>
&mdash; [@groundh0g](https://twitter.com/groundh0g)



<div id="popupFeatureSheets" class="modal fade">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<h4 class="modal-title">Sprite Sheet Features</h4>
	  </div>
	  <div class="modal-body">
		<h3>Current Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fa fa-check"></i> Import web-friendly image formats<br/>
			<i class="fa fa-check"></i> <em>Extract animated GIF frames!</em><br/>
			<i class="fa fa-check"></i> Export images as PNG, GIF, or JPG<br/>
			<i class="fa fa-check"></i> Export data as XML or JSON<br/>
			<i class="fa fa-check"></i> Export data as CSS<br/>
			<i class="fa fa-check"></i> Trim &amp; crop unused pixels<br/>
			<i class="fa fa-check"></i> Heuristic mapping (chroma key)<br/>
			<i class="fa fa-check"></i> Basic rects (shelf) texture packing<br/>
			<i class="fa fa-check"></i> MaxRects texture packing<br/>
			<i class="fa fa-check"></i> Alpha (transparent) cleaning (aids compression)<br/>
			<i class="fa fa-check"></i> Debug mode (show sprite outlines)
		</p></div>
		<h3>Planned Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fa fa-wrench"></i> Import non-web image formats<br/>
			<i class="fa fa-wrench"></i> Export optimized images<br/>
			<i class="fa fa-wrench"></i> Allow sprite rotate within sheet<br/>
			<i class="fa fa-wrench"></i> Alias duplicate sprites<br/>
			<i class="fa fa-wrench"></i> DropBox (et. al.) support
		</p></div>
	  </div>
	  <div class="modal-footer">
		<button type="button" class="btn btn-primary" data-dismiss="modal">Dismiss</button>
	  </div>
	</div>
  </div>
</div>

<div id="popupFeatureFonts" class="modal fade">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<h4 class="modal-title">Sprite Fonts Features</h4>
	  </div>
	  <div class="modal-body">
		<h3>Current Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fa fa-check"></i> Select from a library of 2000+ fonts<br/>
			<i class="fa fa-check"></i> Export images as PNG, GIF, or JPG<br/>
			<i class="fa fa-check"></i> Export data as XML or JSON<br/>
			<i class="fa fa-check"></i> Trim &amp; crop unused pixels (smaller files)<br/>
			<i class="fa fa-check"></i> Kerning (deduced)<br/>
			<i class="fa fa-check"></i> Metrics (deduced)<br/>
			<i class="fa fa-check"></i> Specify included characters<br/>
			<i class="fa fa-check"></i> Filter included characters from sample text<br/>
			<i class="fa fa-check"></i> Debug mode (show font metrics as outlines)
		</p></div>
		<h3>Planned Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fa fa-wrench"></i> Import your own TTF/OTF fonts<br/>
			<i class="fa fa-wrench"></i> Kerning (inspect font data)<br/>
			<i class="fa fa-wrench"></i> Metrics (inspect font data)<br/>
			<i class="fa fa-wrench"></i> Embedded bounds data in image (no separate atlas)<br/>
			<i class="fa fa-wrench"></i> Export optimized images<br/>
			<i class="fa fa-wrench"></i> Alias duplicate glyphs<br/>
			<i class="fa fa-wrench"></i> DropBox support
		</p></div>
	  </div>
	  <div class="modal-footer">
		<button type="button" class="btn btn-primary" data-dismiss="modal">Dismiss</button>
	  </div>
	</div>
  </div>
</div>

