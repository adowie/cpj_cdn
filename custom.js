/* -------------------- Check Browser --------------------- */



function browser() {
	
	var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
	var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
	//var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

	function testCSS(prop) {
	    return prop in document.documentElement.style;
	}
	
	if (isOpera) {
		
		return false;
		
	}else if (isSafari || isChrome) {
		
		return true;
		
	} else {
		
		return false;
		
	}
	
}

/* ---------- IE8 list style hack (:nth-child(odd)) ---------- */

jQuery(document).ready(function($){
	
	if($('.messagesList').width()) {
		
		if(jQuery.browser.version.substring(0, 2) == "8.") {

			$('ul.messagesList li:nth-child(2n+1)').addClass('odd');
			
		}
		
	}
	
});	

/* -------------------- Buttons 3D Style --------------------- */

jQuery(document).ready(function($){
	
	$(':button').each(function(){
		
		
		if($(this).hasClass('btn3d')) {
			
			if($(this).parent().hasClass('input-append')) {
				
				//do nothing

			} else {
						
				var inner = $(this).html();
				
				if(browser()) {
			
					$(this).html('<span>' + inner + '</span>')
				
				}	
			
			}
			
		}
		
	});
	
	//$(':button').wrap('<div class="btn-overlay" />');
	
});

$(document).ready(function(){
		
			
	$("#username").focus(function() {
		
		$(this).parent(".input-prepend").addClass("input-prepend-focus");
	
	});
	
	$("#username").focusout(function() {
		
		$(this).parent(".input-prepend").removeClass("input-prepend-focus");
	
	});
	
	$("#password").focus(function() {
		
		$(this).parent(".input-prepend").addClass("input-prepend-focus");
	
	});
	
	$("#password").focusout(function() {
		
		$(this).parent(".input-prepend").removeClass("input-prepend-focus");
	
	});
	
				
	/* ---------- Add class .active to current link  ---------- */
	$('ul.main-menu li a').each(function(){
		
		if($(this).hasClass('submenu')) {
			
			if($($(this))[0].href==String(window.location)) {
				
				$(this).parent().parent().parent().addClass('active');
				
			}
			
		} else {
			
			if($($(this))[0].href==String(window.location)) {
				
				$(this).parent().addClass('active');
				
			}
					
		}
		
		
	});
	
	/* ---------- Submenu  ---------- */
	
	$('.dropmenu').click(function(e){

		e.preventDefault();

		$(this).parent().find('ul').slideToggle();
	
	});
			
	/* ---------- Acivate Functions ---------- */
	template_functions();
	init_masonry();
	sparkline_charts();
	charts();
	calendars();
	growlLikeNotifications();
	widthFunctions();
	
	if(jQuery.browser.version.substring(0, 2) == "8.") {
		 
		//disable jQuery Knob
		
	} else {
		
		circle_progess();
		
	}
	
	chart();
	messageLike();
	
	setInterval(tempStats, 3000);
	//tempStats();
	
	
});

/* ---------- Like/Dislike ---------- */

function messageLike(){
	
	if($('.messagesList')) {
		
		$('.messagesList').on('click', '.star', function(){
			
			$(this).removeClass('star');
			
			$(this).addClass('dislikes');
			
			//here add your function
			
		});
		
		$('.messagesList').on('click', '.dislikes', function(){
			
			$(this).removeClass('dislikes');
			
			$(this).addClass('star');
			
			//here add your function
			
		});
		
		
	}
	
	
}

/* ---------- Check Retina ---------- */

function retina(){
	
	retinaMode = (window.devicePixelRatio > 1);
	
	return retinaMode;
	
}

/* ---------- Temp Stats ---------- */

function tempStats(){

	if($('.tempStat')) {
		
		$('.tempStat').each(function(){
			
			var temp = Math.floor(Math.random()*(1+120));
			
			$(this).html(temp + '°');
						
			if (temp < 20) {
				
				$(this).animate({
				            borderColor: "#67c2ef"
				        }, 'fast');
				
			} else if (temp > 19 && temp < 40) {
				
				$(this).animate({
				            borderColor: "#CBE968"
				        }, 'slow');
				
			} else if (temp > 39 && temp < 60) {
				
				$(this).animate({
				            borderColor: "#eae874"
				        }, 'slow');

			} else if (temp > 59 && temp < 80) {
				
				$(this).animate({
				            borderColor: "#fabb3d"
				        }, 'slow');

			} else if (temp > 79 && temp < 100) {

				$(this).animate({
				            borderColor: "#fa603d"
				        }, 'slow');

			} else {
				
				$(this).animate({
				            borderColor: "#ff5454"
				        }, 'slow');
				
			}
			
		});
		
	}
	
}

/* ---------- Chart ---------- */

function chart(){
	
	if($('.verticalChart')) {
		
		$('.singleBar').each(function(){
			
			var percent = $(this).find('.value span').html();
			
			$(this).find('.value').animate({height:percent}, 2000, function() {
			    
				$(this).find('span').fadeIn();
			 
			});
			
		});
		
	}
	
}

/* ---------- Masonry Gallery ---------- */

function init_masonry(){
    var $container = $('.masonry-gallery');

    var gutter = 6;
    var min_width = 250;
    $container.imagesLoaded( function(){
        $container.masonry({
            itemSelector : '.masonry-thumb',
            gutterWidth: gutter,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
                var num_of_boxes = (containerWidth/min_width | 0);

                var box_width = (((containerWidth - (num_of_boxes-1)*gutter)/num_of_boxes) | 0) ;

                if (containerWidth < min_width) {
                    box_width = containerWidth;
                }

                $('.masonry-thumb').width(box_width);

                return box_width;
              }
        });
    });
}

/* ---------- Numbers Sepparator ---------- */

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}

/* ---------- Template Functions ---------- */		
		
