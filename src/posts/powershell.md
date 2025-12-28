---
title: Managing Windows with PowerShell
description: Learn the basics of the Windows console.
date: '2022-01-15'
image: /images/windows-surface-laptop.jpg
categories:
  - PowerShell
  - Windows
published: true
---

<script lang="js">
  import Heading from "../components/heading.svelte"
  import Def from "../components/def.svelte"

  const basicCommands = [
      {cmd: "Get-History", desc: "Print command history (alias: <code>history</code>)"},
      {cmd: "Where-Object", desc: "Select object from collection based on property values (alias: <code>where</code>)"},
      {cmd: "Get-Process", desc: "Find all running processes (alias: <code>gps</code>)"},
      {cmd: "Get-Service", desc: "Find all running services (alias: <code>gsv</code>) "},
      {cmd: "Write-Warning", desc: "Prints warning message string argument to console with PowerShell formatting"},
      {cmd: "Write-Error", desc: "Prints error message string argument to console with PowerShell formatting"},
      {cmd: "Write-Output", desc: "Print variable value to console while preserving object properties"},
      {cmd: "Write-Host", desc: "Print to console without preserving object properties"},
      {cmd: "refreshenv", desc: "Refresh environment variables"},
      {cmd: "cls", desc: "Clear shell"},
  ]
</script>

![Windows surface laptop](/images/windows-surface-laptop.jpg)

<Heading str="Introduction" />

The PowerShell command line interface was originally intended to port Unix tools to Windows. However, the developers realized that the fundamental architectural differences between Unix (and Unix clones such as Linux) and Windows—namely, that Windows is an API-based operating system whereas Unix manages its entire framework through text files—were insurmountable.

As a result, the developers created an entirely new command line interface and scripting language that would become the basis of future Windows releases. In 2016, the project was made open-source and Microsoft announced officially-supported versions for macOS and select Linux distributions.

PowerShell is case insensitive and operates with cmdlets that follow a verb-noun syntax. Similar to batch files, cmdlets can be used within scripts, which may be packaged into modules, to automate more complicated administrative tasks.

### Resources

