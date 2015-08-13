$(function() {
	
	//match media
	//$('body').append('<div id="matchmedia" style="display:none;"/>');
	
	
	
  //gallery rows calculation
  $('.gallery').each(function() {
  
  	var items = $('.gallery-item', this);
    var ratios = [];
    var ratiosum = 0;
    var totalItems = items.length;
    
    //calculate items per row based on the width of the gallery
    var galleryWidth = $(this).width();
	var maxItems = 3;
	if(galleryWidth < 560) {
		maxItems = 2
	}
	if(galleryWidth > 560 && galleryWidth < 1024) {
		maxItems = 3;
	}
	if(galleryWidth > 1024) {
		maxItems = 4;
	}
    
    if (totalItems == 4) {
      maxItems = 2;
    }
    
    //loop through each item and get it's ratio
    items.each(function() {
       var width = parseInt($('.gallery-image',this).attr('data-width'));
       ratios.push(width);  
       ratiosum += width;
    });
    var avg = ratiosum/ratios.length;
    
    //loop through each item and calculate which colunm it should go it...
    var currentRow = 0;
    var photoCount = 0;
    var rows = [];
    var lastRow = false;
    
    items.each(function(index) {
      var $item = $(this);
      var width = parseInt($('.gallery-image',$item).attr('data-width'));
      
      if(index >= (totalItems - 1) && !(totalItems % maxItems) == 0 && !(totalItems == 4)) {
        lastRow = true;
      }
      
      
      if(photoCount==maxItems && !lastRow) { 
        currentRow++;
        photoCount=0;
      }
      
      rows.push({item: []});
      rows[currentRow].item.push($item);
      photoCount++;
      
    });
    
    //now use the new rows array to reflow the gallery items
    newHTML = '';
    $.each(rows, function(i) {
      if(rows[i].item.length > 0) {
        newHTML += '<ol class="gallery-row">'
        
        $.each(rows[i].item, function(j) {
          newHTML += '<li class="gallery-item">' + rows[i].item[j].html() + '</li>';
        });
        newHTML += '</ol>';
      }
    });
    
    $(this).html(newHTML);
    
  });
  
  //gallery rows
  $('.gallery-row').each(function() {
    var imagenum = $('.gallery-image', this).length;
    var totalwidth = $(this).width();
    var usedwidth = 0;
    var ratios = [];
    var ratiosum = 0;
    var items = $('.gallery-item', this);
    
    items.each(function() {
        usedwidth += $(this).width();
        var img = $('img', this);
        ratios.push(img.attr('data-width') / img.attr('data-height'));
        ratiosum += ratios[ratios.length - 1];
    });
    
    var ratioavg = ratiosum / imagenum;
    var totalpct = Math.floor((usedwidth / totalwidth) * 100) / 100;
    if (totalpct === 0) { totalpct = 1; }
    var eachpct = 1 / imagenum;
    var i = 0;
      
    items.each(function() {
      $(this).css('width', (((ratios[i] / ratioavg) * eachpct) * 100) + '%').addClass('gallery-jswidth');
      i++;
    });
    
  });
  
  
});