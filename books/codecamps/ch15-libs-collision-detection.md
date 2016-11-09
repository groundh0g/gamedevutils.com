---
layout: book
title: "Chapter 15"
tagline: "Libraries - Collision Detection"
lastReviewedOn: "2016-08-01 00:00:00 -0500"
status: draft
---

## Overview

Nothing irritates players more than thinking that they hit an opponent and the hit doesn't register, or thinking that they dodged a bullet only to find that they've lost a life. For most game programming tasks, ''close enough'' is perfectly fine. Collision detection isn't one of those tasks, though.

In this chapter, we will develop a reusable class to help us manage pixel-perfect 2D collision detection.

In this chapter, you will learn how to:

* Extract pixel data from a texture
* Quickly determine whether two on-screen sprites are touching

## Opacity Data

Sprites are based on textures. Those textures are made up of pixels. To determine if two sprites are touching, you need to see if any common, opaque (non-transparent) pixels occupy the same on-screen pixel. To do that, you'll need to access the pixel data for the texture(s) of the two sprites. Luckily there's a method in the Texture2D class that does just that.

To access the pixels for a texture, we'll use code similar to the following:

    // an array to hold the pixel data from the texture
    Color[] pixels = new Color[texture.Width * texture.Height];
    // fill our array with the texture's pixel data 
    texture.GetData<Color>(pixels);

Now we can access any pixel in the single-dimensional array using code similar to the following:

    Color pixel = pixels[x + (y * texture.Width)];

### Remembering Opacity

The `GetData` method of the `Texture2D` class is fairly expensive in terms of performance and memory usage (and garbage collection churn). We'll want to get the data once, and then store it somewhere so that we can refer to that in-memory copy of the data rather than pulling it from the texture every time we need to inspect a sprite's pixels.

It's not important what color each pixel in our sprite is. We only need to know if the pixel is opaque or transparent. Rather than store the colors of each pixel, we'll store an array of `bool` values that tell us whether a given pixel is opaque.

### Alpha Threshold

There may be some pixels that aren't fully opaque or fully transparent. For example, your sprite may have a drop shadow. In that case, you probably don't want a collision to be triggered when the missile hits the ship's shadow. To make our code configurable, we'll add a threshold value for the opacity. If the alpha is greater than or equal to this threshold, we'll consider that pixel to be opaque.

### A Simple Collision Detection Optimization

Even though we saved some processing effort by storing our pixel data in an array of booleans rather than repeatedly accessing the texture's pixel data directly, it's still rather CPU-intensive to scan an opacity data array for every pixel of every sprite that's on the screen with every call to our game's `Update` method.

It's a complete waste of time and resources to check for collisions, pixel by pixel, when the sprite textures don't overlap at all. To save ourselves some effort (and some valuable CPU cycles), we need to make sure that there's at least a chance for a collision, by checking to see if our sprite textures overlap.

## The PixelPerfectHelper Class

The `PixelPerfectHelper` class contains a collection of static methods to help us detect 2D collisions.

    using System;
    
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    
    using Codetopia.Xna.Lib.Util.Collision;

    namespace Codetopia.Xna.Lib.Util
    {
        public static class CollisionUtil
        {
            // TODO: Implement GetOpaqueData
            public static bool[,] GetOpaqueData(
                Texture2D texture, Rectangle rect, byte threshold)
            {
                return null;
            }
    
            // TODO: Implement DetectCollision
            public static bool DetectCollision(
                Rectangle rect1, Vector2 loc1, bool[,] data1,
                Rectangle rect2, Vector2 loc2, bool[,] data2)
            {
                return false;
            }
        }
    }

### GetOpaqueData

