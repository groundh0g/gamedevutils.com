/*
Copyright (c) 2016 Joseph B. Hall [@groundh0g]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var suppressOnValueChanged = false;
var OnValueChanged = function(preserveLog) {
	if(isOpeningProject === true) { return; }
	if(isPacking === true) { return; }
	
	if(preserveLog !== true) {
		ClearConsoleMessages();
	} 
	
	if(suppressOnValueChanged === false) { 
		BuildSpriteList();
		UpdateConsole();
	}
	
	return false;
};

var persistedOptions = {};
var persistedImagePool = {};

var IsDirty = function() {
	var current = new Options();
	current.read();
	return !(current.equals(persistedOptions) && ImageItem.compareImagePools(imagePool, persistedImagePool));
};

var PromptUserIfDirty = function() {
	return IsDirty() ? "You have unsaved changes." : null;
};

var DoFileNew = function () {
	window.location.reload(true);
	return false;
};

var DoFileOpen = function () {
	var prompt = PromptUserIfDirty();
	if(prompt != null) {
		if(!confirm(prompt)) {
			return false;
		}
	}
	$("#popupFileModalTitle").text("Open Project");
	$("#popupFileModalDropLabel").text("Drag and drop project file here, or ...");
	$("#popupFileModalDropInfo").text("No project selected.");
	$("#cmdUploadProject").show();
	$("#cmdUploadSprites").hide();
	$("#popupFileModal").modal("show");
	return false; 
};

var DoFileSave = function () { 
	var options = new Options();
	options.read();
	
	// make a frameless copy of the imagePool (saves LOTS of space)
	var imgData = ImageItem.copyImagePool(imagePool, true);
	$(Object.keys(imgData)).each(function(index, item) {
		imgData[item].frames = [];
		imgData[item].frameCount = 0;
		imgData[item].populateFrameDataComplete = false;
	});
	
	var data = {
		application: FannyPack_SpriteSheet_AppName,
		version: FannyPack_SpriteSheet_Version,
		url: FannyPack_SpriteSheet_URL,
		options: options,
		images: imgData
	};

	if(options.doCompressProject()) {
		var zip = new JSZip();
		zip.file("project.json", JSON.stringify(data, null, 2));
		saveAs(
			zip.generate({type:"blob", compression:"DEFLATE"}), 
			options.name + ".fpsheetz"
		);
	} else {
		saveAs(
			new Blob([JSON.stringify(data, null, 2)], {type: "application/json"}), 
			options.name + ".fpsheet"
		);
	}
	
	persistedOptions = new Options();
	persistedOptions.read();
	persistedImagePool = ImageItem.copyImagePool(imagePool);
};

var isPublishing = false;
var CurrentDataExporter = null;
var CurrentImageExporter = null;

var DoPublish = function () { 
	if(isPublishing === true) { return; }
	
	isPublishing = true;
	ClearConsoleMessages();
	EnableToolbarButtons(false);
	EnableLeftNavButtons(false);
	EnableWorkspaceButtons(false);

	var options = new Options();
	options.read();
	CurrentImageExporter = imageExporters[options["imageFormat"]];
	CurrentDataExporter = dataExporters[options["dataFormat"]];
	CurrentDataExporter.export(imagePool, options, OnPublishComplete);
};

var OnPublishComplete = function(result) {
	var dataExporter = CurrentDataExporter;
    var i;

	var msgs = dataExporter.msgErrors;
	for(i = 0; i < msgs.length; i++) {
		LogConsoleMessage(ConsoleMessageTypes.ERROR, msgs[i]);
	}

	msgs = dataExporter.msgWarnings;
	for(i = 0; i < msgs.length; i++) {
		LogConsoleMessage(ConsoleMessageTypes.WARNING, msgs[i]);
	}

	msgs = dataExporter.msgInfos;
	for(i = 0; i < msgs.length; i++) {
		LogConsoleMessage(ConsoleMessageTypes.INFO, msgs[i]);
	}

	if(result && result.success === true) {
		LogConsoleMessage(ConsoleMessageTypes.SUCCESS, "Publish completed without errors.");
		$("#txtStatusMessage").text("Ready.");
	} else {
		$("#txtStatusMessage").text("Completed with errors.");
	}

	EnableToolbarButtons(true);
	EnableLeftNavButtons(true);
	EnableWorkspaceButtons(true);
	isPublishing = false;
};

var DoSpriteAdd = function () {
	$("#popupFileModalTitle").text("Add Sprite(s)");
	$("#popupFileModalDropLabel").text("Drag and drop image files here, or ...");
	$("#popupFileModalDropInfo").text("No file(s) selected.");
	$("#cmdUploadProject").hide();
	$("#cmdUploadSprites").show();
	$("#popupFileModal").modal("show");
	return false; 
};

var DoSpriteRemove = function () { 
	ClearConsoleMessages();
	var countDeleted = 0;
	$(".spriteListItemSelected").each(function(e) {
		delete imagePool[ImagePoolKeyFromSpritesListItemId($(this).attr("id"))];
		countDeleted++;
	});
	if(countDeleted > 0) {
		LogConsoleMessage(ConsoleMessageTypes.SUCCESS, "" + countDeleted + " sprite(s) removed.");
	} else {
		LogConsoleMessage(ConsoleMessageTypes.WARNING, "No sprites are selected. Nothing to remove.");
	}
	OnValueChanged(); 
	return false; 
};

var isHelpVisible = true;
// var DoToggleHelp = function () {
// 	if(isHelpVisible) {
// 		$("td.tipcol").hide();
// 		$("table.leftSidebar").css("width","274px");
// 		$("td.leftSidebar").css("width","284px");
// 		isHelpVisible = false;
// 	} else {
// 		$("td.leftSidebar").css("width","305px");
// 		$("table.leftSidebar").css("width","295px");
// 		$("td.tipcol").show();
// 		isHelpVisible = true;
// 	}
// 	return false;
// }

var isSettingsVisible = true;
var DoToggleSettings = function () {
	if(isSettingsVisible) {
		$("#divSidebarLeft").hide();
		$("#divWorkspace").css("left","0");
		$("#divWorkspaceToolbar").css("left","0");
		$("#cmdToggleSettings").removeClass("active");
		isSettingsVisible = false;
	} else {
		$("#divSidebarLeft").show();
		$("#divWorkspace").css("left","301px");
		$("#divWorkspaceToolbar").css("left","301px");
		$("#cmdToggleSettings").addClass("active");
		isSettingsVisible = true;
	}
	return false;
};

var UpdateDropDownValue = function(ddlName, $obj) {
	$("#" + ddlName).text($obj.text().replace(" *",""));
	OnValueChanged();
	return true;
};

var UpdateDropDownValueInput = function(ddlName, $obj) {
	$("#" + ddlName).val($obj.text().replace(" *",""));
	OnValueChanged();
	return true;
};

var UpdateSpinBox = function (txtName, event, key) {
	var delta = 0;
	if(event && event.which) {
		var which = event.which;
		if(key && which === key) { which = 13; }
		if(key && which !== key) { which = 0; }
		if(which === 38) { delta = 1; }
		if(which === 40) { delta = -1; }
		if(which === 13) { 
			OnValueChanged();
			$("#" + txtName).blur();
			return true;
		}
	}
	if(delta !== 0) {
		var valTxt = $("#" + txtName).val()
		var valInt = parseInt(valTxt, 10);
		if(valTxt !== "" && !isNaN(valInt) && isFinite(valInt)) {
			$("#" + txtName).val(valInt + delta);
			OnValueChanged();
			return true;
		}
	}
	return false;
};

var NormalizePercentText = function(value) {
	return parseFloat(parseInt(value * 100, 10) / 100.0) || 100.0;
};

var DoWorkspaceFitWidth  = function() { 
    var result = 100.0;
	var packer = CurrentPacker;
	if(packer && !isPacking) {
		var targetWidth = $("#divWorkspace").width() - parseInt($("#divWorkspace").css("padding")) * 2;
		result = NormalizePercentText(100.0 * targetWidth / packer.width);
	}
	return DoWorkspaceZoom(result + "%");
};

var DoWorkspaceFitHeight = function() { 
    var result = 100.0;
	var packer = CurrentPacker;
	if(packer && !isPacking) {
		var targetHeight = $("#divWorkspace").height() - parseInt($("#divWorkspace").css("padding")) * 2;
		result = NormalizePercentText(100.0 * targetHeight / packer.height);
	}
	return DoWorkspaceZoom(result + "%");
};

var DoWorkspaceFitBoth   = function() { 
    var result = 100.0;
	var packer = CurrentPacker;
	if(packer && !isPacking) {
		var packerWidth  = packer.width  || 0;
		var packerHeight = packer.height || 0;
		if(packerWidth * packerHeight > 0) {
			var targetWidth = $("#divWorkspace").width() - parseInt($("#divWorkspace").css("padding")) * 2;
			var targetHeight = $("#divWorkspace").height() - parseInt($("#divWorkspace").css("padding")) * 2;
			result = NormalizePercentText(100.0 * targetWidth / packerWidth);
			if(packer.height * result / 100.0 > targetHeight) {
				result = NormalizePercentText(100.0 * targetHeight / packerHeight);
			}
		}
	}
	return DoWorkspaceZoom(result + "%");
};

var DoWorkspaceZoomIn = function() {
	var text = (new String(parseFloat($("#txtWorkspaceZoom").val()) || "100.0")).trim();
	return DoWorkspaceZoom((parseFloat(text) * 2.0) + "%");
};

var DoWorkspaceZoomOut = function() {
	var text = (new String(parseFloat($("#txtWorkspaceZoom").val()) || "100.0")).trim();
	return DoWorkspaceZoom((parseFloat(text) / 2.0) + "%");
};

var DoWorkspaceZoom = function(text, event) {
	if(event && event.which && event.which !== 13) { return false; }
	var packer = CurrentPacker;
	if(packer && !isPacking) {
		var width  = packer.width;
		var height = packer.height;
		text = (new String(text || "100.0%")).replace(" *","").trim();
		$("#txtWorkspaceZoom").val(text);
		text = text.replace("%", "");
		var percent = parseFloat(text) / 100.0;
		var w = parseFloat(width) * percent;
		var h = parseFloat(height) * percent;
		$("#divWorkspaceContainerCrop").css("width",w+"px").css("height", h+"px");
		$("#imgWorkspace").css("width",w+"px").css("height", h+"px");
		$("#imgWorkspace").show();
	} else if(packer) {
		LogConsoleMessage(ConsoleMessageTypes.WARNING, "It appears that the packer is currently running. Wait for it to complete, then click 'Refresh' and try again.");
	} else {
		LogConsoleMessage(ConsoleMessageTypes.WARNING, "No sprite data found. If you've loaded a project, or added sprites, click 'Refresh' and try again.");
		$("#divWorkspaceContainerCrop").css("width","32px").css("height", "32px");
		$("#imgWorkspace").css("width","32px").css("height", "32px");
		$("#imgWorkspace").hide();
	}

	return true;
};

var isOpeningProject = false;
var ProcessProjectOpen = function(files) {
	if(files && files.length) {
		ClearConsoleMessages();
		var file = files[0];
		var reader = new FileReader();
		reader.filename = file.name;
		reader.filetype = file.type;

		if(file.name.toLowerCase().endsWith(".fpsheet")) {
			reader.isCompressed = false;
		} else if(file.name.toLowerCase().endsWith(".fpsheetz")) {
			reader.isCompressed = true;
		} else {
			reader.isCompressed = false;
			LogConsoleMessage(ConsoleMessageTypes.WARNING, "File '" + file.name + "' has an invalid extension. Expected '*.fpsheet' or '*.fpsheetz'. Attempting to load as uncompressed project.");
		}

		reader.onload = function(e) { 
			try {
				var project = {};
				if(this.isCompressed) {
					var zip = new JSZip(e.target.result);
					project = $.parseJSON(zip.file("project.json").asText());
				} else {
					project = $.parseJSON(e.target.result);
				}
				var options = new Options();
				options.read(project.options);
				options.updateUI();
				persistedOptions.read(options);
				imagePool = {};

				// reset zoom
				$("#txtWorkspaceZoom").val("100.0%");
				
				// read image data into a temp pool, populate real pool as if new load
				var tempImagePool = ImageItem.copyImagePool(project.images, true);
				$(Object.keys(tempImagePool)).each(function(index, item) {
					tempImagePool[item].populateFrameData(AddSpriteToImagePool);
					filesToProcess[item] = true;
				});

				// isOpeningProject = false; // <- moved to AddSpriteToImagePool
				isProcessingFiles = false;

				LogConsoleMessage(ConsoleMessageTypes.SUCCESS, "Project '" + this.filename + "' loaded.");
			} catch (ex) {
				LogConsoleMessage(ConsoleMessageTypes.ERROR, "Unable to open '" + this.filename + "' project. [" + ex + "]");
			}
			//OnValueChanged();
			return false;
		};

		isOpeningProject = true;
		isProcessingFiles = true;
		filesProcessedCount = 0;
		framesProcessedCount = 0;
		filesErroredCount = 0;		
		
		if(reader.isCompressed) {
			reader.readAsBinaryString(file);
		} else {
			reader.readAsText(file);
		}
	}

	$("#uploadProject").val("");
	$("#popupFileModal").modal("hide");

	return false;
};

var imagePool = {};
var isProcessingFiles = false;
var filesToProcess = {};
var filesProcessedCount = 0;
var framesProcessedCount = 0;
var filesErroredCount = 0;

var ProcessSpriteAdd = function(files) {
	ClearConsoleMessages();
	
	filesToProcess = {};
	isProcessingFiles = true;
	filesProcessedCount = 0;
	framesProcessedCount = 0;
	filesErroredCount = 0;
	
	for(var i = 0; i < files.length; i++) {
		var file = files[i];
		var imageRegEx = /image.*/;
	
		if(!file.type.match(imageRegEx)) { 
			LogConsoleMessage(ConsoleMessageTypes.ERROR, "Image '" + file.name + "' failed to load.");
			filesErroredCount++;
			continue; 
		}

		filesToProcess[file.name] = true;

		var reader = new FileReader();
		reader.filename = file.name;
		reader.filetype = file.type;
		reader.onload = function(e) { 
			try {
				var $img = $("<img />");
				$img.addClass("foo");
				$img.attr("src", e.target.result);
				$("#divWorkspaceContainerCrop").append($img);
				var img = new ImageItem(
					null, // not a copy of existing image
					this.filename,
					this.filetype,
					$img.css("width"),
					$img.css("height"),
					e.target.result,
					UUID.generate()
				);
				img.populateFrameData(AddSpriteToImagePool);
				//AddSpriteToImagePool(img);
				$img.remove();
			} catch(ex) { 
				LogConsoleMessage(ConsoleMessageTypes.ERROR, "Image '" + self.filename + "' failed to load.");
				LogConsoleMessage(ConsoleMessageTypes.ERROR, "Exception: '" + ex + "'");
				filesErroredCount++;
			}
		};
		reader.readAsDataURL(file);
	}
	
	isProcessingFiles = false;

	$("#uploadSprites").val("");
	$("#popupFileModal").modal("hide");

	return false;
};

