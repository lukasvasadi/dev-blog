---
title: Linux
description: Learn the basics of the command line
date: '2021-10-20'
image: /images/macbook-code.jpg
categories:
  - Linux
published: true
---

<script>
  import Heading from "../components/heading.svelte"
  import Def from "../components/def.svelte"

  const basicCommands = [
      {cmd: "cat", desc: "Type out a file (or combine files)"},
      {cmd: "head", desc: "Show first few lines of file"},
      {cmd: "tail", desc: "show last few lines of file"},
      {cmd: "less", desc: "View contents of larger files with scroll-back"},
      {cmd: "man", desc: "View documentation"},
      {cmd: "sudo", desc: "Grant admin privileges"},
      {cmd: "|", desc: "Pipe data between programs"},
      {cmd: "ssh", desc: "Secure shell remote machine"},
      {cmd: "pwd", desc: "Print working directory"},
      {cmd: "cd", desc: "Change directory"},
  ]

  const wildCards = [
      {cmd: "?", desc: "Match any single character"},
      {cmd: "*", desc: "Match any string of characters"},
      {cmd: "[set]", desc: "Match any character in set, e.g., [adf]"},
      {cmd: "[!set]", desc: "Match any character not in set"},
  ]

  const topOptions = [
      {cmd: "t", desc: "Show or hide summary"},
      {cmd: "m", desc: "Show or hide memory"},
      {cmd: "A", desc: "Sort list by highest resource consumers"},
      {cmd: "r", desc: "Renice specific process"},
      {cmd: "k", desc: "Kill specific process"},
      {cmd: "f", desc: "Enter configuration utility"},
  ]

  const diffOptions = [
      {cmd: "c", desc: "Provide listing of differences"},
      {cmd: "r", desc: "Recursively compare subdirectories"},
      {cmd: "i", desc: "Ignore capitalization"},
      {cmd: "w", desc: "Ignore whitespace"},
      {cmd: "q", desc: "State whether files are different without providing context"},
  ]

  const viCommands = [
      {cmd: "vi file", desc: "Open file in editor"},
      {cmd: "vi -r file", desc: "Open file in recovery mode after system crash"},
      {cmd: ":r file2", desc: "Read in a second file and insert at current position"},
      {cmd: ":w", desc: "Write to file"},
      {cmd: ":w file", desc: "Write out to a new file"},
      {cmd: ":w! file2", desc: "Overwrite file2"},
      {cmd: ":wq", desc: "Write to file and exit"},
      {cmd: ":q", desc: "Quit"},
      {cmd: ":q!", desc: "Quit even with unsaved modifications"},
  ]

  const emacsCommands = [
      {cmd: "emacs file", desc: "Open file in editor"},
      {cmd: "CTRL+x i", desc: "Insert at current position in file"},
      {cmd: "CTRL+x s", desc: "Save all files"},
      {cmd: "CTRL+x CTRL+w", desc: "Write to file and rename"},
      {cmd: "CTRL+x CTRL+s", desc: "Save current file"},
      {cmd: "CTRL+x CTRL+c", desc: "Exit after prompted to save any modified files"},
  ]

  const envVariables = [
      {cmd: "$HOME", desc: "Points to user home directory"},
      {cmd: "$PATH", desc: "Points to ordered list of paths (separated by <code>:</code>) that is scanned to find programs/scripts"},
      {cmd: "$SHELL", desc: "Points to default command shell (usually)"},
  ]

  const consoleShortcuts = [
      {cmd: "CTRL+L", desc: "Clear terminal window"},
      {cmd: "CTRL+D", desc: "Exit current shell"},
      {cmd: "CTRL+Z", desc: "Suspend current process in background"},
      {cmd: "CTRL+C", desc: "Kill current process"},
      {cmd: "CTRL+H", desc: "Backspace"},
      {cmd: "CTRL+A", desc: "Go to beginning of line"},
      {cmd: "CTRL+W", desc: "Delete word before cursor"},
      {cmd: "CTRL+U", desc: "Delete line up to cursor position"},
      {cmd: "CTRL+E", desc: "Go to end of line"},
      {cmd: "Tab", desc: "Autocomplete"},
  ]

  const networkingTools = [
      {cmd: "ethtool", desc: "Queries network interfaces"},
      {cmd: "netstat", desc: "Displays all active network connections and routing tables"},
      {cmd: "nmap", desc: "Scans open ports—critical for security analysis"},
      {cmd: "tcpdump", desc: "Dumps network traffic"},
      {cmd: "mtr", desc: "Displays same information as <code>ping</code> and <code>traceroute</code> in continuous output"},
      {cmd: "dig", desc: "Tests DNS workings"},
  ]
