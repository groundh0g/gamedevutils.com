---
layout: book
title: "Chapter 10"
tagline: "Platforms and Abstractions"
lastReviewedOn: "2016-08-01 00:00:00 -0500"
status: stub
---

# Overview

Blah.

## Platform Helper

I've written some helper classes to handle most of the platform voodoo, but they're not referenced in the above snippets for the sake of keeping the code pure (pure MonoGame, that is).

Compiler directives that I pulled straight from the MonoGame Framework projects drive the "voodoo". I'll list them here for your convenience. Note that they are subject to change. So, you should check the latest values in the MonoGame repository if you're having platform-specific issues.

|Platform    |Constants|
|------------|------------|
|Android     | ```TRACE; ANDROID; GLES; OPENGL;```|
|Linux       | ```LINUX; OPENGL;```|
|MacOS       | ```MONOMAC; OPENGL;```|
|Ouya        | ```TRACE; ANDROID; GLES; OPENGL; OUYA;```|
|PSMobile    | ```DEBUG; PSM;```|
|Windows     | ```DEBUG; TRACE; WINDOWS; DIRECTX; WINDOWS_MEDIA_SESSION;```|
|Windows8    | ```TRACE; NETFX_CORE; WINRT; WINDOWS_STOREAPP; DIRECTX; DIRECTX11_1; WINDOWS_MEDIA_ENGINE;```|
|WindowsGL   | ```TRACE; WINDOWS; OPENGL;```|
|WindowsPhone| ```TRACE; DEBUG; SILVERLIGHT; WINDOWS_PHONE; WINRT; DIRECTX;```|
|iOS         | ```IOS; GLES; OPENGL;```|


If you use my helper class, `PlatformHelper`, you shouldn't need to reference those via compiler directives, but they will need to be set in your game's project options.

Using the helper, you can write code like the following.

    if(PlatformHelper.CurrentPlatform == Platforms.WindowsPhone) 
    {
      TargetElapsedTime = TimeSpan.FromTicks(333333);
    }
    
    graphics.IsFullScreen = PlatformHelper.IsMobile;
    this.IsMouseVisible = PlatformHelper.IsDesktop;

Without the helper, the conditional logic gets messy. For example, the property, `PlatformHelper.IsMobile`, knows that Ouya is not a mobile device, even though the `ANDROID` compiler directive is set.

There's nothing special about the code that performs the various checks for you. You need not use my classes if you don't want to. They're just provided as a convenience.

{pagebreak}

# Summary

Blah.

## Review Questions

Think about what you’ve read in this chapter to answer the following questions.

1.	Blah.
1.	Blah.
1.	Blah.

## Exercises

**EXERCISE 1.** Blah.

**EXERCISE 2.** Blah.