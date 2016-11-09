---
layout: book
title: "Preface"
tagline: "the Volume"
lastReviewedOn: "2016-08-07 00:00:00 -0500"
status: draft
---

# About the Examples

The examples from this book are generally derived from the games that my students have designed and written. But, it is my book, so I might throw an example or two in there that I've unsuccessfully lobbied for in the past. In particular, I'm a huge fan of puzzle games and I'd like to write an example based on one of the music hero games.

The examples in this book will be cleaned up, follow a more structured design, and use assets that are freely available.

## Why "Clean Up" the Examples?

The answer to that question is twofold: code quality and asset licensing.

### Code Quality

In the years that I've been teaching game development, only one student had any prior programming experience. The camps last just one week. The first day is spent installing tools and brainstorming ideas. Five days later, we have to demonstrate a working game in front of the other students at the camp.

Our design document is a whiteboard sketch with a bullet list of features that are added on day one, and crossed out as the deadline marches ever closer.

Regardless of the game we plan to tackle for the week, we start with loading an image, moving that image, then controlling the image with the gamepad. Features from the whiteboard are then prioritized, and implemented in order. The class can only move as fast as the slowest typer, so features necessarily get cut.

### Asset Licensing

The first game programming camp, in 2011, used characters from the Angry Birds&trade; franchise, which is owned by Rovio Entertainment Ltd. An argument could be made that using the birds and pigs would be allowed by the "Fair Use" clause of the Copyright Act of 1976 in a classroom setting.

I don't know if the same would apply to a book. I would essentially be distributing the intellectual property of an entity without their permission. I'd rather use assets that I create, or those from the public domain, removing any doubts surrounding the legality.

Thankfully there are many talented artists out there who contribute to the game development community. Most notably in the context of this book, Kenney, Danc, and Sergiu, who were mentioned in the Special Thanks section.

{pagebreak}

# About My Motivation

Since 2011, I have been teaching teens and tweens how to write video games using XNA. Now that XNA support is officially being dropped, I need a new reference for the class - one that's centered on MonoGame.

## That's So 2007

My XNA book was written in 2007. While I kept the sample code updated through the latest XNA version (4.x), I never wrote a second edition. 

Contrary to popular belief, the major impedance for an update wasn't laziness on the part of the author. I realized that printed text just cannot keep pace with the velocity of technical change. My book (one of the first four XNA books) was practically out-of-date when it hit the shelves. The book targeted version 1.0 of XNA, but as it was headed to the presses, XNA 1.0 Refresh was released.

I was able to add a chapter to cover the differences between the two versions, but XNA was updated regularly. I decided early on that my time would be best spent updating the examples on my website and documenting the changes between each release on my blog.

This time around, I'll try to make the text more future proof by focusing on the timeless aspects of game design and mechanics, rather than the details of a particular implementation based on a specific MonoGame version.

## Classroom Media

My XNA book had review questions and exercises for each chapter. That made it a popular choice for high schools and colleges. But, I never created a media pack for the content.

This time around, my focus is on using this in a classroom setting. So, you can expect to see some slideshows, answers to the questions, and examples for the exercises - separate from the book, of course.

{pagebreak}

# About This Volume

This volume introduces the basic concepts behind writing cross-platform MonoGame games. 

As you work through this volume, be sure to experiment with the example code. Don't just read the chapter text and follow the examples verbatim. You'll do your best learning when you test your assumptions and find them to be invalid. Working through issues will ingrain what you've learned much better than merely reading some printed text.
 
>"Our greatest glory is not in never failing, but in rising up every time we fail."    
-- Ralph Waldo Emerson
 
I believe we learn best from failure. Success teaches us precious little. We learn what works by stumbling, fumbling, and floundering over that which does not work. If you never make a mistake, you are not learning. You are simply following someone else's recipe for success. I can confidently assure you that the author of the recipe did not create it on their first attempt, complete and without error.

As you read each chapter in this volume, don't focus too much on how something was done; try to understand why it was done a certain way. In programming, there are many paths that lead to the same result, each with its own pros and cons. You may think of a better way to accomplish a given task. Use the code from these chapters as a starting point for your own creations.

