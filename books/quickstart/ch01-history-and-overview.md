---
layout: book
title: "Chapter 1"
tagline: "History and Overview"
lastReviewedOn: "2016-08-01 00:00:00 -0500"
status: draft
---

# A Brief History

There's a lot to learn in any new technology. And knowing what sparked the creation of the tech in the first place can be very handy in understanding the design decisions that went into its making. This chapter will explain the features of MonoGame, C#, and the .NET runtime. It will then tell you how they benefit you as a game developer.## In the Beginning ...


In the early days of home computing, applications monopolized the machine. You had to exit whatever program you were running to launch another. And those programs had to account for countless hardware combinations. The PC provided an open interface which various hardware vendors targeted for sound cards, input devices, graphics adapters, and printers.

## Device Drivers

Windows came along and provided an abstraction for those devices (in the form of device drivers). For most applications, this was a godsend. For games, however, those abstractions proved too slow. Gamers would still have to close Windows to run their game from the command prompt.

Windows addressed this problem with an accelerated graphics interface known as WinG, which later evolved into DirectX. Now, the drivers for graphics, audio, and input could be optimized, allowing those resource-hungry games to run alongside other applications.

## DirectX and XNA

DirectX addresses a real performance need for games, but it's not the easiest API to master. Microsoft introduced a managed wrapper for DirectX in 2006, called XNA. XNA provided an abstraction for the DirectX APIs that eventually supported a variety of Microsoft platforms including personal computers, Xbox, Zune (remember that?), and Windows Phone.

In 2014, Microsoft discontinued support for XNA, directing developers to use DirectX for new projects instead. The last version of XNA that will ever be released is XNA Game Studio 4.0.

## MonoGame

MonoGame is an evolution of two other projects that aimed to implement the XNA Framework APIs on non-Microsoft platforms using the Mono technology. Today, MonoGame supports a variety of platforms, including Microsoft's, and it is actively maintained as an open-source project on GitHub.

In addition to the Microsoft platforms that XNA supported, MonoGame provides support for iOS, Android, Ouya (an Android-based game console), Mac OS X, and Linux -- pretty much any platform that supports the Mono framework and runtime.

## The Competition

There are a ton of cross-platform game creation libraries and tools available today, and even more if you include tools that create application that don't target game developers. Some are more popular than others. So, why should you pick MonoGame over something like Unity, GameMaker, Unreal, or Cry Engine?

Honestly, the choice of tech is up to you. You need to find the right balance of cost, ease of use, support, and features. I was an XNA developer, so MonoGame had a natural appeal to me. There are no pricing tiers. There are tons of XNA tutorials and resources out there that can fill the holes in those rare cases where MonoGame is missing some tidbit of information. The developers are available and responsive on the GitHub project site. And, perhaps best of all, you have access to the source.

## Apps vs Games

You're going to have to learn something in this process, regardless of which tech you choose. MonoGame is build on the technologies that drive other (non-game) cross-platform applications. Namely, Mono and Xamarin. Ultimately, those technologies are supported (to a greater and lesser degree) by Microsoft, and their future looks bright. When you're ready to branch into apps from games, Xamarin.Forms will make life a lot easier. If you're only ever interested in game development, your choice may be a little harder.{pagebreak}# A Brief Overview

So, what is Mono? What is managed code? If XNA was based on Microsoft technologies, how does MonoGame support other platforms? How does any of this help me to write my game?

All excellent questions. I'm glad you asked.

## DirectX and OpenGL

## What Is Managed Code?

On most development platforms, source code is compiled directly to native binaries that can be loaded and executed on the target processor (CPU) with no supporting runtimes or libraries. The executable file that’s created for these platforms contains the actual instructions for the targeted processor. For managed code, your source is compiled to an intermediate language (IL). This IL represents the instructions of a virtual, platform-agnostic CPU. This virtual CPU doesn’t actually exist anywhere but in software.

To run managed code on an actual CPU, there needs to be some intermediary between the managed executable and the physical processor. This intermediary, known as the runtime, is a program that was compiled to the target processor’s native instructions. The runtime then acts as a virtual CPU, emulating the non-existent, virtual CPU on the physical CPU.

