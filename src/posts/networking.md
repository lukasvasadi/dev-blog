---
title: Networking
description: Learn networking basics for ethical hacking
date: '2024-2-2'
image: /images/ethical-hacking.jpg
categories:
  - Networking
  - Kali Linux
published: true
---

<script>
  import Heading from "../components/heading.svelte"
  import Tag from "../components/tag.svelte"
  import Iconlist from "../components/iconlist.svelte"
</script>

![Kali Linux logo](/images/kali-logo.png)

<Heading str="Introduction" />

<Tag tagtype='warning' msg='The following information is for educational purposes only. It is intended to review general concepts in networking. The author is not a qualified instructor and assumes no responsibility for improper use of the material. Never access another network without express permission from its administrator.' />

Cybersecurity is a burgeoning field that has grown alongside modern technological innovations. Though the sophistication of device security has improved dramatically since the introduction of networks, offensive hacking methods have developed in parallel and caused substantial disruption to industries and governments. Having a basic understanding of networks and common hacker tools can help reduce your vulnerability.

### Why the term "hacker?"

The term "hacker" was once—and still is—used to describe an exceptional computer wizard. However, over time, its mainstream colloquial use has become associated with an individual who targets vulnerable networks, often with the intention of causing harm. Within the cybersecurity space, these people are called "black hat" hackers to differentiate from ethical hackers, or "white hat" hackers. There are several other permutations of hacker, including vigilante "red hat" hackers, who are often tied to underground groups or organizations.

### Why Kali Linux?

Many operating systems can be used for basic security analysis, such as determining the number of live systems accessing a network. However, most of the tools discussed in this tutorial were created specifically for Linux. Linux is popular for cybersecurity professionals because it can be customized to a much greater extent than Windows and macOS. Kali Linux is a lightweight distribution that comes preinstalled with many standard offensive cybersecurity command line tools, such as `nmap`. If you choose not to use Kali Linux, you may have to perform manual installations of the tools discussed in this tutorial. Also, Kali just makes you feel like a badass.

### Resources

The following web resources contain substantial information on network analysis, penetration testing, and other common topics.

- [Linux for Ethical Hackers](https://www.youtube.com/watch?v=lZAoFs75_cs&list=PLWKjhJtqVAbnklGh3FNRLECx_2D_vK3mu&index=4)
- [Linux Basics for Hackers](https://www.hackers-arise.com/linux-fundamentals)
- [Network Chuck — Hack Your IT Career](https://networkchuck.com/)

<Heading str="Networks" />

The vast majority of hacking activity occurs over a network connection. As such, knowing how to interact with networks while maintaining secrecy, e.g., hiding your Internet Protocol (IP) address, is essential for aspiring hackers.
What is an IP address?

An [IP address](https://www.youtube.com/watch?v=5WfiTHiU4x8&list=PLIhvC56v63IKrRHh3gvZZBAGvsvOhwrRF) is a unique string of characters that identifies an individual machine, or host, connected to a network. It appears as a grouping of four octets separated by periods, e.g., 192.168.1.204. As such, each of these numbers can be a value ranging from 0 to 255 (2^8), inclusive. In addition to an assortment of IP addresses, each network has a subnet mask (or netmask) with a similar grouping of octets, e.g., 255.255.255.0. Within the subnet mask, the value 255 means that the corresponding octet in the IP address, e.g., 192, will remain the same for all devices on that local network. Conversely, the 0 indicates that the corresponding octet can hold any value within the acceptable range (0-255).

Any given private network can support up to 253 unique hosts. Why 253 and not 256 (0-255)? This is because three addresses are always reserved: the network address (192.168.1.0), the broadcast address (192.168.1.255), and the address for the "default gateway," or router (192.168.1.1). As suggested by its name, any information sent to the broadcast address will be relayed to all hosts on the network. Whenever a device accesses a wireless network, the router assigns it a unique IP address, such as 192.168.1.5 or 192.168.1.111. To find the local IP address for your machine, we can use the `ifconfig` utility (or `ipconfig` for Windows). This tool presents a detailed listing of active network connections, often beginning with `eth0`, which is an abbreviation for "Ethernet0."

```zsh
ifconfig
```

### What can my IP address reveal about me?

Up to now, we have focused the discussion on local network addresses. The information returned from `ifconfig` can only identify your machine on the local area network, such as your home or business. All of the hosts connected to a local network share one **public IP** address, which can be found by searching "What is my IP address?" in a browser. The result that appears is a unique address associated with your private network. While your local IP address contains little information—these addresses are non-unique—your public IP address reveals both your geolocation and Internet Service Provider (ISP). Alone, this information cannot identify an individual machine, but it does provide clues for hackers to learn about a potential target.
What is the purpose of the subnet mask (or netmask)?

[Subnet masks](https://www.youtube.com/watch?v=tcae4TSSMo8&list=PLIhvC56v63IKrRHh3gvZZBAGvsvOhwrRF&index=2) are an organizational tool used to control IP address distribution, since there are a limited number of total IP addresses (2^32 or approximately 4B). By controlling the variability in the network portion of the IP address, i.e., the first three octets (**192**.**168**.**1**.0), businesses and individuals are restricted to the number of IP addresses available for their individual use. As an example, if a corporation was given exclusive rights to address 3.0.0.0 with subnet 255.0.0.0, it would have nearly 17M (2^24) addresses reserved. With the limited supply of IP addresses and the growing demands of IoT, this can become a major issue. For this reason, it is more common to see subnets of 255.255.0.0 or 255.255.255.0, which cut down the number of available addresses to about 66K and 256, respectively.
What is a loop-back address?

The IP address range 127.0.0.0 with subnet mask 255.0.0.0 is reserved for local network testing, i.e., testing the connectivity of your personal devices with "virtual addresses." For example, to confirm that your machine has a functional networking configuration, you can ping any address starting with 127:

```zsh
ping 127.0.0.1
```

The terminal output may resemble:

```
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.016 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.026 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.025 ms
^C
--- 127.10.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2039ms
rtt min/avg/max/mdev = 0.016/0.022/0.026/0.004 ms
```

Ping is a common troubleshooting tool that simply confirms whether a target is alive on a network.

### Updated utilities

Several networking utilities, including `ifconfig`, are being deprecated and replaced with the `ip` command line tool. To print your local IP address and subnet mask, as well as your loop-back and broadcast addresses:

```zsh
ip address
# alternatively, use shorthand expression
ip a
```

Similarly, to print the arp table, which shows a mapping between decive MAC and IP addresses:

```zsh
ip neighbor
# alternatively...
ip n
```

Lastly, to print the routing table, which shows the network traffic endpoints:

```zsh
ip route
# alternatively...
ip r
```

### Example script to list active IP addresses

To see a list of active IP addresses, copy the below script into a file called `ipsweep.sh`. This scripts accepts the network address (first three octets of an IP address) as an argument and pings each possible address allowed by the subnet mask. If a response is received, the script will print that address to the console.

```bash
#! bin/bash

if [ "$1" == "" ]
then
echo "Please include network address as an argument"
else
for ip in `seq 1 254`; do
ping -c 1 $1.$ip | grep "64 bytes" | cut -d " " -f 4 | tr -d ":" &
done
fi
```

To execute the script:

```zsh
# 192.168.64 as an example network address
./ipsweep 192.168.64
```
