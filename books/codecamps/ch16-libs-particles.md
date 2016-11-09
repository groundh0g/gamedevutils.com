---
layout: book
title: "Chapter 16"
tagline: "Libraries - Particles"
lastReviewedOn: "2016-08-01 00:00:00 -0500"
status: draft
---

## Overview

Individual particles are usually rather insignificant. But collectively, particles can be used to great effect, with minimal resource consumption.

Particles are created and managed by an object known as an emitter. The emitter spawns new particles from its current location, configuring each with a location, velocity, lifetime, and other properties. Once they leave the emitter, particles are pretty much independent objects. Global forces like gravity and wind may affect particles, and they may vary their color or opacity over time (for example a burning ember may fade to nothing).

Particle systems are used in a wide variety of game genres for a wide variety of in-game effects.

* When your racecar scrapes against a guardrail, the sparks are particles.
* When you're snowboarding down a mountain, the snow wash from your board is made up of particles.
* When you fire a missile from your fighter jet, the vapor trail is made up of particles.
* When your 12th-level mage summons enough mana to cast a healing spell, the aura that surrounds her contains particles.
* When you clear a row in your favorite puzzle game and the blocks explode, the falling pieces are particles.
* When you shoot out a window in a first-person shooter, the shards of glass that fall to the ground are particles.
* When a comet flies by your starship, its tail contains particles.
* When you throw a smoke grenade onto the battlefield, the resulting smokescreen is made up of particles.
* When you walk past a fountain in your favorite MMORPG, the water jets are made up of particles.

## Getting Started

In this chapter, we will create a simple 2D particle system. The example code that we will develop is by no means a complete implementation, but it should provide a good base for you to build on, and it will effectively demonstrate the basic features of a 2D particle system. Many of the concepts that you learn here will apply to 3D particle systems as well.

Some particle systems account for collisions between particles and other game objects but rarely include checks for collisions between particles and other particles. In the interest of simplicity, the code that we develop in this chapter doesn't include any non-particle game objects, so we won't add collision checking to our system.

In this chapter, you will learn how to:

* Manage thousands of simple game objects simultaneously
* Limit the resources that these objects consume
* Add simple effects to your game to make it more immersive

## The Architecture

The particle effect is made up of a few, specialized classes. These classes work together to manage the state of individual particles, and then render the results to the screen. This example is designed around the MonoGame Framework's 2D graphics APIs, but most of the principles that we'll discuss in this chapter are also applicable in a 3D particle system.

### The Particle

The particle is the basic building block of any particle system. Particles appear on the screen as a single point or 2D graphic. Minimally, particles have a location and velocity. Our particles will also include properties for color, age, lifetime, rotation, opacity, scale, and depth. The Particle class has only two methods: Update and Draw.

The following list describes each of the parameters and methods of this class.

* `Age`: The number of (cumulative) seconds that this particle has been active.
* `Color`: The tint with which to draw this sprite.
* `Depth`: The Z-Order of this sprite, expressed as a float between 0.0f and 1.0f.
* `IsActive`: The current state of this particle. Particles are created once, and placed in a pool. When a particle is marked as inactive, it's available to be spawned as a new on-screen particle.
* `Lifetime`: The maximum number of (cumulative) seconds that this particle may remain active.
* `Velocity`: The distance that this particle will travel in a single second, assuming no outside force (like gravity or wind) is affecting it.
* `Opacity`: The current transparency of this particle.
* `Location`: The current location (screen coordinates) of this particle.
* `Rotation`: The current rotation of this particle, expressed in radians.
* `Scale`: The scale of this particle, where 1.0f is the actual size of the source texture.
* `Draw()`: Draw this particle using its current properties.
* `Update()`: Move the sprite, and update its age.