var AddSpriteToImagePool = function(img, keepGuid) {
	if(imagePool[img.filename]) {
		LogConsoleMessage(ConsoleMessageTypes.WARNING, "Image '" + img.filename + "' already exists. Replacing.");
	}
	if(!keepGuid && !isOpeningProject) {
		img.guid = UUID.generate();
	}
	imagePool[img.filename] = img;
	if(filesToProcess[img.filename]) { 
		delete filesToProcess[img.filename];
		filesProcessedCount++;
		framesProcessedCount += img.frameCount;
		if(!isProcessingFiles && Object.keys(filesToProcess).length === 0) { 
			var opts = new Options();
			opts.read();
			var msg = "" + filesProcessedCount + " image(s) processed.";
			LogConsoleMessage(ConsoleMessageTypes.SUCCESS, msg);
			if(isOpeningProject) {
				persistedImagePool = ImageItem.copyImagePool(imagePool);
				isOpeningProject = false;
			}
			OnValueChanged(true);
		} 
	}
};

var ImagePoolKeyFromSpritesListItemId = function(id) {
	id = id.replace("img-","");
	var result = null;
	var keys = Object.keys(imagePool);
	$.each(keys,function(ndx,key) {
		if(imagePool[key].guid === id) {
			result = imagePool[key].filename;
			return false;
		}
	});
	return result;
};

