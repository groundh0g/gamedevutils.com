---
layout: book
title: "Chapter 13"
tagline: "Libraries - GamePadEx"
lastReviewedOn: "2016-08-01 00:00:00 -0500"
status: draft
---

## Overview

The mouse, keyboard, touchscreens, and game pads are very different devices, each requiring specialized code. There are times when it would be nice to play a game without hooking up a controller. But you don't want to write code to support multiple devices every time you start a game project. Besides, some of the folks who want to play your game may not have a controller hooked up to their PC.

Also, there are many times (especially if you're doing your development on a laptop) when it may not be convenient to carry a controller around.  Wouldn't it be nice to emulate a controller using your keyboard? You could just map some keyboard keys to the game pad buttons and play test your game without ever taking your hands off the keyboard.

>**NOTE:** If you'd prefer to attract attention, plug your controller into your laptop at the local WiFi-enabled caf&eacute;. Before I implemented a similar helper class for keyboard support in my games, I *had* to use the controller. Most people assume you're just playing games, but I did meet several aspiring game developers during that time. (*Hi, @wolfire1992! *)

In this chapter, we'll develop a reusable, keyboard-aware replacement for the standard `GamePad` classes. In addition to mapping keyboard keys to controller buttons, our new component will also relay the states of any actual controllers that are connected. We do this so that the new class can be used as a drop-in replacement for `GamePad`. The game developer won't need to tweak their code to use our new component.

In this chapter, you will learn how to:

+ Intercept input states and modify them before the game has a chance to see them
+ Provide abstractions that allow you to utilize multiple devices with minimal impact to your game code

## Caveats and Pitfalls

Of course, a keyboard isn't a controller. So there are some caveats to note when using this new component.

### No Analog Button Support

A physical controller supports several analog buttons. Since keyboard keys are digital (pressed or not pressed), we'll need to map the analog buttons to their extremes when updating their state. In essence, the keyboard-emulated thumbsticks and triggers will behave like the directional pad on the real controller.

One of the following constants is reported to the calling code whenever a (always digital) key press is mapped to an analog game pad button:

    public const float TRIGGER_MAX = 1.00f;
    public const float TRIGGER_MIN = 0.00f;
    public const float THUMBSTICK_MAX = 1.00f;
    public const float THUMBSTICK_MIN = -1.00f;

### One Player; Maybe Two

The players who are using the keyboard are playing in a physically-constrained space - it's not the best device to have four players use at the same time. To keep our design simple, we'll restrict our new component to support just one player.

>**NOTE:** The original design for this component, in my 2007 XNA book, provided support for up to two simultaneous players. That was when I knew my target audience was using a full-sized keyboard. I'm not. My MacBook Pro doesn't have a number pad. If you'd like to add another emulated controller, contact me. If there's enough interest, I'll post a version of the code that supports two keyboard-bound players.

## Getting Started

This component was designed to mimic the functionality of the standard `GamePad` class of the MonoGame Framework, and it was written so that you can easily swap between the standard game pad APIs and the keyboard-aware game pad APIs by simply changing your declarations. In the vast majority of cases, you will not need to change your game's input processing logic.

This helper class provides a keyboard-aware replacement for the standard `GamePad` APIs. If you've written a game that only accepts input from the game pad, you can tweak your member declarations to reference instances of the class that we will develop in this chapter, and your game will support the keyboard as an alternate controller "*for free*".

### Laying the Foundation

Our first step is to recreate the existing `GamePad` functionality.

    using System;
    
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Input;
    
    namespace Codetopia.Xna.Framework.Input
    {
        public static class GamePadEx
        {
            public static bool SetVibration(
                PlayerIndex playerIndex, float leftMotor, float rightMotor) {
                return GamePad.SetVibration (playerIndex, leftMotor, rightMotor);
            }
    
            public static GamePadCapabilitiesEx GetCapabilities (PlayerIndex playerIndex) {
                return GamePad.GetCapabilities(playerIndex);
            }
    
            public static GamePadState GetState(PlayerIndex playerIndex) {
                return GamePadEx.GetState (playerIndex, GamePadDeadZone.IndependentAxes);
            }
    
            public static GamePadState GetState(
                PlayerIndex playerIndex, GamePadDeadZone deadZoneMode) {
                return GamePad.GetState(playerIndex, deadZoneMode);
            }
        }
    }

It's silly, but we now have a `GamePadEx` class that mimics the MonoGame `GamePad` class exactly. If we wanted to use our new class in place of the built-in class, we need only append an "Ex" to the type declaration. Everything would work exactly as it does today. The controllers would function as expected, and the keyboard would be ignored.

So, what do we need to tweak, and what can remain as-is?

Well, I've never owned a keyboard that had rumble motors. So we'll leave `SetVibration` alone. That leaves `GetCapabilities` and two overloaded versions of `GetState`. One of those two overloaded methods simply calls the other, so it looks like we can add our extensions to just two methods.

### GamePadEx.GetCapabilities

Let's start with the seemingly easier of the two - `GetCapabilities`. If you open the MonoGame source file for "GamePadCapabilities.cs", you'll see that the `GamePadCapabilities` definition is a structure. That's great. We should be able to just set some properties and be done with it.

But, wait. The public properties of the `GamePadCapabilities` are marked as `public` get, but `internal` set. That means that only the assembly that houses the structure can modify it (in this case, the MonoGame DLL). We cannot change any of the properties from our own code.

It looks like we'll need to create another structure that mimics `GamePadCapabilities`. That's not ideal, but should be easy enough to implement without requiring the caller (the game developer) to change their code that probes the capabilities of the device.

    using System;
    using System.Collections.Generic;
    
    using Microsoft.Xna.Framework.Input;
    
    namespace Codetopia.Xna.Framework.Input
    {
        public struct GamePadCapabilitiesEx
        {
            public bool IsConnected { get; set; }
            public bool HasAButton { get; set; }
            public bool HasBackButton { get; set; }
            public bool HasBButton { get; set; }
            public bool HasDPadDownButton { get; set; }
            public bool HasDPadLeftButton { get; set; }
            public bool HasDPadRightButton { get; set; }
            public bool HasDPadUpButton { get; set; }
            public bool HasLeftShoulderButton { get; set; }
            public bool HasLeftStickButton { get; set; }
            public bool HasRightShoulderButton { get; set; }
            public bool HasRightStickButton { get; set; }
            public bool HasStartButton { get; set; }
            public bool HasXButton { get; set; }
            public bool HasYButton { get; set; }
            public bool HasBigButton { get; set; }
            public bool HasLeftXThumbStick { get; set; }
            public bool HasLeftYThumbStick { get; set; }
            public bool HasRightXThumbStick { get; set; }
            public bool HasRightYThumbStick { get; set; }
            public bool HasLeftTrigger { get; set; }
            public bool HasRightTrigger { get; set; }
            public bool HasLeftVibrationMotor { get; set; }
            public bool HasRightVibrationMotor { get; set; }
            public bool HasVoiceSupport { get; set; }
            public GamePadType GamePadType { get; set; }
    
            // TODO: add a constructor to copy the values from 
            //       an existing GamePadCapatilities instance
            // public GamePadCapabilitiesEx(GamePadCapabilities copy)
            
            
            // TODO: add a constructor to populate the values for
            //       the keyboard using the keyboard mapping
            // public GamePadCapabilitiesEx(Dictionary<Keys, Buttons> keyMappings)
    
        }
    }
       
The only difference between the MonoGame implementation and ours is that the getters and setters are both now marked as `public`, so we'll be able to tweak them for the keyboard, or copy an existing `GamePadCapabilities` structure's values to our own.

Note the first "TODO:" in the comments. The following code implements a constructor that does just that.

    // TODO: add a constructor to copy the values from 
    //       an existing GamePadCapatilities instance
    public GamePadCapabilitiesEx(GamePadCapabilities copy) : this() {
        this.IsConnected = copy.IsConnected;
        this.HasAButton = copy.HasAButton;
        this.HasBackButton = copy.HasBackButton;
        this.HasBButton = copy.HasBButton;
        this.HasDPadDownButton = copy.HasDPadDownButton;
        this.HasDPadLeftButton = copy.HasDPadLeftButton;
        this.HasDPadRightButton = copy.HasDPadRightButton;
        this.HasDPadUpButton = copy.HasDPadUpButton;
        this.HasLeftShoulderButton = copy.HasLeftShoulderButton;
        this.HasLeftStickButton = copy.HasLeftStickButton;
        this.HasRightShoulderButton = copy.HasRightShoulderButton;
        this.HasRightStickButton = copy.HasRightStickButton;
        this.HasStartButton = copy.HasStartButton;
        this.HasXButton = copy.HasXButton;
        this.HasYButton = copy.HasYButton;
        this.HasBigButton = copy.HasBigButton;
        this.HasLeftXThumbStick = copy.HasLeftXThumbStick;
        this.HasLeftYThumbStick = copy.HasLeftYThumbStick;
        this.HasRightXThumbStick = copy.HasRightXThumbStick;
        this.HasRightYThumbStick = copy.HasRightYThumbStick;
        this.HasLeftTrigger = copy.HasLeftTrigger;
        this.HasRightTrigger = copy.HasRightTrigger;
        this.HasLeftVibrationMotor = copy.HasLeftVibrationMotor;
        this.HasRightVibrationMotor = copy.HasRightVibrationMotor;
        this.HasVoiceSupport = copy.HasVoiceSupport;
        this.GamePadType = copy.GamePadType;
    }

Note the second "TODO:" in the comments. The following code implements a constructor and member variable that does just that. We'll return it whenever the capabilities for the keyboard "controller" are requested.

    // TODO: add a constructor to populate the values for
    //       the keyboard using the keyboard mapping
    public GamePadCapabilitiesEx(Dictionary<Keys, Buttons> keyMappings) : this() {
        this.IsConnected = true;
        this.HasAButton = keyMappings.ContainsValue(Buttons.A);
        this.HasBackButton = keyMappings.ContainsValue(Buttons.A);
        this.HasBButton = keyMappings.ContainsValue(Buttons.A);
        this.HasDPadDownButton = keyMappings.ContainsValue(Buttons.A);
        this.HasDPadLeftButton = keyMappings.ContainsValue(Buttons.A);
        this.HasDPadRightButton = keyMappings.ContainsValue(Buttons.A);
        this.HasDPadUpButton = keyMappings.ContainsValue(Buttons.A);
        this.HasLeftShoulderButton = keyMappings.ContainsValue(Buttons.A);
        this.HasLeftStickButton = keyMappings.ContainsValue(Buttons.A);
        this.HasRightShoulderButton = keyMappings.ContainsValue(Buttons.A);
        this.HasRightStickButton = keyMappings.ContainsValue(Buttons.A);
        this.HasStartButton = keyMappings.ContainsValue(Buttons.A);
        this.HasXButton = keyMappings.ContainsValue(Buttons.A);
        this.HasYButton = keyMappings.ContainsValue(Buttons.A);
        this.HasBigButton = keyMappings.ContainsValue(Buttons.A);
        this.HasLeftXThumbStick = keyMappings.ContainsValue(Buttons.A);
        this.HasLeftYThumbStick = keyMappings.ContainsValue(Buttons.A);
        this.HasRightXThumbStick = keyMappings.ContainsValue(Buttons.A);
        this.HasRightYThumbStick = keyMappings.ContainsValue(Buttons.A);
        this.HasLeftTrigger = keyMappings.ContainsValue(Buttons.A);
        this.HasRightTrigger = keyMappings.ContainsValue(Buttons.A);
        this.HasLeftVibrationMotor = false;
        this.HasRightVibrationMotor = false;
        this.HasVoiceSupport = false;
        this.GamePadType = GamePadType.GamePad;
    }

We have this new class to represent a standard `GamePadCapabilities` instance, which happens to also be keyboard-aware. How do we use it? 

We need to return the keyboard capabilities if the `playerIndex` matches the player index of the emulated controller, and return the specified controller's capabilities otherwise. We'll need a way to know if the specified player index is the keyboard-aware index.
 
    // set the emulated controller index
    public static PlayerIndex? KeyboardPlayerIndex { get; set; }
    
    // is the specified playerIndex the one associated with the keyboard?
    private static bool IsKeyboardPlayerIndex(PlayerIndex playerIndex) 
    {
        return 
            KeyboardPlayerIndex.HasValue &&
            KeyboardPlayerIndex.Value == playerIndex;
    }


Now we can tweak the `GetCapabilities` method of our `GamePadEx` class to change its behavior if the specified player index is the keyboard-aware index. 

    public static Dictionary<Keys, Buttons> KeyMappings = new Dictionary<Keys, Buttons>();

    public static GamePadCapabilitiesEx GetCapabilities (PlayerIndex playerIndex) {
        GamePadCapabilitiesEx? result = null;
    
        if (IsKeyboardPlayerIndex (playerIndex)) {
            result = new GamePadCapabilitiesEx (GamePadEx.KeyMappings);
        } else {
            try {
                result = new GamePadCapabilitiesEx(GamePad.GetCapabilities(playerIndex));
            } catch { }
        }
    
        return result.HasValue ? result.Value : new GamePadCapabilitiesEx ();
    }

With that change in place, the `GetCapabilities` method is now keyboard-aware.

### GamePadEx.GetState

This is where the real fun begins. We need to map keyboard keys to game pad buttons, sticks, and triggers. Let's start by updating the `GetState` methods to look like this.

    public static GamePadState GetState(PlayerIndex playerIndex) {
        return GamePadEx.GetState (playerIndex, GamePadDeadZone.IndependentAxes);
    }
    
    public static GamePadState GetState(PlayerIndex playerIndex, GamePadDeadZone deadZoneMode) {
        GamePadState? result = null;
    
        try {
            if(!IsKeyboardPlayerIndex(playerIndex)) {
                result = GamePad.GetState(playerIndex, deadZoneMode);
            } else {
                var keyboardState = Keyboard.GetState();
                var pressedButtons = new List<Buttons>();
                foreach(Keys key in keyboardState.GetPressedKeys()) {
                    if(GamePadEx.KeyMappings.ContainsKey(key)) {
                        pressedButtons.Add(GamePadEx.KeyMappings[key]);
                    }
                }
    
                var leftThumbstick = Vector2.Zero;
                if(pressedButtons.Contains(Buttons.DPadUp)) {
                    leftThumbstick.Y = THUMBSTICK_MAX;
                } else if(pressedButtons.Contains(Buttons.DPadDown)) {
                    leftThumbstick.Y = THUMBSTICK_MIN;
                }
                if(pressedButtons.Contains(Buttons.DPadRight)) {
                    leftThumbstick.X = THUMBSTICK_MAX;
                } else if(pressedButtons.Contains(Buttons.DPadLeft)) {
                    leftThumbstick.X = THUMBSTICK_MIN;
                }
    
                result = new GamePadState(
                    leftThumbstick,
                    Vector2.Zero, // Right Thumbstick
                    0.0f, // Left Trigger
                    0.0f, // Right Trigger
                    pressedButtons.ToArray());
                }
        } catch { }
    
        return result.HasValue ? result.Value : GamePadState.Default;
    }

As written, our `GamePadEx` would pass through the controller data for connected controllers, but the keyboard controller will always behave as if no inputs are being touched. We haven't declared the key mappings yet. Let's add them now.

    static GamePadEx() {
        KeyMappings = KEY_MAPPINGS_PROFILE_1;
    }
    
    public static readonly Dictionary<Keys, Buttons> KEY_MAPPINGS_PROFILE_1 = new Dictionary<Keys, Buttons> {
        { Keys.W, Buttons.DPadUp },
        { Keys.S, Buttons.DPadDown },
        { Keys.A, Buttons.DPadLeft },
        { Keys.D, Buttons.DPadRight },
        { Keys.Up, Buttons.DPadUp },
        { Keys.Down, Buttons.DPadDown },
        { Keys.Left, Buttons.DPadLeft },
        { Keys.Right, Buttons.DPadRight },
        { Keys.Space, Buttons.A },
        { Keys.RightControl, Buttons.B },
        { Keys.Enter, Buttons.Start },
        { Keys.Escape, Buttons.Back },
        { Keys.Back, Buttons.Back },
    };

The selection for mapping keyboard keys to controller buttons was arbitrary. I wanted easy access for using both the left thumbstick and DPad, pressing A, or pressing B. The escape key felt like a natural fit for `Back`, and the enter key felt like a natural fit for `Start`.

There's nothing preventing you from mapping several keyboard keys to the same controller button. For example, the current mapping associates both `W` and `Up` with `DPadUp`.

### GamePadEx.SetVibration

While I said earlier that we don't need to tweak the `SetVibration` method since keyboards don't have rumble motors, it's odd that we'd pass that request on to a (most likely) disconnected controller. 

In fact, the framework documentation says that querying the state of a disconnected controller is invalid for all but the `IsConnected` member. So, we'll check to see if the specified `playerIndex` is the one associated with the keyboard, and do nothing in that case. 

>"When a controller is disconnected, values for its state will not be valid. Also, the controller will not receive any new vibration settings."

Just replace the existing `SetVibration` method in our `GamePadEx` class with the following code to make it keyboard-aware.

    public static bool SetVibration(
        PlayerIndex playerIndex, 
        float leftMotor, 
        float rightMotor)
    {
        var result = false;
        if (!IsKeyboardPlayerIndex (playerIndex)) {
            try {
                result = GamePad.SetVibration (playerIndex, leftMotor, rightMotor);
            } catch { }
        }
        return result;
    }

That's it. We now have a drop-in replacement for the controller that's also keyboard-aware.

>**NOTE:** As of this writing, there's a bug in the MonoGame input logic that throws an exception when you query the state of a controller that's not connected. That's clearly not the intended behavior, since you have to query to the controller to see if it's connected in the first place.

> In my XNA book, I included a section on optimization. It said to only use exceptions in exceptional cases. That's still my philosophy, but having the game crash on the first call to `Update` isn't an option.

## Summary

That's it. We're done. Our helper class is ready to drop into any game that would like to allow the keyboard to act as a controller.

## Review Questions

Blah. Blah. Blah. Blah. Blah.

## Exercises

Blah. Blah. Blah. Blah. Blah.
