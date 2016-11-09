---
layout: book
title: "Chapter 14"
tagline: "Libraries - TouchPanelEx"
lastReviewedOn: "2016-08-01 00:00:00 -0500"
status: placeholder
---

## Overview

The mouse and touchscreen are physically very different devices, but they're functionally analogous. When you think about it, the mouse could be considered a virtual touchscreen without multi-touch support. That excludes a lot of gestures like pinch, twist, or multi-finger swipes, but using the mouse to simulate a touchscreen can be handy when you're developing on a laptop or desktop.

In this chapter, we'll develop a reusable, mouse-enabled replacement for the standard `TouchPanel` classes. While I don't plan to implement gestures in this chapter, it would be possible to add combinations of mouse button clicks and/or keyboard key presses to emulate gestures. For example, the iOS Simulator has long supported a feature where users can use keyboard keys to augment the mouse to support gestures. The following table is pulled directly from the Apple developer documentation.

---

> |Gesture | | |Desktop action |
|--|--|--|--|
|Tap | | | Click.
|Touch and hold | | | Press and hold down the mouse button or trackpad.
|Double-tap | | | Double-click.
|Drag | | | Drag.
|Swipe | | | Drag.
|Flick | | | Drag quickly.
|Two-finger drag | | 1. | Place the pointer where you want the two-finger drag to occur.
| | | 2. | Hold down the Option key.
| | | 3. | Move the circles that represent finger touches to the start position.
| | | 4. | Move the center of the pinch target by holding down the Shift key, 
| | |    | moving the circles to the desired center position, and releasing the Shift key.
| | | 5. | Hold down the Shift key and the mouse button, move the circles in the direction
| | |    | you want to drag, and release both the Shift key and the mouse button.
|Pinch | | 1. | Place the pointer where you want the pinch to occur.
| | | 2. | Hold down the Option key.
| | | 3. | Move the circles that represent finger touches to the start position.
| | | 4. | Move the center of the pinch target by holding down the Shift key, moving the
| | |    | circles to the desired center position, and releasing the Shift key.
| | | 5. | Hold down the mouse button, move the circles in and out to the end position,
| | |    | and release the Option key.
|Rotate | | 1. | Place the pointer where you want the rotation to occur.
| | | 2. | Hold down the Option key.
| | | 3. | Move the circles that represent finger touches to the start position.
| | | 4. | Move the center of the pinch target by holding down the Shift key, moving
| | |    | the circles to the desired center position, and releasing the Shift key.
| | | 5. | Hold down the mouse button, rotate the circles to the end position, and
| | |    | release the Option key.

---

Of course, there are devices that blur the lines between laptop and tablet (like my Surface Pro tablet). For those devices, we still want full touch support. So, this drop-in replacement for touchscreens needs to behave normally whenever the game is running on a device with a physical touchscreen. We do this so that the new class can be used as a drop-in replacement for `TouchPanel`. The game developer won't need to tweak their code to use our new component.

In this chapter, you will learn how to:

+ Intercept input states and modify them before the game has a chance to see them
+ Provide abstractions that allow you to utilize multiple devices with minimal impact to your game code

## Getting Started

This component was designed to mimic the functionality of the standard `TouchPanel` class of the MonoGame Framework, and it was written so that you can easily swap between the standard touchscreen APIs and the mouse-aware touchscreen APIs by simply changing your declarations. In the vast majority of cases, you will not need to change your game's input processing logic.

This helper class provides a mouse-aware replacement for the standard `TouchPanel` APIs. If you've written a game that only accepts input from the touchscreen, you can tweak your member declarations to reference instances of the class that we will develop in this chapter, and your game will support the mouse as an alternate touchscreen "*for free*".

### Laying the Foundation