- [PowerShell Beginner Tutorial](https://www.youtube.com/watch?v=UVUd9_k9C6A&t=10s)
- [PowerShell Advanced Tools and Scripting](https://www.youtube.com/watch?v=K4YDHFalAK8&t=19008s)
- [Creating and Publishing an Item](https://learn.microsoft.com/en-us/powershell/scripting/gallery/how-to/publishing-packages/publishing-a-package?view=powershell-7.2)
- [My Ultimate PowerShell Prompt](https://www.hanselman.com/blog/my-ultimate-powershell-prompt-with-oh-my-posh-and-the-windows-terminal)

<Heading str="Basic utilities" />

<Def array={basicCommands} />

Sometimes it may be useful to write shell comments, e.g., during webinars or broadcasts. Similar to Unix, comments in PowerShell are preceded with `#`, however, block comments may be written between the `<#` and `#>` symbols.

```ps1
# this is a comment
<#
    this is a block comment where you can include more
    detailed information that may span multiple lines
#>
```

To measure the time required to execute a command:

```ps1
Measure-Command {Get-Process}
```

<Heading str="Help" />

The developers of PowerShell believed that no user should memorize commands or syntax. As a result, they packaged PowerShell with an updatable, structured help utility that provides the latest information for cmdlets. With an internet connection, update help with the cmdlets below:

```ps1
Update-Help
# often recommended to force execution
Update-Help -Force
```

To get help on a cmdlet, use the `Get-Help` utility followed by the cmdlet under investigation. This will output a shortlist of helpful information and automatically scroll to the bottom.

```ps1
Get-Help cmdlet
```

<Heading str="Pipeline" />

Similar to other shell scripting tools, the PowerShell pipe (`|`) utility allows users to pass data output from one command to the input of another.

```ps1
# export a list of current active services to a csv file
Get-Service | Export-csv -Path C:\\Users\\Username\\Desktop
```

Besides executing commands on collections of objects crossing the pipeline, users can also evaluate individual objects with filters. These individual objects, or items, crossing the pipeline can be accessed with the `$PSItem` variable:

```ps1
# filter individual process objects where the status is running
Get-Service | Where-Object {$PSItem.Status -eq "Running"}
```

Of course, not all cmdlets will accept the objects being ferried across the pipeline. A good rule of thumb—though not always the case—is that cmdlets with the same noun, e.g., `Get-Service`, `Stop-Service`, will be compatible. Specifically, this means that the data leaving one cmdlet has the same property value, i.e., class type, as the input required by the adjacent cmdlet in the pipeline.

<Heading str="Objects" />

In contrast to Unix-like systems, where all shell interactions are based on text-based input/output, PowerShell was designed to work directly with objects. In many cases, this reduces the amount of work necessary to accomplish certain tasks, as there is no overhead management of filler text output. As an example, if you wanted to restrict `Get-Process` output to handles greater than 900:

```ps1
Get-Process | Where Handles -gt 900
```

This one line of code replaces several lines that would be needed to achieve the same result with Bash.

Every object has associated properties and methods, which describe features of the object class as well as actionable functions, respectively. The `Get-Member` utility, with shorthand `gm`, prints all properties and methods of an object along with its class definition.

```ps1
# find the properties of the bits service object
Get-Service -Name bits | Get-Member
```

With this information, you can choose to customize output based on object class properties.

```ps1
# print the name and status of every object returned from get-service
Get-Service | Select-Object -Property Name, Status
# print the name and length of each object and sort by length
Get-ChildItem | Select-Object -Property Name, Length | Sort -Property Length
```

<Heading str="Variables" />

PowerShell variables are similar to Bash variables, except that these can hold object values. For example:

```ps1
$bits = Get-Service bits
```

The variable `$bits` now holds the `bits` service object. As such, this variable is subject to the object properties and methods:

```ps1
# print the status of the bits service
$bits.status
# stop the bits service
$bits.stop()
```

It is important to note that the properties of this variable are static, meaning they represent a snapshot of the object at the time of variable creation. After running a method, the object must be manually refreshed to update any properties that may have changed state.

```ps1
# check the variable status
$bits.status
# refresh object properties
$bits.refresh()
$bits.status
```

PowerShell variables, when defined inside brackets `{}`, may also contain spaces and special characters:

```ps1
${ var!@bl& } = "hello"
```

<Heading str="Remoting" />

Remote access has to be enabled on all machines. Starting with Windows Server 2012, which is a cloud operating system, remote access is enabled by default.

```ps1
Enable-PSRemoting
```

To establish a one-to-one connection:

```ps1
Enter-PSSession -ComputerName name
```

Outside of a remote session, individual commands can be executed on remote machines with the `Invoke-Command` cmdlet:

```ps1
# print out the system event log from a remote machine named "image-processing"
Invoke-Command -ComputerName image-processing {Get-EventLog -LogName system}
# beware of what will be executed
Invoke-Command -ComputerName comp1,comp2,comp3 {Restart-Computer}
```

Note that every PowerShell command entered into the console uses `Invoke-Command` behind the scences, with the local computer accepted as the default machine. All data returned from the remote system(s) are deserialized object representations, meaning that the objects contain all relevant information for the administrator, but have no methods other than `ToString`.

If not connected to the local network, PowerShell remoting may be facilitated in a browser over https web access. To set up this feature, first install `WindowsPowerShellWebAccess` on the remote machine and then configure user/group privileges.

```ps1
# connect to the desired machine
Enter-PSSession -ComputerName name
# install the web access feature
Install-WindowsFeature WindowsPowerShellWebAccess
# configure a web application for remote PowerShell access
Install-PswaWebApplication -UseTestCertificate
# add authorization rules for users and groups
Add-PswaAuthorizationRule -ComputerGroupName group -UserName users -ConfigurationName rights
```

After completing these steps, the administrator can open a browser and navigate to the web address—the default being https://pwa/pwsa—and access a PowerShell instance connected to the remote machine.

Individual commands can be executed on a remote machine without starting a PowerShell session:

```ps1
Invoke-Command -ComputerName name {$proc = Get-Process}
```

In this case, PowerShell is loaded and initialized on the remote machine, the command is executed, and then the console instance and connection are destroyed. Naturally, this means that any variables are deleted from memory and thus cannot be accessed with a subsequent `Invoke-Command`.

However, as hinted above, persistent PowerShell sessions can be created and accessed at various points of time:

```ps1
$sess = New-PSSession -ComputerName name
```

This creates a persistent remote session and stores the object inside the variable `$sess`. This session can now be used instead of `ComputerName` to pass commands to the remote machine. So long as the session remains open, variables will persist in system memory and can be accessed with subsequent commands.

```ps1
Invoke-Command -Session $sess {$x=2}
Invoke-Command -Session $sess {$x}
```

Sessions also offer the ability to share modules without installation on the local machine. For example, if a server computer had the `ActiveDirectory` module installed:

```ps1
$sess = New-PSSession -ComputerName server
Import-PSSession -Session $sess -Module ActiveDirectory
```

Now all cmdlets from `ActiveDirectory` are available locally while the session is active. Behind the scenes, the local machine builds data structures using `Get-Command` and, when these cmdlets are invoked, the relevant information, e.g., input parameters, is collected and passed to the remote computer for execution. This entire workflow is referred to as "implicit remoting."

<Heading str="Execution policy" />

PowerShell has safety features that prevent users from accidentally running scripts that may contain harmful or malicious code. Script execution permissions are controlled via the execution policy, which can be set to `Restricted` (default), `Unrestricted`, `AllSigned`, `RemoteSigned`, `Bypass`, and `Undefined`. `AllSigned` requires that all scripts downloaded or created locally have digital signatures, whereas `RemoteSigned` only requires signatures for scripts downloaded from the web.

It is recommended to avoid `Unrestricted` and `Bypass`, as these options allow the machine to execute any script without review. If a downloaded script is missing a trusted digital signature but nevertheless has been deemed safe, then it can be exempted from the execution policy with the `Unblock-File` command. As suggested, the correct way to run local scripts is to add a digital signature, which provides explicit authorization to execute the code.

To find the current execution policy:

```ps1
Get-ExecutionPolicy
```

To change the execution policy:

```ps1
# AllSigned or RemoteSigned are generally recommended
Set-ExecutionPolicy AllSigned
```

To create a digital signature:

```ps1
New-SelfSignedCertificate
```

To locate the digital signature and save it to an environment variable:

```ps1
# save all certificates to an environment variable
Get-ChildItem Cert:\\CurrentUser -Recurse -CodeSigningCert -OutVariable a
# save the first cert from list to separate variable
$cert = $a[0]
```

To add a digital signature to a script:

```ps1
Set-AuthenticodeSignature -Certificate $cert -FilePath path
```

It is critical that administrators only sign scripts that they understand fully. When working in an industrial setting, adding a digital signature is a way of assuming responsibility for the consequences of script execution.

<Heading str="Best practices" />

PowerShell is a powerful tool that can cause major system damage if mishandled. When unsure about the ramifications of a certain command, administrators can use the `WhatIf` parameter to print out the results of the questionable command without execution.

```ps1
# the following command would kill all active services and likely damage the system
Get-Service | Stop-Service -WhatIf
```

Administrators may also consider using the `Confirm` parameter to be prompted for confirmation before command execution.

```ps1
# print out command execution results with confirmation prompt
Get-Service | Stop-Service -Confirm
```