As you progress in your understanding of MonoGame and of writing managed code, take this concept a step further and try to understand why the framework APIs were designed using the interfaces that you see. What do you think those APIs are doing with your data? How do you think they're processing your requests? How would you have written the API? What interfaces would you have used to expose that functionality to other developers? Why do you think the XNA framework developers (the inspiration for MonoGame) made the design decisions that they made? 

{pagebreak}
 
# Chapter Overviews

The following text provides an overview of the content you will find in this book. I recommend that you read chapters 1 through 4 before attempting later chapters. Once you have laid that foundation, you can skip around as much as you like.

## Chapter 1: A Brief History

This chapter provides a good overview of the technologies upon which MonoGame is based. MonoGame, Xamarin Studio, Visual Studio, DirectX, OpenGL, Mono, and the .NET Common Language Runtime (CLR) are introduced, and each component's role in the game development process is described, along with its history.

## Chapter 2: Your Development PC

This chapter takes you through the steps of configuring your development environment and making sure that everything is working properly. This chapter also discusses several content creation tools that you can install and use to generate audio, graphics, and 3D models for your games. 

This chapter also walks you through the basic features of Xamarin Studio. You will learn how solutions and projects are laid out, how to build your games, and how to identify and troubleshoot problems within your game code. If you'll be primarily developing your games on a Mac, this is the IDE for you.

This chapter additionally walks you through the basic features of Visual Studio Express Edition. You will learn how Visual Studio solutions and projects are laid out, how to build your games, and how to identify and troubleshoot problems within your game code. If you'll be primarily developing your games on a Windows PC, Visual Studio is an attractive alternative to Xamarin Studio. 

Visual Studio is arguably the best IDE on the planet. I'm a Mac guy, though, so I primarily use Xamarin Studio. Even if you're a die-hard Mac user, you will (at the time of this writing) still need to use Visual Studio for some of the more advanced features, such as shader effects where the content pipeline of MonoGame isn't quite complete. You'll also need to fire up Visual Studio if you plan to write games that target Windows Phone 8.

## Chapter 3: The Crash Course

If there is only one thing you will take away from this chapter, it's "Update, Draw, Update Draw, Update, Draw, Update, Draw, ..." That's the game loop. It's the heartbeat of every game you'll ever design, build, or play.

We begin with a blank screen, load an image, move the image programmatically, then use player input to move the image. Once the basics are covered, we'll build our first game - a top-down scroller where you pilot a starship, firing lasers at asteroids and aliens.

After you complete this chapter, you'll be able to jump to any of the following chapters that capture your interest. But you might want to take a look at the next chapter first. It gives a little insight into the dreaded "last 20% of the project" - the bells and whistles.

## Chapter 4: Spit and Polish (and Tools)

We built a playable game in the previous chapter, but it's not exactly store-worthy. I'm not saying that it ever will be, but there are some obvious changes that we can make to give the game a more professional feel. 

Building on the game from the last chapter, we'll add music, sound effects, visual effects, and multiple screen types. We'll also introduce the concepts of sprite sheets and basic particles. Stitching sprite sheets by hand is inefficient and prone to error. This chapter walks you through using FannyPack, an open-source suite of game development tools, by yours truly, to create sprite sheets and bitmap fonts for your games.

After you complete this chapter, you'll be able to jump to any of the following chapters that capture your interest.

## Chapter 5: Camp 2011 - Side Scroller

The player will control a super hero, defending a nameless city from evil robots who fire a seemingly endless barrage of rockets. This chapter builds upon the fundamentals of the previous chapters to showcase slightly more sophisticated visual effects.

## Chapter 6: Camp 2012 - Survival

This game supports one to four players who fight of wave after wave of baddies. Since this is our first multi-player game, we'll need to add a new screen type - one where each player can select their avatar.

Players can move left or right, and away or towards the screen. And ... *pause for effect* ... they can jump! So this marks the first time we'll need to track three components for location - X, Y, and Z. Even though this is a two-dimensional game, we'll track all three dimensions, where Z is the distance between the player and the ground during their jump.

## Chapter 7: Camp 2013 - Runner

*need content*

## Chapter 8: Camp 2014 - Castle Crawler

Building on what we learned in **Chapter 6**, this game supports one to four players who explore a castle filled with baddies and treasure. They must fight their way to the castle's keep and defeat the monster therein.

