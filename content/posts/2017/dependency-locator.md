---
title: "Dependency Locator"
date: "2017-11-12"
description: "Java service locator pattern implementation"
tags: ["java", "design-patterns", "open-source"]
ShowToc: true
ShowBreadCrumbs: false
---

Dependency inversion on Java and Android using the classic service locator pattern. For the development proccess of this project I have followed the <a href="https://en.wikipedia.org/wiki/Test-driven_development" target="_blank">Test-driven development</a> (TDD) approach. I was very interested in creating a good set of tests to ensure that it works well in any case as it is a critical piece of the software architecture.

The library is free software (Apache-2.0) and you can see the code on <a href="https://github.com/nfdz/DependencyLocator" target="_blank">GitHub</a>.

## Key Features

- Easy to add and remove.
- Lazy creation.
- Thread safe.
- Testing friendly.
- Singleton.
- Releasable.
- Well tested.

## Quickstart

1. Implement `Dependency` or `SingletonDependency` interface.
2. Implement `DependencyProvider` that know how to create previous dependency.
3. Supply these providers to the `DependencyLocator` in some point before use the dependencies, for instance at the entry point of your application.
    ```java
    DependencyLocator.provide(MyDependency.class, new MyDependencyProvider());
    ```
4. Locate this dependency where and when you want to use:
    ```java
    MyDependency dependency = (MyDependency)DependencyLocator.locate(MyDependency.class);
    ```
5. Optional: Release this dependency when you do not need use it anymore:
    ```java
    DependencyLocator.release(dependency);
    ```

### Sample Project

Check <a href="https://github.com/nfdz/DependencyLocator/tree/master/Demo" target="_blank">this</a> sample project with three dependencies, one of them nested.

## Download

### Jitpack

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
   compile 'com.github.nfdz:DependencyLocator:v1.0.0'
}
```

Jitpack works with several build systems, please checkout the <a href="https://jitpack.io/docs/BUILDING/" target="_blank">documentation</a> if you need help with yours.

### Manual JAR

Download the JAR library from the <a href="https://github.com/nfdz/DependencyLocator/releases" target="_blank">GitHub Releases</a> of the repository.
