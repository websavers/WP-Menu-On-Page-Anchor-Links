# WP-Menu-On-Page-Anchor-Links
WordPress Menus only allow you to create on-page links by using a custom link, which isn't very intuitive. This plugin extends Page-type menu items by adding an on-page ID field, simplifying creating on-page anchor links in nav menus.

# Full Description
With the built in functionality of WordPress, you can create links that go not just to a page, but to a section on that page, but it's not an intuitive process. Rather than adding the page you want as a menu item, you need to add a Custom Link, then manually build the URL. Here's how that looks:
1. On the WordPress admin menu, click Appearance > Menus and make sure the menu you want to use is displayed.
2. In the left column expand the Custom links category.
3. Enter the full URL of the target page in which the section occurs, followed by the pound sign and your ID. For example, if the section occurs on the page https://www.example.com/goals/, then your URL would be: https://www.example.com/goals/#my-unique-id
4. Enter whatever link text you want your menu item to display.
5. Click Add to menu.

This plugin endeavours to make adding links to sections of page more intuitive by making the process work like this instead:
1. On the WordPress admin menu, click Appearance > Menus and make sure the menu you want to use is displayed.
2. In the left column select the page you want to add to the menu and click Add to Menu
3. In the field called "Scroll-to HTML ID" that this plugin creates, enter your ID. For example: my-unique-id
4. Enter whatever link text you want your menu item to display.
5. Click Add to menu.

It goes even further for those using BeaverBuilder. Below the Scroll-to HTML ID field (at step 3), you'll find a "Get Suggestions" link.
If you click this link, you'll be provided with a list of BeaverBuilder row IDs and you can click on any one of them to set that value.

If you're a developer, the suggested IDs can be further expanded in this plugin's Javascript file, simply look at the comment "Detect and add BeaverBuilder Row IDs" to see how this could be done. We welcome pull requests to expand this capability!
