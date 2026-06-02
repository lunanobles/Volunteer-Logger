# Volunteer Logger
#### [Luna Nobles](https://github.com/lunanobles)

This project is built for the Future Business Leaders of America (FBLA) at the ATC.

This project is a HTML interface website for creating volunteer data.
This has tested my skills in JavaScript and forced me to learn some PHP and HTTP requests, making this, certainly, a difficult project!

I hope you enjoy using it!

## Roadmap
##### [Trello Board](https://trello.com/b/SJDsTr3M)
<div style="display: flex; justify-content: even; color: beige; flex-wrap: wrap; max-width: 1000px">
    <section style="background-color: indigo; width: 33%; min-width: 300px; margin: 5px; padding: 2px; text-align: center;">
        <h3 style="color: white;">Getting to Version 1.0</h3>
        <p>Through versions 0.0.1 up to version 0.3.19 (37 commits total!), I worked to create the functionality of all the different actions! HTTP handling with PHP, JSON parsing and editing with JavaScript, the works!</p>
    </section>
    <section style="background-color: indigo; width: 30%; min-width: 300px; margin: 5px; padding: 2px; text-align: center;">
        <h6 style="color: gainsboro;">Currently Here (Background)</h6>
        <h3 style="color: white;">Working on Version 1.0</h3>
        <p>In the Main branch, I will maintain 1.0 and its functionality, but I will not add any new features to this version.</p>
    </section>
    <section style="background-color: indigo; width: 30%; min-width: 300px; margin: 5px; padding: 2px; text-align: center;">
        <h6 style="color: gainsboro;">Currently Here (Focus)</h6>
        <h3 style="color: white;">Getting to Version 2.0</h3>
        <p>In a split branch (that, when finished, will become the Main branch), I will be working on a new version that overhuals the design and layout. A big change will be merging the "New Volunteer" and "Add to Volunteer" forms into one!</p>
    </section>
</div>


## Changelog (2.0 Family Only)
##### 2.0-beta.1 — Clean-up
> - The code is a bit of a mess and I want to clean everything before publish.
...
#### 2.0-alpha.10 — 2.0 Total Functionallity!
> - Published June 1st, 2026 — HAPPY PRIDE! 🏳️‍🌈
> - The deleting of volunteers functions.
> - The deleting of volunteer's events functions.
> - Deleting an event from a volunteer untill they have 0 events does NOT delete that volunteer; this is intended.
> - (From here on out, I will mode this branch into beta, focusing on better code and any bugs that come up.)
##### 2.0-alpha.9 — Deleting Events/Volunteers is Almost Working
> - Published [June 1st, 2026](a653f7e695c0fca39159e015ebb1731d72bf29ec) — HAPPY PRIDE! 🏳️‍🌈
> - More attempts to get the delete form working... all of which failed.
##### 2.0-alpha.8 — Deleting Events (Preparation)
> - Published [May 31st, 2026](02f18b6f3d8fd119305c3f32e5a30e2d13cfecc3)
> - Created new area for deleting whole volunteers.
> - Adjusted the dropdown menu for events to show the selected volunteer's events list.
> - Showed which volunteer was selected for deletion.
> - The delete button doesn't do anything yet.
##### 2.0-alpha.7 — Submit Form Functions!
> - Published [May 31st, 2026](cbdafda7654e2ff58d575f2bb67700526bd9e17f)
> - The Submit (or primary) form now updates the JSON data!
> - New alert messages for form submit success/failure.
> - Users must fill all input fields before submitting.
> - Total hours for the table is actually correct now.
> - Added more protections against caching.
##### 2.0-alpha.6 — Only Allowing Unique New Volunteer/Event Names
> - Published [May 31st, 2026](1e91e32f7083fa71fa8847725901b40b0381dfd9)
> - Custom Volunteer/Event textboxes become active when their respective dropdowns are on the "New" option.
> - If a user inputs a Volunteer/Event name that already exists, they are warned and the textbox is emptied.
> - Primary event dropdown is populated with any unique event already in the JSON.
> - Delete event dropdown is populated with any events in a selected volunteer.
> - (JS code now has regions for better readability 😊.)
> - (MD headers for non-current commits are smaller now)
##### 2.0-alpha.5 — Design III
> - Published [May 30th, 2026](ef03934c6b83a5420e045fb7902862ebbe6df7d7)
> - Stylised the buttons and input fields.
> - Added minimum and step of 0.5 to hours input field.
##### 2.0-alpha.4 — Design II
> - Published [May 30th, 2026](723180f059b2d70749df2db2267d0895914caa73)
> - Created new table look.
##### 2.0-alpha.3 — Design I
> - Published [May 30th, 2026](d38834fd47483002d7b09e204dbfee2ad1e8f6ab)
> - New colour palette for both light and dark modes.
> - Restyled major content to Sajid UI style.
> - Created Delete form.
> - Adjusted layout of Main form.
> - Created textboxes for custom additions (non-functional).
##### 2.0-alpha.2 — Design Preparations
> - Published [May 30th, 2026](258a3f7f8b07afbd0e099a65a6db202bf3563fa3)
> - Added Apercu Pro fontface, FBLA brand font.
> - Added FBLA full logo and FBLA crest images.
> - Edited font and general CSS stylesheets to accomodate font changes.
> - (Drafted & sketched new design version.)
##### 2.0-alpha.1
> - Published [May 29th, 2026](8f9002cfe9617c74b4307a468f1fcc771f7e7401)
> - Creating this very README!
> - Initiated the branch for the 2.0 development.
##### 1.0
> - <b>Release Version</b>
> - Published [May 29th, 2026](4fbdf74e5b50fab45c44af722c2dfe72bf7091b4)
> - With pre-existing JSON data, add an event [hours, desc., date of event, date of log, and who logged it] to any volunteer via a dropdown menu!
> - Create a new volunteer with a starting event via a simular form!
> - View the data is a easy to read table!