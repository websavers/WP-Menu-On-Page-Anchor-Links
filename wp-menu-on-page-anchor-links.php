<?php
/*
Plugin Name: WP Menu On-Page Anchor Links
Description: Add BeaverBuilder Section IDs to WordPress menus for easier creation of menu items
Based on: http://remicorson.com/sweet-custom-menu by Remi Corson
Original URL: https://www.wpexplorer.com/adding-custom-attributes-to-wordpress-menus/
Version: 1.0
Author: Websavers Inc
Author URI: https://websavers.ca
Contributors: corsonr, websavers, jas8522
Text Domain: ws_mbi (ws_menu_html_id)
Domain Path: languages
*/

class ws_menu_html_id {

	/*--------------------------------------------*
	 * Constructor
	 *--------------------------------------------*/

	/**
	 * Initializes the plugin by setting localization, filters, and administration functions.
	 */
	function __construct() {
		
		// modify access to nav_menu_item post type to allow it in REST API
		add_filter( 'register_post_type_args', array( $this, 'ws_mbi_post_type_args' ), 10, 2 );
		// create menu custom fields
		add_filter( 'wp_setup_nav_menu_item', array( $this, 'ws_mbi_add_custom_nav_fields' ) );
		// save menu custom fields
		add_action( 'wp_update_nav_menu_item', array( $this, 'ws_mbi_update_custom_nav_fields'), 10, 3 );
		
		// menu admin fields UI via JS because no good hooks for this
		add_action( 'admin_enqueue_scripts', array( $this, 'ws_mbi_wpadmin_ui'), 10, 1);
		// menu frontend URL output changes
		add_filter( 'nav_menu_item_args', array( $this, 'ws_mbi_frontend_output_mods'), 10, 3 );

	} // end constructor

	
	/**
	 * Add REST API support to an already registered post type. (nav_menu_item)
	 */
	 
	function ws_mbi_post_type_args( $args, $post_type ) {
	 
	    if ( 'nav_menu_item' === $post_type ) {
	        $args['show_in_rest'] = true;
	        // Optionally customize the rest_base or rest_controller_class
	        //$args['rest_base']             = 'menu_item';
	        //$args['rest_controller_class'] = 'WP_REST_Posts_Controller';
	    }
			
			// The following are all required to show the data in rest_api results
			add_post_type_support( 'nav_menu_item', 'custom-fields' );
			register_post_meta( 'nav_menu_item', '_menu_item_html_id', [
				'type'         => 'string', // string/boolean/integer/number
				'single'       => true,
				'show_in_rest' => true,
			] );
			register_post_meta( 'nav_menu_item', '_menu_item_object_id', [ /* page it points to */
				'type'         => 'integer', // string/boolean/integer/number
				'single'       => true,
				'show_in_rest' => true,
			] );
	 
	    return $args;
	}
	
	
/*	
	function ws_mbi_filter_nav_menu_item_json( $data, $post, $context ) {
		$anchor_id = get_post_meta( $post->ID, '_menu_item_html_id', true );
		if ( $anchor_id ) $data->data['anchorid'] = $anchor_id;
		return $data;
	}
*/
	
	/**
	 * Add custom fields to $item nav object
	 *
	 * @access      public
	 * @since       1.0 
	 * @return      void
	*/
	function ws_mbi_add_custom_nav_fields( $menu_item ) {
		
		$menu_item->html_id = get_post_meta( $menu_item->ID, '_menu_item_html_id', true );
		return $menu_item;

	}
	
	/**
	 * Save menu custom field upon save of menu
	 *
	 * @access      public
	 * @since       1.0 
	 * @return      void
	*/
	function ws_mbi_update_custom_nav_fields( $menu_id, $menu_item_db_id, $args ) {

	    // Check if element is properly sent
	    if ( is_array( $_REQUEST['menu-item-html-id']) ) {
	        $html_id_value = $_REQUEST['menu-item-html-id'][$menu_item_db_id];
	        update_post_meta( $menu_item_db_id, '_menu_item_html_id', $html_id_value );
	    }

	}
	
	function ws_mbi_wpadmin_ui($hook) {
    
		if ('nav-menus.php' !== $hook) return;
		
    wp_enqueue_script('on-page-anchor-links-admin', plugin_dir_url(__FILE__) . 'js/on-page-anchor-links-admin.js', $deps = array('wp-api'), $ver = false, $in_footer = true);
		
	}
	
	function ws_mbi_frontend_output_mods($args, $item, $depth){
		
		if (empty($item->html_id)) return $args;
		
		if (  $item->html_id[0] == '#' ){
			$item->url .= $item->html_id;
		}
		else{ // Do we want to validate? '/^[a-zA-Z][\w:.-]*$/'
			$item->url .= '#' . $item->html_id;
		}
		return $args;
		
	}

}

// instantiate plugin's class
$GLOBALS['menu_html_id'] = new ws_menu_html_id();
