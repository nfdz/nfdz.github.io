---
title: "Club App"
date: "2019-08-06"
description: "A platform to manage events, courses, members and loyalty"
tags: ["android", "firebase", "open-source"]
ShowToc: true
ShowBreadCrumbs: false
---

Android application to manage events, users and loyalty of your club. It is easy to fork, modify and extend according to your needs.

The application was developed in Kotlin, using the native Android framework and common design patterns. 

## Features

- Club events managed according to categories and dates.
- Confirmation of assistance through QR code.
- Loyalty of members through points system based on attendance at events.
- Alerts with notification push for administrators.
- Private club chat. It has push notifications.

## Setup

1. Setup your Firebase project with your App Ids and Key hashes and copy your Firebase files `google-services.json` to `adminApp` and `memberApp` folder.
2. Enable and install Firebase Functions. Functions are located in `firebase_functions_src` folder.
3. Enable and setup Firebase Auth (email/password). You can customize messages about create account, restore password, etc.
4. Enable administrators by creating their credentials manually in Firebase Auth and adding the email to a list in the Firebase Database.
    ![Firebase Database Setup](../images/clubapp/admin-setup.png)
5. Replace `YOUR.MEMBER.APP.ID.HERE` and `YOUR.ADMIN.APP.ID.HERE` for your own ids.
6. Replace in `memberApp` the `Strings.xml` file with your own content: `app_name`, `club_about_content`, `club_contact_content`, `club_schedule_content`, `club_location_content`, `club_location_uri`, `club_location_uri_query`, `playlist_spotify_uri`, `club_facebook_url`, `club_facebook_url`, `event_url_host`.
7. Replace in `adminApp` the `Strings.xml` file with your own content: `app_name`.
8. Replace in `memberApp` the drawable folder with your own content: `image_logo_land`, `image_logo_square`, `image_club_location.webp` (image of google maps with help to find your location).
9. You can modify text and images of event categories. The categories are defined in `EventCategory` enum in `commonLibrary` project. String texts and drawables are referred from there.
10. You can modify app colors in `colors.xml` files.

## Screenshots

![Screenshots 1](../images/clubapp/screenshot_1.png)
![Screenshots 2](../images/clubapp/screenshot_2.png)
![Screenshots 3](../images/clubapp/screenshot_3.png)
![Screenshots 4](../images/clubapp/screenshot_4.png)

## Conclusion

The administration and members use the software daily in their smartphones and club totems.

I have been able to improve my knowledge about Kotlin and Firebase.

The application is free software, GPLv3, you can see the code on <a href="https://github.com/nfdz/ClubApp" target="_blank">GitHub</a> and download the APK from the <a href="https://github.com/nfdz/ClubApp/releases" target="_blank">Releases</a> page.