### Facebook search
- [x] Search pop-up
- [x] Keyboard pop up, text field on top of current page overlayed on top of menu bar.
- [x] type in name of crush and press enter to search

- [x] Results
- Show names matching with the query.
- Tap to see Profile (standalone)

### Email option
- [ ] If name not discoverable, have option to email the person. (how this looks from a UI perspective is up to you).
- [ ] Pop-up with a link to the UCL Directory (http://www.ucl.ac.uk/directory/) and a note that only UCL students can use the app for the time being but that emails sent to non-UCL people will give away the fact a UCL student likes you. N.B. FOR EXPANSION BEYOND UCL, WE MAY NEED TO DO SOMETHING DIFFERENT.
- [ ] email text field is only available for the local-part of the email address but the domain is fixed; user has a choice between '@ucl.ac.uk', '@alumni.ucl.ac.uk', and 'Other'. The last option allows for emails to be sent to crushes OUTSIDE of UCL. The email sent to the recipient outside of UCL is identical to emails sent to those within UCL. Upon signing up, they won't be able to use the university feature yet...

Suggestion: use this to send out emails: [Sending transactional emails via firebase and cloud functions](https://postmarkapp.com/blog/sending-transactional-emails-via-firebase-and-cloud-functions) (create a new user database for this, perhaps call it "crushee-users", and don't bother going via Authentication for the database it creates... I don't see why the sort of database you created for email sign-ups on shipucl.com couldn't be used).

### Profile
- [ ] Profile (standalone)
- A single profile which you swipe up or down on to ship or sink, respectively.

--------------------------------------------------------------------------------------------------

- [ ] Prioritise profile in Crushee's swiping. (The effect of using the crush function will be that the swiper will be brought in amongst a bunch of the first several cards the swipee sees the next time they log in. Given the app will normally bring cards which are potential matches in and around the forefront, this should not require *extra* back-end programming).