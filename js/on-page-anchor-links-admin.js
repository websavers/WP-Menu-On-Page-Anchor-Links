jQuery(document).ready(function($){
  
  function ws_mbi_init(new_menu_items = null){
    
    if (new_menu_items) menu_items = new_menu_items;
    else menu_items = $('ul#menu-to-edit .menu-item-settings');
    
    menu_items.each(function( index ) {
      var menu_item = $(this);
      var php_id = ws_mbi_get_menu_item_id(menu_item.attr('id')); //ex: menu-item-settings-58
      
      if ( $('#edit-menu-item-html-id-' + php_id).length === 0){
          
        //Insert the menu item settings field with no value
        menu_item.find('.field-link-target').after('<p class="field-custom description description-wide"> \
            <label for="edit-menu-item-html-id-' + php_id + '"> \
                Scroll-to HTML ID<br /> \
                <input type="text" id="edit-menu-item-html-id-' + php_id + '" class="widefat code edit-menu-item-custom" name="menu-item-html-id[' + php_id + ']" value="" /> \
            </label> \
            <small style="position:relative;top:-3px;"><a href="#" id="get-id-suggestions-' + php_id + '">Get ID Suggestions</span></small> \
        </p>');
          
        //Get and insert current field values
        if (!new_menu_items){ 
          var cur_setting_value = '';
          $.get(wpApiSettings.root + 'wp/v2/nav_menu_item/' + php_id, function(post_data){
            cur_setting_value = post_data.meta._menu_item_html_id;
            //Insert the current value
            $('#edit-menu-item-html-id-' + php_id).val(cur_setting_value);
          }, "json");
        }
        
        //Activate retrieval of suggested HTML IDs
        $('#get-id-suggestions-' + php_id).click(function(e){
          
          e.preventDefault();
          var sugg_parent = $(this).parent('small');
          sugg_parent.html('Getting Suggestions...')
          var page_url = $('#menu-item-settings-' + php_id + ' p.link-to-original > a').attr('href');
          
          $.get(page_url, function(page_html){
            
            var row_ids = [];
            
            // Detect IDs to suggest:
            
            // BeaverBuilder Row IDs, Accordion Items, Tab Panels
            $(page_html).find('.fl-row,.fl-accordion-item,.fl-tabs-panel').each(function(){
              row_ids.push($(this).attr('id'));
            });        
            
            //Output Row IDs
            if (row_ids.length > 0) sugg_parent.html(ws_mbi_array_to_htmllist(row_ids));
            else sugg_parent.html('No IDs detected on page.');
            
            //Activate 'use' capability
            sugg_parent.find('.use-suggestion').click(function(es){
              es.preventDefault();
              this_sugg = $(this).text();
              $('#edit-menu-item-html-id-' + php_id).val(this_sugg);
            });
            
          });

        });
        
      }
      
    });
    
  }
  
  function ws_mbi_get_menu_item_id(css_id){
    var pieces = css_id.split(/[\s\-]+/);
    return pieces[pieces.length-1]; //ex: 58
  }
  
  function ws_mbi_array_to_htmllist(my_array){
    var text = "<ul style='margin-top:3px;'>";
    for (i = 0; i < my_array.length; i++) {
      text += "<li style='display:inline;padding:0 5px 0 0;'><a href='#' class='use-suggestion'>" + my_array[i] + "</a></li>";
    }
    text += "</ul>";
    return text;
  }

  $('#submit-posttype-page').click(function(){
    setInterval(function(){ 
      //Give it only the new ones / pending 
      ws_mbi_init($('ul#menu-to-edit li.pending .menu-item-settings'));
    }, 2000); //give it time to load the new menu item
  });

  ws_mbi_init(); // Init on page load
  
});