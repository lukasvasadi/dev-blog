---
title: BeagleBone Black
description: Explore the BeagleBone as an embedded Linux solution for IoT projects.
date: '2023-11-2'
image: /images/beaglebone-black.jpg
categories:
  - Embedded Linux
  - BeagleBone Black
published: true
---

<script>
  import Heading from "../components/heading.svelte"
  import Tag from "../components/tag.svelte"
  import Iconlist from "../components/iconlist.svelte"
</script>

![BeagleBone Black board](/images/beaglebone-black.jpg)

<Heading str="Introduction" />

The BeagleBone Black (BBB) is a completely open-source single-board computer (SBC). The organization that oversees its development ([BeagleBone.org](https://beagleboard.org/)), has made both the PCB design and Debian-based Linux OS image available to the public. This means that anyone can manufacture the board or modify its design—for instance, to incorporate the processor into a standalone product—as well as customize the operating system.

The BBB is often compared to its most obvious counterpart, the Raspberry Pi. While both are single-board computers, the Pi tends to shine in multimedia applications, e.g., video streaming, audio synthesis, whereas the BeagleBone may be considered superior for low-power applications, such as data collection and transmission over extended time periods in resource-limited environments. At first glance, the BBB GPIO headers appear to offer more connectivity than the Pi, but keep in mind that many of the pins are shared with memory or dedicated to LED capes.

### Resources

The following resources contain excellent instructions on configuring the BeagleBone Black, as well as other boards from the BeagleBoard organization.

- [BeagleBoard.org](https://beagleboard.org/)
- [Exploring BeagleBone](https://www.amazon.com/gp/product/1119533163/ref=ox_sc_act_image_1?smid=AHNEEZ9CVAP3Q&psc=1)

<Heading str="OS installation" />

### Flashing Debian

If your BBB was manufactured after 2015, it probably has a Debian image preinstalled on the eMMC (embedded MultiMediaCard) storage. Prior releases of the board were shipped with an Angstrom distribution. It is also possible to install Ubuntu or Arch Linux images. However, in general, it is recommended to use the supported, i.e., tested, Debian releases. A list of the latest supported images can be found at the [official downloads page](https://beagleboard.org/latest-images).

<Tag tagtype='info' msg='At the time of writing, only the Buster IoT <a href="https://debian.beagleboard.org/images/bone-debian-10.3-iot-armhf-2020-04-06-4gb.img.xz">AM3358 Debian 10.3 2020-04-06 4GB SD IoT</a> could be run on the board. The Debian LXQT release, which provides a full graphical user interface, seemed to not trigger the normal system boot process. In addition, all of the compatible Ubuntu releases found on BeagleBone forums had broken links. Given these findings, it is highly recommended to commit to the Debian Buster OS.' />

To install the OS image, download and the img.xz file from the link above and flash the image onto a microSD card with at least 4GB of storage. Many people use [balenaEtcher](https://www.balena.io/etcher/) to flash multimedia storage devices. Once the file has been written, insert the SD card into the port on the bottom side of the BeagleBone PCB. For more information, reference the official "Getting Started" [web tutorial](https://beagleboard.org/getting-started).

<Tag tagtype='warning' msg='It is critical that the board be powered off before inserting or removing the SD card from the slot reader! To safely power down the board, press and hold the "power" pushbutton located next to the ethernet port. After about 8 seconds, the blue power LED should turn off, indicating a hard shutdown.' />

After inserting the SD card, press and hold the user boot botton located near the USB 2.0 connector and connect the board to the computer with the supplied USB mini/type A cable. When the series of four LEDs start to flash in sequence, release the user boot button and wait for the board to complete startup. The boot button essentially redirects the system startup to target the SD card instead of the default eMMC storage.

At this time, the BeagleBone can be accessed via the cloud9 web IDE. To launch the IDE, copy and paste the following into a browser window searchbar, selecting the IP address according to the host computer OS:

<Iconlist html='<svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#B197FC" d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>' desc='192.168.7.2' />

<Iconlist html='<svg xmlns="http://www.w3.org/2000/svg" height="32" width="24" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#74C0FC" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>' desc='
192.168.6.2' />

<Iconlist html='<svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#63E6BE" d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5 .2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4 .2-.8 .7-.6 1.1 .3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6 .2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5 .1-1.3 .6-3.4 1.5-3.2 2.9 .1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7 .1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9 .6 7.9 1.2 11.8 1.2 8.1 2.5 15.7 .8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1 .6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3 .4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4 .7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6 .6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7 .8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4 .6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1 .8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7 .4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6 .8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1 .3-.2 .7-.3 1-.5 .8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"/></svg>' desc='192.168.6.2' />

After a few moments, the cloud9 IDE should load and display a filesystem directory alongside a script editor and terminal window. The device can be used as any other Linux machine.

The next step is to [transfer the OS image onto the builtin eMMC storage](https://elinux.org/Beagleboard:BeagleBoneBlack_Debian#Flashing_eMMC), which will provide a faster boot time and allow the SD card to be used as extended storage. In the terminal window of the cloud9 IDE, open the `/boot/uEnv.txt` file in the nano text editor and search for the following sequential lines:

```txt
##enable BBB: eMMC Flasher:
#cmdline=init=/opt/scripts/tools/eMMC/init-eMMC-flasher-v3.sh
```

Uncomment the second line by removing the `#` prefix:

```txt
##enable BBB: eMMC Flasher:
cmdline=init=/opt/scripts/tools/eMMC/init-eMMC-flasher-v3.sh
```

Save the file and reboot the system. At the next startup, the BeagleBone will flash the eMMC storage. According to online forums, the transfer process is expected to require about 45 minutes, but recent experience shows that the process completes in under 10 minutes.

When the transfer is complete, the BeagleBone will automatically power down. At this point, remove the SD card from the board and press the power button to trigger normal startup. Once again, navigate to the cloud9 IDE and confirm the OS version:

```zsh
cat /etc/dogtag
```

The output should resemble:

```console
BeagleBoard.org Debian Buster IoT Image 2020-04-06
```

<Heading str="Walk the dog" />

Although the cloud9 IDE provides a convenient, if clunky, way to access the BBB filesystem and write scripts, the BeagleBoard Foundation has stated that its support will eventually be discontinued. Regardless, Linux purists would probably prefer a more traditional command line interface (CLI).

### SSH

To access the BBB via SSH, we need to first know its IP address. If you are on a home network, this can be relatively straightforward to discover; however, if you are using the BBB for a work project, where the network is loaded with connected devices, this may prove more challenging. Though inelegant, my recommended method for obtaining the BBB IP address, after connecting the board to ethernet and providing power to the 5V barrel input, is to attach a monitor to the mini HDMI port and a keboard to the USB 2.0 host connector, and run either the `ifconfig` or `hostname -I` command from the barebones CLI.

As stated in the welcome message, the default login credentials for the Buster IoT distro is `debian:temppwd`.

Use the output from `hostname -I`, e.g., `246.87.148.7`, to ssh into the BeagleBone from another machine:

```zsh
ssh debian@246.87.148.7
```

<Heading str="Updates" />

After establishing a remote session, the first item to tackle should be updating the boot/maintenance scripts, which are accessed as a `git` repository. To update the scripts, navigate to `/opt/scripts` and run `git pull`:

```zsh
cd /opt/scripts
git pull
```

To update the kernel, execute the `update_kernel.sh` script:

```zsh
sudo /opt/scripts/tools/update_kernel.sh
```

Natually, the next step is to update and upgrade the distribution packages:

```zsh
sudo apt update
sudo apt upgrade
```

<Tag tagtype='info' msg='At the time of writing, performing an upgrade results in one dpkg error for the cloud9 package, suggesting that the BeagleBoard Foundation has already implemented the removal of cloud9 support. This error seems to be harmless, though it may be possibly be resolved by recursively deleting the associated cloud9 and bone101 directories.' />

<Heading str="Users" />

In many cases, you may want to add a user to the system. To create a new user:

```zsh
sudo adduser username
```

To add sudo privileges to the new account:

```zsh
sudo usermod -aG sudo username
```

To switch users:

```zsh
sudo su username
```

<Heading str="Hello world" />

Of course, any embedded Linux tutorial would not be complete without a "Hellow World!" demonstration. Navigate to the user home directory and create a new directory called "code" to store program files:

```zsh
mkdir -p ~/Code/helloworld
cd ~/Code/helloworld
```

Create a new file called `helloworld.c` and open it in the `nano` text editor:

```zsh
touch helloworld.c
nano helloworld.c
```

Add the following code to the file:

```c
/*
    helloworld
    Prints "Hello World!" to the terminal
*/

#include "stdio.h"

int main() {
    printf("Hello World!\n");
    return 0;
}
```

To save the code, press "CTRL+X" to exit, followed by "Y" to save the changes, and "ENTER" to keep the same filename. Then, compile the source using the GNU Compiler Collection (`gcc`) command line tool:

```zsh
gcc helloworld.c -o helloworld
```

Execute the program:

```zsh
./helloworld
```
