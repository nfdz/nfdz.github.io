---
title: "Foco"
date: "2017-08-06"
description: "Minimalist text editor"
tags: ["android", "open-source"]
ShowToc: true
ShowBreadCrumbs: false
---

This is a writing application without distractions and fuss, easy to use and tiny.

## Key Features

- Markdown support.
- Writing statistics: time, words count.
- Ambient music.
- Right to left support.
- Import and Export.
- Storage friendly. 
- Favorite files.
- Search.
- Battery friendly.
- Markdown helper:
    - H1, H2 and H3
    - Bold, italic and strikethrough
    - Quote
    - List (bulleted and numbered)
    - Link
    - Image and video (Youtube)

## Motivation

I wanted to learn and use new patterns and libraries on Android. On the one hand I wanted to use the new <a href="https://developer.android.com/topic/libraries/support-library/features#material-design" target="_blank">Android Design Support Library</a>.

On the other hand, I wanted to try the new <a href="https://developer.android.com/jetpack/guide" target="_blank">Android Architecture Components</a>. They are a new collection of libraries that help design robust, testable, and maintainable apps.

When I saw the announcement on the <a href="https://www.youtube.com/watch?v=FrteWKKVyzI" target="_blank">Google I/O 2017</a> I was totally sure that I was going to try as soon as I could in my next project.

> {{< youtube vOJCrbr144o >}}

Finally, I also wanted to include in the application a background music player since I had never worked with anything like that on Android.

## Concept

It must implement all the required features in an intuitive and transparent way. elaborate a mockup to follow in its development.

Before the development, I have developed a sketch mockup to test the different features and the user experience.

![Mockup](../images/foco/mockup.png)

## Implementation

The `MainActivity` is the entry point of the application and shows all available documents in a grid. To do this, it uses a `RecyclerView`. There is a bottom toolbar that appears when any document is selected. It is possible to change the order and filter.

![MainActivity](../images/foco/MainActivity-screenshots.png)

The `EditDocActivity` is where the user can edit a document and visualize its preview. The `CustomEditText` view has been used for editing. This class extends `EditText` and adds the functionality to add a listener to receive the selection change events. This was necessary to be able to offer a bottom toolbar with markdown format editing shortcuts.

![EditDocActivity edit](../images/foco/EditDocActivity-edit-screenshots.png)

For the preview has been used `MarkdownView` that is a view defined in a third-party library with the same name. It is very useful since it is easy to use and very powerful. It supports several markdown formats and nice CSS themes.

![EditDocActivity preview](../images/foco/EditDocActivity-preview-screenshots.png)

The cover of a document can be a flat color or a custom image. The `EditDocCoverDialog` implements this cover settings. It could be presented as a dialog or as a full screen fragment depending on the device. 

The view of this dialog has two tabs. The first one shows the selected cover color and it can be modified using the `Material Color Picker Dialog`. The second one shows the selected cover image and it can be modified using `File Picker Dialog`. It is executed a post-selection process of the image to reduce and optimize it. It achieves it by using the `Picasso` and the `Compressor` libraries.

![EditDocCoverDialog](../images/foco/EditDocCoverDialog-screenshots.png)

The `MusicDialog` shows a simple ambient music control. It is connected to the `MusicService` to retrieve playback information and to perform actions.

![MusicDialog](../images/foco/MusicDialog-screenshot.png)

The `MusicService` is a bound service. It is responsible for managing the playback of the ambient music. It uses a `MusicPlayer`. The ambient music are pre-stored tracks to play in a loop. It is possible to interact with this service through intent actions and its bind interface.

The service manages and controls a notification while there is music playing. This notification has actions that use `PendingIntent` to control the playback.

![MusicService](../images/foco/MusicService-notification.png)

### Android Architecture Components

I used of Room for the data persistence. Room provides an abstraction layer over SQLite to allow fluent database access while taking advantage of the powerful SQLite. There is a Data Access Object (DAO) interface called `DocumentDao`. For example, it has this method to get a document:

```java
@Query("SELECT * FROM " + TABLE_NAME + " WHERE " + COLUMN_ID + " = :docId")
DocumentEntity getDocument(long docId);
```

There is an Entity class called `DocumentEntity`. It implements the `Document` interface from the domain and it has all attributes column names defined there. The `DocumentMetadata` class contains all attributes of `DocumentEntity` but the text of the document. This is useful in order to retrieve a list of documents avoiding loading in memory each document. Room deals with any class that it could match the column names with class attributes. For example, to get a document metadata the `DocumentDao` method is:

