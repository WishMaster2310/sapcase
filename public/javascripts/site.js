
var m_site = {
	delay: 700,
	currSlide: ko.observable(0),
	prevSlide: ko.observable(),
	activeSlick: ko.observable(0),
	section: false,
	sectionCounter: false
};
$(document).ready(function() {
	// add easing
	$.easing['easeOutQuad'] = function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	};

	var imgCounter = 0;
	$('.j-preload').each(function() {
		var src = $(this).attr('src');
		var img = new Image;
		img.src = src;
		console.log(src, $('.j-preload').length);
		img.onload = function() {
			imgCounter ++;
			console.log(imgCounter, $('.j-preload').length);
			if (imgCounter === $('.j-preload').length -2 ) {
				setTimeout(function() {
					$('.saploader').hide();
					
					if (window.location.hash == "") {
						$('.hero').addClass('active')
					};
					m_site.scrollify();
				}, 100)
			};
		}
	});



	
	ko.applyBindings(m_site);
	

	

	$('.createyours-slider').slick({
		arrows: false, 
		dots: true
	}).on('afterChange', function(slick, currentSlide) {
		m_site.activeSlick(currentSlide.currentSlide);
		console.log(m_site.activeSlick())
	});

	
});

m_site.runWorkflow = function() {
	setTimeout(function() {
		$('.workflow__list').addClass('workflow__list--collapsed');
		$('.workflow-phone').velocity({
			width: 319,
			marginLeft: -148
		}, {
			duration: m_site.delay,
			delay: m_site.delay*2,
			complete: function(el) {
				$(el).velocity('fadeOut');
				$('.slider').fadeIn().addClass('slider--visible');
				m_site.setSlide(1);

			}
		});

		$('.workflow__item').velocity({
			opacity: 0
		}, {
			duration: 300,
			delay: m_site.delay/2
		});
		

	}, m_site.delay);
}

m_site.runForm = function() {
	var elements = document.querySelectorAll('.callback-icons path');
	_.forEach(elements, function(n) {
		var len = n.getTotalLength();
		n.style.strokeDasharray = len + ' ' + len;
		n.style.strokeDashoffset = len;
		n.getBoundingClientRect();
		n.style.transition = n.style.WebkitTransition = 'stroke-dashoffset 1s ease-in-out';
		n.style.strokeDashoffset = 0;
	});
}


m_site.runCounters = function() {
	$('.counters__number ins').each(function () {
    $(this).prop('Counter',0).animate({
	        Counter: $(this).text()
	    }, {
	        duration: 4000,
	        easing: 'swing',
	        step: function (now) {
	            $(this).text(Math.ceil(now));
	        }
	    });
	});
};


m_site.setSlide = function(count) {

	$('.slider__icon-set.active').removeClass('active');
	$('.slider__icon-set--' + count).addClass('active');

	$('.slider__text.active').removeClass('active');
	$('.slider__text--' + count).addClass('active');
	
	$('.slider__screen-item.active').removeClass('active');

	$('.slider__screen').velocity({
		'translateX': -(count - 1)*204
	}, 400)
	
	setTimeout(function() {
		$('.slider__screen-item--' + count).addClass('active');
	}, 1000);

	m_site.currSlide(count);
};


m_site.nextSlide = function() {

	if (m_site.currSlide() < 4 && m_site.currSlide() > 0) {
		m_site.setSlide(m_site.currSlide() + 1);	
	}
	return
};


m_site.prevSlide = function() {

	if (m_site.currSlide() > 1) {
		m_site.setSlide(m_site.currSlide() - 1);	
	}

	return
};

m_site.sectionStarter = {
	0: {
		showed: ko.observable(false),
		run: function() {
			return
		}
	},
	1: {
		showed: ko.observable(false),
		run: function() {
			if (this.showed()) {
				//m_site.runWorkflow()
			};
		}
	},
	2: {
		showed: ko.observable(false),
		run: function() {
			if (this.showed()) {
				m_site.runWorkflow()
			};
		}
	},
	3: {
		showed: ko.observable(false),
		run: function() {
			if (this.showed()) {
				m_site.runCounters()
			};
		}
	},
	4: {
		showed: ko.observable(false),
		run: function() {
			if (this.showed()) {
				//m_site.runWorkflow()
			};
		}
	},
	5: {
		showed: ko.observable(false),
		run: function() {
			if (this.showed()) {
				m_site.runForm()
			};
		}
	}
}


m_site.scrollify = function() {
	$.scrollify({
	    section : ".j-section",
	    sectionName : "section-name",
	    easing: "easeOutQuad",
	    scrollSpeed: 700,
	    scrollbars: false,
	    offset : 0,
	    scrollbars: true,
	    before:function() {},
	    after:function(index, arr) {
	    	//m_site.sectionStarter(arr[index], index)
	    	console.log(index, "index")
	    	if (m_site.sectionStarter[index] && !m_site.sectionStarter[index].showed()) {
	    			
	    			$(arr[index]).addClass('active');
	    			m_site.sectionStarter[index].showed(true);
	    			m_site.sectionStarter[index].run(arr[index]);
	    	};
	    },
	    afterResize:function() {
	    	
	    }
	});
}
