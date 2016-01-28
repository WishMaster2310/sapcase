var m_site = {
	sections: ko.observableArray()
};

m_site.grabSections = function() {
	var items = $('.j-section');
	var scrHeight = $(window).height();
	
	_.forEach(items, function(n, k) {

		var el = $(n);
		m_site.sections.push({
			top: el.offset().top,
			active: ko.observable(),
		});

		console.log(el.offset().top)

		if (el.outerHeight() < $(window).height() ) {
			el.height($(window).height())
		} else {
			el.height(el.outerHeight())
		}
	});
};

m_site.goToSection = function(section) {
	$("html").velocity("scroll", { offset: "750px", mobileHA: false });
};

m_site.preventDefault = function(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
		//console.log(e)
	e.returnValue = false;
};

m_site.preventDefaultForScrollKeys =  function(e) {
	if (m_site.scrollControlKeySet[e.keyCode]) {
		m_site.preventDefault(e);
		return false;
	}
};

m_site.preventDefaultWheel =  function(e) {
	if (e.deltaY < 0) {
		m_site.goToSection()
		console.log('up')
	} else {
		console.log('down')
	}
	m_site.preventDefault(e);
};

m_site.disableScroll = function() {
	if (window.addEventListener) // older FF
	window.addEventListener('DOMMouseScroll', m_site.preventDefaultWheel, false);
	window.onwheel = m_site.preventDefaultWheel; // modern standard
	window.onmousewheel = document.onmousewheel = m_site.preventDefaultWheel; // older browsers, IE
	window.ontouchmove  = m_site.preventDefault; // mobile
	document.onkeydown  = m_site.preventDefaultForScrollKeys;
};

m_site.enableScroll = function() {
	if (window.removeEventListener)
	window.removeEventListener('DOMMouseScroll', m_site.preventDefault, false);
	window.onmousewheel = document.onmousewheel = null; 
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

m_site.scrollcb = function() {

};
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
m_site.scrollControlKeySet = {37: 1, 38: 1, 39: 1, 40: 1}


$(document).ready(function() {
	ko.applyBindings(m_site);
	m_site.grabSections();
	m_site.disableScroll()
});