var BuildSpriteList = function() {
	var keys = Object.keys(imagePool).sort(function(a,b){ return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; });
	$("#lblSpriteCount").text(keys.length);
	$("#divSpritesList").empty();
	if(keys.length === 0) {
		$("#divSpritesList").text("[No sprites selected.]");
	} else {
		$.each(keys, function(idx, itm) { 
			var $div = $("<div/>");
			$div.addClass("divSpritesListItem");
			$div.attr("id","img-" + imagePool[itm].guid);
			var $img = $("<img/>");
			$img.attr("src",imagePool[itm].src);
			var $span = $("<span/>");
			$span.text(imagePool[itm].filename);
			$div.append($img);
			$div.append($span);
			$("#divSpritesList").append($div);
		});
	}
	
	$(".divSpritesListItem").mouseenter(function(e) {
		$(".divSpritesListItem").siblings().removeClass("spriteListItemHighlight");
		$(this).addClass("spriteListItemHighlight");
	});
	
	$(".divSpritesListItem").mouseleave(function(e) {
		$(".divSpritesListItem").siblings().removeClass("spriteListItemHighlight");
	});
	
	$(".divSpritesListItem").click(function(e) {
		if($(this).hasClass("spriteListItemSelected")) {
			$(this).removeClass("spriteListItemSelected");
		} else {
			$(this).addClass("spriteListItemSelected");
		}
	});
	
	PackSprites();
};