The first task in collision detection is to generate our opacity data array. Given a `Texure2D` object, the texture rectangle for the sprite, and an opacity threshold, the `GetOpaqueData` generates and returns an array of Boolean values that represent the opacity of each pixel of the sprite.

         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING
         // TODO: Implement GetOpaqueData
         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING

         // overload for GetOpaqueData(Texture2D, Rectangle, byte)
         public static bool[,] GetOpaqueData(IPixelPerfectSprite sprite)
         {
            return GetOpaqueData(sprite.TextureData, sprite.TextureRect, 255);
         }

         // overload for GetOpaqueData(Texture2D, Rectangle, byte)
         public static bool[,] GetOpaqueData(
            IPixelPerfectSprite sprite, byte threshold)
         {
            return
               GetOpaqueData(sprite.TextureData, sprite.TextureRect, threshold);
         }

         // overload for GetOpaqueData(Texture2D, Rectangle, byte)
         public static bool[,] GetOpaqueData(Texture2D texture, Rectangle rect)
         {
            return GetOpaqueData(texture, rect, 255);
         }

         // extract pixel data from the texture
         public static bool[,] GetOpaqueData(
            Texture2D texture, Rectangle rect, byte threshold)
         {
            // temp variables to save some typing
            int width = rect.Width;
            int height = rect.Height;

            // an array of booleans, one for each pixel
            // true = opaque (considered), false = transparent (ignored)
            bool[,] data = new bool[width, height];

            // an array to hold the pixel data from the texture
            Color[] pixels = new Color[texture.Width * texture.Height];

            // I'd rather have used the overload for Texture2D.GetData
            // that specifies the texture rect, but that function didn't
            // work on the Xbox 360. This version pulls pixel data from 
            // the entire texture, but it should be OK since we're only 
            // using it briefly, and only on init of our game sprites.
            texture.GetData<Color>(pixels);

            // for each row of pixel data
            for (int y = 0; y < height; y++)
            {
               // for each column of pixel data
               for (int x = 0; x < width; x++)
               {
                  // if the pixel's alpha exceeds our threshold,
                  // note it in our boolean array
                  if (pixels[
                     rect.Left + x +
                     (rect.Top + y) *
                     texture.Width].A >= threshold)
                  {
                     data[x, y] = true;
                  }
               }
            }

            // return our findings to the caller
            return data;
         }

### DetectCollision

Once we have our opacity data, we can start checking for sprite collisions. The `DetectCollision` method encapsulates the two checks that need to be performed - do the sprite textures overlap, and, if so, do any of the overlapping, opaque pixels touch? These two checks are handled by the `BoundsOverlap` and `PixelsTouch` methods, respectively.

         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING
         // TODO: Implement DetectCollision
         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING
   
         // overload for DetectCollision(Rect, Vec2, bool[], Rect, Vec2, bool[,])
         public static bool DetectCollision(
            IPixelPerfectSprite one, IPixelPerfectSprite two)
         {
            return DetectCollision(
               one.TextureRect, one.Location, one.OpaqueData,
               two.TextureRect, two.Location, two.OpaqueData);
         }

         // determine whether the bounding rectangles of the sprites overlap
         // if they do, compare pixel-by-pixel within the intersection
         public static bool DetectCollision(
            Rectangle rect1, Vector2 loc1, bool[,] data1,
            Rectangle rect2, Vector2 loc2, bool[,] data2)
         {
            return
               BoundsOverlap(rect1, loc1, rect2, loc2) &&
               PixelsTouch(rect1, loc1, data1, rect2, loc2, data2);
         }

         // TODO: Implement BoundsOverlap
         private static bool BoundsOverlap(
            Rectangle rect1, Vector2 loc1,
            Rectangle rect2, Vector2 loc2)
         {
            return false;
         }

         // TODO: Implement PixelsTouch
         private static bool PixelsTouch(
            Rectangle rect1, Vector2 loc1, bool[,] data1,
            Rectangle rect2, Vector2 loc2, bool[,] data2)
         {
            return false;
         }

Note the two helper methods - `BoundsOverlap` and `PixelsTouch`. They're used internally by `CheckForCollisions`. The first check is quick. We just want to know if the two specified sprites overlap. If not, we don't have to check any further.

![The three steps of collision detection.](images/figure-collisions.png)

If the sprites do overlap, we'll need to check the subset of opaque pixels that overlap. If any of those are touching, we have a collision.

#### BoundsOverlap

The `BoundsOverlap` method returns a boolean value. If any part of the bounding rectangles of the two sprites overlap, this method will return true.

If the first sprite is fully to the left, fully to the right, fully above, or fully below the second sprite, there is no overlap. Otherwise, the bounding rectangles of the two sprites do overlap, and we need to perform a pixel-by-pixel comparison.

         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING
         // TODO: Implement BoundsOverlap
         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING

         // see if the texture rectangles overlap, if they don't, there's
         // no need to do a pixel-by-pixel comparison
         private static bool BoundsOverlap(
            Rectangle rect1, Vector2 loc1,
            Rectangle rect2, Vector2 loc2)
         {
            // determine the top, left, bottom, right for rect1
            int top1 = (int)loc1.Y;
            int left1 = (int)loc1.X;
            int bottom1 = top1 + rect1.Height;
            int right1 = left1 + rect1.Width;

            // determine the top, left, bottom, right for rect2
            int top2 = (int)loc2.Y;
            int left2 = (int)loc2.X;
            int bottom2 = top2 + rect2.Height;
            int right2 = left2 + rect2.Width;

            return !(
               // rect1 fully to the right of rect2?
               left1 > right2 ||
               // rect1 fully to the left of rect2?
               right1 < left2 ||
               // rect1 fully below rect2?
               top1 > bottom2 ||
               // rect1 fully above rect2?
               bottom1 < top2
            );
         }

#### PixelsTouch