![Comparison of Native and Managed Executable Files](images/figure01-native-vs-managed-code.png)<br/>
_**Comparison of Native and Managed Executable Files**_

### Just-in-Time Compilation

Emulating virtual CPU instructions sounds inefficient, doesn’t it? Actually for most applications, you would likely see only nominally lower performance over the same basic native code. But most managed code runtimes (Microsoft’s included) support a feature known as just-in-time compilation (JIT). The JIT compiler takes the intermediate language that was generated by the managed compiler and generates native code that’s optimized for the targeted physical CPU just before the code is actually executed on the physical CPU. While there is still some overhead imposed by having the runtime layer between your application and the physical CPU, JIT compilation closes the overall performance gap between your managed code and it’s native cousins.

That sounds interesting, but why include the additional complexity? What does targeting managed code offer an application developer that they wouldn’t normally have when writing native code?

### Garbage Collection

A major benefit comes in the area of memory management. In traditional languages that compile to native executable files, memory leaks are a common problem. It’s easy for developers to forget to release system resources that they allocate, especially when complex code paths or exception handling are involved.

In managed code, like native code, memory is allocated as it’s needed. Unlike native code, the managed runtime keeps track of these allocations and any references to them. When the resource is no longer referenced by any of the live objects in your application, it’s automatically released by the runtime. There are still a few special cases where leaks can occur (especially when dealing with unmanaged resources from your managed code), but memory management basically comes for free in a managed environment. This feature of managed runtimes is known as garbage collection (GC).

### Write Once, Run Everywhere

Another benefit of managed code is platform agnosticism. Since your code targets a virtual CPU, it has no direct ties to the physical CPU on which it runs. That means that your managed code should be able to run on any platform that provides a runtime for it. For instance, (in theory) an application written in managed code could run on PCs, handheld devices, mainframes, or even game consoles.

Having code that can execute on any platform is neat, but without access to components beyond the CPU, your code won’t be able to do anything useful. In addition to the runtime, managed environments also include a set of APIs that allow you to access the native OS features via abstractions that won’t tie you to a specific platform. These APIs include classes that: allow you to access the file system to read and write files, utilize the user interface components of the operating system (like buttons, checkboxes, and menus), control peripherals (like printers), and access media components (like the sound system and screen).

## What Is the Role of MonoGame?

Accessing the native host components through an abstraction layer is generally slower than accessing those same resources natively. In the case of the printer or file system, the performance difference isn’t very noticeable. The device itself is slower than the abstractions—your code spends much of its time waiting for the device to complete issued commands.

In the case of components like the graphics system, however, the cost of abstraction is much greater. Updating millions of pixels every second requires a lot of CPU power, even when using native code. Thanks to advances in graphics hardware, a lot of that graphics processing can be offloaded to the graphics card itself by way of specialized programs that run on a secondary CPU that’s embedded on the graphics card known as the graphics processing unit (GPU). By running these specialized routines on the GPU, your application is only responsible for coordinating the efforts of the GPU and for shuffling required data to and from graphic memory.

The MonoGame Framework includes a set of managed libraries that provides access to these advanced hardware features using OpenGL or DirectX. DirectX is a technology that is tied to Microsoft platforms such as Windows, Windows Phone, Zune, and Xbox game console, OpenGL provides the same abstractions to graphics hardware, in a cross-platform API (which happens to include support for the various flavors of Windows). As with DirectX, OpenGL provides APIs and underlying device drivers that are highly optimized for performance.

In addition to the graphics hardware, the MonoGame Framework supports input devices and audio via managed wrappers to the underlying native APIs.

The .NET Framework is fast becoming the leading platform for developing general-purpose Windows applications that run on the desktop, the web, and mobile devices. The MonoGame Framework relies on .NET Framework components like the Common Language Runtime and the core class libraries, but the MonoGame Framework has been specifically designed and optimized (based on XNA 4.x APIs) for developing games.

When you’re accessing the file system, managing threads, or dealing with collections of data, you’re using the .NET Framework. When you’re playing music, rendering 3D objects, or displaying a heads up display in your game, you’re using the MonoGame Framework. These two frameworks complement each other, greatly simplifying the Herculean effort of writing great games.