Our first step is to recreate the existing `TouchPanel` functionality.

    using System;
    using System.Collections.Generic;
    
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    using Microsoft.Xna.Framework.Input;
    using Microsoft.Xna.Framework.Input.Touch;
    
    namespace Particles.Mac
    {
        public static class TouchPanelEx
        {
            static TouchPanelEx () { }
    
            public static int DisplayWidth { 
                get { return TouchPanel.DisplayWidth; }
            }
    
            public static int DisplayHeight {
                get { return TouchPanel.DisplayHeight; }
            }
    
            public static DisplayOrientation DisplayOrientation { 
                get { return TouchPanel.DisplayOrientation; }
            }
            
            public static GestureType EnabledGestures {
                get { return TouchPanel.EnabledGestures; }
            }
    
            public static bool IsGestureAvailable { 
                get { TouchPanel.IsGestureAvailable; }
            }
    
            public static IntPtr WindowHandle {
                get { TouchPanel.WindowHandle; }
            }
    
            public static TouchPanelCapabilities GetCapabilities() {
                return TouchPanel.GetCapabilities ();
            }
    
            public static TouchCollection GetState() {
                return TouchPanel.GetState ();
            }
    
            public static GestureSample ReadGesture() {
                return TouchPanel.ReadGesture ();
            }
        }
    }

It's silly, but we now have a `TouchPanelEx` class that mimics the MonoGame `TouchPanel` class exactly. If we wanted to use our new class in place of the built-in class, we need only append an "Ex" to the type declaration. Everything would work exactly as it does today. The touchscreen would function as expected, and the mouse would be ignored.

So, what do we need to tweak, and what can remain as-is?

### TouchPanelEx.GetCapabilities

Let's start with `GetCapabilities`. If you open the MonoGame source file for "TouchPanelCapabilities.cs", you'll see that the `TouchPanelCapabilities` definition is a structure. That's great. We should be able to just set some properties and be done with it.

But, wait. The public properties of the `TouchPanelCapabilities` are read-only. We cannot change any of the properties from our own code.

It looks like we'll need to create another structure that mimics `TouchPanelCapabilities`. That's not ideal, but should be easy enough to implement without requiring the caller (the game developer) to change their code that probes the capabilities of the device.

    using System;
    
    using Microsoft.Xna.Framework.Input.Touch;
    
    namespace Particles.Mac
    {
        public class TouchPanelCapabilitiesEx
        {
            public bool IsConnected;
            public bool HasPressure;
            public int MaximumTouchCount;
    
            public TouchPanelCapabilitiesEx ()
            {
                IsConnected = true;
                MaximumTouchCount = 1;
            }
    
            public TouchPanelCapabilitiesEx (TouchPanelCapabilities copy)
            {
                IsConnected = copy.IsConnected;
                MaximumTouchCount = copy.MaximumTouchCount;
                HasPressure = copy.HasPressure;
            }
    
        }
    }

Note that there are two constructors. A parameterless version that assumes mouse emulation. The second constructor takes an existing `TouchPanelCapabilities` instance and copies its values to our instance.

We have this new class to represent a standard `TouchPanelCapabilities` instance, which happens to also be mouse-aware. How do we use it? 

Well, we'll need to tweak the `GetCapabilities` method of our `TouchPanelEx` class. That method needs to be aware of whether there is a touchscreen on the current device or not. So, we'll also add a private property called `IsConnected` to tell us when we should toggle mouse and touchscreen functionality.

    private static bool IsConnected { 
        get { return TouchPanel.GetCapabilities ().IsConnected; } 
    }
    
    public static TouchPanelCapabilitiesEx GetCapabilities() {
        return IsConnected ?
            new TouchPanelCapabilitiesEx (TouchPanel.GetCapabilities ()) :
            new TouchPanelCapabilitiesEx ();
    }

With that change in place, the `GetCapabilities` method is now mouse-aware.

### Revisiting TouchPanelEx (Display)

Now that we can tell whether there's a touchscreen on the device or not, we can tweak the other methods to change their behavior when the touchscreen is detected or missing.