This is the routine where pixel-by-pixel comparisons are performed. First, we calculate the bounds of the smallest rectangle that contains all of the overlapping pixels of both sprites. Then, we focus our search for a collision to that subset of the opaque data. If both sprites have an opaque pixel at the same location, a collision has occurred.

         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING
         // TODO: Implement PixelsTouch
         // REPLACE PLACEHOLDER CODE WITH THE FOLLOWING

         // perform a pixel-by-pixel comparison
         private static bool PixelsTouch(
            Rectangle rect1, Vector2 loc1, bool[,] data1,
            Rectangle rect2, Vector2 loc2, bool[,] data2)
         {
            // update rects with locations of sprites
            rect1.X = (int)Math.Round(loc1.X);
            rect1.Y = (int)Math.Round(loc1.Y);
            rect2.X = (int)Math.Round(loc2.X);
            rect2.Y = (int)Math.Round(loc2.Y);

            // determine the intersection of the two rects
            Rectangle intersect = Rectangle.Empty;
            intersect.Y = Math.Max(rect1.Top, rect2.Top);
            intersect.X = Math.Max(rect1.Left, rect2.Left);
            int bottom = Math.Min(rect1.Bottom, rect2.Bottom);
            int right = Math.Min(rect1.Right, rect2.Right);
            intersect.Height = bottom - intersect.Y;
            intersect.Width = right - intersect.X;

            // scan the intersected rectangle, pixel-by-pixel
            int x1 = intersect.X - rect1.X;
            int x2 = intersect.X - rect2.X;
            int y1 = intersect.Y - rect1.Y;
            int y2 = intersect.Y - rect2.Y;
            for (int y = 0; y < intersect.Height; y++)
            {
               for (int x = 0; x < intersect.Width; x++)
               {
                  // are both pixels opaque?
                  if (data1[x1 + x, y1 + y] &&
                     data2[x2 + x, y2 + y])
                  {
                     return true;
                  }
               }
            }
            return false;
         }

### PixelPerfectHelper in Action

To keep our parameter lists small, we'll make sure that the game's custom sprite class implements the `IPixelPerfectSprite` interface.

    using System;
    
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    
    namespace Codetopia.Xna.Lib.Util.Collision
    {
        public interface IPixelPerfectSprite
        {
            Texture2D TextureData { get; set; }
            Rectangle TextureRect { get; set; }
            Vector2 Location { get; set; }
            bool[,] OpaqueData { get; set; }
        }
    }

That interface exposes all of the sprite properties that we'll need to perform collision detection. The following is an example class that implements the interface.

    using System;
    
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    
    namespace Codetopia.Xna.Lib.Util.Collision
    {
        public class GameSprite
        {
            public Texture2D TextureData { get; set; }
            public Rectangle TextureRect { get; set; }
            public Vector2 Location { get; set; }
            public bool[,] OpaqueData { get; set; }
    
            // draw this sprite, using current settings, and specified tint
            public void Draw(SpriteBatch batch, Color color)
            {
                batch.Draw(TextureData, Location, TextureRect, color);
            }
        }
    }

## Our Game

Since this set of classes is used in several of the example games, I'm not going to write a new example just to showcase collision detection. If you'd like to see collisions in action check out one of the following chapters.

* Chapter 4: Spit and Polish
* Chapter 5: Side Scroller
* Chapter X: Blah. Blah. Blah.

A contrived example follows.

    var foo = new bar();

In this example, blah. Blah. Blah. Blah.

## Summary

In this chapter, you learned how to inspect pixel data from a texture and use that data to perform pixel-perfect collision detection between 2D objects. You learned about some of the performance concerns with this method, and you picked up a couple of optimization tips for offsetting those penalties.

## Review Questions

Think about what you've read in this chapter (and the included source code) to answer the following questions.

1. What are the two basic checks that are performed when detecting collisions using the methods described in this chapter?
1. Why are two checks performed?
1. Why is opacity data collected once, when the texture is first loaded?
1. How does this method of collision detection avoid false positives, for example when one sprite touches another sprite's shadow?

## Exercises

**EXERCISE 1.** Create a game, based on the code in this chapter, where any balls that the player touches become stuck to the player. Move the attached balls the same distance and in the same direction as the player as his location is updated.

**EXERCISE 2.** Similar to the first exercise, create a game, based on the code in this chapter, where any balls that the player touches begin to follow the player. Track the last NUM_OBSTACLES location of the player, and render each captured obstacle in one of those locations to achieve a growing snake effect.

**EXERCISE 3.** Create a game, based on the code and images in this chapter, that uses more than one obstacle image. Circles are a good test shape since they have transparent data on all sides, but it's a little boring. Add some stars, crescent moons, gears, or any other irregular shape that you like. To keep things simple, you can still use a single source texture, but you'll need to have distinct texture rectangles for each obstacle object.