The `Particle` class is basically just a warehouse for the properties that the `Emitter` class uses to manage each particle.

    using System;
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    
    namespace MoreOnCode.Graphics.ParticleSystem
    {
       public struct Particle
       {
          public bool IsActive;
          public double Age;
          public double LifeTime;
          public Vector2 Position;
          public Vector2 Velocity;
          public Vector4 Color;
          public float Rotation;
          public float Opacity;
          public float Scale;
          public float Depth;
    
          // update position and age
          public void Update(float elapsed)
          {
             // only update active particles
             if (IsActive)
             {
                // move the particle
                Position += Velocity * elapsed;
    
                // check for expired particles
                if (LifeTime != 0.0f) // 0.0f == never dies
                {
                   Age += elapsed;
                   if (Age > LifeTime)
                   {
                      IsActive = false;
                   }
                }
             }
          }
    
          // render the particle
          public void Draw(
             SpriteBatch batch,
             Texture2D texture,
             Rectangle clipRect)
          {
             // only draw active particles
             if (IsActive)
             {
                batch.Draw(
                   texture,
                   Position,
                   clipRect,
                   new Color(Color),
                   Rotation,
                   Vector2.Zero,
                   Scale,
                   SpriteEffects.None,
                   Depth);
             }
          }
       }
    }

As you can see from the preceding listing, the particle implementation is (intentionally) quite simple. Particle systems are meant to be lightweight, requiring very little CPU time and memory for each particle.

### The Emitter

The emitter is responsible for managing individual particles, spawning new particles and reclaiming expired particles.

The emitter is initialized with a maximum number of particles to manage. Particles are created once, and placed in a pool of inactive particles, ready to be spawned. Whenever a new particle is needed, it's moved from the inactive pool, initialized with new property values, and placed in a pool of active particles. With each call to the emitter's `Update` method, the particle's `Update` method is called for each particle object in the active pool.

>**NOTE:** There are a couple of reasons why particles are implemented as a pooled resource, rather than creating them as they're needed.   
>   
>The first reason is to reduce the overhead of creating and destroying the objects that represent each particle. There is a performance penalty for allocating, initializing, and releasing thousands or millions of in-memory objects. By creating the objects once, and then placing them in a pool, we eliminate two of those three tasks.   
>   
>The second reason that particles are implemented as a pooled resource is that they're basically just eye candy. They're not essential to the game play. By limiting our particles to a fixed number, we can be sure that we won't create so many particles that their processing and memory usage affects more critical areas of the game logic.

The emitter also contains the ranges of values that each of the particle's properties should be initialized to. By initializing properties from a range of values (rather than simply assigning a single, static value to each new particle) particles seem to act more independently.

To help us track these ranges, I've created a simple, templated class that will contain the minimum and maximum values for a given property, and generate a random value for us that lies within that range. This class is called `RangedValue`, and we will discuss it in more detail later in this chapter.

The emitter also manages a list of global particle forces, like gravity and wind. These global forces are derived from a common base class called a `Modifier`, which we will also discuss later in this chapter.

As with the `Particle` class, the `Emitter` class has many configurable properties. The following list describes each of the parameters and methods of the `Emitter` class.

* `Active`: When false, active particles will continue to be updated and drawn, but new particles will not be spawned.
* `Enabled`: When false, all processing is paused. Active particles will not be
updated, and nothing will be drawn.
* `EmitterRect`: Emitters have a width and height so that particles can be spawned from within a rectangle, rather than from a single point.
* `EmitterBoundsRect`: In addition to a particle's Lifetime property, we can reclaim particles when they leave the screen (or when they leave the `EmitterBoundsRect`).
* `Position`: It's a pain to update a rectangle when all you wanted to do was move the emitter to a new location, so this helper allows you to just specify a new X and Y to change the `EmitterRect`.
* `ParticlesPerUpdate`: This is the number of new particles to emit with each call to Update. If there aren't enough particles in the inactive pool to satisfy this request, the number of particles actually spawned will be less than this value.
* `MaxParticles`: This is the maximum number of particles that the emitter will ever actively manage. By placing an upper limit, we can make sure that our emitter isn't stealing resources that could be better used for other parts of our game.
* `ParticleLifetime`: The number of seconds that a single particle may be
active before being reclaimed.
* `RangeColor`: The range of colors from which a new particle will have its `Color` property initialized.
* `RangeVelocity`: The range of velocities from which a new particle will have its `Velocity` property initialized.
* `Texture`: The texture of the sprite that represents a particle.
* `TextureRect`: The source rectangle, within the `Texture`, for all particles.
* `AddModifier()`: Add a modifier (like gravity) to this emitter.
* `ClearModifiers()`: Clear the list of modifiers for this emitter.
* `RemoveModifier()`: Remove a specific modifier from this emitter.
* `Draw()`: Draw all active particles.
* `Update()`: Spawn new particles, update all active particles, apply any global modifiers (like gravity) to all active particles, and reclaim any inactive particles for later use.