We'll start with the display properties. When the touchscreen is present, we'll get the current status from `TouchPanel`. When we're in mouse mode, we'll pull our display properties from the display adapter.

    public static int DisplayWidth { 
        get { 
            return IsConnected ? 
                TouchPanel.DisplayWidth :
                GraphicsAdapter.DefaultAdapter.CurrentDisplayMode.Width;
        }
    }
    
    public static int DisplayHeight {
        get { 
            return IsConnected ? 
                TouchPanel.DisplayHeight :
                GraphicsAdapter.DefaultAdapter.CurrentDisplayMode.Height;
        }
    }
    
    public static DisplayOrientation DisplayOrientation { 
        get { 
            if (IsConnected) {
                return TouchPanel.DisplayOrientation;
            } else {
                return DisplayHeight > DisplayWidth ?
                    DisplayOrientation.Portrait :
                    DisplayOrientation.LandscapeLeft;
            }
        }
    }

### Revisiting TouchPanelEx (Gestures)

Remember that I said that we won't be implementing gestures in this chapter. So, the following tweaks disable gestures when we're in mouse mode.

    public static GestureType EnabledGestures {
        get {
            return IsConnected ?
                TouchPanel.EnabledGestures :
                GestureType.None;
        }
    }
    
    public static bool IsGestureAvailable { 
        get { 
            return IsConnected ?
                TouchPanel.IsGestureAvailable :
                false;
        }
    }

    public static GestureSample ReadGesture() {
        return IsConnected ?
            TouchPanel.ReadGesture() :
            new GestureSample();
    }

### Revisiting TouchPanelEx (Window Handle)

There's a property in the `TouchPanel` class that retrieves the window handle for the touchscreen. When we're emulating touchscreen with the mouse, that value makes no sense. So, we'll just return a bogus value when in mouse mode.

    public static IntPtr WindowHandle {
        get {
            return IsConnected ?
                TouchPanel.WindowHandle :
                IntPtr.Zero;
        }
    }

### Revisiting TouchPanelEx (GetState)

This is where the real fun begins. We need to map mouse states to touchscreen states. Let's start by updating the `GetState` method to look like this, adding a new, private `MakeTouchCollectionFromMouse` method.

    public static TouchCollection GetState() {
        return IsConnected ?
            TouchPanel.GetState () :
            MakeTouchCollectionFromMouse();
    }

The `MakeTouchCollectionFromMouse` method keeps track of the previous and current mouse state data, and uses that data to emulate touch events.

    private static Vector2? previousLocation = null;
    private static TouchLocationState previousTouchState = TouchLocationState.Invalid;
    
    private static TouchCollection MakeTouchCollectionFromMouse() {
        var mouseState = Mouse.GetState ();
    
        var touchState = TouchLocationState.Invalid;
        if (mouseState.LeftButton == ButtonState.Pressed) {
            switch (previousTouchState) {
            case TouchLocationState.Invalid:
            case TouchLocationState.Released:
                touchState = TouchLocationState.Pressed;
                break;
            default:
                touchState = TouchLocationState.Moved;
                break;
            }
        } else {
            switch (previousTouchState) {
            case TouchLocationState.Pressed:
            case TouchLocationState.Moved:
                touchState = TouchLocationState.Released;
                break;
            default:
                touchState = TouchLocationState.Invalid;
                break;
            }
        }
    
        var isValid = 
            mouseState.LeftButton == ButtonState.Pressed ||
            touchState == TouchLocationState.Released;
    
        var result = new List<TouchLocation>();
        if (isValid) {
            result.Add( new TouchLocation (
                0,
                touchState,
                new Vector2 (mouseState.Position.X, mouseState.Position.Y),
                previousTouchState,
                previousLocation.HasValue ? previousLocation.Value : Vector2.Zero));
        }
    
        previousLocation = new Vector2 (mouseState.Position.X, mouseState.Position.Y);
        previousTouchState = touchState;
    
        return new TouchCollection(result.ToArray());
    }

## Summary

That's it. We're done. Our helper class is ready to drop into any game that would like to allow the mouse to act as a touchscreen.

## Review Questions

Blah. Blah. Blah. Blah. Blah.

## Exercises

Blah. Blah. Blah. Blah. Blah.
