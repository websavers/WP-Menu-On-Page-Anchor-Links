jQuery(document).ready(function($){
  
  function ws_mbi_init(){
    
    $('ul#menu-to-edit .menu-item-settings').each(function( index ) {
      var menu_item = $(this);
      var php_id = ws_mbi_get_menu_item_id(menu_item.attr('id')); //ex: menu-item-settings-58
      
      if ( $('#edit-menu-item-html-id-' + php_id).length === 0){
        
        var cur_setting_value = '';
        $.get(wpApiSettings.root + 'wp/v2/nav_menu_item/' + php_id, function(post_data){
          cur_setting_value = post_data.meta._menu_item_html_id;
          //Insert the menu item settings field
          menu_item.find('.field-link-target').after('<p class="field-custom description description-wide"> \
              <label for="edit-menu-item-html-id-' + php_id + '"> \
                  Scroll-to HTML ID<br /> \
                  <input type="text" id="edit-menu-item-html-id-' + php_id + '" class="widefat code edit-menu-item-custom" name="menu-item-html-id[' + php_id + ']" value="' + cur_setting_value + '" /> \
              </label> \
          </p>');
          
          if (post_data.meta._menu_item_object_id > 0){
            var page = new wp.api.models.Page( { id: post_data.meta._menu_item_object_id } );
            page.fetch().done( function( page_data ){
              $.get(page_data.link, function(page_html){
                var bb_row_ids = [];
                $(page_html).find('.fl-row').each(function(){
                  bb_row_ids.push($(this).attr('id'));
                });
                if (bb_row_ids.length > 0){
                  $('#edit-menu-item-html-id-' + php_id).after('<small style="position:relative;top:-5px;">found in beaverbuilder: ' + new String(bb_row_ids) + '</small>')
                }
              });
            });
          }
          
        }, "json");
        
      }
      
    });
    
  }
  
  function ws_mbi_get_menu_item_id(css_id){
    var pieces = css_id.split(/[\s\-]+/);
    return pieces[pieces.length-1]; //ex: 58
  }
  /*
  $('#submit-posttype-page').click(function(){
    //var id = ws_mbi_get_menu_item_id($(this).attr('id'));
    setInterval(function(){ ws_mbi_init(); }, 3000); //give it time to load the new menu item
  });
  */
  ws_mbi_init(); // Init on page load
  
});