function template_functions(){
	
	/* ---------- ToDo List Action Buttons ---------- */
	
	$(".todo-remove").click(function(){
		
		$(this).parent().parent().fadeTo("slow", 0.00, function(){ //fade
			$(this).slideUp("slow", function() { //slide up
		    	$(this).remove(); //then remove from the DOM
		    });
		});
		
		
		return false;
	});
	
	/* ---------- Skill Bars ---------- */
	$(".meter > span").each(function() {
		$(this)
		.data("origWidth", $(this).width())
		.width(0)
		.animate({
			width: $(this).data("origWidth")
		}, 3000);
	});
	
	/* ---------- Disable moving to top ---------- */
	$('a[href="#"][data-top!=true]').click(function(e){
		e.preventDefault();
	});
	
	/* ---------- Text editor ---------- */
	$('.cleditor').cleditor();
	
	/* ---------- Datapicker ---------- */
	$('.datepicker').datepicker();
	
	/* ---------- Notifications ---------- */
	$('.noty').click(function(e){
		e.preventDefault();
		var options = $.parseJSON($(this).attr('data-noty-options'));
		noty(options);
	});

	/* ---------- Uniform ---------- */
	$("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

	/* ---------- Choosen ---------- */
	$('[data-rel="chosen"],[rel="chosen"]').chosen();

	/* ---------- Tabs ---------- */
	$('#myTab a:first').tab('show');
	$('#myTab a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});

	/* ---------- Makes elements soratble, elements that sort need to have id attribute to save the result ---------- */
	$('.sortable').sortable({
		revert:true,
		cancel:'.btn,.box-content,.nav-header',
		update:function(event,ui){
			//line below gives the ids of elements, you can make ajax call here to save it to the database
			//console.log($(this).sortable('toArray'));
		}
	});

	/* ---------- Tooltip ---------- */
	$('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

	/* ---------- Popover ---------- */
	$('[rel="popover"],[data-rel="popover"]').popover();

	/* ---------- File Manager ---------- */
	var elf = $('.file-manager').elfinder({
		url : 'misc/elfinder-connector/connector.php'  // connector URL (REQUIRED)
	}).elfinder('instance');

	/* ---------- Star Rating ---------- */
	$('.raty').raty({
		score : 4 //default stars
	});

	/* ---------- Uploadify ---------- */
	$('#file_upload').uploadify({
		'swf'      : 'misc/uploadify.swf',
		'uploader' : 'misc/uploadify.php'
		// Put your options here
	});

	/* ---------- Fullscreen ---------- */
	$('#toggle-fullscreen').button().click(function () {
		var button = $(this), root = document.documentElement;
		if (!button.hasClass('active')) {
			$('#thumbnails').addClass('modal-fullscreen');
			if (root.webkitRequestFullScreen) {
				root.webkitRequestFullScreen(
					window.Element.ALLOW_KEYBOARD_INPUT
				);
			} else if (root.mozRequestFullScreen) {
				root.mozRequestFullScreen();
			}
		} else {
			$('#thumbnails').removeClass('modal-fullscreen');
			(document.webkitCancelFullScreen ||
				document.mozCancelFullScreen ||
				$.noop).apply(document);
		}
	});

	/* ---------- Datable ---------- */
	$('.datatable').dataTable({
			"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"
			}
		} );
	$('.btn-close').click(function(e){
		e.preventDefault();
		$(this).parent().parent().parent().fadeOut();
	});
	$('.btn-minimize').click(function(e){
		e.preventDefault();
		var $target = $(this).parent().parent().next('.box-content');
		if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
		else 					   $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
		$target.slideToggle();
	});
	$('.btn-setting').click(function(e){
		e.preventDefault();
		$('#myModal').modal('show');
	});
	
	
	/* ---------- Progress  ---------- */

		$(".simpleProgress").progressbar({
			value: 89
		});

		$(".progressAnimate").progressbar({
			value: 1,
			create: function() {
				$(".progressAnimate .ui-progressbar-value").animate({"width":"100%"},{
					duration: 10000,
					step: function(now){
						$(".progressAnimateValue").html(parseInt(now)+"%");
					},
					easing: "linear"
				})
			}
		});

		$(".progressUploadAnimate").progressbar({
			value: 1,
			create: function() {
				$(".progressUploadAnimate .ui-progressbar-value").animate({"width":"100%"},{
					duration: 20000,
					easing: 'linear',
					step: function(now){
						$(".progressUploadAnimateValue").html(parseInt(now*40.96)+" Gb");
					},
					complete: function(){
						$(".progressUploadAnimate + .field_notice").html("<span class='must'>Upload Finished</span>");
					} 
				})
			}
		});
		
		if($(".taskProgress")) {
		
			$(".taskProgress").each(function(){
				
				var endValue = parseInt($(this).html());
												
				$(this).progressbar({
					value: endValue
				});
				
				$(this).parent().find(".percent").html(endValue + "%");
				
			});
		
		}
		
		if($(".progressBarValue")) {
		
			$(".progressBarValue").each(function(){
				
				var endValueHTML = $(this).find(".progressCustomValueVal").html();
				
				var endValue = parseInt(endValueHTML);
												
				$(this).find(".progressCustomValue").progressbar({
					
					value: 1,
					create: function() {
						$(this).find(".ui-progressbar-value").animate({"width": endValue + "%"},{
							duration: 5000,
							step: function(now){
																
								$(this).parent().parent().parent().find(".progressCustomValueVal").html(parseInt(now)+"%");
							},
							easing: "linear"
						})
					}
				});
				
			});
		
		}
	
	
	/* ---------- Custom Slider ---------- */
		$(".sliderSimple").slider();

		$(".sliderMin").slider({
			range: "min",
			value: 180,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderMinLabel" ).html( "$" + ui.value );
			}
		});

		$(".sliderMin-1").slider({
			range: "min",
			value: 50,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderMin1Label" ).html( "$" + ui.value );
			}
		});

		$(".sliderMin-2").slider({
			range: "min",
			value: 100,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderMin2Label" ).html( "$" + ui.value );
			}
		});

		$(".sliderMin-3").slider({
			range: "min",
			value: 150,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderMin3Label" ).html( "$" + ui.value );
			}
		});

		$(".sliderMin-4").slider({
			range: "min",
			value: 250,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderMin4Label" ).html( "$" + ui.value );
			}
		});

		$(".sliderMin-5").slider({
			range: "min",
			value: 350,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderLabel" ).html( "$" + ui.value );
			}
		});
		
		$(".sliderMin-6").slider({
			range: "min",
			value: 450,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderLabel" ).html( "$" + ui.value );
			}
		});
		
		$(".sliderMin-7").slider({
			range: "min",
			value: 550,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderLabel" ).html( "$" + ui.value );
			}
		});
		
		$(".sliderMin-8").slider({
			range: "min",
			value: 650,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderLabel" ).html( "$" + ui.value );
			}
		});
		
		
		$(".sliderMax").slider({
			range: "max",
			value: 280,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( ".sliderMaxLabel" ).html( "$" + ui.value );
			}
		});

		$( ".sliderRange" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 192, 470 ],
			slide: function( event, ui ) {
				$( ".sliderRangeLabel" ).html( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});

		$( "#sliderVertical-1" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
		});

		$( "#sliderVertical-2" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 40,
		});

		$( "#sliderVertical-3" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 30,
		});

		$( "#sliderVertical-4" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 15,
		});

		$( "#sliderVertical-5" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 40,
		});

		$( "#sliderVertical-6" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 80,
		});
		
		$( "#sliderVertical-7" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
		});

		$( "#sliderVertical-8" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 40,
		});

		$( "#sliderVertical-9" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 30,
		});

		$( "#sliderVertical-10" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 15,
		});

		$( "#sliderVertical-11" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 40,
		});

		$( "#sliderVertical-12" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 80,
		});
			
}