```java
@Query("SELECT " + 
       COLUMN_ID + ", " +
       COLUMN_NAME + ", " + 
       COLUMN_WORKING_TIME + ", " + 
       COLUMN_LAST_EDITION_TIME + ", " + 
       COLUMN_WORDS + ", " + 
       COLUMN_FAVORITE + ", " + 
       COLUMN_COVER_COLOR +  ", " + 
       COLUMN_COVER_IMAGE + 
       " FROM " + TABLE_NAME +
       " WHERE " + COLUMN_ID + " = :docId")
DocumentMetadata getDocumentMetadata(long docId);
```

The database that stores this DAO is defined in the `AppDatabase`. It is singleton with the purpose of accessing and creating the database. The instance is created by using Room:

```java
sInstance = Room.databaseBuilder(context, AppDatabase.class, DATABASE_NAME).build();
```

The `DocListViewModel`, that extends the `ViewModel` class, manages the access of the data from the view classes attached to the Android life cycle. It offers a `LiveData` that contains a list of `DocumentMetadata`.  In order to consume the `DocListViewModel` I had to do the following:

```java
DocListViewModel viewModel = ViewModelProviders.of(this).get(DocListViewModel.class);
viewModel.getDocumentsMetadata().observe(this, new Observer>() {
    @Override
    public void onChanged(@Nullable List docs) {
        // do something ...
    }
});
```

As you can see, it is no longer necessary to mess with `AsyncTask` to load the data asynchronously nor manual cache to avoid load the data again with configuration changes. These new components own that complexity in a transparent way.

### Dependencies

The 3rd party software that I have used for the application is:

- <a href="http://jakewharton.github.io/butterknife/" target="_blank">Butter Knife</a>: Bind Android views and callbacks to fields and methods.
- <a href="https://github.com/JakeWharton/timber" target="_blank">Timber</a>: A logger with a small, extensible API which provides utility on top of Android's normal Log class.
- <a href="http://square.github.io/picasso" target="_blank">Picasso</a>: A powerful image downloading and caching library for Android.
    ```java
    Picasso.with(getActivity())
        .load(new File(mImagePath))
        .placeholder(R.drawable.image_placeholder)
        .memoryPolicy(MemoryPolicy.NO_CACHE)
        .resize(IMAGE_MAX_WIDTH_PX, IMAGE_MAX_HEIGHT_PX)
        .centerInside()
        .onlyScaleDown()
        .into(mImageView);
    ```
- <a href="https://github.com/Pes8/android-material-color-picker-dialog" target="_blank">Material Color Picker Dialog</a>: A simple, minimalistic and beautiful dialog color picker.
    ```java
    final ColorPicker cp = new ColorPicker(getActivity(),
        Color.red(currentColor),
        Color.green(currentColor),
        Color.blue(currentColor));
    cp.show();
    cp.setCallback(new ColorPickerCallback() {
    @Override
    public void onColorChosen(@ColorInt int color) {
        // do something ...
    }
    });
    ```
- <a href="https://github.com/Angads25/android-filepicker" target="_blank">FilePicker</a>: A simple and minimalistic file picker dialog.
    ```java
    DialogProperties properties = new DialogProperties();
    ...
    FilePickerDialog dialog = new FilePickerDialog(getActivity(), properties);
    dialog.setDialogSelectionListener(new DialogSelectionListener() {
    @Override
    public void onSelectedFilePaths(String[] files) {
        // do something ...
    }
    });
    dialog.show();
    ```
- <a href="https://github.com/zetbaitsu/Compressor" target="_blank">Compressor</a>: An Android image compression library.
    ```java
    File compressedImage = new Compressor(getActivity())
        .setMaxWidth(IMAGE_MAX_WIDTH_PX)
        .setMaxHeight(IMAGE_MAX_HEIGHT_PX)
        .setQuality(IMAGE_QUALITY)
        .setCompressFormat(Bitmap.CompressFormat.JPEG)
        .setDestinationDirectoryPath(directory.getAbsolutePath())
        .compressToFile(new File(image), name);
    ```
- <a href="https://github.com/tiagohm/MarkdownView" target="_blank">MarkdownView</a>: An Android library to display markdown text in a beautiful way.

## Conclusion

Thanks to this project I have been able to learn a lot. I liked working with the new Android Architecture Components and in my opinion they have a great future ahead.

The result is very close to the initial mockup and most of the features are implemented. I think it meets the requirements and I hope it is useful.

The application is free software, GPLv3, you can see the code on <a href="https://github.com/nfdz/foco" target="_blank">GitHub</a> and download the APK from the <a href="https://github.com/nfdz/foco/releases" target="_blank">Releases</a> page.