var ConsoleMessageTypes = {
	"SUCCESS": "SUCCESS",
	"WARNING": "WARNING",
	"ERROR"  : "ERROR",
	"INFO"   : "INFO"
};

var consoleMessages = {
	"SUCCESS": [],
	"WARNING": [],
	"ERROR"  : [],
	"INFO"   : []
};

var ClearConsoleMessages = function() {
	consoleMessages = {
		"SUCCESS": [],
		"WARNING": [],
		"ERROR"  : [],
		"INFO"   : []
	};
};

var LogConsoleMessage = function(type, msg) {
	if(consoleMessages[type]) {
		consoleMessages[type].push(msg);
	}
	UpdateConsole();
};

var UpdateConsole = function() {
	$("#lblLogCountNothing").hide();
	$("#lblLogCountSUCCESS").hide();
	$("#lblLogCountWARNING").hide();
	$("#lblLogCountERROR").hide();
	$("#lblLogCountINFO").hide();
	$("#divConsole").empty();

	var countSuccess = consoleMessages[ConsoleMessageTypes.SUCCESS].length;
	var countWarning = consoleMessages[ConsoleMessageTypes.WARNING].length;
	var countError   = consoleMessages[ConsoleMessageTypes.ERROR].length;
	var countInfo    = consoleMessages[ConsoleMessageTypes.INFO].length;
	var countMessages = countSuccess + countWarning + countError + countInfo;
	
	var keys = [
		ConsoleMessageTypes.ERROR,
		ConsoleMessageTypes.WARNING,
		ConsoleMessageTypes.INFO,
		ConsoleMessageTypes.SUCCESS
	];

	// Bootstrap 3 mappings ...
	var styles = {};
	styles[ConsoleMessageTypes.ERROR]   = "danger";
	styles[ConsoleMessageTypes.WARNING] = "warning";
	styles[ConsoleMessageTypes.INFO]    = "info";
	styles[ConsoleMessageTypes.SUCCESS] = "success";

	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var msgs = consoleMessages[key];
		if(msgs.length > 0) {
			for(var j = 0; j < msgs.length; j++) {
				var $alert = $("<div/>").addClass("alert alert-" + styles[key]).css("margin-bottom","2px");
				$alert.html("<h4>" + key + ":</h4> " + msgs[j]);
				$("#divConsole").append($alert);
			}
		}
	}
	
	if(countError > 0) {
		$("#lblLogCountERROR").text(countError);
		$("#lblLogCountERROR").show();
		$("#tabConsole").click();
	} else if(countWarning > 0) {
		$("#lblLogCountWARNING").text(countWarning);
		$("#lblLogCountWARNING").show();
	} else if(countInfo > 0) {
		$("#lblLogCountINFO").text(countInfo);
		$("#lblLogCountINFO").show();
	} else if(countSuccess > 0) {
		// seems silly to report success as badge, but ...
		$("#lblLogCountSUCCESS").text(countSuccess);
		$("#lblLogCountSUCCESS").show();
	} else { // if(countMessages === 0) {
		$("#lblLogCountNothing").show();
		$("#divConsole").text("[No messages.]");
	}
};