/* ---------- Circle Progess Bars ---------- */

function circle_progess() {
	
	var divElement = $('div'); //log all div elements
	
	if (retina()) {
		
		$(".whiteCircle").knob({
	        'min':0,
	        'max':100,
	        'readOnly': true,
	        'width': 240,
	        'height': 240,
			'bgColor': 'rgba(255,255,255,0.5)',
	        'fgColor': 'rgba(255,255,255,0.9)',
	        'dynamicDraw': true,
	        'thickness': 0.2,
	        'tickColorizeValues': true
	    });
	
		$(".circleStat").css('zoom',0.5);
		$(".whiteCircle").css('zoom',0.999);
		
		
	} else {
		
		$(".whiteCircle").knob({
	        'min':0,
	        'max':100,
	        'readOnly': true,
	        'width': 120,
	        'height': 120,
			'bgColor': 'rgba(255,255,255,0.5)',
	        'fgColor': 'rgba(255,255,255,0.9)',
	        'dynamicDraw': true,
	        'thickness': 0.2,
	        'tickColorizeValues': true
	    });
		
	}
	
	
	
	$(".circleStatsItemBox").each(function(){
		
		var value = $(this).find(".value > .number").html();
		var unit = $(this).find(".value > .unit").html();
		var percent = $(this).find("input").val()/100;
		
		countSpeed = 2300*percent;
		
		endValue = value*percent;
		
		$(this).find(".count > .unit").html(unit);
		$(this).find(".count > .number").countTo({
			
			from: 0,
		    to: endValue,
		    speed: countSpeed,
		    refreshInterval: 50,
		    onComplete: function(value) {
		    	console.debug(this);
		    }
		
		});
		
		//$(this).find(".count").html(value*percent + unit);
		
	});
	
	$(".greenCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'fgColor': '#b9e672',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
		'skin':'tron'
    })

    $(".orangeCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'fgColor': '#FA5833',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
		'skin':'tron'
    })

	$(".lightOrangeCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'fgColor': '#f4a70c',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
		'skin':'tron'
    })

    $(".blueCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'fgColor': '#2FABE9',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
		'skin':'tron'
    })

	$(".yellowCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'fgColor': '#e7e572',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
		'skin':'tron'
    })

	$(".pinkCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 120,
        'height': 120,
        'fgColor': '#e42b75',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true,
		'skin':'tron'
    })
	
	
}                

      

/* ---------- Calendars ---------- */

function calendars(){
	

	$('#external-events div.external-event').each(function() {

		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});
	
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	$('#main_calendar').fullCalendar({
		header: {
			left: 'title',
			right: 'prev,next today,month,agendaWeek,agendaDay'
		},
		editable: true,
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}
		]
	});
	
	$('#main_calendar_phone').fullCalendar({
		header: {
			left: 'title',
			right: 'prev,next'
		},
		defaultView: 'agendaDay',
		editable: true,
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}
		]
	});		
	
			
	$('#calendar').fullCalendar({
		header: {
			left: 'title',
			right: 'prev,next today,month,agendaWeek,agendaDay'
		},
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date, allDay) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
			
		}
	});
	
}

/* ---------- Sparkline Charts ---------- */

function sparkline_charts() {
	
	//generate random number for charts
	randNum = function(){
		//return Math.floor(Math.random()*101);
		return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
	}

	var chartColours = ['#2FABE9', '#FA5833', '#b9e672', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];

	//sparklines (making loop with random data for all 7 sparkline)
	i=1;
	for (i=1; i<9; i++) {
	 	var data = [[1, 3+randNum()], [2, 5+randNum()], [3, 8+randNum()], [4, 11+randNum()],[5, 14+randNum()],[6, 17+randNum()],[7, 20+randNum()], [8, 15+randNum()], [9, 18+randNum()], [10, 22+randNum()]];
	 	placeholder = '.sparkLineStats' + i;
		
		if (retina()) {
			
			$(placeholder).sparkline(data, {
				width: 200,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
				height: 60,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
				lineColor: '#2FABE9',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
				fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
				spotColor: '#467e8c',//The CSS colour of the final value marker. Set to false or an empty string to hide it
				maxSpotColor: '#b9e672',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
				minSpotColor: '#FA5833',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
				spotRadius: 2,//Radius of all spot markers, In pixels (default: 1.5) - Integer
				lineWidth: 1//In pixels (default: 1) - Integer
			});
			
			$(placeholder).css('zoom',0.5);
			
		} else {
			
			$(placeholder).sparkline(data, {
				width: 100,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
				height: 30,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
				lineColor: '#2FABE9',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
				fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
				spotColor: '#467e8c',//The CSS colour of the final value marker. Set to false or an empty string to hide it
				maxSpotColor: '#b9e672',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
				minSpotColor: '#FA5833',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
				spotRadius: 2,//Radius of all spot markers, In pixels (default: 1.5) - Integer
				lineWidth: 1//In pixels (default: 1) - Integer
			});
			
		}
	
	}
	
}


/* ---------- Charts ---------- */

	visitors = "";
	plotthis = 0;