While you will still need to build separate packages for each targeted platform, MonoGame makes it possible to write code that is portable across a variety of devices and operating systems, with little or no modification.

## What is Xamarin?

Mono is an open source implementation of Microsoft’s .NET Framework, based on the ECMA standards for the C# language and the Common Language Runtime (CLR). Mono enables the creation of applications on platforms such as Linux and Mac OS X using .NET technologies.

Xamarin is a company that sponsors Mono development, and is heavily invested in the future of Mono as an emerging technology. Xamarin offers a suite of tools and APIs that make it possible to write applications for Apple’s iOS devices and Google’s Android devices using the C# language. Platform-specific, native APIs are exposed as .NET bindings to your code that runs on the CLR implementations for iOS and Android that Xamarin created.

You can develop mobile applications using Xamarin’s own, full-featured IDE, Xamarin Studio, or you can leverage your experience in Microsoft’s Visual Studio to create, build, debug, and deploy your applications using the industry standard IDE for .NET development. I make my living writing Windows applications in Visual Studio. When I’m off the clock, though, I’m a Mac guy. On my MacBook Pro, I’m a big fan of Xamarin Studio for OS X, Android, and iOS development.

> Update: Xamarin was officially acquired by Microsoft in 2016. The same tools described in this text are still available, but they have a new home.

## What Role Does Managed Code Play in Games Today?

As a standard for Windows application development, C# is often used as the language of choice for writing the tools that support game development. And C# has been used to write some really great Windows games. But for performance-critical applications, game developers typically use languages that target native code, like C and C++. Before the introduction of the XNA Framework, C# wasn’t really the best option for developing high-performance games like first-person shooters or 3D racing games.

### Scripting and AI

While C# is a relative newcomer to the area of game development, managed code has been used to script game objects and AI for a while now. Many times, developers will embed script parsers for game logic, and use native code only for those areas of code where performance is critical.

Native game code is the domain of the expert programmer. Using scriptable objects makes it easier to have level designers implement basic object interactions and frees up the more experienced developers to handle the tricky, more technical areas of the code. As an added benefit, having your designers implement object interactions eliminates the communication barriers between the designers and the developers who often seem to speak different languages.

Of course, there’s a time investment in getting the designers started and in supporting them in their efforts; but typically, developers find that the designers are able to use the scripting engines in ways that they never envisioned, leading to incredibly creative and innovative level designs. And since the designers don’t need to rely on the developers to make changes to the code whenever they want to tweak their designs, the overall turnaround time is reduced, and the designers can try many more variations on their themes than would typically be possible in an often-too-tight product development cycle.

### Easier Code, Easier Maintenance

The MonoGame Framework makes it easier for individuals and small teams to reap the benefits of reduced development times and lower levels of complexity typically seen when using a scripting engine, while also gaining the performance benefits of native (JIT’ed) code that targets the OpenGL APIs.

Now you don’t need to be a veteran game developer to write great, commercially viable games. Of course, those veterans will be able to make the MonoGame Framework do things that a novice can only dream of, but in the realm of traditional native code, most entry-level developers would have a heck of a time just trying to get their game project off the ground.

{pagebreak}

# Summary

MonoGame and Xamarin technologies make game development easier and more approachable for novice, hobbyist, and student developers by providing out-of-the-box support for many of the most common game programming tasks. By using MonoGame and managed code, your ideas will move from doodles on a napkin to playable games on your PC or mobile devices faster than ever before. Your code will be more robust and resistant to crashes. And you’ll be able to do all of this without emptying your wallet.

In this chapter, you learned what MonoGame is and how it can help you to write games for a variety of platforms. You also learned what managed code is and how it can make life easier for game developers. In the coming chapters, we will get these tools installed and prepare your development environment so that you can start bringing your game ideas to life.

## Review Questions

Think about what you’ve read in this chapter to answer the following questions.

1.	What are two benefits of writing applications in managed languages like C#? 
1.	Can I develop commercial games using MonoGame? 
1.	What is DirectX? How does DirectX help me to write video games? 
1.	What is OpenGL? How does OpenGL help me to write video games? 
1.	What is the role of the MonoGame Framework with respect to OpenGL and DirectX?

## Exercises

**EXERCISE 1.** Blah.

**EXERCISE 2.** Blah.