</script>

![Linux Debian command line](/images/linux-debian.jpg)

<Heading str="Introduction" />

Linux was created by Linus Torvalds in 1991 as a free alternative to Unix. Though similar, Linux is technically a Unix clone, not a direct descendant like macOS. For this reason, many of the same commands can be used interchangably on Mac and Linux systems.

All material was based on [Introduction to Linux](https://www.edx.org/course/introduction-to-linux), a course from the Linux Foundation hosted on edX. This course covers each topic with greater detail and also includes tutorials on bash shell scripting.

<Heading str="Basic utilities" />

Below is a selection of common command line utilities:

<Def array={basicCommands} />

A command is the name of the program being executed. Many commands accept arguments and options, the latter often preceded with one or two dashes, e.g., `-p` or `--print`, to be distinguishable.

Users have several options to shutdown or reboot the system from the command line:

```bash
# power off system without rebooting
sudo shutdown -h
# alternative commands that issue shutdown
sudo halt
sudo poweroff
# reboot the system
sudo shutdown -r
# reboot alternative
sudo reboot
```

<Heading str="Pipeline" />

The Unix/Linux philosophy is to combine multiple short programs to produce complex results. To achieve this coordination, data (output) from one program may be "piped" into another using the | command. A string of connected commands is called a pipeline.

```bash
command1 | command2 | command3
```

In the above example, command2 and command3 can start acting on output from previous commands in the pipeline while those commands are still being executed. This feature utilizes the multicore functionality of modern computer systems and does not require data to be written to temporary files.

<Heading str="Navigating the filesystem" />

Locate programs with the `which` or `whereis` utilities, the latter of which searches across a broader range of system directories and also prints the location of the man page:

```bash
which program
whereis program
```

Use `cd` to navigate directories:

```bash
# change to home directory
cd
cd ~
# change to root directory
cd /
# change to parent directory
cd ..
# change to previous directory
cd -
```

When referencing pathnames, remember that absolute pathnames must be preceded by `/`:

```bash
cd /usr/bin
cd ../../usr/bin
```

Use the `tree` command to view the entire filesystem (note that this command may have to be installed with snap):

```bash
# the -d option displays directories while suppressing file names
tree -d
```

The `ls` command lists the contents of the working directory:

```bash
ls
# present in list view
ls -l
# include hidden files
ls -a
```

Use `pushd` to navigate the filesystem and store visited directories to a stack for later reference:

```bash
pwd
/usr
pushd bin
/usr/bin /usr
```

Similarly, use `popd` to revisit previous directories in reverse order. The `dirs` command prints a list of recent directories stacked with `pushd`.

<Heading str="Working with files" />

There are many command line utilities for viewing and reconfiguring files.

```bash
# print file contents in terminal window
cat filename
# print file contents with line numbers
cat -n filename
# print file contents in reverse
tac filename
```

To see one page of text at a time, use the `less` command and press the spacebar to move through the file.

```bash
# show one page of text
less filename
# show one page of text with line numbers
less -N filename
```

The `head` and `tail` commands display the first or last 10 lines of a file, respectively.

```bash
# show first 10 lines
head filename
# specify number of lines
head -20 filename
# show last 10 lines
tail filename
# specify number of lines
tail -20 filename
```

The `touch` utility is commonly used to create new files for later usage, but can also update/modify the timestamp of an existing file.

```bash
# create new file in current directory
touch filename
# update the date and timestamp of an existing file
touch filename
# modify the date and timestamp of an existing file MM DD TIME
touch -t 01011200 filename
```

Use `mkdir` and `rmdir` to manage directories.

```bash
# create new local directory
mkdir dirname
# create new directory with specific path
mkdir dirpath
# delete an empty directory
rm dirname
# delete a directory with contents
rm -rf dirname
```

The `mv` utility can both rename and relocate files.

```bash
# rename existing file
mv filename new-filename
# relocate file
mv filename new-filepath
```

<Heading str="Searching for files" />

When interacting with the command line, there are always three standard file streams in operation: `stdin`, `stdout`, and `stderr`. Usually, `stdin` captures user input while `stdout` and `stderr` print feedback via the terminal, though `stderr` often targets an error logging file. The user can redirect these file streams to pipe data between various files and programs.

The input source and output destination of a program can be changed with the `<` and `>` symbols, respectively:

```bash
# redirect program input
do_something < input-file
# send output to file
do_something > output-file
# send stderr output to file
do_something 2> output-file
# send all output to same destination file
do_something > output-file 2>&1
# shorthand syntax
do_something >& output-file
```

To search for files and directories that contain a specific string, use the `locate` command in combination with `grep` for further filtering. Alternatively, the `find` command can be used to locate files (or directories) after specifying the search directory, where working directory is the default, and adding the `-name` parameter alongside the search string. Note: without any arguments, `-name` outputs all files in the current and nested directories.

```bash
# list all files with zip and bin in their name
locate zip | grep bin
# use find to search for a file in the current working directory
find . -name "zip"
```

With these commands, it is often useful to employ wildcards:

<Def array={wildCards} />

For example, to find a file that has "ba" followed by a third unknown character, with extension `.out`, search for `ba?.out`. Similarly, if the entire name is unknown, search for `*.out`. Putting the search criteria in quotes will expand the search beyond the working directory: `ls "*.out"`.

Using the `-exec` parameter, the `find` utility can also run other commands on the search results:

```bash
# find and remove all files with extension .swp
find -name "*.swp" -exec rm {} ';'
```

<Heading str="Package managers" />

There are two broad families of package managers for Debian and RPM distributions. Each family has a high-level tool, e.g., `apt`, `dnf`, `zypper`, that manage low-level utilities, e.g., `dpkg`, `rpm`, which are responsible for unpacking and installing individual packages. These high-level tools also coordinate the installation of dependencies, or packages that are needed to support the current installation.

Some common package management commands for Debian-based distros include:

```bash
# list all packages on system
dpkg --list
# install (or update) package and dependencies
apt-get install foo
# remove package and dependencies
apt-get remove foo
# upgrade entire system
apt-get dist-upgrade
# search packages named foo
apt-cache search foo
```

<Heading str="Accessing documentation" />

The general philosophy of computer administration is to not memorize every single shell command along with its parameters. Instead, administrators can reference the `man` pages—short for "manual"—or utilize either the `help` command or `--help` option.

```bash
# find information about a specific topic
man topic
# list all pages on topic
man -f topic
# alternatively...
whatis topic
# list all pages that discuss a topic (yields more results)
man -k topic
# alternatively...
apropos topic
```

While `man` is a great tool for reading detailed information about specific utilities, often administrators only need a brief description. This can be accomplished using `--help` or `-h`:

```bash
# find information on the man command
man --help
```

Typing `help` at the command line will print consolidated information about built-in commands.

<Heading str="Processes" />

A process represents a current task running on the computer. Single commands may launch one or more processes simultaneously. The operating system is responsible for allocating system resources to each process for optimized performance. There are several types of processes:

- **Interactive:** started by the user via the command line or graphical interface
- **Batch:** automated processes that require queued resource allocation on a first-in, first-out (FIFO) basis
- **Daemons:** server processes that run continuously in the background
- **Threads:** lightweight processes that run under a main process, sharing a designated number of resources
- **Kernel threads:** perform housekeeping tasks such as relocating threads between CPU cores

The kernel **scheduler** allocates CPU time to queued processes. Each CPU core has a run and wait queue. When a process enters a **sleep** state, the scheduler moves it to the wait queue until the necessary feedback is received. To manage process scheduling and resource allocation, the operating system assigns each running process a unique process ID **(PID)** number, which Usually follow the order that each process was born in the system. In addition, each process has a parent process ID **(PPID)** and, if the process is multithreaded, a unique thread ID **(TID)**.

Users can terminate processes in the terminal shell:

```bash
# kill process
kill -SIGKILL pid
# alternatively...
kill -9 pid
```

Users can also specify a **nice value** for individual processes to control their execution priority. The lower the nice value, the more preference will be given this process over system resources and runtime. Linux nice values range from -20 to +19, with -20 designating the highest priority, or precedence. Note that changing the niceness of a process will also update any child processes with the same value. Increasing niceness may require superuser permissions.

```bash
# change the niceness value
renice value pid
```

The **load average** breaks down CPU resource consumption over three specified timepoints: 45, 15, and 5 min. These percentages denote the amount of CPU resources demanded by active processes. For example, a load average of 0.5 means that an average of 50% CPU resources were consumed for the specified time period.

With modern machines, each load average should be divided by the number of CPU cores, e.g., a load average of 2.0 for a dual-core system indicates 100% CPU resource consumption. It is possible for normalized load averages to exceed 1.0 for brief periods, but prolonged over-utilization may suggest problems. Load averages may be viewed in the terminal by running either `w`, `top`, or `uptime`.

Jobs, or terminal commands, may be run in the foreground or background. Foreground jobs may be suspended with `CTRL+Z` or terminated with `CTRL+C`. Suffixing a command with `&` causes it to be executed in the background. Alternatively, the `bg` and `fg` commands can push jobs to the background or foreground, respectively.

```bash
# view active background jobs
jobs
```

The `ps` command prints information about current running processes:

```bash
# display all processes running under current shell
ps
# include PPID
ps -f
# include full system detail
ps -ef
# show one line of information for every thread
ps -elf
# display as tree diagram to show process lineage
pstree
```

In addition to printing load averages, the `top` command presents a real-time system monitor of all processes, listed in order of CPU resource consumption. The list constantly updates until the user quits with `q`. Other interactive options for top include:

<Def array={topOptions} />

Various commands exist to manage future program execution and suspend currently active processes:

```bash
# schedule non-interactive process to execute in 10 minutes
at now + 10 minutes
# issue command to be executed, then press CTRL-D to exit at config
command arguments
# sleep active program for 10 seconds
sleep 10s
```

<Heading str="File operations" />

In the Linux, the root directory, denoted by `/`, represents the beginning of the filesystem hierarchy. There are many types of filesystems, which often differ across operating systems, but the most common belong to the **journaling** variety: ext4, xfs, btrfs, jfs. It is often the case that an OS will have several different filesystems, each stored on a particular disk partition. Important programs to run the system are isolated on the **root** partition. Each partition has to be mounted on the filesystem tree to be accessible by the user. Examples of common mount points, which appear as empty directories, include `/`, `/home`, and `/var`.

Partitions can be mounted through a graphical utility, such as `gparted`, or the command line with the device node and mount point as the arguments:

```bash
# mount the filesystem at device node /dev/sda5 into the main filesystem tree at mount point /home
sudo mount /dev/sda5 /home
# unmount the partition
sudo umount /home
# show all mounted filesystems
mount
```

Filesystems and data can also be shared across machines through networks. Networks, accessible over the internet, allow grouping of lower-level filesystems into a more universal framework, e.g., the Network Filesystem (**NFS**). For all intensive purposes, NFS can be treated as an other filesystem on the client or server side.

Each user has a home directory listed under `/home`. The `/root` directory is simply the home of the root user (aka superuser or system administrator). The `/bin` directory contains executable binaries needed to boot the system as well as ubiquitous user commands, such as `cat`, `cp`, `ls`, etc. Though similar, `/sbin` stores executables for system administration, such as `ip`.

Non-essential commands are stored under `/usr/bin` and `/usr/sbin`, which was initially done to allow mounting of the user filesystem at a later stage in the OS startup. However, this practice is mostly considered obselete and, as such, most modern Linux distros symbolically link `/usr/bin` with `/bin` and `/usr/sbin` with `/sbin`, i.e., for all intensive purposes, there are no distinctions between these directory groupings.

The `/proc` filesystem contains **virtual files**—files that only exist in memory—that track dynamic kernel data, including information about mounted devices, hardware configurations, CPU, etc. This directory is considered a **pseudo filesystem** because it occupies no permanent space in storage.

The `/dev` directory becomes populated with `device nodes` as devices, e.g., printers, are connected to the computer. Similarly, `/var` is a dynamic directory of sorts as it contains files that are expected to change in size, e.g., system log files (`/var/log`), packages and database files (`/var/lib`), and temporary files (`/var/tmp`).

The `/etc` directory is home to system configuration files that can only be modified by the superuser. Likewise, the `/boot` directory contains essential files needed to boot the system, which are kernel-specific. Libraries needed for binary executables are stored in `/lib` (32-bit) and `/lib64` (64-bit). Removable media files, such as the contents of a connected USB drive, are typically accessible under the `/run/media/usrname/` directory.

There are other directories listed under `/root`, as well as an entire directory tree under `/usr` that contains a host of programs and scripts not needed to boot or manage the system.

Comparing text files can be done with the `diff` command:

```bash
# compare differences between two text files
diff [options] filename1 filename2
# compare differences between three text files, with one acting as a reference
diff3 filename1 referencefile filename2
```

This utility provides several options:

<Def array={diffOptions} />

Unlike other operating systems, Linux does not rely on file extensions to direct operations, e.g., a file with the ".txt" extension could be a binary executable. Users can employ the `file` utility to ascertain file type and other important information.

```bash
# ascertain file type
file filename
# find detailed information about all files in working directory
file *
```

Data can be backed up using the `cp` or `rsync` utilities. While the `cp` command copies files from one destination to another on a local machine, `rsync` performs recursive operations to only copy modified data, i.e., existing files may not be entirely overwritten. The `rsync` utility can also copy data across remote machines.

```bash
# copy file to new location
rsync sourcefile destinationfile
# back up project data to remote archive
rsync -r project networked-machine:archives/project
# perform a dry run to prevent unwanted overwrites
rsync -r -dry-run project networked-machine:archives/project
```

There are several Linux utilities for managing data compression: `gzip`, `bzip2` (deprecated), `xz`. Each of these utilities employ different compression algorithms and, not surprisingly, the utilities which produce smaller files require longer amounts of time. A similar program, `tar`, compresses files grouped in an archive. Lastly, `zip` is a legacy utility specifically used to decompress zipped files from a Windows machine—though it also has compression functionality.

```bash
# compress files in current directory
gzip *
# recursively compress files in specified project directory
gzip -r projectdir
# decompress file foo.gz
gzip -d foo
gunzip foo
```

<Heading str="Text editors" />

There are several ways to create and edit text files from the command line:

```bash
# write several lines to a text file
echo line one > filename
# note that >> appends output to file
echo line two >> filename
echo line three >> filename
# alternatively use cat with redirection
cat << EOF> file
```

For more flexible text editing, Linux distros offer several terminal-based and graphical editors, including **nano**, **gedit**, **vi**, and **emacs**. The nano and gedit editors can be invoked with the `nano` and `gedit` commands, respectively.

In most modern GNOME distros, vi is accessible with **vim**, which stands for **V**i **IM**proved. Though vi has a steep learning curve for new users, it is significantly more powerful than nano and gedit. Invoking `vimtutor` from the command line will launch a vim tutorial.

Vi has three different modes:

1. **command:** Default mode where each key is an editor command
2. **insert:** Insert text into file (invoked with `i`)
3. **line:** Each key is an external command invoked with `:`

Some of the most useful commands for vi include:

<Def array={viCommands} />

When using vi, an external command shell can be opened with `sh`. Otherwise, commands may be executed inside the editor prompt with `!`:

```vim
# find word count of current document (%)
:! wc %
```

The emacs editor is a popular alternative to vi that executes commands using the CTRL and ALT/ESC keys, instead of special characters. (For a full tutorial, start emacs and type CTRL+h followed by the letter t.) Some of the most common command key combinations include:

<Def array={emacsCommands} />

<Heading str="Manipulating text" />

The `cat` utility is used to concatenate files as well as print file contents to the terminal:

```bash
# print file contents
cat filename
# concatenate multiple files and display the output
cat file1 file2
# combine multiple files in a new file
cat file1 file2 > file3
# append contents of one file to another
cat file1 > file2
# write subsequent lines typed into console to file until CTRL+D
cat > filename
# append file with subsequent lines until CTRL+D
cat >> filename
# print file contents in reverse order
tac filename
# combine two files in reverse order and save the output
tac file1 file2 > file
```

These same operations can be accomplished with `echo`, which is a utility that simply prints (echoes) strings in the terminal:

```bash
# print string to terminal
echo string
# save string to file
echo string > filename
# append string to existing file
echo string >> filename
# print the contents of an environment variable
cat $variable
```

System administrators often work with large files, especially in industrial settings. In these cases, opening such a file in a graphical text editor would require the machine to load the entire data into memory, leading to poor performance. Alternatively, the `less` command may be used to load pages at a time into the terminal window.

```bash
# view one page of a file in the console
less filename
cat filename | less
```

As mentioned previously, the `head` and `tail` utilities can be used to print a set number of lines from a file:

```bash
# view the first five lines of a file
head -n 5 filename
head -5 filename
# view the last 15 lines of a file
tail -n 15 filename
tail -15 filename
# continually monitor new output in a growing file
tail -f filename
```

Compressed files have special versions of these utilties that first work to decompress the data and then perform the desired operation.

```bash
# view contents of compressed file
zcat comp-file.txt.gz
# view one page of compressed file
zless comp-file.txt.gz
# search within compressed file
zgrep -i less comp-file.gz
# compare two compressed files
zdiff comp-file1.gz comp-file2.gz
```

The **stream editor** tool (`sed`) is a lightweight text processing tool that moves data from an input stream to a working stream for processing and then finally to an output stream. With the 4 `-e` option, `sed` can perform multiple file operations from one line.

```bash
# substitute every occurrence of string in file
sed -i s/string/substitution/g file
# save output to a new file
sed -i s/string/substitution/g file1 > file2
```

The `awk` utility, which is an acronym for the last names of its authors at Bell Labs, can extract and print specific contents of a file. Commands in `awk` must be surrounded with single-quotes (`'`).

```bash
# print out entire file
awk '{print $0}' file
# print first field (column) of every line
awk -F: '{print $1}' file
# print first and third field of every line
awk -F: '{print $1 $3}' file
```

Other useful Linux file manipulation utilities include `sort`, `uniq`, `paste`, `join`, and `split`:

```bash
# print lines in file alphanumerically
sort file
# reverse the order
sort -r file
# remove duplicate entries from multiple files
sort file1 file2 | uniq > file3
# alternatively use the -u option
sort -u file1 file2 > file3
# combine corresponding lines from multiple files
paste file1 file2
# specify : as the delimiter
paste -d: file1 file2
# join data from different files based on a common field
join file1 file2
# split a large file into 1000-line segments
split largefile
```

The `grep` utility searches files for specific patterns, which may include **regular expressions**.

```bash
# print all lines from a file that contain specific pattern
grep [pattern] file
# print all lines that do not match pattern
grep -v [pattern] file
```

The `strings` utility, which extracts printable character strings from files, is often used alongside `grep` to locate human-readable information in binary files.

```bash
# search for specific string in binary file
strings binaryfile | grep searchstring
```

The `tr` utility translates sets of characters into other characters.

```bash
# convert lowercase to uppercase
cat file | tr a-z A-Z
# translate white space to tabs
echo "Testing 1 2 3" | tr [:space:] '\t'
# delete specified characters
echo "Tigers and toucans" | tr -d 't'
```

The `tee` command splits the `stdout` stream to print results to the terminal and save output to a new file.

```bash
# display output for user and save to file
ls -l | tee filename
```

The `wc` (word count) utility simply outputs the number of lines (`-l`), characters/bytes (`-c`), or words (`-w`) from a file.

```bash
# output the number of lines in file
wc -l file
```

For columnated files, the `cut` utility can extract specific columns of data based on a designated delimeter, where the default is tab.

```bash
# print data from the third column of a file with the ',' delimeter
cat file | cut -d',' -f3
```

<Heading str="User environment" />

As Linux is a multi-user system, administratos may be interested in knowing the current active users:

```bash
# find current user
whoami
# find all active users
who
# find more detailed information
who -a
```

Each user will have local startup files to customize the user environment. These files supercede system settings such as changing the default text editor and path to executables. At login, Linux first evaluates `/etc/profile` and then searches for user-specific startup files in a particular order. Whichever startup file first discovered becomes the basis for the user environment.

Though startup files are only evaluated once at login, Linux will read and evaluate the `~/rc` file each time a command line shell initiates or spawns a program. For this reason, many users often only concern themselves with the `~/rc` file.

The `~/rc` file is also where **aliases** are defined. Aliases are fully custom or modified commands that are accessible through every shell instance. Invoking `alias` will print all existing aliases to the console.

All users belonging to a system are assigned a unique integer user ID (**UID**) as well as one or more group IDs (**GID**) to denote group membership. Groups are simply collections of Linux users that share the same permissions.

```bash
# find user and group ids of current user
id
# find user and group ids of different user
id johndoe
```

Linux administrators can manage user accounts directly from the command line:

```bash
# create new user account
sudo useradd johndoe
# create account with home directory and default shell
sudo useradd -m -c "John Doe" -s /bin jdoe
# start prompt to add account password
sudo passwd jdoe
# remove user account
sudo userdel jdoe
# remove user account as well as associated home directory
sudo userdel -r jdoe
```

Groups may be managed similarly:

```bash
# create new group
sudo groupadd newgroup
# remove group
sudo groupdel newgroup
# find groups associated with user
groups johndoe
# associate new group with user with append (-a)
sudo usermod -a -G newgroup johndoe
# change gid
sudo groupmod -g newid
# change group name
sudo groupmod -n newname
```

Users can gain root privileges by either switching to the root user—not recommended for security reasons—or executing individual shell commands with root privileges:

```bash
# switch shell to root user
su
# execute one command with root privileges
sudo command
```

**Environment variables** are character strings that contain important configuration information for the command shell and various other applications. Various amounts of this information can be viewed with the `set`, `env`, or `export`.

```bash
# show value of variable
echo $SHELL
export new variable
export VARIABLE=value
# commit value for permanent access
nano ~/rc
export VARIABLE=value
# reset shell
source ~/rc
```

Some important variables include:

<Def array={envVariables} />

Previous shell commands can be cycled with the ↑ and ↓ keys or viewed as a list with the `history` command (command history stored in `~/_history`). Alternatively, the most recent command can be called with `!!` or a specific command in history may be searched with `CTRL+R` followed by character hints.

```bash
# print command history
history
    1  echo $HOME
    2  echo $PATH
    3  pwd
    4  ls -la
    5  history
# call command 1
!1
# call command beginning with "p"
!p
```

The following keyboard shortcuts may help speed up tasks in the console:

<Def array={consoleShortcuts} />

Every file in Unix-based operating systems has an owner and is associated with certain groups, all of whom have varying degrees of permissions and read/write access. These permissions can be changed manually:

```bash
# change file ownership
chown user filename
# change group ownership
chgrp group filename
# change permission modes
chmod permissions filename
```

The chmod command can change the read (`r`), write (`w`), and execute (`x`) permissions of the user/owner (`u`), group (`g`), and others (`o`). These characters may be used explicitly as arguments or replaced with a numbering system where read, write, and execute permissions are represented as `4`, `2`, and `1`, respectively. The summation of these numbers represents a combination of the various permissions.

```bash
# grant user and group rw permissions, and others read permission
chmod u=rw,g=rw,o=r filename
# add owner execute permission and remove group write permission
chmod u+x,g-w filename
# give owner rwx permissions, group rx permissions, and others r permission
chmod 754 filename
```

<Heading str="Networking operations" />

A network is a grouping of computers that share information and resources across communication channels. Each device connected to the network must have at least one unique identifier known as the **IP** (Internet Protocol) address, which is used to route packets information through the network. In addition to the actual data content, these packets contain headers that inform each subsequent machine of its sender, destination, and sequence in the data stream.

Currently, there are two IP address standards, **IPv4** and **IPv6**, which assign 32-bit and 128-bit addresses, respectively. Though IPv6 is the newer standard, its adoption has been slow because migrating a collection of machines often requires significant effort. Furthermore, **NAT** (Network Address Translation) and similar protocols allow users to share a common IP address across locally networked computers. Internally, it appears as though each machine has a unique address, but externally the local network is presented a node with one unique address.

IPv4 (32-bit) addresses are subdivided into four octets (8-bit segments or bytes). These address are categorized into one of several classes, where class A, B, and C have octets that are either designated as **Net ID** or **Host ID**. This allows for various numbers of unique networks or host machines, which often depends on the needs of the organization.

IP addresses can either be assigned manually (static address) or dynamically through the Dynamic Host Configuration Protocol (**DHCP**). Dynamically-assigned addresses may change every time the machine is rebooted, or even more frequently in some cases.

**Name Resolution** converts IP addresses into the corresponding human-readable hostnames. The hostname of the local machine can be found with the `hostname` command, which may even be used to change the system hostname given admin privileges. There is also a special hostname called **localhost**, which refers to the current machine and always has the address `127.0.0.1`.

**Network configuration files** are essential for establishing functional interfaces. For Ubuntu-based systems, these files are stored located `/etc/network`. Note that each machine can have one or more operational network interfaces, which may be manually activated or deactivated.

Within a network, packets of data are passed between various nodes via a series of routers, which potentially span multiple networks. Servers store the routing tables that contain the addresses of each node on the network.

```bash
# view IP address
ip addr show
# keep it brief
ip --brief addr show
# view routing information
ip route show
# add static route
ip route add
# delete static route
ip route del
# check status of remote host
ping hostname
```

For troubleshooting errors and delays, administrators can inspect the routing path of data packets—and thereby isolate connection issues between hops—with the `traceroute` utility.

```bash
# view route of information packet to host
traceroute hostname
# alternatively...
traceroute address
```

Other common networking tools include:

<Def array={networkingTools} />

Downloading files from a network, such as an internet webpage, can be accomplished with `wget`. This tool supports large file downloads, recursive downloads, password-sensitive downloads, and large-file downloads.

```bash
# download webpage
wget url
```

A similar tool, `curl`, allows administrators to view webpage contents in the terminal or save the information to a document.

```bash
# read webpage contents
curl url
# store contents to file
curl -o file.html url
```

The File Transfer Protocol (**FTP**) is one of the oldest standards for transferring data files between networked machines. These transfers may be conducted through a browser or graphical/command line client, such as `ftp`, `sftp`. However, FTP is considered obsolete by many system administrators as the protocol, which dates back to the 1970's, has inherent security flaws, e.g., user passwords are transmitted across the network without encryption. A more common modern tool is the Secure Shell (`SSH`) protocol, which allows administrators to share data between networked machines and execute commands on a remote system.

```bash
# execute command on remote system
ssh remotesystem command
# securely transfer files via SSH
scp localfile user@remotesystem:/home/user/
```