var EnableToolbarButtons = function(enable) {
	var controls = [
		"cmdFileNew",
		"cmdFileOpen",
		"cmdFileSave",
		"cmdSpriteAdd",
		"cmdSpriteRemove",
		"cmdRefresh",
		"cmdPublish",
		"cmdToggleSettings"
	];
	
	if(enable) {
		$(controls).each(function(index, item) {
			$("#" + item).removeClass("disabled");
		});
	} else {
		$(controls).each(function(index, item) {
			$("#" + item).addClass("disabled");
		});
	}
};

var EnableLeftNavButtons = function(enable) {
	if(enable) {
		$("#divSidebarLeft input").removeAttr("disabled");
		$("#divSidebarLeft a.dropdown-toggle").removeClass("disabled");
	} else {
		$("#divSidebarLeft input").attr("disabled", "disabled");
		$("#divSidebarLeft a.dropdown-toggle").addClass("disabled");
	}
};

var EnableWorkspaceButtons = function(enable) {
	var controls = [
		"cmdWorkspaceZoomOut",
		"cmdWorkspaceZoomIn",
		"cmdWorkspaceZoomOut",
		"cmdWorkspaceFitWidth",
		"cmdWorkspaceFitHeight",
		"cmdWorkspaceFitBoth",
	];
	
	if(enable) {
		$("#divWorkspaceToolbar input").removeAttr("disabled");
		$("#divWorkspaceToolbar a.dropdown-toggle").removeClass("disabled");
		$(controls).each(function(index, item) {
			$("#" + item).removeClass("disabled");
		});
	} else {
		$("#divWorkspaceToolbar input").attr("disabled", "disabled");
		$("#divWorkspaceToolbar a.dropdown-toggle").addClass("disabled");
		$(controls).each(function(index, item) {
			$("#" + item).addClass("disabled");
		});
	}
};

