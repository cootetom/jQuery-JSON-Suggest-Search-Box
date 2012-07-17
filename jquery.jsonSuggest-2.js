/*jshint curly: true, eqeqeq: true, undef: true, devel: true, browser: true */
/*global jQuery */
 
/**
 * Turn a text box into an auto suggest box which search's and 
 * displays results specified in a JSON string
 * 
 *
 * @name jsonSuggest
 * @type jQuery plugin
 * @author Tom Coote (tomcoote.co.uk)
 * @version 2.0.1
 * @copyright Copyright 2011 Tom Coote
 * @license released under the BSD (3-clause) licences
 * 
 * @param settings <object>;
 *			url :				[default ''] A URL that will return a JSON response. Called via $.getJSON, it is passed a 
 * 								 data dictionary containing the user typed search phrase. It must return a JSON string that
 *								 represents the array of results to display.
 * 			urlData :			[default {}] Additionnal data you send when requesting the url.
 *			urlMethod			[default 'get'] Method of the request.
 *			data :				[default []]An array or JSON string representation of an array of data to search through.
 *								 Example of the array format is as follows:
									[
										{
											id: 1,
											text: 'Thomas',
											image: 'img/avator1.jpg',	// optional
											extra: 'www.thomas.com'	// optional
										},
										{
											id: 2,
											text: 'Frederic',
											image: 'img/avator2.jpg',	// optional
											extra: 'www.freddy.com'	// optional
										},
										{
											id: 2,
											text: 'James',
											image: 'img/avator2.jpg',	// optional
											extra: 'www.james.com'	// optional
										}
									]
 *			minCharacters :		[default 1] Number of characters that the input should accept before running a search.
 *			maxResults :		[default undefined] If set then no more results than this number will be found.
 *			wildCard :			[default ''] A character to be used as a match all wildcard when searching. Leaving empty 
 *								 will mean results are matched inside strings but if a wildCard is present then results are 
 *								 matched from the beginning of strings.
 *			caseSensitive :		[default false] True if the filter search's are to be case sensitive.
 *			notCharacter :		[default !] The character to use at the start of any search text to specify that the results 
 *								 should NOT contain the following text.
 *			maxHeight :			[default 350] This is the maximum height that the results box can reach before scroll bars 
 *								 are shown instead of getting taller.	
 *			width:				[default undefined] If set this will become the width of the results box else the box will be 
 *								 the same width as the input.
 *			highlightMatches : 	[default true] This will add strong tags around the text that matches the search text in each result.
 *			onSelect :			[default undefined] Function that gets called once a result has been selected, gets passed in 
 *								 the object version of the result as specified in the JSON data.
 *			
 */