The code for the `Emitter` class follows.

    using System;
    using System.Collections.Generic;
    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;
    
    namespace MoreOnCode.Graphics.ParticleSystem
    {
      public class Emitter
      {
         // default constructor, 1000 particles
         public Emitter() : this(1000) { }
    
         // init emitter with max particles
         public Emitter(long maxParticles) : base()
         { 
            this.MaxParticles = maxParticles;
            this.ParticlesPerUpdate = 1;
            this.ParticleLifetime = 10.0f;
            this.EmitterRV2 = new RangedVector2();
         }
    
    
         // helper to init particle locations within emitter bounds
         protected RangedVector2 EmitterRV2 { get; set; }
    
         // location and size of the emitter
         protected Rectangle m_EmitterRect;
         public Rectangle EmitterRect
         {
            get { return m_EmitterRect; }
            set
            {
               m_EmitterRect = value;
               EmitterRV2 = RangedVector2.FromRectangle(m_EmitterRect);
            }
         }
    
         // helper to update the location of the emitter
         public Vector2 Position
         {
            get { return new Vector2(m_EmitterRect.Left, m_EmitterRect.Top); }
            set
            {
               EmitterRect = new Rectangle(
                  (int)Math.Round(value.X),
                  (int)Math.Round(value.Y),
                  m_EmitterRect.Width,
                  m_EmitterRect.Height);
            }
         }
    
         public Rectangle EmitterBoundsRect { get; set; }
         public RangedVector2 RangeVelocity { get; set; }
         public RangedVector4 RangeColor { get; set; }
    
         public Rectangle TextureRect { get; set; }
    
         protected Texture2D m_Texture;
         public Texture2D Texture
         {
            get { return m_Texture; }
            set
            {
               m_Texture = value;
               TextureRect = m_Texture.Bounds;
            }
         }
    
         public bool Enabled { get; set; } // false? don't draw, don't update
         public bool Active { get; set; } // false? draw and update, no new
         public long ParticlesPerUpdate { get; set; } // particles per frame
    
         // max number of particles that this emitter can track
         protected long m_MaxParticles = 1000;
         public long MaxParticles
         {
            get { return m_MaxParticles; }
            set
            {
               m_MaxParticles = Math.Max(value, 1L);
               m_ActiveParticles.Clear();
               m_InactiveParticles.Clear();
               for (long i = 0; i < m_MaxParticles; i++)
               {
                  m_InactiveParticles.Add(new Particle());
               }
            }
         }
    
         // lifespan of particle, expressed in seconds
         public float ParticleLifetime { get; set; }
    
         // keep track of active and inactive particles
         protected List<Particle> m_ActiveParticles = new List<Particle>();
         protected List<Particle> m_InactiveParticles = new List<Particle>();
    
         // keep track of attached modifiers
         public List<Modifier> Modifiers = new List<Modifier>();

The `Update` method manages the active particles that it owns, reclaiming spent particles and spawning new particles as needed.

         // manage active particles, spawn new particles if it's time to do so
         public virtual void Update(float elapsed)
         {
            // only update if enabled
            if (Enabled)
            {
               // temp variables to save typing
               bool outOfBounds;
               int parX, parY;
               for (int i = 0; i < m_ActiveParticles.Count; i++)
               {
                  var particle = m_ActiveParticles[i];

When a particle leaves the area of the screen that's defined by the `EmitterBoundsRect` property, it becomes inactive.

                  // when particle leaves emitter bounds, mark inactive
                  parX = (int)Math.Round(particle.Position.X);
                  parY = (int)Math.Round(particle.Position.Y);
                  outOfBounds = 
                     parX < EmitterBoundsRect.Right &&
                     parX + TextureRect.Width > EmitterBoundsRect.Left &&
                     parY < EmitterBoundsRect.Bottom &&
                     parY + TextureRect.Height > EmitterBoundsRect.Top;
                  if (outOfBounds) particle.IsActive = false;

If the current particle is (still) active, any attached modifiers will be allowed to process it before it is asked to update itself.

                  // process active particles, cleanup inactive particles
                  if (particle.IsActive)
                  {
                     // allow active modifiers to update particle
                     foreach (var modifier in Modifiers)
                     {
                        if (modifier.Enabled)
                        {
                           // tell the modifier to update this particle
                           modifier.Update(particle, elapsed);
                        }
                     }
                     // tell particle to update itself
                     particle.Update(elapsed);
                  }
                  else
                  {
                     // move particle to inactive list for later reuse
                     m_InactiveParticles.Add(particle);
                     m_ActiveParticles.RemoveAt(i--);
                  }
               }

Now that all of the active particles have been updated, and newly inactive particles have been reclaimed, it's time to spawn new particles.

               // try to generate ParticlesPerUpdate new particles
               for (long i = 0; Active && i < ParticlesPerUpdate; i++)
               {
                  if (m_InactiveParticles.Count > 0)
                  {
                     // reset particle and add it to our pool of active particles
                     var particle = m_InactiveParticles[0];
                     particle.Position = EmitterRV2.RandomValue();
                     particle.Velocity = RangeVelocity.RandomValue();
                     particle.Color = RangeColor.RandomValue();
                     particle.IsActive = true;
                     particle.LifeTime = ParticleLifetime;
                     m_InactiveParticles.RemoveAt(0);
                     m_ActiveParticles.Add(particle);
                  }

If we've run out of particles in our inactive pool, there's no need to keep trying to spawn new particles. We'll just exit the loop. Maybe there will be some more particles to play with during the next frame.

                  else
                  {
                     // no more particles in our inactive pool
                     break;
                  }
               }
            }
         }

The `Draw` method of the `Emitter` class simply iterates through the list of active particles, asking each to draw itself.

         // render the active particles
         public virtual void Draw(SpriteBatch batch)
         {
            // only draw particles when emitter is enabled
            if (Enabled)
            {
               foreach (var particle in m_ActiveParticles)
               {
                  // ask the particle to draw itself
                  particle.Draw(batch, Texture, TextureRect);
               }
            }
         }
    
      }
    }

