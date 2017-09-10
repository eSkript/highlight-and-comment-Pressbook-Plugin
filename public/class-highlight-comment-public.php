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
		//wp_enqueue_style( $this->plugin_name, plugin_dir_path( dirname( __FILE__ ) ). 'includes/highlighting/styles.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

        //Highlighting js files
        /*
		wp_enqueue_script( $this->plugin_name, plugin_dir_path( dirname( __FILE__ ) ). 'includes/highlighting/highlighting.js', array( 'jquery' ), $this->version, false );
        wp_enqueue_script( $this->plugin_name, plugin_dir_path( dirname( __FILE__ ) ). 'includes/highlighting/json_handler.js', array( 'jquery' ), $this->version, false );
        wp_enqueue_script( $this->plugin_name, plugin_dir_path( dirname( __FILE__ ) ). 'includes/highlighting/TextHighlighter.min.js', array( 'jquery' ), $this->version, false );
        */
        
        wp_register_script("highlighting-js",plugin_dir_url( __DIR__ ). 'includes/highlighting/highlighting.js', array( 'jquery' ) );
        wp_enqueue_script("highlighting-js");
        
        wp_register_script("TextHighlighter-js",plugin_dir_url( __DIR__ ). 'includes/highlighting/TextHighlighter.min.js', array( 'jquery' ) );
        wp_enqueue_script("TextHighlighter-js");
        
        //wp_localize_script("highlight-js", "php_vars", $this->load_data());

	}
}
