function aolSearch(query) {
	window.location = "http://search.aol.com/aol/search?s_it=sb-top&v_t=na&q=" + encodeURIComponent(query);
}
function menuClick(self) {
	var x = self.selectedIndex;
	self.selectedIndex = 0;
	window.location = self.children[x].value;
}