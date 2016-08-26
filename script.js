window.addEventListener("load", function() {
	toolbar = document.getElementById("toolbar");
	content = document.getElementById("content");
	bgimage = new Image();
	bgcounter = 0;
	bgimage.onload = function() {
		bginterval = setInterval(function() {
			var bgcanvas = document.createElement("canvas");
			bgcanvas.width = "500";
			bgcanvas.height = "300";
			var bgctx = bgcanvas.getContext("2d");
			bgctx.drawImage(bgimage, 0, 0, 500, 300);
			bgctx.fillStyle = "#fff";
			var scale = bgcounter / 200;
			bgctx.fillRect(0, 300 * scale, 500, 300 - (300 * scale));
			document.body.style.backgroundImage = "url(" + bgcanvas.toDataURL() + ")";
			bgcounter++;
			if (counter > 200) {
				clearInterval(bginterval);
				document.body.style.backgroundImage = "url('http://www.clipartkid.com/images/707/twinkling-stars-animated-gif-twinkle-stars-gif-twinkle-xCsqAI-clipart.jpg')";
			}
		}, 40);
	};
	bgimage.src = "background.gif";
});
function aolSearch(query) {
	window.location = "http://search.aol.com/aol/search?s_it=sb-top&v_t=na&q=" + encodeURIComponent(query);
}
function aolSearchEnter(event, query) {
	if (event.keyCode == 13) {
		aolSearch(query);
	}
}
function menuClick(self) {
	var x = self.selectedIndex;
	self.selectedIndex = 0;
	window.location = self.children[x].value;
}
function menuButtonClick(self) {
	var x = self.children[self.selectedIndex].value;
	switch (x) {
		case "about":
			alert("QuickZap version 3.0.1.2\n\nReleased May 2, 1997\n\nCopyright 1997 QuickZap Corp.");
		break;
		case "uninstall":
			alert("QuickZap could not be uninstalled at this time due to an error in the MS DOS runtime environment. Please shut off your computer and try again later.");
		break;
		case "exit":
			hideToolbar();
			setTimeout(showToolbar, 4900);
			setTimeout(function() {
				alert("Looks like you accidently closed the QuickZap Toolbar. QuickZap has automatically corrected this error for your convenience.\nThank you for being a loyal user of QuickZap.");
			}, 5000);
		break;
	}
	self.selectedIndex = 0;
}
function showToolbar() {
	toolbar.style.display = "block";
	content.style.marginTop = "32px"
}
function hideToolbar() {
	toolbar.style.display = "none";
	content.style.marginTop = "0px";
}
