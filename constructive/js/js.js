var sidebarVisible = false;
		var currentPageID = "#tm-section-1";
		function setupCarousel() {
			if($('#tm-section-2').css('display') == "none") {
			}
			else {
				var slider = $('.tm-img-slider');
				var windowWidth = $(window).width();
				if (slider.hasClass('slick-initialized')) {
					slider.slick('destroy');
				}
				if(windowWidth < 640) {
					slider.slick({
	              		dots: true,
	              		infinite: false,
	              		slidesToShow: 1,
	              		slidesToScroll: 1
	              	});
				}
				else if(windowWidth < 992) {
					slider.slick({
	              		dots: true,
	              		infinite: false,
	              		slidesToShow: 2,
	              		slidesToScroll: 1
	              	});
				}
				else {
	              	slider.slick({
	              		dots: true,
	              		infinite: false,
	              		slidesToShow: 3,
	              		slidesToScroll: 2
	              	});
				}
				$('.tm-img-slider').magnificPopup({
				  delegate: 'a',
				  type: 'image',
				  gallery: {enabled:true}
				});
      		}
  		}
  		function setupNav() {
	     	$(".tm-main-nav a").click(function(e){
	     		e.preventDefault();
		    	var currentNavItem = $(this);
		    	changePage(currentNavItem);
		    	setupCarousel();
		    	setupFooter();
		    	$("#tmSideBar").removeClass("show");
		    });	    
  		}
  		function changePage(currentNavItem) {
  			$(".tm-main-nav a").removeClass("active");
     		currentNavItem.addClass("active");
	    	$(currentPageID).hide();
	    	currentPageID = currentNavItem.data("page");
	    	$(currentPageID).fadeIn(1000);
	    	var bgImg = currentNavItem.data("bgImg");
	    	$.backstretch("img/" + bgImg);		    	
  		}
  		function setupNavToggle() {
			$("#tmMainNavToggle").on("click", function(){
				$(".sidebar").toggleClass("show");
			});
  		}
  		function setupFooter() {
  			var padding = 100;
  			var footerPadding = 40;
  			var mainContent = $("section"+currentPageID);
  			var mainContentHeight = mainContent.outerHeight(true);
  			var footer = $(".footer-link");
  			var footerHeight = footer.outerHeight(true);
  			var totalPageHeight = mainContentHeight + footerHeight + footerPadding + padding;
  			var windowHeight = $(window).height();		
  			if(totalPageHeight > windowHeight){
  				$(".tm-content").css("margin-bottom", footerHeight + footerPadding + "px");
  				footer.css("bottom", footerHeight + "px");  			
  			}
  			else {
  				$(".tm-content").css("margin-bottom", "0");
  				footer.css("bottom", "20px");  				
  			}  			
  		}
      	$(window).on("load", function(){
      		if(renderPage) {
		      	$('body').addClass('loaded');
		      	var allPages = $(".tm-section");
		      	var linkToAnotherPage = $("a.tm-btn[data-nav-link]");
			    if(linkToAnotherPage != null) {
			    	linkToAnotherPage.on("click", function(){
			    		var navItemToHighlight = linkToAnotherPage.data("navLink");
			    		$("a" + navItemToHighlight).click();
			    	});
			    }
		      	allPages.hide();
		      	$("#tm-section-1").fadeIn();
		     	var bgImg = $("#tmNavLink1").data("bgImg");
		     	$.backstretch("img/" + bgImg, {fade: 500});
			    setupCarousel();
			    setupNav();
			    setupNavToggle();
			    setupFooter();
			    $(window).resize(function() {
			    	setupCarousel();
			    	setupFooter();
			    });
      		}	      	
		});