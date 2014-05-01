(function(window) {
	var HEADER_HEIGHT = 180;
	var DEFAULT_NAV_HEIGHT_PLUS_BOTTOM_OFFSET = 55;
	var HEADER_HEIGHT_PLUS_NAV_OFFSET = 235;  

	bind_header_click();
	bind_nav_links();

	var current_page = '';
	
	function bind_header_click()
	{
		$('header').on('click', function(e) {
			process_header_click();
		});
	}

	function bind_nav_links()
	{
		$('#nav_container a').on('click', function(e) {
			var $target_element = $(e.target);
			var target_element_id = $target_element.attr('id');
			
			var index = target_element_id.indexOf('__');
			var page_type = target_element_id.substring(index + 2);

			$('.nav_selected').removeClass('nav_selected');
			$target_element.addClass('nav_selected');

			process_nav_click(page_type);
		});
	}

	function process_header_click()
	{
		$('.nav_selected').removeClass('nav_selected');

		// Slide down iphone
		slide_down_iphone();

		// Hide transparency
		hide_transparent_content();	

		// Slide down nav
		slide_down_nav(function() {show_appstore_icon()});

		current_page = '';
	}

	function process_nav_click(page_type)
	{
		if (page_type == current_page)
		{
			process_header_click();
			return;
		}
		else
		{
			current_page = page_type;
		}

		// Hide appstore icon
		hide_appstore_icon();

		// Slide up nav
		slide_up_nav();

		// Show transparency
		show_transparent_content(page_type);

		// Slide up iphone
		slide_up_iphone();	
	}

	function show_appstore_icon()
	{
		$('#app_store_img_link').show();
	}

	function hide_appstore_icon()
	{
		$('#app_store_img_link').hide();
	}

	function slide_down_nav(callback)
	{
		$('#nav_container').animate({
			bottom: 15 + "px",
		}, 
			300, function() {
				callback();
			}
		);	
	}

	function slide_up_nav()
	{
		var window_height = $(window).height();
		var new_nav_botton_value = window_height - HEADER_HEIGHT_PLUS_NAV_OFFSET;
		$('#nav_container').animate({
			bottom: new_nav_botton_value + "px",
		}, 
			300, function() {}
		);
	}

	function hide_transparent_content()
	{
		var window_height = $(window).height();
		var new_transparent_container_wrapper_height = window_height - HEADER_HEIGHT_PLUS_NAV_OFFSET;

		var $transparent_container_wrapper = $('#transparent_container_wrapper');
		var $transparent_container = $('#transparent_container');

		$transparent_container.animate({
			top: new_transparent_container_wrapper_height + "px",
		}, 
			300, function() {
				$transparent_container_wrapper.addClass('hide');
			}
		);
	}

	function show_transparent_content(page_to_show)
	{
		var $page_to_show = $('#' + page_to_show + '_content');

		// hide all existing nav pages
		$('.transparent_content').hide();

		$page_to_show.show();

		var window_height = $(window).height();
		var new_transparent_container_wrapper_height = window_height - HEADER_HEIGHT_PLUS_NAV_OFFSET;

		// Set height of transparent container wrapper
		var $transparent_container_wrapper = $('#transparent_container_wrapper');
		$transparent_container_wrapper.css('height', new_transparent_container_wrapper_height + 'px');
		
		var $transparent_container = $('#transparent_container');
		$transparent_container.css('height', new_transparent_container_wrapper_height - 50 + 'px');
		$transparent_container.css('top', new_transparent_container_wrapper_height + 'px');

		$transparent_container_wrapper.removeClass('hide');
		
		$transparent_container.animate({
			top: 0 + "px",
		}, 
			300, function() {}
		);
	}

	function slide_up_iphone()
	{
		$('#iphone_img').animate({
			bottom: "-75px",
		}, 
			300, function() {}
		);
	}

	function slide_down_iphone()
	{
		$('#iphone_img').animate({
			bottom: "-250px",
		}, 
			300, function() {}
		);	
	}

})(window);