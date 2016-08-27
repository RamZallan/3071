window.addEventListener("load", function() {
	toolbar = document.getElementById("toolbar");
	content = document.getElementById("content");
	iframe = document.getElementById("mininetscape");
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
			bgcounter += 5;
			if (bgcounter > 200) {
				clearInterval(bginterval);
				document.body.style.backgroundImage = "url('http://www.clipartkid.com/images/707/twinkling-stars-animated-gif-twinkle-stars-gif-twinkle-xCsqAI-clipart.jpg')";
			}
		}, 200);

		startMouseTrail();
	};
	bgimage.src = "background.gif";
});
function browseTo(place, newTab) {
	if (newTab) {
		window.open(place);
	}
	else {
		iframe.src = place;
		iframe.style.display = "block";
	}
}
function aolSearch(query) {
	browseTo("http://search.aol.com/aol/search?s_it=sb-top&v_t=na&q=" + encodeURIComponent(query), false);
}
function aolSearchEnter(event, query) {
	if (event.keyCode == 13) {
		aolSearch(query);
	}
}
function menuClick(self) {
	var x = self.selectedIndex;
	self.selectedIndex = 0;
	var val = self.children[x].value;
	var newTab = val.substr(val.length - 1) == "#";
	browseTo(self.children[x].value, newTab);
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

trailParticles = [];
function startMouseTrail() {
	for (var i = 0; i < 150; i++) {
		var temp = document.createElement("div");
		temp.className = "mouseTrail";
		temp.style.top = "50px";
		temp.active = false;
		temp.lastUsed = 0;
		trailParticles.push(temp);
		document.body.appendChild(temp);
	}
	trailInterval = setInterval(updateMouseTrail, 34);
}
mouse = {
	x: 300,
	y: 300
};
document.addEventListener("mousemove", function(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
	createParticle(e.pageX, e.pageY);
});
function updateMouseTrail() {
	if (Math.random() < 0.3) createParticle(mouse.x, mouse.y);
	for (var i = 0; i < trailParticles.length; i++) {
		updateParticle(trailParticles[i]);
	}
}
function updateParticle(elm) {
	var life = Date.now() - elm.lastUsed;
	elm.style.opacity = 1 - (life / trailConfig.particleLife);
	var x = parseInt(elm.style.left),
		y = parseInt(elm.style.top);
	x += Math.round(Math.random() * trailConfig.particleSpeed);
	y += Math.round(Math.random() * trailConfig.particleSpeed);
	elm.style.left = x + "px";
	elm.style.top = y + "px";
}
function createParticle(x, y) {
	x++;
	y++;
	var created = false;
	var oldest = 0;
	for (var i = 0; i < trailParticles.length; i++) {
		var life = Date.now() - trailParticles[i].lastUsed;
		if (life > Date.now() - trailParticles[oldest].lastUsed) oldest = i;
	}
			particleWomb(x, y, oldest);
			created = true;
	if (!created) {
		var rand = Math.floor(Math.random() * trailParticles.length);
		particleWomb(x, y, rand);
	}
}
particleColors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff", "#f80", "#f08", "#8f0", "#0f8", "#80f", "#08f"];
function particleWomb(x, y, i) {
	trailParticles[i].style.top = y + "px";
	trailParticles[i].style.left = x + "px";
	var color = particleColors[Math.round(Math.random() * particleColors.length)];
	trailParticles[i].style.backgroundColor = color;
	trailParticles[i].lastUsed = Date.now();
}
trailConfig = {
	particleLife: 1000,
	particleSpeed: 8
}