function charts() {



	
	/*
	function randNum(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200;
	}
	
	function randNum2(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 500;
	}
	
	function randNum3(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 300;
	}
	
	function randNum4(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 100;
	}
	*/
	/* ---------- Chart with points ---------- */

	function getThatDay(x)
	{
		var months = [ "Jan 01","Jan 02","Jan 03","Jan 04","Jan 05","Jan 06","Jan 07","Jan 08","Jan 09","Jan 10","Jan 11","Jan 12","Jan 13","Jan 14","Jan 15","Jan 16","Jan 17","Jan 18","Jan 19","Jan 20","Jan 21","Jan 22","Jan 23","Jan 24","Jan 25","Jan 26","Jan 27","Jan 28","Jan 29","Jan 30","Jan 31","Feb 01","Feb 02","Feb 03","Feb 04","Feb 05","Feb 06","Feb 07","Feb 08","Feb 09","Feb 10","Feb 11","Feb 12","Feb 13","Feb 14","Feb 15","Feb 16","Feb 17","Feb 18","Feb 19","Feb 20","Feb 21","Feb 22","Feb 23","Feb 24","Feb 25","Feb 26","Feb 27","Feb 28","Mar 01","Mar 02","Mar 03","Mar 04","Mar 05","Mar 06","Mar 07","Mar 08","Mar 09","Mar 10","Mar 11","Mar 12","Mar 13","Mar 14","Mar 15","Mar 16","Mar 17","Mar 18","Mar 19","Mar 20","Mar 21","Mar 22","Mar 23","Mar 24","Mar 25","Mar 26","Mar 27","Mar 28","Mar 29","Mar 30","Mar 31","Apr 01","Apr 02","Apr 03","Apr 04","Apr 05","Apr 06","Apr 07","Apr 08","Apr 09","Apr 10","Apr 11","Apr 12","Apr 13","Apr 14","Apr 15","Apr 16","Apr 17","Apr 18","Apr 19","Apr 20","Apr 21","Apr 22","Apr 23","Apr 24","Apr 25","Apr 26","Apr 27","Apr 28","Apr 29","Apr 30","May 01","May 02","May 03","May 04","May 05","May 06","May 07","May 08","May 09","May 10","May 11","May 12","May 13","May 14","May 15","May 16","May 17","May 18","May 19","May 20","May 21","May 22","May 23","May 24","May 25","May 26","May 27","May 28","May 29","May 30","May 31","Jun 01","Jun 02","Jun 03","Jun 04","Jun 05","Jun 06","Jun 07","Jun 08","Jun 09","Jun 10","Jun 11","Jun 12","Jun 13","Jun 14","Jun 15","Jun 16","Jun 17","Jun 18","Jun 19","Jun 20","Jun 21","Jun 22","Jun 23","Jun 24","Jun 25","Jun 26","Jun 27","Jun 28","Jun 29","Jun 30","Jul 01","Jul 02","Jul 03","Jul 04","Jul 05","Jul 06","Jul 07","Jul 08","Jul 09","Jul 10","Jul 11","Jul 12","Jul 13","Jul 14","Jul 15","Jul 16","Jul 17","Jul 18","Jul 19","Jul 20","Jul 21","Jul 22","Jul 23","Jul 24","Jul 25","Jul 26","Jul 27","Jul 28","Jul 29","Jul 30","Jul 31","Aug 01","Aug 02","Aug 03","Aug 04","Aug 05","Aug 06","Aug 07","Aug 08","Aug 09","Aug 10","Aug 11","Aug 12","Aug 13","Aug 14","Aug 15","Aug 16","Aug 17","Aug 18","Aug 19","Aug 20","Aug 21","Aug 22","Aug 23","Aug 24","Aug 25","Aug 26","Aug 27","Aug 28","Aug 29","Aug 30","Aug 31","Sep 01","Sep 02","Sep 03","Sep 04","Sep 05","Sep 06","Sep 07","Sep 08","Sep 09","Sep 10","Sep 11","Sep 12","Sep 13","Sep 14","Sep 15","Sep 16","Sep 17","Sep 18","Sep 19","Sep 20","Sep 21","Sep 22","Sep 23","Sep 24","Sep 25","Sep 26","Sep 27","Sep 28","Sep 29","Sep 30","Oct 01","Oct 02","Oct 03","Oct 04","Oct 05","Oct 06","Oct 07","Oct 08","Oct 09","Oct 10","Oct 11","Oct 12","Oct 13","Oct 14","Oct 15","Oct 16","Oct 17","Oct 18","Oct 19","Oct 20","Oct 21","Oct 22","Oct 23","Oct 24","Oct 25","Oct 26","Oct 27","Oct 28","Oct 29","Oct 30","Oct 31","Nov 01","Nov 02","Nov 03","Nov 04","Nov 05","Nov 06","Nov 07","Nov 08","Nov 09","Nov 10","Nov 11","Nov 12","Nov 13","Nov 14","Nov 15","Nov 16","Nov 17","Nov 18","Nov 19","Nov 20","Nov 21","Nov 22","Nov 23","Nov 24","Nov 25","Nov 26","Nov 27","Nov 28","Nov 29","Nov 30","Dec 01","Dec 02","Dec 03","Dec 04","Dec 05","Dec 06","Dec 07","Dec 08","Dec 09","Dec 10","Dec 11","Dec 12","Dec 13","Dec 14","Dec 15","Dec 16","Dec 17","Dec 18","Dec 19","Dec 20","Dec 21","Dec 22","Dec 23","Dec 24","Dec 25","Dec 26","Dec 27","Dec 28","Dec 29","Dec 30","Dec 31"];

		return months[x];
	}


	if($("#stats-chart2").length)
	{	

		var visits;
		var newVisitors;
		var visitors;
		var send = 0;

		$.post("functions/chart/complaints.php?id=1",function(data){doSomething1(data)},"json");
		$.post("functions/chart/complaints.php?id=0",function(data){doSomething(data)},"json");
		$.post("functions/chart/complaints.php?id=2",function(data){doSomething2(data)},"json");
		

		function doSomething(thisValue) {
			newVisitors = thisValue;
			send++;
			if(send==3)
			{
				print_graph();
			}
		}

		function doSomething1(thisValue) {
			visitors = thisValue;
			send++;
			if(send==3)
			{
				print_graph();
			}
		}

		function doSomething2(thisValue) {
			visits = thisValue;
			send++;
			if(send==3)
			{
				print_graph();
			}
		}



		
		function print_graph(){		
				var plot = $.plot($("#stats-chart2"),
				   [ { data: visits, label: "Compliments"},
					/* { data: pageviews, label: "Pageviews"},*/
					 { data: visitors, label: "Queries" }, 
					 { data: newVisitors, label: "Complaints"} ], {
					   series: {
						   lines: { show: true,
									lineWidth: 2
								 },
						   points: { show: true, 
									 lineWidth: 2 
								 },
						   shadowSize: 0
					   },
					   grid: { hoverable: true, 
							   clickable: true, 
							   tickColor: "#f9f9f9",
							   borderWidth: 0
							 },
					 legend: {
							    show: false
							},	
					   colors: ["#bdea74", "#2FABE9", "#FA5833"],
						xaxis: {ticks:15, tickDecimals: 0},
						yaxis: {ticks:5, tickDecimals: 0},
					 });
		}


		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#stats-chart2").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0],
							y = item.datapoint[1];
						var d = new Date();
						n = d.getMonth();
						var months = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];
						

						showTooltip(item.pageX, item.pageY,
									item.series.label + " for "+ months[n] +" "+ x + " is " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
	
	}
	
	function randNumFB(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20);
	}
	
	/* ---------- Chart with points ---------- */
	if($("#facebookChart").length)
	{	
		var likes;
		var smalls = 0;
		$.post("functions/chart/small_graph.php?id=0",function(data){JuicePlantINFO(data)},"json");

		function JuicePlantINFO(thisValue) {
			likes = thisValue;
			smalls++;
			if(smalls==1)
			{
				print_small_graph();
			}
		}

		//var likes = [[1, 5+randNumFB()], [2, 10+randNumFB()], [3, 15+randNumFB()], [4, 20+randNumFB()],[5, 25+randNumFB()],[6, 30+randNumFB()],[7, 35+randNumFB()],[8, 40+randNumFB()],[9, 45+randNumFB()],[10, 50+randNumFB()],[11, 55+randNumFB()],[12, 60+randNumFB()],[13, 65+randNumFB()],[14, 70+randNumFB()],[15, 75+randNumFB()],[16, 80+randNumFB()],[17, 85+randNumFB()],[18, 90+randNumFB()],[19, 85+randNumFB()],[20, 80+randNumFB()],[21, 75+randNumFB()],[22, 80+randNumFB()],[23, 75+randNumFB()],[24, 70+randNumFB()],[25, 65+randNumFB()],[26, 75+randNumFB()],[27,80+randNumFB()],[28, 85+randNumFB()],[29, 90+randNumFB()], [30, 95+randNumFB()]];
		function print_small_graph()
		{

			var plot = $.plot($("#facebookChart"),
				   [ { data: likes, label: "Juice Plant Reports"} ], {
					   series: {
						   lines: { show: true,
									lineWidth: 2,
									fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
								 },
						   points: { show: true, 
									 lineWidth: 2 
								 },
						   shadowSize: 0
					   },
					   grid: { hoverable: true, 
							   clickable: true, 
							   tickColor: "#f9f9f9",
							   borderWidth: 0
							 },
					   colors: ["#D10116"],
						xaxis: {ticks:6, tickDecimals: 0},
						yaxis: {ticks:3, tickDecimals: 0},
					 });
		}

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#facebookChart").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0],
							y = item.datapoint[1];

						showTooltip(item.pageX, item.pageY,
									item.series.label + " for "+ getThatDay(x)+ " is " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
	
	}
	
	function randNumTW(){
		return ((Math.floor( Math.random()* (1+40-20) ) ) + 20);
	}
	
	/* ---------- Chart with points ---------- */
	if($("#twitterChart").length)
	{	
		var followers;
		var smalls_meat = 0;
		$.post("functions/chart/small_graph.php?id=1",function(data){MeatPlant(data)},"json");
		function MeatPlant(thisValue) {
			followers = thisValue;
			smalls_meat++;
			if(smalls_meat==1)
			{
				print_small_graph_meat();
			}
		}

		function print_small_graph_meat(){
			var plot = $.plot($("#twitterChart"),
				   [ { data: followers, label: "Meat Plant Reports"} ], {
					   series: {
						   lines: { show: true,
									lineWidth: 2,
									fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
								 },
						   points: { show: true, 
									 lineWidth: 2 
								 },
						   shadowSize: 0
					   },
					   grid: { hoverable: true, 
							   clickable: true, 
							   tickColor: "#f9f9f9",
							   borderWidth: 0
							 },
					   colors: ["#C4570F"],
						xaxis: {ticks:6, tickDecimals: 0},
						yaxis: {ticks:3, tickDecimals: 0},
					 });
		}

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#twitterChart").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0],
							y = item.datapoint[1];

						showTooltip(item.pageX, item.pageY,
									item.series.label + " for "+getThatDay(x)+" is " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
	
	}

	/* ---------- Chart with points ---------- */
	if($("#WarehouseChart").length)
	{	

		var followers;
		var smalls_warehouse= 0;
		$.post("functions/chart/small_graph.php?id=2",function(data){Warehouse(data)},"json");
		function Warehouse(thisValue) {
			followers = thisValue;
			smalls_warehouse++;
			if(smalls_warehouse==1)
			{
				print_small_graph_wh();
			}
		}

		function print_small_graph_wh(){
			var plot = $.plot($("#WarehouseChart"),
				   [ { data: followers, label: "Warehouse Reports"} ], {
					   series: {
						   lines: { show: true,
									lineWidth: 2,
									fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
								 },
						   points: { show: true, 
									 lineWidth: 2 
								 },
						   shadowSize: 0
					   },
					   grid: { hoverable: true, 
							   clickable: true, 
							   tickColor: "#f9f9f9",
							   borderWidth: 0
							 },
					   colors: ["#11C11E"],
						xaxis: {ticks:6, tickDecimals: 0},
						yaxis: {ticks:3, tickDecimals: 0},
					 });
		}

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#WarehouseChart").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0],
							y = item.datapoint[1];

						showTooltip(item.pageX, item.pageY,
									item.series.label + " for "+ getThatDay(x)+" is " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
	
	}

	/* ---------- Chart with points ---------- */
	if($("#HospitalityChart").length)
	{

		var followers;
		var smalls_h= 0;
		$.post("functions/chart/small_graph.php?id=3",function(data){Hospitality(data)},"json");
		function Hospitality(thisValue) {
			followers = thisValue;
			smalls_h++;
			if(smalls_h==1)
			{
				print_small_graph_h();
			}
		}	

		function print_small_graph_h(){
		var plot = $.plot($("#HospitalityChart"),
			   [ { data: followers, label: "Hospitality Reports"} ], {
				   series: {
					   lines: { show: true,
								lineWidth: 2,
								fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
							 },
					   points: { show: true, 
								 lineWidth: 2 
							 },
					   shadowSize: 0
				   },
				   grid: { hoverable: true, 
						   clickable: true, 
						   tickColor: "#f9f9f9",
						   borderWidth: 0
						 },
				   colors: ["#1BB2E9"],
					xaxis: {ticks:6, tickDecimals: 0},
					yaxis: {ticks:3, tickDecimals: 0},
				 });
		}

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#HospitalityChart").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0],
							y = item.datapoint[1];

						showTooltip(item.pageX, item.pageY,
									item.series.label + " for "+ getThatDay(x)+ " is " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
	
	}
	

	if($("#activeUsers").length) {
	    var d1 = [];
	    
	    for (var i = 0; i <= 160; i += 1) {
	        d1.push([i, parseInt(Math.random() * 123123)]);
		}	

	    var stack = 0, bars = true, lines = false, steps = false;

	    function plotWithOptions2() {
					
	        $.plot($("#activeUsers"), [ d1 ], {
	            series: {
	                bars: { show: bars, 
							fill: true, 
							barWidth: 0.1, 
							align: "center",
							lineWidth: 5,
							fillColor: { colors: [ { opacity: 1 }, { opacity: 0.5 } ] }
						},
	            },
				grid: { hoverable: true, 
						   clickable: true, 
						   tickColor: "#f6f6f6",
						   borderWidth: 0,
						},
				colors: ["#CBE968"],
				xaxis: {ticks:0, tickDecimals: 0, tickFormatter: function(v, a) {return v }},
				yaxis: {ticks:5, tickDecimals: 0, tickFormatter: function (v) { return v }},
	
	        });
	    }
	
	    plotWithOptions2();

	}
	
	/* ---------- Chart with points ---------- */
	if($("#stats-chart").length)
	{
		var visitors = [[1, randNum()-10], [2, randNum()-10], [3, randNum()-10], [4, randNum()],[5, randNum()],[6, 4+randNum()],[7, 5+randNum()],[8, 6+randNum()],[9, 6+randNum()],[10, 8+randNum()],[11, 9+randNum()],[12, 10+randNum()],[13,11+randNum()],[14, 12+randNum()],[15, 13+randNum()],[16, 14+randNum()],[17, 15+randNum()],[18, 15+randNum()],[19, 16+randNum()],[20, 17+randNum()],[21, 18+randNum()],[22, 19+randNum()],[23, 20+randNum()],[24, 21+randNum()],[25, 14+randNum()],[26, 24+randNum()],[27,25+randNum()],[28, 26+randNum()],[29, 27+randNum()], [30, 31+randNum()]];

		var plot = $.plot($("#stats-chart"),
			   [ { data: visitors, label: "visitors" } ], {
				   series: {
					   lines: { show: true,
								lineWidth: 3,
								fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
							 },
					   points: { show: true },
					   shadowSize: 2
				   },
				   grid: { hoverable: true, 
						   clickable: true, 
						   tickColor: "#eee",
						   borderWidth: 0,
						 },
				   colors: ["#b1d3d4"],
					xaxis: {ticks:11, tickDecimals: 0},
					yaxis: {ticks:11, tickDecimals: 0},
				 });

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#stats-chart").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);

						showTooltip(item.pageX, item.pageY,
									item.series.label + " of " + x + " = " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
		


		$("#sincos").bind("plotclick", function (event, pos, item) {
			if (item) {
				$("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
				plot.highlight(item.series, item.datapoint);
			}
		});
	}
	
	
	
	/* ---------- Chart with points ---------- */
	if($("#sincos").length)
	{
		var sin = [], cos = [];

		for (var i = 0; i < 14; i += 0.5) {
			sin.push([i, Math.sin(i)/i]);
			cos.push([i, Math.cos(i)]);
		}

		var plot = $.plot($("#sincos"),
			   [ { data: sin, label: "sin(x)/x"}, { data: cos, label: "cos(x)" } ], {
				   series: {
					   lines: { show: true,
								lineWidth: 2,
							 },
					   points: { show: true },
					   shadowSize: 2
				   },
				   grid: { hoverable: true, 
						   clickable: true, 
						   tickColor: "#dddddd",
						   borderWidth: 0 
						 },
				   yaxis: { min: -1.2, max: 1.2 },
				   colors: ["#FA5833", "#2FABE9"]
				 });

		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#dfeffc',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#sincos").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;

						$("#tooltip").remove();
						var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);

						showTooltip(item.pageX, item.pageY,
									item.series.label + " of " + x + " = " + y);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;
				}
		});
		


		$("#sincos").bind("plotclick", function (event, pos, item) {
			if (item) {
				$("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
				plot.highlight(item.series, item.datapoint);
			}
		});
	}
	
	/* ---------- Flot chart ---------- */
	if($("#flotchart").length)
	{
		var d1 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.25)
			d1.push([i, Math.sin(i)]);
		
		var d2 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.25)
			d2.push([i, Math.cos(i)]);

		var d3 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.1)
			d3.push([i, Math.tan(i)]);
		
		$.plot($("#flotchart"), [
			{ label: "sin(x)",  data: d1},
			{ label: "cos(x)",  data: d2},
			{ label: "tan(x)",  data: d3}
		], {
			series: {
				lines: { show: true },
				points: { show: true }
			},
			xaxis: {
				ticks: [0, [Math.PI/2, "\u03c0/2"], [Math.PI, "\u03c0"], [Math.PI * 3/2, "3\u03c0/2"], [Math.PI * 2, "2\u03c0"]]
			},
			yaxis: {
				ticks: 10,
				min: -2,
				max: 2
			},
			grid: {	tickColor: "#dddddd",
					borderWidth: 0 
			},
			colors: ["#FA5833", "#2FABE9", "#FABB3D"]
		});
	}
	
	/* ---------- Stack chart ---------- */
	if($("#stackchart").length)
	{
		var d1 = [];
		for (var i = 0; i <= 10; i += 1)
		d1.push([i, parseInt(Math.random() * 30)]);

		var d2 = [];
		for (var i = 0; i <= 10; i += 1)
			d2.push([i, parseInt(Math.random() * 30)]);

		var d3 = [];
		for (var i = 0; i <= 10; i += 1)
			d3.push([i, parseInt(Math.random() * 30)]);

		var stack = 0, bars = true, lines = false, steps = false;

		function plotWithOptions() {
			$.plot($("#stackchart"), [ d1, d2, d3 ], {
				series: {
					stack: stack,
					lines: { show: lines, fill: true, steps: steps },
					bars: { show: bars, barWidth: 0.6 },
				},
				colors: ["#FA5833", "#2FABE9", "#FABB3D"]
			});
		}

		plotWithOptions();

		$(".stackControls input").click(function (e) {
			e.preventDefault();
			stack = $(this).val() == "With stacking" ? true : null;
			plotWithOptions();
		});
		$(".graphControls input").click(function (e) {
			e.preventDefault();
			bars = $(this).val().indexOf("Bars") != -1;
			lines = $(this).val().indexOf("Lines") != -1;
			steps = $(this).val().indexOf("steps") != -1;
			plotWithOptions();
		});
	}
	
	/* ---------- Device chart ---------- */
	
	var data = [
	{ label: "Desktop",  data: 73},
	{ label: "Mobile",  data: 27}
	];
	
	/* ---------- Donut chart ---------- */
	if($("#deviceChart").length)
	{
		$.plot($("#deviceChart"), data,
		{
				series: {
						pie: {
								innerRadius: 0.6,
								show: true
						}
				},
				legend: {
					show: true
				},
				colors: ["#FA5833", "#2FABE9", "#FABB3D", "#78CD51"]
		});
	}
	
	var data = [
	{ label: "iOS",  data: 20},
	{ label: "Android",  data: 7},
	{ label: "Linux",  data: 11},
	{ label: "Mac OSX",  data: 14},
	{ label: "Windows",  data: 48}
	];
	
	/* ---------- Donut chart ---------- */
	if($("#osChart").length)
	{
		$.plot($("#osChart"), data,
		{
				series: {
						pie: {
								innerRadius: 0.6,
								show: true
						}
				},
				legend: {
					show: true
				},
				colors: ["#FA5833", "#2FABE9", "#FABB3D", "#78CD51"]
		});
	}

	/* ---------- Pie chart ---------- */
	var data = [
	{ label: "Internet Explorer",  data: 12},
	{ label: "Mobile",  data: 27},
	{ label: "Safari",  data: 85},
	{ label: "Opera",  data: 64},
	{ label: "Firefox",  data: 90},
	{ label: "Chrome",  data: 112}
	];
	
	if($("#piechart").length)
	{
		$.plot($("#piechart"), data,
		{
			series: {
					pie: {
							show: true
					}
			},
			grid: {
					hoverable: true,
					clickable: true
			},
			legend: {
				show: false
			},
			colors: ["#FA5833", "#2FABE9", "#FABB3D", "#78CD51"]
		});
		
		function pieHover(event, pos, obj)
		{
			if (!obj)
					return;
			percent = parseFloat(obj.series.percent).toFixed(2);
			$("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
		}
		$("#piechart").bind("plothover", pieHover);
	}
	
	/* ---------- Donut chart ---------- */
	if($("#donutchart").length)
	{
		$.plot($("#donutchart"), data,
		{
				series: {
						pie: {
								innerRadius: 0.5,
								show: true
						}
				},
				legend: {
					show: false
				},
				colors: ["#FA5833", "#2FABE9", "#FABB3D", "#78CD51"]
		});
	}




	 // we use an inline data source in the example, usually data would
	// be fetched from a server
	var data = [], totalPoints = 300;
	function getRandomData() {
		if (data.length > 0)
			data = data.slice(1);

		// do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			var y = prev + Math.random() * 10 - 5;
			if (y < 0)
				y = 0;
			if (y > 100)
				y = 100;
			data.push(y);
		}

		// zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i)
			res.push([i, data[i]])
		return res;
	}

	// setup control widget
	var updateInterval = 30;
	$("#updateInterval").val(updateInterval).change(function () {
		var v = $(this).val();
		if (v && !isNaN(+v)) {
			updateInterval = +v;
			if (updateInterval < 1)
				updateInterval = 1;
			if (updateInterval > 2000)
				updateInterval = 2000;
			$(this).val("" + updateInterval);
		}
	});

	/* ---------- Realtime chart ---------- */
	if($("#serverLoad").length)
	{	
		var options = {
			series: { shadowSize: 1 },
			lines: { show: true, lineWidth: 3, fill: true, fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.9 } ] }},
			yaxis: { min: 0, max: 100, tickFormatter: function (v) { return v + "%"; }},
			xaxis: { show: false },
			colors: ["#FA5833"],
			grid: {	tickColor: "#f9f9f9",
					borderWidth: 0, 
			},
		};
		var plot = $.plot($("#serverLoad"), [ getRandomData() ], options);
		function update() {
			plot.setData([ getRandomData() ]);
			// since the axes don't change, we don't need to call plot.setupGrid()
			plot.draw();
			
			setTimeout(update, updateInterval);
		}

		update();
	}
	
	if($("#realtimechart").length)
	{
		var options = {
			series: { shadowSize: 1 },
			lines: { fill: true, fillColor: { colors: [ { opacity: 1 }, { opacity: 0.1 } ] }},
			yaxis: { min: 0, max: 100 },
			xaxis: { show: false },
			colors: ["#F4A506"],
			grid: {	tickColor: "#dddddd",
					borderWidth: 0 
			},
		};
		var plot = $.plot($("#realtimechart"), [ getRandomData() ], options);
		function update() {
			plot.setData([ getRandomData() ]);
			// since the axes don't change, we don't need to call plot.setupGrid()
			plot.draw();
			
			setTimeout(update, updateInterval);
		}

		update();
	}
}

