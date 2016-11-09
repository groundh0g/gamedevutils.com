
## What is GameDevUtils.com?

GameDevUtils.com is a suite of tools that I developed for my game programming students. There are certainly 
better products out there, but I wanted my students to have access to free tools and, more importantly, 
access to the source code for those tools. I also didn't want the tools to look like poop that was 
designed in the 80's.

<table border="0" cellpadding="0" cellspacing="0" style="width:600px; margin-left:30px;">
	<tr>
		<td style="width:300px;">
			<img src="images/homepage/iconSpriteSheets.png" alt="Sprite Sheets"/>
		</td>
		<td style="text-align:center; white-space:nowrap;">
			<p>A tool to merge several art assets (objects <br/>
			   within the game) into a single image, saving <br/>
			   memory and reducing CPU-to-GPU chatter.
			</p>
			<p><a href="#popupFeatureSheets" role="button" data-toggle="modal" class="btn btn-primary">Show Features</a></p>
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
			<p><a href="#popupFeatureFonts" role="button" data-toggle="modal" class="btn btn-primary">Show Features</a></p>
			<!-- <p><a id="cmdShowFeaturesFonts" href="#null" class="btn btn-default disabled">Show Features</a></p> -->
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
			<p><a id="cmdShowFeaturesTileEditor" href="#null" class="btn btn-default disabled">Show Features</a></p>
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

</div>

## Want to Work in the Cloud?

The beauty of GameDevUtils.com is that there are no dependencies on the client. It's OS and, to a great extent, 
browser independent. Also nice is that your data need never leave your computer. That is, until you want 
to work with a team. If you think emailing ZIP files is clunky (I certainly do), then there's a new option 
coming your way soon!

You're probably already using one of the many popular cloud storage providers. If so, you can tell GameDevUtils.com 
to reference assets as file links rather than embedding those resources in the project files. That makes the 
project files smaller, and it makes it easier to edit an asset without having to remove it from the project 
and add it back.

<p><div class="btn-toolbar" style="margin-left:20px;">
    <div class="btn-group">
        <button class="btn btn-default disabled" role="button" id="cmdConnectGoogleDrive"><i class="fa fa-google"></i> Google Drive</button>
        <button class="btn btn-default disabled" role="button" id="cmdConnectDropBox"><i class="fa fa-dropbox"></i> DropBox</button>
        <button class="btn btn-default disabled" role="button" id="cmdConnectOneDrive"><i class="fa fa-windows"></i> OneDrive</button>
        <button class="btn btn-default disabled" role="button" id="cmdConnectICloud"><i class="fa fa-apple"></i> iCloud</button>
    </div>
    <div class="btn-group">
        <button class="btn btn-default disabled" role="button" id="cmdConnectGitHub"><i class="fa fa-github"></i> GitHub</button>
        <button class="btn btn-default disabled" role="button" id="cmdConnectGitHub"><i class="fa fa-bitbucket"></i> BitBucket</button>
    </div>
</div></p>

I know what you're thinking ... *Hey! GitHub and BitBucket aren't cloud storage providers!*

You're absolutely right. But, after the cloud storage support is in place, I hope to provide GitHub &amp; 
BitBucket integration for the ultimate in team collaboration.

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