### Modifiers

Left to their own devices, particles will move at a constant rate, in a fixed direction. Particles maintain their own position data (the `Position` property) and velocity data (the `Velocity` property). Whenever the `Update` method is called on a particle, it modifies its own position using the simple formula, "`Position = Position + Velocity`." That's fine if you're simulating a frictionless, gravity-free environment. In most scenarios, that's not the case.

It doesn't make much sense to implement global changes like gravity and wind at the particle level. Gravity affects every particle. So, the emitter manages a list of helper objects that can make global changes to particles. These helper objects are instances of the `Modifier` structure.

    using System;
    using Microsoft.Xna.Framework;
    
    namespace MoreOnCode.Graphics.ParticleSystem
    {
      // update a particle based on custom code, used by emitter
      public struct Modifier
      {
         // only update active modifiers
         public bool Enabled;
         public Vector2 PositionDelta;
         public Vector2 VelocityDelta;
         public float RotationDelta;
         public float ScaleDelta;
         public float DepthDelta;
    
         // called for each particle, every frame, by emitter, if enabled
         public void Update(Particle particle, float elapsed)
         {
            if (PositionDelta != Vector2.Zero) 
               { particle.Position += PositionDelta * elapsed; }
            if (VelocityDelta != Vector2.Zero) 
               { particle.Velocity += VelocityDelta * elapsed; }
            if (RotationDelta != 0.0f) 
               { particle.Rotation += RotationDelta * elapsed; }
            if (ScaleDelta != 0.0f) 
               { particle.Scale += ScaleDelta * elapsed; }
            if (DepthDelta != 0.0f) 
               { particle.Depth += DepthDelta * elapsed; }
    
            // allow for custom modifier logic
            if (OnUpdate != null) {
               OnUpdate (particle, elapsed);
            }
         }
    
         public delegate void OnUpdateDelegate(
            Particle particle, 
            float elapsed);
         public OnUpdateDelegate OnUpdate;
    
      }
    }

