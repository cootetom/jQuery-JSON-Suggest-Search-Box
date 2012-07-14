/**
 * @name jsonSuggest
 * @type jQuery plugin
 * @author Tom Coote (tomcoote.co.uk)
 * @version 2.0.1
 * @copyright Copyright 2011 Tom Coote
 * @license released under the BSD (3-clause) licences
 */
 (function($){$.fn.jsonSuggest=function(settings){var defaults={url:'',data:[],minCharacters:1,maxResults:undefined,wildCard:'',caseSensitive:false,notCharacter:'!',maxHeight:350,highlightMatches:true,onSelect:undefined,width:undefined,property:'text'},getJSONTimeout;settings=$.extend(defaults,settings);return this.each(function(){function regexEscape(txt,omit){var specials=['/','.','*','+','?','|','(',')','[',']','{','}','\\'];if(omit){for(var i=0;i<specials.length;i++){if(specials[i]===omit){specials.splice(i,1);}}}
 var escapePatt=new RegExp('(\\'+specials.join('|\\')+')','g');return txt.replace(escapePatt,'\\$1');}
 var obj=$(this),wildCardPatt=new RegExp(regexEscape(settings.wildCard||''),'g'),results=$('<ul />'),currentSelection,pageX,pageY;function selectResultItem(item){obj.val(item[settings.property]);$(results).html('').hide();if(typeof settings.onSelect==='function'){settings.onSelect(item);}}
 function setHoverClass(el){$('li a',results).removeClass('ui-state-hover');if(el){$('a',el).addClass('ui-state-hover');}
 currentSelection=el;}
 function buildResults(resultObjects,filterTxt){filterTxt='('+filterTxt+')';var bOddRow=true,i,iFound=0,filterPatt=settings.caseSensitive?new RegExp(filterTxt,'g'):new RegExp(filterTxt,'ig');$(results).html('').hide();for(i=0;i<resultObjects.length;i+=1){var item=$('<li />'),text=resultObjects[i][settings.property];if(settings.highlightMatches===true){text=text.replace(filterPatt,'<strong>$1</strong>');}
 $(item).append('<a class="ui-corner-all">'+text+'</a>');if(typeof resultObjects[i].image==='string'){$('>a',item).prepend('<img src="'+resultObjects[i].image+'" />');}
 if(typeof resultObjects[i].extra==='string'){$('>a',item).append('<small>'+resultObjects[i].extra+'</small>');}
 $(item).addClass('ui-menu-item').addClass((bOddRow)?'odd':'even').attr('role','menuitem').click((function(n){return function(){selectResultItem(resultObjects[n]);};})(i)).mouseover((function(el){return function(){setHoverClass(el);};})(item));$(results).append(item);bOddRow=!bOddRow;iFound+=1;if(typeof settings.maxResults==='number'&&iFound>=settings.maxResults){break;}}
 if($('li',results).length>0){currentSelection=undefined;$(results).show().css('height','auto');if($(results).height()>settings.maxHeight){$(results).css({'overflow':'auto','height':settings.maxHeight+'px'});}}}
 function runSuggest(e){var search=function(searchData){if(this.value.length<settings.minCharacters){$(results).html('').hide();return false;}
 var resultObjects=[],filterTxt=(!settings.wildCard)?regexEscape(this.value):regexEscape(this.value,settings.wildCard).replace(wildCardPatt,'.*'),bMatch=true,filterPatt,i;if(settings.notCharacter&&filterTxt.indexOf(settings.notCharacter)===0){filterTxt=filterTxt.substr(settings.notCharacter.length,filterTxt.length);if(filterTxt.length>0){bMatch=false;}}
 filterTxt=filterTxt||'.*';filterTxt=settings.wildCard?'^'+filterTxt:filterTxt;filterPatt=settings.caseSensitive?new RegExp(filterTxt):new RegExp(filterTxt,'i');for(i=0;i<searchData.length;i+=1){if(filterPatt.test(searchData[i][settings.property])===bMatch){resultObjects.push(searchData[i]);}}
 buildResults(resultObjects,filterTxt);};if(settings.data&&settings.data.length){search.apply(this,[settings.data]);}
 else if(settings.url&&typeof settings.url==='string'){var text=this.value;$(results).html('<li class="ui-menu-item ajaxSearching"><a class="ui-corner-all">Searching...</a></li>').show().css('height','auto');getJSONTimeout=window.clearTimeout(getJSONTimeout);getJSONTimeout=window.setTimeout(function(){$.getJSON(settings.url,{search:text},function(data){if(data){buildResults(data,text);}
 else{$(results).html('').hide();}});},500);}}
 function keyListener(e){switch(e.keyCode){case 13:$(currentSelection).trigger('click');return false;case 40:if(typeof currentSelection==='undefined'){currentSelection=$('li:first',results).get(0);}
 else{currentSelection=$(currentSelection).next().get(0);}
 setHoverClass(currentSelection);if(currentSelection){$(results).scrollTop(currentSelection.offsetTop);}
 return false;case 38:if(typeof currentSelection==='undefined'){currentSelection=$('li:last',results).get(0);}
 else{currentSelection=$(currentSelection).prev().get(0);}
 setHoverClass(currentSelection);if(currentSelection){$(results).scrollTop(currentSelection.offsetTop);}
 return false;default:runSuggest.apply(this,[e]);}}
 $(results).addClass('jsonSuggest ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all').attr('role','listbox').css({'top':(obj.position().top+obj.outerHeight())+'px','left':obj.position().left+'px','width':settings.width||(obj.outerWidth()+'px'),'z-index':999}).hide();obj.after(results).keyup(keyListener).keydown(function(e){if(e.keyCode===9&&currentSelection){$(currentSelection).trigger('click');return true;}}).blur(function(e){var resPos=$(results).offset();resPos.bottom=resPos.top+$(results).height();resPos.right=resPos.left+$(results).width();if(pageY<resPos.top||pageY>resPos.bottom||pageX<resPos.left||pageX>resPos.right){$(results).hide();}}).focus(function(e){$(results).css({'top':(obj.position().top+obj.outerHeight())+'px','left':obj.position().left+'px'});if($('li',results).length>0){$(results).show();}}).attr('autocomplete','off');$(window).mousemove(function(e){pageX=e.pageX;pageY=e.pageY;});settings.notCharacter=regexEscape(settings.notCharacter||'');if(settings.data&&typeof settings.data==='string'){settings.data=$.parseJSON(settings.data);}});};})(jQuery);