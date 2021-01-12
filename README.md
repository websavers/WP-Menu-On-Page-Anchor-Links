# WP-Menu-On-Page-Anchor-Links
WordPress Menus only allow you to create on-page links by using a custom link, which isn't very intuitive. This plugin extends Page-type menu items by adding an on-page ID field, simplifying creating on-page anchor links in nav menus.

# The problem this solves:
With the built in functionality of WordPress, you can create links that go not just to a page, but to a section on that page, but it's not an intuitive process. Rather than adding the page you want as a menu item, you need to add a Custom Link, then manually build the URL like we talk about on our blog here: https://websavers.ca/how-to-create-links-scroll-page-content-wordpress-menu

# How to install:
- On this page, click Code > Download Zip
- In the WordPress admin choose Plugins > Add New and select the zip file from your computer
- Install and activate the plugin

# How to use it:
1. In the WordPress admin, click Appearance > Menus and make sure the menu you want to use is displayed.
2. In the left column select the page you want to add to the menu and click Add to Menu (this is the actual page that you visit to see the content)
3. You will see a field called "Scroll-to HTML ID". If you know the ID, you can enter it here. If you don't, you can click the 'Get Suggestions' link to automatically retrieve IDs from the page (if it was built with BeaverBuilder).
4. Enter whatever link text you want your menu item to display.
5. Click Add to menu.

Note: the options in step 3 will not appear when editing the menu from Customizer.

If you're a developer, the suggested IDs can be further expanded in this plugin's Javascript file, simply look at the comment "Detect and add BeaverBuilder Row IDs" to see how this could be done. We welcome pull requests to expand this capability!