You can think of modifiers as a kind of plug-in. A simple gravity modifier would update particles using a formula similar to "`particle.Velocity.Y = particle.Velocity.Y + this.VelocityDelta.Y`." A simple wind modifier would update particles using a formula similar to "`particle.Velocity.X = particle.Velocity.X + this.VelocityDelta.X`." Modifiers are typically very simple, but they can be combined with other simple modifiers to achieve great composite effects.

    var modifierGravity = new Modifier();
    modifierGravity.VelocityDelta = new Vector2(0.0f, 200.0f);
    
    var modifierWind = new Modifier();
    modifierWind.VelocityDelta = new Vector2(200.0f, 0.0f);
    
    emitter.Modifiers.Add(modifierGravity);
    emitter.Modifiers.Add(modifierWind);

Of course, the above example could be combined to create a single `Modifier` for both effects.

    var modifierGravityAndWind = new Modifier();
    modifierGravityAndWind.VelocityDelta = 
      new Vector2(200.0f, 200.0f);
    
    emitter.Modifiers.Add(modifierGravityAndWind);

Modfiers don't have to limit themselves to the exposed particle "Delta" properties. You can also add a custom `OnUpdate` delegate to perform more complex calculations.

    var modifier = new Modifier ();
    modifier.OnUpdate = 
      new Modifier.OnUpdateDelegate (MyUpdateFunction);
    emitter.Modifiers.Add(modifier);

Using your own logic, you might change the particles' colors to create a pulsing or fading effect. Or you might change the particles' size or rotation to create interesting falling leaves or snow. Or you might create a single-point gravity effect so that particles are pulled into a black hole or whirlpool.

>**NOTE:** We could just as easily have implemented these effects in the `Emitter` class, but using modifiers allows us to add new effects without changing the core emitter class every time. Coding and maintenance are easier since the effect classes are self-contained, and debugging is easier since the emitter implementation isn't constantly changing.

Of course, there may be a performance penalty for calling the modifier's `Update` method once for every particle. If we find that to be the case, we could consider breaking the modifier updates into a separate pass, processing particles before or after the emitter is done with its update pass.

In that scenario, modifiers no longer work on a single particle at a time - they're called once per update, and they process all the active particles in a loop (saving thousands of calls to the modifier's `Update` method). This method might introduce other performance issues, though (like cache misses). So, you'll want to profile your code before and after to see if your "optimizations" are doing what you think they should.

## Ranged Values

The `RangedValue` class contains two properties (`Min` and `Max`) that store the minimum and maximum values for this range, and a method (`RandomValue`) to generate a value within this range. The class also contains another property (`Value`) that returns the result of the last call to the `RandomValue` method.

This is the first time that we'll be using a feature of the C# programming language known as generics. Generics allow you to define a single class that performs a common set of tasks, then change the type of data that the class uses. 

