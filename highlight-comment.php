<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.ee.ethz.ch/de/departement/personen-a-bis-z/person-detail.html?persid=208843
 * @since             0.1.0
 * @package           Highlight_Comment
 *
 * @wordpress-plugin
 * Plugin Name:       Highlight and Comment
 * Plugin URI:        https://github.com/mLorin/highlight-and-comment-Pressbook-Plugin
 * Description:       allows to highlight and comment parts of an eBook
 * Version:           0.1.0
 * Author:            Lorin Muehlebach
 * Author URI:        https://www.ee.ethz.ch/de/departement/personen-a-bis-z/person-detail.html?persid=208843
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       highlight-comment
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( PLUGIN_VERSION, '0.1.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-highlight-comment-activator.php
 */
function activate_highlight_comment() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-highlight-comment-activator.php';
	Highlight_Comment_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-highlight-comment-deactivator.php
 */
function deactivate_highlight_comment() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-highlight-comment-deactivator.php';
	Highlight_Comment_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_highlight_comment' );
register_deactivation_hook( __FILE__, 'deactivate_highlight_comment' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-highlight-comment.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_highlight_comment() {

	$plugin = new Highlight_Comment();
	$plugin->run();

}
run_highlight_comment();