## Chapter 9: Class 2013 - Platformer

*need content*

## Chapter 10: Class 2014 - Tower Defense

*need content*

## Chapter 11: Class 2015 - Real-Time Strategy

*need content*

## Chapter 12: Author's Choice - Puzzle

Most game genres have a fairly narrow demographic to which they appeal. Typically, that demographic is young males. Puzzle games are one of those rare categories of games that cross gender and age barriers. Their simple, yet addictive game play seduces the casual gamer and the hard-core gamer alike. They even appeal to many people who wouldn’t consider themselves "gamers" at all. With a focus on problem solving, and having their roots in logic and math, puzzle games prove that simple games can be fun, even without a multi-million-dollar development budget or a big-name intellectual property license.

In this chapter, we will develop a simplified clone of my new favorite puzzle game - GungHo's *Puzzle & Dragons*.

## Chapter 13: Author's Choice - Artificial Intelligence

Board games are another of those categories of games that have mass appeal, and many of the most popular board games have been around so long that copyright issues are no longer a concern, so they can be a great source of inspiration for your original titles.

In this chapter, we will develop a simple version of a popular board game that originated in England around 1880 - *Reversi*. And to support folks like me who don't have any friends, this game will feature a CPU opponent. You can pass-and-play against a friend, or play against the game's AI. 

## Chapter 13: Author's Choice - Isometric Puzzle

*need content*

In this chapter, we will develop a simplified clone of one of my favorite puzzle games - Shift's *Devil Dice*.

## Chapter 15: Odds and Ends - GamePadEx

The mouse, keyboard, touch screens, and game pads are very different devices, each requiring specialized code. In this chapter we'll develop a helper class that allows you to use the keyboard as a controller. That's useful when you're working on a game from your laptop and don't have a controller handy, or if your game supports multiple players and you only have one controller with you.

## Chapter 16: Odds and Ends - TouchPanelEx

*need content*

## Chapter 17: Odds and Ends - Collision Detection

Nothing irritates players more than thinking that they hit an opponent and the hit doesn't register, or thinking that they dodged a bullet only to find that they've lost a life. For most game programming tasks, "close enough" is perfectly fine. Collision detection isn't one of those tasks, though.

In this chapter, we will develop a reusable class to help us manage pixel-perfect 2D collision detection.

## Chapter 18: Odds and Ends - Particles

Individual particles are usually rather insignificant. But collectively, particles can be used to great effect, with minimal resource consumption. In this chapter you will create a simple 2D particle system that we can use to give our games a little flair.

Particles are light-weight game objects that act as independent entities. Global forces like gravity and wind may affect particles, and they may vary their color or opacity over time (for example a burning ember may fade to nothing). Particle systems are used in a wide variety of game genres, for a wide variety of in-game effects. Some examples include: sparks from a racecar as it scrapes the wall, wash from a snowboard when it slides to a stop, smoke trails behind missiles, exploded fragments of a game object, auras surrounding a mage as she casts a spell, embers from a fire, splash from an object that hits the water, and many more effects.

{pagebreak}

# NAQs

The book hasn't been published, so this is a list of Never Asked Questions.

## Why did you write "Volume 6" first?

I've been using my 2007 XNA book to lead the game programming camp since 2011. XNA was officially mothballed in 2014, so I wanted to have a new reference for my 2015 camp. I've made a few contributions to an opensource project, called MonoGame, that provides an an API-compatible replacement for XNA.

My ultimate goal is to write an encyclopedic series with more detailed explanations and more elaborate examples. That effort will take longer than a year, but camp is coming up quickly. So, Volume 6 is a stopgap measure to get me through my 2015 obligations.

## What tools do I need?

I personally use a MacBook Pro, but the vast majority of my students use Windows PCs. As for software, I'll walk you through a list of tools for game development in Chapter 2.

But, the two most important tools are your desire and dedication. If you have those, the rest will come in time.

## Can I get the game that the students created?

Absolutely. I'll include the unaltered code alongside the examples from this book so that you can compare the two.

## Can I really make my own games and sell them?

Yep. In many cases, you can develop and test your games for free. When your game is ready to publish, there may be licensing fees, depending on the platform(s) you're targeting.

{pagebreak}

This page was intended to be blank, until I wrote this sentence on it.