For example, we can define a simplified `RangedValue` class that just holds our `Min` and `Max` values using the following code:

    public class RangedValue<T>
    {
      // the min value
      public T Min { get; set; }
      public T Max { get; set; }
    }

To use this class for a ranged integer, a ranged string, and a ranged Color, we could then add code similar to the following to our game:

    RangedValue<int> IntRange;
    RangedValue<string> StringRange;
    RangedValue<Color> ColorRange;

Before generics, we had two basic options. The first option was to implement each of these variations as a separate class, possibly implementing a common interface in each specialized class (or deriving each from a common base class) so that we could pass the object among methods generically. The second option was to implement the `RangedValue` class so that the `Min` and `Max` properties used `System.Object` as their data type, but that would require runtime casting (boxing and unboxing) and performance would suffer if we used the class extensively.

While the first option is better in terms of performance, maintaining multiple classes is a pain. If you make a change to one of the classes, you need to remember to make the same change to the other classes.

Under the covers, the compiler is basically doing the work of the first option for us when we use generics by creating separate, specialized classes, each based on our template. This gives us the performance benefits of using the data types that we're actually interested in using, while limiting the amount of code that's involved (versus writing everything by hand). Of course, generics have some restrictions, and that's why the preceding example is simplified.

Storing type-specific data is the easy part. Converting random values (which are stored as integers or floating-point values) to types that cannot be known at compile time is harder. For that reason, we do have to implement type-specific classes, but generics still save us from duplicating more code than we have to.