function growlLikeNotifications() {
	
	$('#add-sticky').click(function(){

		var unique_id = $.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a sticky notice!',
			// (string | mandatory) the text inside the notification
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			// (string | optional) the image to display on the left
			image: 'img/avatar.jpg',
			// (bool | optional) if you want it to fade out on its own or just sit there
			sticky: true,
			// (int | optional) the time you want it to be alive for before fading out
			time: '',
			// (string | optional) the class name you want to apply to that specific message
			class_name: 'my-sticky-class'
		});

		// You can have it return a unique id, this can be used to manually remove it later using
		/* ----------
		setTimeout(function(){

			$.gritter.remove(unique_id, {
				fade: true,
				speed: 'slow'
			});

		}, 6000)
		*/

		return false;

	});

	$('#add-regular').click(function(){

		$.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a regular notice!',
			// (string | mandatory) the text inside the notification
			text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			// (string | optional) the image to display on the left
			image: 'img/avatar.jpg',
			// (bool | optional) if you want it to fade out on its own or just sit there
			sticky: false,
			// (int | optional) the time you want it to be alive for before fading out
			time: ''
		});

		return false;

	});

    $('#add-max').click(function(){

        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a notice with a max of 3 on screen at one time!',
            // (string | mandatory) the text inside the notification
            text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
            // (string | optional) the image to display on the left
            image: 'img/avatar.jpg',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (function) before the gritter notice is opened
            before_open: function(){
                if($('.gritter-item-wrapper').length == 3)
                {
                    // Returning false prevents a new gritter from opening
                    return false;
                }
            }
        });

        return false;

    });

	$('#add-without-image').click(function(){

		$.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a notice without an image!',
			// (string | mandatory) the text inside the notification
			text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.'
		});

		return false;
	});

    $('#add-gritter-light').click(function(){

        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a light notification',
            // (string | mandatory) the text inside the notification
            text: 'Just add a "gritter-light" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
            class_name: 'gritter-light'
        });

        return false;
    });

	$('#add-with-callbacks').click(function(){

		$.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a notice with callbacks!',
			// (string | mandatory) the text inside the notification
			text: 'The callback is...',
			// (function | optional) function called before it opens
			before_open: function(){
				alert('I am called before it opens');
			},
			// (function | optional) function called after it opens
			after_open: function(e){
				alert("I am called after it opens: \nI am passed the jQuery object for the created Gritter element...\n" + e);
			},
			// (function | optional) function called before it closes
			before_close: function(e, manual_close){
                var manually = (manual_close) ? 'The "X" was clicked to close me!' : '';
				alert("I am called before it closes: I am passed the jQuery object for the Gritter element... \n" + manually);
			},
			// (function | optional) function called after it closes
			after_close: function(e, manual_close){
                var manually = (manual_close) ? 'The "X" was clicked to close me!' : '';
				alert('I am called after it closes. ' + manually);
			}
		});

		return false;
	});

	$('#add-sticky-with-callbacks').click(function(){

		$.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a sticky notice with callbacks!',
			// (string | mandatory) the text inside the notification
			text: 'Sticky sticky notice.. sticky sticky notice...',
			// Stickeh!
			sticky: true,
			// (function | optional) function called before it opens
			before_open: function(){
				alert('I am a sticky called before it opens');
			},
			// (function | optional) function called after it opens
			after_open: function(e){
				alert("I am a sticky called after it opens: \nI am passed the jQuery object for the created Gritter element...\n" + e);
			},
			// (function | optional) function called before it closes
			before_close: function(e){
				alert("I am a sticky called before it closes: I am passed the jQuery object for the Gritter element... \n" + e);
			},
			// (function | optional) function called after it closes
			after_close: function(){
				alert('I am a sticky called after it closes');
			}
		});

		return false;

	});

	$("#remove-all").click(function(){

		$.gritter.removeAll();
		return false;

	});

	$("#remove-all-with-callbacks").click(function(){

		$.gritter.removeAll({
			before_close: function(e){
				alert("I am called before all notifications are closed.  I am passed the jQuery object containing all  of Gritter notifications.\n" + e);
			},
			after_close: function(){
				alert('I am called after everything has been closed.');
			}
		});
		return false;

	});


}


