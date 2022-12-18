---
title: "Permissions Watcher"
date: "2018-01-20"
description: "Monitor application permissions"
tags: ["android", "open-source"]
ShowToc: true
ShowBreadCrumbs: false
---

The Android permissions system is powerful and it was an incredibly big advance compared to old Android verions. Applications usually ask for permissions in a context where they could be justified. However, why do apps keep this acquired permission forever? This question was the beginning of this project and summarize the concept very well. I was really missing this feature in Android, I looked for any application that would do something like this and I was not able to find anything.

## Concept

The applications should show permissions changes (acquired) with a warning icon and alerts with a system notification as soon as possible (real time mode) or once a day (report mode). The philosophy was always the same, keep it simple as possible. I didn't want to implement a complex application that only me could understand.

The views and system notifications navigates to app settings to change permissions quickly. It isn't possible to change the permissions inside the application without a root user and I didn’t want to develop a root-only app.

## Implementation

The `MainActivity` is the entry point of the application and shows all applications with permissions in a list view.


![Main screen](../images/permissions-watcher/main-screenshot.png)

The `DetailsActivity` shows more information about the permissions that uses and could use selected application.

![Details screen](../images/permissions-watcher/details-screenshot.png)

The `SettingsActivity` has several configuration options to use the application as the user wants. I had to develop custom preference components for some configuration options. The implementation of the preference fragment is from support library because it has compatibility with coordinator layout animations, it uses RecyclerView beneath.

![Settings screen](../images/permissions-watcher/settings-screenshot.png)

The `AnalysisJobIntentService` handles the event of analyzing and reporting immediately using a system notification. This event is triggered from a shortcut action.

![Shortcut](../images/permissions-watcher/shortcut-screenshot.png)


Finally, the `ReportJobService` and the `RealTimeJobService` perform an analysis and notify only if there are changes. The main difference between them is the frequency of analysis. Both are implementations of the `JobService` from the Android SDK.

### Model–View–Presenter Pattern

I recommend MVP pattern for simple applications with not very complex state management. For example, the contract for the main view is as follows:

```java
public interface MainActivityContract {

    interface View {
        void bindViewToLiveData(LiveData> data);
        void navigateToAppDetails(ApplicationInfo app, ImageView appIcon);
        void filterContent(@Nullable String query);
    }

    interface Presenter {
        void initialize(Context context);
        void resume();
        void destroy();
        void onSyncSwipe();
        void onIgnoreAppClick(ApplicationInfo app);
        void onAppClick(ApplicationInfo app, ImageView appIcon);
        void onShowSystemAppsFlagChanged();
        void onSearchQueryChanged(@Nullable String query);
    }

    interface Model {
        void initialize(Context context);
        void destroy();
        void launchSynchronization();
        LiveData<RealmResults<ApplicationInfo>> loadDataAsync();
        void toggleIgnoreFlag(ApplicationInfo app);
    }

}
```

### From Realm to LiveData

This project has been developed at a very good time, the Android architecture components library just came out. It makes Android common things much easier since you forget about the management of the state during all these life cycle and configuration events. Some common libraries do not work with it, so it was necessary to create a wrap for them. As you see below it is very simple:

```java
public static <T extends RealmObject> LiveData<T> asLiveData(T result) {
    return new RealmObjectLiveData<>(result);
}

public static class RealmObjectLiveData<T extends RealmObject> extends LiveData<T> {

    private T object;

    private final RealmChangeListener<T> listener =
            new RealmChangeListener<T>() {
                @Override
                public void onChange(@NonNull T result) {
                    setValue(result);
                }
            };

    public RealmObjectLiveData(T object) {
        this.object = object;
    }

    @Override
    protected void onActive() {
        object.addChangeListener(listener);
    }

    @Override
    protected void onInactive() {
        object.removeChangeListener(listener);
    }

}
```

### Dependencies

The 3rd party software that I have used for the application is:

- <a href="http://jakewharton.github.io/butterknife/" target="_blank">Butter Knife</a>: Bind Android views and callbacks to fields and methods.
- <a href="https://github.com/JakeWharton/timber" target="_blank">Timber</a>: A logger with a small, extensible API which provides utility on top of Android's normal Log class.
- <a href="https://realm.io/" target="_blank">Realm</a>: An open-source object database management system.
- <a href="https://firebase.google.com/docs/analytics/" target="_blank">Firebase Analytics</a>: It is a cost-free app measurement solution that provides insight into app usage and user engagement. Activity analytics comes by default but you can log any analytics that you want.
    ```java
    firebaseAnalytics.logEvent(Analytics.Event.START_ANALYSIS, null);
    ```
- <a href="https://firebase.google.com/docs/crashlytics/" target="_blank">Firebase Crashlytics</a>: It notifies detailed reports of the errors in the app. Runtime crash log comes by default but you can log exceptions and errors you think that are interesting.
    ```java
    FirebaseCrash.log("OnIgnoreClick app invalid position: position=" + position +
                    ", filteredData=" + (filteredData == null ? "null" : ""+filteredData.size()));
    ```

## Conclusion

Anyone concerned about this problem can use this application to monitor the permissions we give to applications. Only because of this, the development has been worth the time.

I have been able to improve my knowledge about the MVP pattern, the Firebase libraries and the integration of Realm with the Android architecture components.

I don't plan to add amazing features in the future, but feel free to contact me to suggest anything or report any bug.

The application is free software, GPLv3, you can see the code on <a href="https://github.com/nfdz/PermissionsWatcher" target="_blank">GitHub</a> and download the APK from the <a href="https://github.com/nfdz/PermissionsWatcher/releases" target="_blank">Releases</a> page.