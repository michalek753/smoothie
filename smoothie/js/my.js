
// Top menu animation and scroll animation

var lastId,
    topMenu = $("#ul_nawigation"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All elements from the list
    menuItems = topMenu.find("a"),
    // Anchors for menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Animations by clicking on a menu item
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 1000);
  e.preventDefault();
});

// After scrolling
$(window).scroll(function(){
   // Get position of container
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get the ID of the current scroll position
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   //Get the id of the current item
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set or delete "active" - is responsible for highlighting items in the menu
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});