var CurrentPacker = null;
var isPacking = false;
var isPackingStartTime = null;
var PackSprites = function(clearConsole) {
	if(isPacking === true) { return; }

	isPacking = true;
	isPackingStartTime = new Date();
	if(clearConsole === true) { ClearConsoleMessages(); }
	EnableToolbarButtons(false);
	EnableLeftNavButtons(false);
	EnableWorkspaceButtons(false);
	$("#divWorkspaceContainerCrop").empty();
	$("#divWorkspaceContainerCrop").css("width","32px").css("height", "32px");
	$("#divWorkspaceContainer").css("width","32px").css("height", "32px");
	var options = new Options();
	options.read();
	CurrentPacker = packers[options["spritePacker"]];
	CurrentPacker.pack(imagePool, options, OnPackComplete, OnPackStatusUpdate);
};

var OnPackComplete = function(result) {
	var packer = CurrentPacker;
	
	var msgs = packer.msgErrors;
	for(var i = 0; i < msgs.length; i++) {
		LogConsoleMessage(ConsoleMessageTypes.ERROR, msgs[i]);
	}

	msgs = packer.msgWarnings;
	for(var i = 0; i < msgs.length; i++) {
		LogConsoleMessage(ConsoleMessageTypes.WARNING, msgs[i]);
	}

	msgs = packer.msgInfos;
	for(var i = 0; i < msgs.length; i++) {
		LogConsoleMessage(ConsoleMessageTypes.INFO, msgs[i]);
	}

	$("#divWorkspaceContainerCrop").empty();
	if(result && result.success === true) {
		$("#divWorkspaceContainerCrop")
			.css("width",  packer.width  + "px")
			.css("height", packer.height + "px");
			
		// -------------------------------------------------
		// this is where the magic happens. =) -- @groundhog
		// -------------------------------------------------
		var buffer = document.createElement('canvas');
		buffer.width = packer.width;
		buffer.height = packer.height;
		var ctx = buffer.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  		$(Object.keys(imagePool)).each(function(ndx1,key) {
			$(imagePool[key].frames).each(function(ndx2,frame) {
				if(frame.rectSprite) {
					ctx.putImageData(
						frame,
						frame.rectSprite.x + (frame.rectSprite.dx || 0),
						frame.rectSprite.y + (frame.rectSprite.dy || 0)
					);
				}
			});
		});
		
		//this.doAliasSprites = function() { return this.aliasSprites === "Yes"; };
		//this.doTrim = function() { return this.trimMode === "Trim" && this.trimThreshold > 0; };

		var wasProcessed = false;
		var doColorMask = packer && packer.DoPack_AllOptions && packer.DoPack_AllOptions.doColorMask && packer.DoPack_AllOptions.doColorMask();
		var doDebug = packer && packer.DoPack_AllOptions && packer.DoPack_AllOptions.doDebug && packer.DoPack_AllOptions.doDebug();
		var doCleanAlpha = packer && packer.DoPack_AllOptions && packer.DoPack_AllOptions.doCleanAlpha && packer.DoPack_AllOptions.doCleanAlpha();
		if(packer.width > 0 && packer.height > 0 && (doColorMask || doDebug || doCleanAlpha)) {
			var imgData = ctx.getImageData(0, 0, packer.width, packer.height);
			var data = imgData.data;
			$(Object.keys(imagePool)).each(function(ndx1,key) {
				$(imagePool[key].frames).each(function(ndx2,frame) {
					if(frame.rectSprite) {
						var left   = frame.rectSprite.x + (frame.rectSprite.dx || 0);
						var top    = frame.rectSprite.y + (frame.rectSprite.dy || 0);
						var width  = frame.rectSprite.w;
						var height = frame.rectSprite.h;
						var indexRed   = 0;
						var indexGreen = 1;
						var indexBlue  = 2;
						var indexAlpha = 3;
						
						var indexRect = top * packer.width * 4 + left * 4;
						
						// apply post-processing filter, ColorMask
						if(doColorMask && data[indexRect + indexAlpha] > 0) {
							wasProcessed = true;
							var r = data[indexRect + indexRed];
							var g = data[indexRect + indexGreen];
							var b = data[indexRect + indexBlue];
							var a = data[indexRect + indexAlpha];
							for(var y = 0; y < height; y++) {
								for(var x = 0; x < width; x++) {
									var index = indexRect + y * packer.width * 4 + x * 4;
									var match =
										r == data[index + indexRed]   &&
										g == data[index + indexGreen] &&
										b == data[index + indexBlue]  &&
										a == data[index + indexAlpha];
									if(match) {
										data[index + indexRed] = 
										data[index + indexGreen] =
										data[index + indexBlue] = 
										data[index + indexAlpha] = 0;
									}
								}
							}
						}
						
						// apply post-processing filter, DebugMode
						if(doDebug) {
							var indexRect = top * packer.width * 4 + left * 4;
							wasProcessed = true;
							for(var y = 0; y < height; y++) {
								var edgeY = y == 0 || y == (height - 1);
								for(var x = 0; x < width; x++) {
									var edgeX = x == 0 || x == (width - 1);
									var index = indexRect + y * packer.width * 4 + x * 4;
									if(edgeX || edgeY) {
										data[index + indexRed]   = 255;
										//data[index + indexGreen] /= 3;
										//data[index + indexBlue]  /= 3;
										data[index + indexAlpha] = 255;
									} else if(data[index + indexAlpha] < 4){
										data[index + indexRed]   = 255;
										data[index + indexGreen] = 0;
										data[index + indexBlue]  = 0;
										data[index + indexAlpha] = 128;
									}
								}
							}
						}
					}
				});
			});
			
			// apply post-processing filter, CleanAlpha 
			if(doCleanAlpha) {
				wasProcessed = true;
				for(var y = 0; y < packer.height; y++) {
					for(var x = 0; x < packer.width; x++) {
						var index = y * packer.width * 4 + x * 4;
						if(data[index + 3] == 0) {
							data[index + 0] = 
							data[index + 1] = 
							data[index + 2] = 0;
						}
					}
				}
			}
			
			if(wasProcessed) { 
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				ctx.putImageData(imgData, 0, 0); 
			}
		}
		
		packer.bufferDataURL = buffer.toDataURL("image/png");
		packer.bufferDataExt = "png";
		
		packer.exportImageDataExt = packer.DoPack_Options["imageFormat"].toLowerCase();
		if(packer.exportImageDataExt !== "png") {
			packer.exportImageDataURL = 
				packer.exportImageDataExt == "jpg" ?
				buffer.toDataURL("image/jpeg") :
				buffer.toDataURL("image/" + packer.exportImageDataExt);
		} else {
			packer.exportImageDataURL = null;
		}
		
		if(packer.width * packer.height > 0) {
			var $img = $("<img />").attr("src", packer.bufferDataURL).attr("id", "imgWorkspace");
			$("#divWorkspaceContainerCrop").append($img);
		}
		// -------------------------------------------------

		var isPackingEndTime = new Date();
		var elapsedSeconds = parseInt(isPackingEndTime - isPackingStartTime) / 1000.0;

		var msgStats = "Processed " + packer.DoPack_FrameCount + " frames in " + elapsedSeconds + " seconds.";
		LogConsoleMessage(ConsoleMessageTypes.SUCCESS, msgStats);
		packer.StatsMessage = msgStats;
		
//		if(isOpeningProject) {
//			persistedImagePool = ImageItem.copyImagePool(imagePool);
//			isOpeningProject = false;
//		}
		
		$("#txtStatusMessage").text("Ready.");
		// TODO: Draw sprite sheet to canvas
		// TODO: Get image data as dataUrl
		// TODO: Resize #divWorkspaceContainer (sized to actual W & H)
		// TODO: Resize #divWorkspaceContainerCrop (smaller of Max W & H or actual W & H)
		// TODO: Add image to #divWorkspaceContainerCrop
	} else {
		$("#txtStatusMessage").text("Completed with errors.");
		$("#divWorkspaceContainerCrop")
			.css("width",  packer.width  + "32px")
			.css("height", packer.height + "32px");
	}
	
	EnableToolbarButtons(true);
	EnableLeftNavButtons(true);
	EnableWorkspaceButtons(true);
	$("#progressBar").css("width", "0");

	isPacking = false;
	UpdateConsole();
	DoWorkspaceZoom($("#txtWorkspaceZoom").val(), { which : 13 });
};