/* ---------- Additional functions for data table ---------- */
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
	return {
		"iStart":         oSettings._iDisplayStart,
		"iEnd":           oSettings.fnDisplayEnd(),
		"iLength":        oSettings._iDisplayLength,
		"iTotal":         oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		"iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
	};
}
$.extend( $.fn.dataTableExt.oPagination, {
	"bootstrap": {
		"fnInit": function( oSettings, nPaging, fnDraw ) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function ( e ) {
				e.preventDefault();
				if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
					fnDraw( oSettings );
				}
			};

			$(nPaging).addClass('pagination').append(
				'<ul>'+
					'<li class="prev disabled"><a href="#">&larr; '+oLang.sPrevious+'</a></li>'+
					'<li class="next disabled"><a href="#">'+oLang.sNext+' &rarr; </a></li>'+
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
			$(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
		},

		"fnUpdate": function ( oSettings, fnDraw ) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

			if ( oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			}
			else if ( oPaging.iPage <= iHalf ) {
				iStart = 1;
				iEnd = iListLength;
			} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for ( i=0, iLen=an.length ; i<iLen ; i++ ) {
				// remove the middle elements
				$('li:gt(0)', an[i]).filter(':not(:last)').remove();

				// add the new list items and their event handlers
				for ( j=iStart ; j<=iEnd ; j++ ) {
					sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
					$('<li '+sClass+'><a href="#">'+j+'</a></li>')
						.insertBefore( $('li:last', an[i])[0] )
						.bind('click', function (e) {
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
							fnDraw( oSettings );
						} );
				}

				// add / remove disabled classes from the static elements
				if ( oPaging.iPage === 0 ) {
					$('li:first', an[i]).addClass('disabled');
				} else {
					$('li:first', an[i]).removeClass('disabled');
				}

				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
					$('li:last', an[i]).addClass('disabled');
				} else {
					$('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	}
});

/* ---------- Page width functions ---------- */

$(window).bind("resize", widthFunctions);

function widthFunctions(e) {
	
    var winHeight = $(window).height()-100;
    var winWidth = $(window).width();

	var contentHeight = $("#content").height();

	if(winWidth > 990 || winWidth < 767){
		//alert(winWidth);
		if (winHeight) {
			
			$("#content").css("min-height",winHeight);
			
		}
	}else{$("#content").css("min-height","");}

	
	if (contentHeight) {
		
		$("#sidebar-left2").css("height",contentHeight);
		
	}

	//document.write(winWidth);
    
	if (winWidth < 1200 && winWidth > 767) {
		

		if($(".main-menu-span").hasClass("span2")) {
			
			$(".main-menu-span").removeClass("span2");
			$(".main-menu-span").addClass("span1");
			
		}
		
		if($("#content").hasClass("span10")) {
			
			$("#content").removeClass("span10");
			$("#content").addClass("span11");
			
		}

		var get_OnTablet = $('#page_identity').attr('onTablet');
		if (get_OnTablet) {
			$('#page_identity').removeClass("span9");
			$('#page_identity').addClass(get_OnTablet);	
		}
		
		
		$("a").each(function(){
			
			if($(this).hasClass("quick-button-small span1")) {

				$(this).removeClass("quick-button-small span1");
				$(this).addClass("quick-button span2 changed");
			
			}
			
		});
		
		$(".circleStatsItem, .circleStatsItemBox").each(function() {
			
			var getOnTablet = $(this).parent().attr('onTablet');
			var getOnDesktop = $(this).parent().attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).parent().removeClass(getOnDesktop);
				$(this).parent().addClass(getOnTablet);
			
			}
			  			
		});
		
		$(".tempStatBox").each(function() {
			
			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).removeClass(getOnDesktop);
				$(this).addClass(getOnTablet);
			
			}
			  			
		});
		
		$(".box").each(function(){
			
			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).removeClass(getOnDesktop);
				$(this).addClass(getOnTablet);
			
			}
			  			
		});
		
		$(".widget").each(function(){
			
			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).removeClass(getOnDesktop);
				$(this).addClass(getOnTablet);
			
			}
			  			
		});
							
	} else if(winWidth > 980) {

		var get_OnDesktop = $('#page_identity').attr('onDesktop');
			
		if (get_OnDesktop) {
			$('#page_identity').removeClass("span12");
			$('#page_identity').addClass(get_OnDesktop);		
		}

	} else {
		
		if($(".main-menu-span").hasClass("span1")) {
			
			$(".main-menu-span").removeClass("span1");
			$(".main-menu-span").addClass("span2");
			
		}
		
		if($("#content").hasClass("span11")) {
			
			$("#content").removeClass("span11");
			$("#content").addClass("span11");
			
		}
		
		$("a").each(function(){
			
			if($(this).hasClass("quick-button span2 changed")) {

				$(this).removeClass("quick-button span2 changed");
				$(this).addClass("quick-button-small span1");
			
			}
			
		});
		
		$(".circleStatsItem, .circleStatsItemBox").each(function() {
			
			var getOnTablet = $(this).parent().attr('onTablet');
			var getOnDesktop = $(this).parent().attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).parent().removeClass(getOnTablet);
				$(this).parent().addClass(getOnDesktop);
			
			}
			  			
		});
		
		$(".tempStatBox").each(function() {
			
			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).removeClass(getOnTablet);
				$(this).addClass(getOnDesktop);
			
			}
			  			
		});
		
		$(".box").each(function(){
			
			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).removeClass(getOnTablet);
				$(this).addClass(getOnDesktop);
			
			}
			  			
		});
		
		$(".widget").each(function(){
			
			var getOnTablet = $(this).attr('onTablet');
			var getOnDesktop = $(this).attr('onDesktop');
			
			if (getOnTablet) {
			
				$(this).removeClass(getOnTablet);
				$(this).addClass(getOnDesktop);
			
			}
			  			
		});
		
	}
	
	if($('.timeline')) {
		
		$('.timeslot').each(function(){
			
			var timeslotHeight = $(this).find('.task').outerHeight();
			
			$(this).css('height',timeslotHeight);
			
		});
		
	}


}