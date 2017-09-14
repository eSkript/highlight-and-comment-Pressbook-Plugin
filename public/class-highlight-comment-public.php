<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://www.ee.ethz.ch/de/departement/personen-a-bis-z/person-detail.html?persid=208843
 * @since      1.0.0
 *
 * @package    Highlight_Comment
 * @subpackage Highlight_Comment/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Highlight_Comment
 * @subpackage Highlight_Comment/public
 * @author     Lorin Mühlebach <mlorin@ethz.ch>
 */
class Highlight_Comment_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
        
        //Highlighting style sheets
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ). 'css/highlight-comment-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

        //load saved highlights
        $all_highlights = get_user_meta(get_current_user_id(),'highlight-comment',true);
        $chapter_highlights = "";
        if(is_array($all_highlights) && strlen(get_the_ID()) != 0 && array_key_exists(get_current_blog_id(),$all_highlights) && array_key_exists(get_the_ID(),$all_highlights[get_current_blog_id()])){
            $chapter_highlights = $all_highlights[get_current_blog_id()][get_the_ID()];
        }

        $jquery_data = array(
	    "logged_in" => is_user_logged_in(),
        "ajax_url" => admin_url( 'admin-ajax.php' ),
        "ajax_nonce" => wp_create_nonce( "progNonce" ),
		"book_id" => get_current_blog_id(),
		"chapter_id" => get_the_ID(),
        "media_url" => plugin_dir_url(__DIR__ ) . 'media/',
        "highlight_data" => $chapter_highlights 
	    );
        
        wp_register_script("highlighting-js",plugin_dir_url( __DIR__ ). 'includes/highlighting/highlighting.js', array( 'jquery' ) );
        wp_localize_script("highlighting-js", "highlight_vars", $jquery_data);
        wp_enqueue_script("highlighting-js");
        
        
        
        wp_register_script("TextHighlighter-js",plugin_dir_url( __DIR__ ). 'includes/highlighting/TextHighlighter.min.js', array( 'jquery' ) );
        wp_enqueue_script("TextHighlighter-js");

	}
    
    //ajax functions -------------------------------------------------------
    public function save_highlights(){        
        if ( !isset($_POST['progNonce']) || !wp_verify_nonce( $_POST['progNonce'], 'progNonce' ) ){die ( 'you cant do this' );}
        
        $all_highlights = get_user_meta(get_current_user_id(),'highlight-comment',true);
        
        if(!is_array($all_highlights)){
            $all_highlights = Array(Array());
        }
       
		$all_highlights[$_POST['book_id']][$_POST['chapter_id']] = $_POST['highlight_data'];
		
		echo update_user_meta( get_current_user_id(), 'highlight-comment', $all_highlights);

        wp_die(); // this is required to terminate immediately and return a proper response
    }
}
