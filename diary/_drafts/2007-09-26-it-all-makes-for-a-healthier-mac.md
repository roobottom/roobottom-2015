---
title: It all makes for a healthier Mac
---
Over the last few weeks I've noticed that my Mac has been slowly grinding to a halt, overheating and basically not bringing me as much maccy joy as she used to. [![My (healthier) Mac](http://farm2.static.flickr.com/1387/1442370938_f2d95fcbee.jpg)](http://www.flickr.com/photos/roobottom/1442370938/ "Photo Sharing") After a little investigation, I discovered that (for some unknown reason) Dashboard was chewing up memory and processor power by the fistful. In fact, it was claiming a mighty 80% chunk of my 2.3 Ghz core 2 duo. 80% !?! Something had to be done. After a [little investigation](http://www.macworld.com/weblogs/macosxhints/2005/08/disabledashboard/index.php) I discovered that there was a way to completely disable my little used Dashboard. The Dashboard app is run as a process of the Dock, so it's a two stage task to disable the pesky thing. First, start terminal and type the following

> defaults write com.apple.dashboard mcx-disabled -boolean YES

 This will tell your mac that you no longer require Dashboard, then restart your Dock... > killall Dock

 There. All better. If you (for some strange reason) decide that the Dashboard *is* a good idea, you can reverse the process with this command. > defaults write com.apple.dashboard mcx-disabled -boolean NO

 The run the 'killall' again, and you're back in business - Although why you'd want this piece of useless gadgetry is beyond me. Have fun!