var OnPackStatusUpdate = function(count) {
	if(isNullOrUndefined(count)) {
		$("#txtStatusMessage").text("Ready.");
		$("#progressBar").css("width", "0");
	} else {
		var packer = CurrentPacker;
		var percentComplete = 100.0;

		if(packer.DoPack_FrameCount === 0) {
			$("#txtStatusMessage").text("Ready.");
			$("#progressBar").css("width", "0");
		} else {
			percentComplete = 100.0 * parseFloat(count) / parseFloat(packer.DoPack_FrameCount);
			percentComplete = percentComplete > 100.0 ? 100.0 : percentComplete;
			percentComplete = percentComplete <   0.0 ?   0.0 : percentComplete;
			$("#progressBar").css("width", "" + parseInt(percentComplete) + "%");
			$("#txtStatusMessage").text("Processing " + count + " of " + packer.DoPack_FrameCount + " frame(s).");
		}
	}
};

$(document).ready(function () {
	var i = 0;
	var keys = [];
	var defaultSortBy = BasePacker.SortByDefault;

	// add Sprite Packer options
	keys = BasePacker.SortBy["NAME"](packers);
	for(i = 0; i < keys.length; i++) {
		var $li = $("<li/>");
		var $a = $("<a/>").attr("href","#null");
		var item = packers[keys[i]];
		if(item.isDefault) {
			$a.text(item.name + " *");
			$("#ddlSpritePacker").text(item.name);
			defaultSortBy = item.defaultSortBy;
		} else {
			$a.text(item.name);
		}
		$li.append($a);
		$("#ddlSpritePackerOptions").append($li);
	}

	// add Sort By options
	keys = BasePacker.SortBy["NAME"](BasePacker.SortBy);
	for(i = 0; i < keys.length; i++) {
		var $li = $("<li/>");
		var $a = $("<a/>").attr("href","#null");
		$a.text(keys[i]);
		$li.append($a);
		$("#ddlSortByOptions").append($li);
	}
	$("#ddlSortBy").text(defaultSortBy);
	
	// add Data format options
	keys = BasePacker.SortBy["NAME"](dataExporters);
	for(i = 0; i < keys.length; i++) {
		var $li = $("<li/>");
		var $a = $("<a/>").attr("href","#null");
		var item = dataExporters[keys[i]];
		if(item.isDefault) {
			$a.text(item.name + " *");
			$("#ddlDataFormat").text(item.name);
		} else {
			$a.text(item.name);
		}
		$li.append($a);
		$("#ddlDataFormatOptions").append($li);
	}

	// add image format options
	keys = BasePacker.SortBy["NAME"](imageExporters);
	for(i = 0; i < keys.length; i++) {
		var $li = $("<li/>");
		var $a = $("<a/>").attr("href","#null");
		var item = imageExporters[keys[i]];
		if(item.isDefault) {
            $a.text(item.name + " *");
            $("#ddlImageFormat").text(item.name);
        } else {
			$a.text(item.name);
		}
		$li.append($a);
		$("#ddlImageFormatOptions").append($li);
	}

	$("#ddlSpritePackerOptions li a").click(function() { 
		var result = UpdateDropDownValue("ddlSpritePacker", $(this));
		$("#ddlSortBy").text(packers[$("#ddlSpritePacker").text()].defaultSortBy);
		return result;
	});
	$("#ddlSortByOptions li a").click(function() { return UpdateDropDownValue("ddlSortBy", $(this)); });
	$("#ddlDataFormatOptions li a").click(function() { return UpdateDropDownValue("ddlDataFormat", $(this)); });
	$("#ddlImageFormatOptions li a").click(function() { return UpdateDropDownValue("ddlImageFormat", $(this)); });
	
	// reset IsDirty() flag
	persistedOptions = new Options();
	persistedOptions.read();
});