(function($) {

	$.fn.jsonSuggest = function(settings) {
		var defaults = {  
				url: '',
				urlData: {},
				urlMethod: 'get',
				data: [],
				minCharacters: 1,
				maxResults: undefined,
				wildCard: '',
				caseSensitive: false,
				notCharacter: '!',
				maxHeight: 350,
				highlightMatches: true,
				onSelect: undefined,
				width: undefined,
        property: 'text'
			},
			getJSONTimeout;
		settings = $.extend(defaults, settings);  
	
		return this.each(function() {
			/**
			* Escape some text so that it can be used inside a regular expression
			* without implying regular expression rules iself. 
			*/
			function regexEscape(txt, omit) {
				var specials = ['/', '.', '*', '+', '?', '|',
								'(', ')', '[', ']', '{', '}', '\\'];
				
				if (omit) {
					for (var i = 0; i < specials.length; i++) {
						if (specials[i] === omit) { specials.splice(i,1); }
					}
				}
				
				var escapePatt = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
				return txt.replace(escapePatt, '\\$1');
			}
			
			var obj = $(this),
				wildCardPatt = new RegExp(regexEscape(settings.wildCard || ''),'g'),
				results = $('<ul />'),
				currentSelection, pageX, pageY;
			
			/**
			* When an item has been selected then update the input box,
			* hide the results again and if set, call the onSelect function.
			*/
			function selectResultItem(item) {
				obj.val(item[settings.property]);
				$(results).html('').hide();
				
				if (typeof settings.onSelect === 'function') {
					settings.onSelect(item);
				}
			}

			/**
			* Used to get rid of the hover class on all result item elements in the
			* current set of results and add it only to the given element. We also
			* need to set the current selection to the given element here.
			*/
			function setHoverClass(el) {
				$('li a', results).removeClass('ui-state-hover');
				if (el) {
					$('a', el).addClass('ui-state-hover');
				}
				
				currentSelection = el;
			}
			
			/**
			* Build the results HTML based on an array of objects that matched
			* the search criteria, highlight the matches if that feature is turned 
			* on in the settings.
			*/
			function buildResults(resultObjects, filterTxt) {
				filterTxt = '(' + filterTxt + ')';
			
				var bOddRow = true, i, iFound = 0,
					filterPatt = settings.caseSensitive ? new RegExp(filterTxt, 'g') : new RegExp(filterTxt, 'ig');
					
				$(results).html('').hide();
				
				for (i = 0; i < resultObjects.length; i += 1) {
					var item = $('<li />'),
						text = resultObjects[i][settings.property];
						
					if (settings.highlightMatches === true) {
						text = text.replace(filterPatt, '<strong>$1</strong>');
					}
					
					$(item).append('<a class="ui-corner-all">' + text + '</a>');
					
					if (typeof resultObjects[i].image === 'string') {
						$('>a', item).prepend('<img src="' + resultObjects[i].image + '" />');
					}
					
					if (typeof resultObjects[i].extra === 'string') {
						$('>a', item).append('<small>' + resultObjects[i].extra + '</small>');
					}
					
					$(item).addClass('ui-menu-item').
						addClass((bOddRow) ? 'odd' : 'even').
						attr('role', 'menuitem').
						click((function(n) { return function() {
							selectResultItem(resultObjects[n]);						
						};})(i)).
						mouseover((function(el) { return function() { 
							setHoverClass(el); 
						};})(item));
					
					$(results).append(item);
					
					bOddRow = !bOddRow;
					
					iFound += 1;
					if (typeof settings.maxResults === 'number' && iFound >= settings.maxResults) {
						break;
					}
				}
				
				if ($('li', results).length > 0) {
					currentSelection = undefined;
					$(results).show().css('height', 'auto');
					
					if ($(results).height() > settings.maxHeight) {
						$(results).css({'overflow': 'auto', 'height': settings.maxHeight + 'px'});
					}
				}
			}
			
			/**
			* Prepare the search data based on the settings for this plugin,
			* run a match against each item in the possible results and display any 
			* results on the page allowing selection by the user.
			*/
			function runSuggest(e) {	
				var search = function(searchData) {
					if (this.value.length < settings.minCharacters) {
						$(results).html('').hide();
						return false;
					}
					
					var resultObjects = [],
						filterTxt = (!settings.wildCard) ? regexEscape(this.value) : regexEscape(this.value, settings.wildCard).replace(wildCardPatt, '.*'),
						bMatch = true, 
						filterPatt, i;
							
					if (settings.notCharacter && filterTxt.indexOf(settings.notCharacter) === 0) {
						filterTxt = filterTxt.substr(settings.notCharacter.length,filterTxt.length);
						if (filterTxt.length > 0) { bMatch = false; }
					}
					filterTxt = filterTxt || '.*';
					filterTxt = settings.wildCard ? '^' + filterTxt : filterTxt;
					filterPatt = settings.caseSensitive ? new RegExp(filterTxt) : new RegExp(filterTxt, 'i');
					
					// Look for the required match against each single search data item. When the not
					// character is used we are looking for a false match. 
					for (i = 0; i < searchData.length; i += 1) {
						if (filterPatt.test(searchData[i][settings.property]) === bMatch) {
							resultObjects.push(searchData[i]);
						}
					}
					
					buildResults(resultObjects, filterTxt);
				};
				
				if (settings.data && settings.data.length) {
					search.apply(this, [settings.data]);
				}
				else if (settings.url && typeof settings.url === 'string') {
					var text = this.value;
					$(results).html('<li class="ui-menu-item ajaxSearching"><a class="ui-corner-all">Searching...</a></li>').
						show().css('height', 'auto');
					
					getJSONTimeout = window.clearTimeout(getJSONTimeout);
					getJSONTimeout = window.setTimeout(function() {
						$.ajax({
					                url: settings.url,
					                dataType: 'json',
					                data: $.extend(settings.urlData, {search: text}),
					                type: settings.urlMethod,
					                success: function(data) {
					                  if (data) {
					                    buildResults(data, text);
					                  }
					                  else {
					                    $(results).html('').hide();
					                  }
					                }
				                });
					}, 500);
				}
			}
			
			/**
			* To call specific actions based on the keys pressed in the input
			* box. Special keys are up, down and return. All other keys
			* act as normal.
			*/
			function keyListener(e) {
				switch (e.keyCode) {
					case 13: // return key
						$(currentSelection).trigger('click');
						return false;
					case 40: // down key
						if (typeof currentSelection === 'undefined') {
							currentSelection = $('li:first', results).get(0);
						}
						else {
							currentSelection = $(currentSelection).next().get(0);
						}
						
						setHoverClass(currentSelection);
						if (currentSelection) {
							$(results).scrollTop(currentSelection.offsetTop);
						}
						
						return false;
					case 38: // up key
						if (typeof currentSelection === 'undefined') {
							currentSelection = $('li:last', results).get(0);
						}
						else {
							currentSelection = $(currentSelection).prev().get(0);
						}
						
						setHoverClass(currentSelection);
						if (currentSelection) {
							$(results).scrollTop(currentSelection.offsetTop);
						}
						
						return false;
					default:
						runSuggest.apply(this, [e]);
				}
			}
			
			// Prepare the input box to show suggest results by adding in the events
			// that will initiate the search and placing the element on the page
			// that will show the results.
			$(results).addClass('jsonSuggest ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all').
				attr('role', 'listbox').
				css({
					'top': (obj.position().top + obj.outerHeight()) + 'px',
					'left': obj.position().left + 'px',
					'width': settings.width || (obj.outerWidth() + 'px'),
					'z-index': 999
				}).hide();
				
			obj.after(results).
				keyup(keyListener).
				keydown(function(e) {
					// for tab key only
					if (e.keyCode === 9 && currentSelection) {
						$(currentSelection).trigger('click');
						return true;
					}
				}).
				blur(function(e) {
					// We need to make sure we don't hide the result set
					// if the input blur event is called because of clicking on
					// a result item.
					var resPos = $(results).offset();
					resPos.bottom = resPos.top + $(results).height();
					resPos.right = resPos.left + $(results).width();
					
					if (pageY < resPos.top || pageY > resPos.bottom || pageX < resPos.left || pageX > resPos.right) {
						$(results).hide();
					}
				}).
				focus(function(e) {
					$(results).css({
						'top': (obj.position().top + obj.outerHeight()) + 'px',
						'left': obj.position().left + 'px'
					});
				
					if ($('li', results).length > 0) {
						$(results).show();
					}
				}).
				attr('autocomplete', 'off');
			$(window).mousemove(function(e) {
				pageX = e.pageX;
				pageY = e.pageY;
			});
			
			// Escape the not character if present so that it doesn't act in the regular expression
			settings.notCharacter = regexEscape(settings.notCharacter || '');
			
			// Make sure the JSON data is a JavaScript object if given as a string.
			if (settings.data && typeof settings.data === 'string') {
				settings.data = $.parseJSON(settings.data);
			}
		});
	};

})(jQuery);