The actual `RangedValue` class source code listing follows.

    using System;
    using Microsoft.Xna.Framework;
    
    namespace MoreOnCode.Graphics.ParticleSystem
    {
      // simple class to hold min / max values and generate random values 
      // within those bounds. b ase class uses generics (templates)
      public abstract class RangedValue<T>
      {
         public RangedValue() : this(default(T), default(T)) {}
    
         public RangedValue(T min, T max) : base()
         {
            this.Min = min;
            this.Max = max;
         }
    
         public T Min { get; set; }
         public T Max { get; set; }
         public T Value { get; set; }
    
         // random number generator
         protected Random m_rand = new Random();
    
         // generate a random value between min and max, inclusive
         public abstract T RandomValue();
      }
    
      public class RangedByte : RangedValue<byte>
      {
         public RangedByte() : base() { }
         public RangedByte(byte min, byte max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override byte RandomValue()
         {
            Value = (byte)Math.Round(
               MathHelper.Lerp(
                  (float)Min,
                  (float)Max,
                  (float)m_rand.NextDouble()));
            return Value;
    
         }
      }
    
      // type-specific subclass
      public class RangedInt : RangedValue<int>
      {
         public RangedInt() : base() { }
         public RangedInt(int min, int max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override int RandomValue()
         {
            Value = (int)Math.Round(
               MathHelper.Lerp(
                  (float)Min,
                  (float)Max,
                  (float)m_rand.NextDouble()));
            return Value;
    
         }
      }
    
      // type-specific subclass
      public class RangedLong : RangedValue<long>
      {
         public RangedLong() : base() { }
         public RangedLong(long min, long max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override long RandomValue()
         {
            Value = (long)Math.Round(
               MathHelper.Lerp(
                  (float)Min,
                  (float)Max,
                  (float)m_rand.NextDouble()));
            return Value;
    
         }
      }
    
      // type-specific subclass
      public class RangedFloat : RangedValue<float>
      {
         public RangedFloat() : base() { }
         public RangedFloat(float min, float max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override float RandomValue()
         {
            // linear interpolation between min and max based on random number
            Value = (float)MathHelper.Lerp(
               (float)Min,
               (float)Max,
               (float)m_rand.NextDouble());
            return Value;
    
         }
      }
    
      // type-specific subclass
      public class RangedDouble : RangedValue<double>
      {
         public RangedDouble() : base() { }
         public RangedDouble(double min, double max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override double RandomValue()
         {
            // linear interpolation between min and max based on random number
            Value = (double)MathHelper.Lerp(
               (float)Min,
               (float)Max,
               (float)m_rand.NextDouble());
            return Value;
    
         }
      }
    
      // type-specific subclass
      public class RangedVector2 : RangedValue<Vector2>
      {
         public RangedVector2() : base() { }
         public RangedVector2(Vector2 min, Vector2 max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override Vector2 RandomValue()
         {
            // linear interpolation between min and max based on random number
            var value = Vector2.Zero;
            value.X = (float)MathHelper.Lerp(
               (float)Min.X,
               (float)Max.X,
               (float)m_rand.NextDouble());
            value.Y = (float)MathHelper.Lerp(
               (float)Min.Y,
               (float)Max.Y,
               (float)m_rand.NextDouble());
            this.Value = value;
            return Value;
    
         }
    
         // determine min and max values from a Rectangle
         public static RangedVector2 FromRectangle(Rectangle rect)
         {
            Vector2 v2Min = Vector2.Zero;
            v2Min.X = rect.Left;
            v2Min.Y = rect.Top;
    
            Vector2 v2Max = Vector2.Zero;
            v2Max.X = rect.Left + rect.Width;
            v2Max.Y = rect.Top + rect.Height;
    
            RangedVector2 rv2 = new RangedVector2();
            rv2.Min = v2Min;
            rv2.Max = v2Max;
    
            return rv2;
         }
      }
    
      // type-specific subclass
      public class RangedVector3 : RangedValue<Vector3>
      {
         public RangedVector3() : base() { }
         public RangedVector3(Vector3 min, Vector3 max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override Vector3 RandomValue()
         {
            // linear interpolation between min and max based on random number
            var value = Vector3.Zero;
            value.X = (float)MathHelper.Lerp(
               (float)Min.X,
               (float)Max.X,
               (float)m_rand.NextDouble());
            value.Y = (float)MathHelper.Lerp(
               (float)Min.Y,
               (float)Max.Y,
               (float)m_rand.NextDouble());
            value.Z = (float)MathHelper.Lerp(
               (float)Min.Z,
               (float)Max.Z,
               (float)m_rand.NextDouble());
            this.Value = value;
            return Value;
    
         }
      }
    
      // type-specific subclass
      public class RangedVector4 : RangedValue<Vector4>
      {
         public RangedVector4() : base() { }
         public RangedVector4(Vector4 min, Vector4 max) : base(min, max) { }
    
         // generate a random value between min and max, inclusive
         public override Vector4 RandomValue()
         {
            // linear interpolation between min and max based on random number
            var value = Vector4.One;
            value.X = (float)MathHelper.Lerp(
               (float)Min.X,
               (float)Max.X,
               (float)m_rand.NextDouble());
            value.Y = (float)MathHelper.Lerp(
               (float)Min.Y,
               (float)Max.Y,
               (float)m_rand.NextDouble());
            value.Z = (float)MathHelper.Lerp(
               (float)Min.Z,
               (float)Max.Z,
               (float)m_rand.NextDouble());
            value.W = (float)MathHelper.Lerp(
               (float)Min.W,
               (float)Max.W,
               (float)m_rand.NextDouble());
            Value = value;
            return Value;
         }
    
         // determine min and max values from colors
         public static RangedVector4 FromColors(Color min, Color max)
         {
            Vector4 v4Min = Vector4.Zero;
            v4Min.X = (float)min.R / (float)byte.MaxValue;
            v4Min.Y = (float)min.G / (float)byte.MaxValue;
            v4Min.Z = (float)min.B / (float)byte.MaxValue;
            v4Min.W = (float)min.A / (float)byte.MaxValue;
    
            Vector4 v4Max = Vector4.Zero;
            v4Max.X = (float)max.R / (float)byte.MaxValue;
            v4Max.Y = (float)max.G / (float)byte.MaxValue;
            v4Max.Z = (float)max.B / (float)byte.MaxValue;
            v4Max.W = (float)max.A / (float)byte.MaxValue;
    
            RangedVector4 rv4 = new RangedVector4();
            rv4.Min = v4Min;
            rv4.Max = v4Max;
    
            return rv4;
         }
      }
    }

## Our Game

Since this set of classes is used in several of the example games, I'm not going to write a new example just to showcase the particle effects. If you'd like to see the particles in action check out one of the following chapters.

* Chapter 4: Spit and Polish
* Chapter 5: Side Scroller
* Chapter X: Blah. Blah. Blah.

A contrived example follows.

    texParticle = Content.Load<Texture2D>("images/Particle");
    
    emitter.Texture = texParticle;
    emitter.ParticlesPerUpdate = 20;
    emitter.ParticleMinAgeToDraw = 0.1f;
    emitter.MaxParticles = 15000;
    emitter.EmitterRect = new Rectangle(200, 200, 0, 0);
    emitter.RangeColor = 
        RangedVector4.FromColors(Color.Orange, Color.Yellow);
    emitter.RangeVelocity = new RangedVector2(
        new Vector2 (-200.0f, -200.0f),
        new Vector2 (200.0f, 200.0f));
    emitter.EmitterBoundsRect = GraphicsDevice.Viewport.Bounds;
    
    // add a modifier to the emitter
    var modifier = new Modifier();
    modifier.VelocityDelta = new Vector2(80.0f, 200.0f);
    modifier.Enabled = true;
    emitter.Modifiers.Add (modifier);

In this example, the emitter will spawn no more than 20 new particles per frame, and no more than 15,000 particles will be active at any one time. Particles will be spawned from a single point on the screen (rather than a rectangular area since the `Width` and `Height` of the rectangle are both zero). New particles will be tinted yellow, orange, or some shade between those two extremes.

## Summary

In this chapter you learned how to manage tens of thousands of simple game objects at the same time, with minimal resource usage. You also learned how particles are used in a wide variety of games as a simple way to make the environment more immersive.

## Review Questions

Think about what you've read in this chapter (and the included source code) to answer the following questions.

1. How do the particles seem to move independently of each other even though there's only one game loop, one Particle2D.Update method, and one `Particle.Draw` method?
1. What mechanism did we implement to make global changes across all particles?
1. What is the `RangedValue` class? How is it useful for this chapter's example code?
1. Using everything you've read about this chapter's particle system implementation, how might you go about simulating a fire using particles?
1. List some examples of particles (or effects that you think may have been created using particles) in games that you have actually played. If those effects were omitted, would the game play suffer? Would the game be less immersive?

## Exercises

**EXERCISE 1.** Create a new particle image to fall from the sky like rain. Be creative. Find or create a leaf, a snowflake, a smiley face, or any image of your choosing. Instantiate an `Emitter` for these particles that is located at the top-left of the screen with a width equal to the screen's width and a height of zero. Add a `Modifier` to the emitter to simulate gravity. Set the `RangeVelocity` property of the emitter to new `RangedVector2(Vector2.Zero, Vector2.Zero)` so that the particles enter the simulation at rest, then fall as gravity takes hold of them.

**EXERCISE 2.** Modify *Exercise 1* so that the emitter supports more than one particle image and randomly selects one image from the available images when spawning a new image. Rework the code you modified in the first exercise so that you can see a snowfall or autumn day with more variety.

**EXERCISE 3.** Create a new `Modifier` that attracts particles toward a single point on the screen (you'll have to use the `OnUpdate` delegate for this one). Instantiate an `Emitter` with an `EmitterRect` that encompasses the entire screen so that particles can appear anywhere on the screen, then move toward this point.

**EXERCISE 4.** Create a simple fireworks game that fires exploding rockets into the sky. As the rocket travels up, leave a thin trail of small, orange particles. When the rocket reaches a certain altitude, change the behavior of the emitter to release several hundred brightly colored particles in a single burst. Make sure that all of these particles are affected by gravity.
