---
title: "Findoor"
date: "2018-07-05"
description: "Android Wi-Fi Navigation"
tags: ["android", "open-source"]
ShowToc: true
ShowBreadCrumbs: false
---

Android library for indoor and outdoor Wi-Fi navigation. On the one hand, it does not use the latest Wi-Fi navigation provided in the latest Android SDK versions, so the minimum version can remain low. It enables you to navigate in any kind of scenarios. On the other hand, the purpose is different from that new Wi-Fi navigation provided in the latest Android SDK. 

It needs a preset of records from the different spots where you want to locate the user. There is a sample application to show how the library works and get records of the spots to use later inside your application.

![Dummy scenario](../images/findoor/dummy-scenario.png)

## Quickstart

The learning curve of this library is very fast, the classes and concepts with which you have to learn to work are the following:

- <a href="https://github.com/nfdz/findoor/blob/master/findoor/src/main/java/io/github/nfdz/findoor/model/Record.java" target="_blank">Record</a>
- <a href="https://github.com/nfdz/findoor/blob/master/findoor/src/main/java/io/github/nfdz/findoor/model/LocationComparison.java" target="_blank">LocationComparison</a>
- <a href="https://github.com/nfdz/findoor/blob/master/findoor/src/main/java/io/github/nfdz/findoor/FindoorRecorder.java" target="_blank">FindoorRecorder</a>
- <a href="https://github.com/nfdz/findoor/blob/master/findoor/src/main/java/io/github/nfdz/findoor/FindoorProcessor.java" target="_blank">FindoorProcessor</a>

## Download

If you use gradle, you just have to add the following in your `build.gradle` file:

```groovy
allprojects {
  repositories {
  ...
      maven { url 'https://jitpack.io' }
   }
}
...
dependencies {
   implementation 'com.github.nfdz:findoor:v1.0.1'
}
```

Jitpack works with several build systems, please checkout the <a href="https://jitpack.io/docs/BUILDING/" target="_blank">documentation</a> if you need help with yours.

## Sample Application

This app shows several uses cases of this library and it is totally functional. Feel free to use it as you need. For example, you could use this app in order to get records of location spots you need and serve or embed them in your production app.

The library is free software, Apache-2.0, and you can see the code on <a href="https://github.com/nfdz/findoor" target="_blank">GitHub</a>.

![Screenshots](../images/findoor/screenshots.png)

Download the application from the <a href="https://github.com/nfdz/findoor/releases" target="_blank">GitHub Releases</a> of the repository.
