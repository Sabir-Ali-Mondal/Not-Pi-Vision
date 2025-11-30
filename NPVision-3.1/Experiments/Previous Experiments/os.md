Of course! Here are the study notes for each topic you listed, prepared for B.Tech students in clear Indian English.

---

### **UNIT 1 — Operating System Introduction**

### **Definition of Operating System**

An Operating System (OS) is a system software that acts as an interface between the computer hardware and the user. It is the first program that loads when you start your computer. The main job of an OS is to manage all the resources of the computer system, like the CPU, memory, and I/O devices.

*   **Resource Manager:** It allocates resources to different programs and users efficiently and fairly. For example, it decides which process gets the CPU and for how long.
*   **User Interface:** It provides a platform for other software (application programs) to run. It hides the complexity of the hardware from the user, offering a user-friendly environment.
*   **Examples:** Common examples include Microsoft Windows, macOS, Linux, and mobile OSs like Android and iOS.

### **Generations of Operating Systems**

The evolution of Operating Systems is divided into generations, each marked by significant changes in technology and functionality.

*   **First Generation (1940s-50s):** No OS. Computers were run using plug boards and vacuum tubes. Programs were written in machine language.
*   **Second Generation (1950s-60s):** **Batch Systems** were introduced. Transistors were used. Jobs with similar needs were batched together and run as a group to improve efficiency.
*   **Third Generation (1960s-70s):** Integrated Circuits (ICs) led to the development of **Multiprogramming** and **Time-Sharing** systems. Multiple jobs could reside in memory at once.
*   **Fourth Generation (1970s-Present):** Microprocessors made personal computers (PCs) possible. This era saw the rise of **Graphical User Interfaces (GUIs)**, network, and distributed operating systems like Windows and UNIX.

### **Concept and purpose of an Operating System**

The core concept of an Operating System is to be a manager and a facilitator. It manages the computer's resources and provides a convenient environment for users to execute programs.

*   **Primary Purpose:** The main goal is **convenience** for the user and **efficiency** of the computer system. It makes the computer easier to use by hiding complex hardware details.
*   **Resource Management:** It manages CPU time, memory space, file storage, and I/O devices. It ensures that multiple processes do not interfere with each other.
*   **Providing a Platform:** It provides a stable and consistent environment for application software to run. An application written for Windows will run on any Windows machine because the OS provides the necessary services.

### **Types of Operating Systems: Batch**

A Batch Operating System is one of the earliest types of OS. In this system, jobs with similar requirements are batched together and executed as a group. The user does not interact with the computer directly.

*   **How it works:** Users prepare their jobs on an offline device like a punch card and submit them to a computer operator. The operator sorts the jobs into batches and runs them one by one.
*   **Main Feature:** There is a lack of interaction between the user and the job while it is executing.
*   **Disadvantage:** The CPU often remains idle because the speed of mechanical I/O devices is much slower than the CPU.
*   **Example:** Payroll systems or bank statement generation are tasks that can be done in batches.

### **Types of Operating Systems: Interactive**

An Interactive Operating System provides a direct two-way communication link between the user and the system. The user gives instructions to the operating system or a program directly and receives an immediate response.

*   **Key Feature:** The user is in constant dialogue with the system. It allows for a fast response time, making the system feel responsive.
*   **Mechanism:** It uses a command-line interface (CLI) or a graphical user interface (GUI) to interact with the user.
*   **Purpose:** Designed to give a quick response to user requests, making tasks like editing documents or browsing the web possible.
*   **Example:** All modern operating systems like Windows, macOS, and Linux are interactive.

### **Types of Operating Systems: Multi-programming**

A Multi-programming Operating System allows multiple programs to be stored in the main memory at the same time. The CPU is never idle as long as there is at least one process ready to execute.

*   **Core Concept:** The idea is to maximize **CPU utilization**. When one process is busy with an I/O operation (which doesn't need the CPU), the OS switches the CPU to another ready process.
*   **Mechanism:** It keeps several jobs in memory simultaneously. The OS picks one job to execute. When that job has to wait for an I/O task, the OS switches to another job.
*   **Benefit:** It significantly increases the overall efficiency and throughput of the system.

### **Types of Operating Systems: Multi-tasking**

Multi-tasking is the logical extension of multi-programming. It allows a single user to run multiple applications at the same time. The OS switches between these applications so quickly that it appears they are all running simultaneously.

*   **Core Concept:** It creates the illusion of parallel execution on a single-CPU machine. This is achieved by rapidly switching the CPU among different tasks, a concept known as **time-sharing**.
*   **User Experience:** You can listen to music while writing a document and downloading a file. Each of these is a separate task.
*   **Difference from Multi-programming:** Multi-programming keeps multiple jobs ready to maximize CPU use, while multi-tasking focuses on providing a responsive experience for a single user running multiple apps.

### **Types of Operating Systems: Time-sharing**

A Time-sharing Operating System allows many users, located at various terminals, to use a particular computer system at the same time. The CPU's time is shared among multiple users.

*   **Mechanism:** The OS allocates a small amount of time, called a **time slice** or **quantum**, to each user's process. It rapidly switches between users, giving each a turn on the CPU.
*   **Goal:** To provide a quick response time to each user, so each one feels they have dedicated access to the machine.
*   **Relationship to Multi-tasking:** Multi-tasking is essentially the time-sharing concept applied to a single user running multiple programs. Time-sharing is often used in the context of multiple users.

### **Types of Operating Systems: Real-time (Soft and Hard)**

A Real-time Operating System (RTOS) is designed to serve real-time applications where data processing must be done within a strict time constraint. Any delay could cause a critical failure.

*   **Hard Real-time:** These systems have very strict deadlines. A missed deadline is a total system failure.
    *   **Example:** Systems controlling an aircraft's autopilot or a car's airbags. The response must be immediate and guaranteed.
*   **Soft Real-time:** In these systems, missing a deadline is not catastrophic but will degrade the system's performance. The critical task gets priority over other tasks.
    *   **Example:** Live video streaming. A slight delay might cause a temporary glitch in the video but won't cause the entire system to fail.

### **Types of Operating Systems: Distributed**

A Distributed Operating System manages a group of independent computers and makes them appear to be a single computer. The computers are connected through a network but are presented to the user as one cohesive system.

*   **Core Concept:** It provides **transparency**. Users are unaware of where their programs are being run or where their files are stored; it all looks like a single local system.
*   **Benefit:** It allows for resource sharing, higher performance through load sharing, and increased reliability (if one computer fails, the others can continue working).
*   **Example:** A large-scale banking system where multiple servers work together to handle transactions, but to the user, it appears as a single banking application.

### **Types of Operating Systems: Network**

A Network Operating System (NOS) runs on a server and provides the capability to manage data, users, groups, security, applications, and other networking functions.

*   **Key Feature:** The computers in the network are aware of each other. The focus is on **sharing resources** like files, printers, and applications among multiple independent computers.
*   **Difference from Distributed OS:** In a NOS, the user knows which machine they are working on and must explicitly log in to a remote machine to access its resources. It lacks the transparency of a distributed OS.
*   **Examples:** Novell NetWare, Microsoft Windows Server.

### **Types of Operating Systems: Parallel**

A Parallel Operating System is used to manage multiple CPUs in a single computer system. It breaks down a large task into smaller sub-tasks and assigns them to different CPUs for simultaneous execution.

*   **Goal:** To increase the system's performance and throughput by executing parts of a program in parallel. This is also known as a **multiprocessor system**.
*   **Types:**
    *   **Symmetric Multiprocessing (SMP):** Each processor runs an identical copy of the OS, and they communicate with each other as needed.
    *   **Asymmetric Multiprocessing (AMP):** One processor acts as the master, controlling the system, while others are slaves.
*   **Application:** Used in high-performance computing for scientific simulations and large-scale data processing.

### **OS Services**

Operating Systems provide a set of essential services to users and programs to make the computer easier to use and to manage resources efficiently.

*   **Process Management:** Creating, deleting, suspending, and resuming processes. The OS also handles communication and synchronization between processes.
*   **Memory Management:** Allocating and de-allocating memory space to programs as they need it. It keeps track of which parts of memory are currently being used and by whom.
*   **File Management:** Creating, deleting, opening, and closing files. It manages the storage of files on secondary storage devices like hard disks.
*   **I/O Device Management:** Managing communication with hardware devices like keyboards, printers, and disk drives through their respective drivers.
*   **Protection and Security:** **Protection** involves controlling the access of processes or users to resources. **Security** involves defending the system against internal and external attacks.

### **System Calls: Definition, Types, Usage examples**

A system call is the programmatic way a user program requests a service from the operating system's kernel. It provides an interface between a process and the OS.

*   **Definition:** When a program needs to perform a privileged operation, like reading from a file or creating a new process, it executes a **system call**. This switches the program from user mode to kernel mode, allowing the OS to perform the task on its behalf.
*   **Types:**
    *   **Process Control:** `fork()` (create a process), `exit()` (terminate a process).
    *   **File Management:** `open()`, `read()`, `write()`, `close()`.
    *   **Device Management:** `ioctl()` (to control a device).
*   **Example:** In C, when you use the `printf()` function, it internally calls the `write()` system call to display the text on your screen.

### **Structure of Operating Systems: Monolithic**

A Monolithic OS structure is a traditional design where the entire operating system, including the kernel, services, and device drivers, is built as a single, large block of code running in a single address space.

*   **Architecture:** There is no strict separation between different OS components. All services run in **kernel mode**, giving them direct access to hardware.
*   **Advantages:** It is very efficient because communication between components is as fast as a simple function call.
*   **Disadvantages:** It is difficult to modify or extend. A bug in one part (like a device driver) can crash the entire system. It is also less secure.
*   **Examples:** Early versions of UNIX and Linux, as well as MS-DOS.

### **Structure of Operating Systems: Layered**

In a Layered OS structure, the operating system is broken down into a number of layers, each built on top of lower layers. The bottom layer is the hardware, and the highest layer is the user interface.

*   **Architecture:** Each layer can only use functions and services provided by the layer directly below it. This creates a well-defined, modular structure.
*   **Advantages:** It simplifies debugging and system verification. A layer can be modified or updated without affecting the other layers, as long as its interface remains the same.
*   **Disadvantages:** It can be less efficient than a monolithic structure because a request may have to pass through multiple layers, adding overhead.
*   **Example:** The original THE operating system.

### **Structure of Operating Systems: Microkernel**

A Microkernel OS structure involves removing all non-essential components from the kernel and implementing them as user-level programs. This results in a much smaller, more stable kernel.

*   **Architecture:** The microkernel's only job is to provide basic services like process management, memory management, and inter-process communication (IPC). Other services like device drivers and file systems run as separate processes in **user mode**.
*   **Advantages:** It is more secure and reliable. If a user-level service fails, it doesn't crash the whole OS. It is also easier to extend.
*   **Disadvantages:** Performance can be lower due to the overhead of message passing between user-level services and the kernel.
*   **Example:** QNX, L4.

### **Structure of Operating Systems: Modular**

The Modular OS structure is a modern approach that tries to combine the benefits of monolithic and microkernel designs. The kernel has a set of core components, and other services are loaded as separate modules.

*   **Architecture:** The kernel is relatively small, but modules can be loaded and unloaded dynamically at runtime. These modules, like device drivers or file systems, can run in **kernel space**, allowing for high performance.
*   **Advantages:** It is flexible and efficient. New functionality can be added to the kernel without needing to recompile the entire OS.
*   **Disadvantages:** While more structured than monolithic, a buggy module can still crash the system since it runs in kernel space.
*   **Example:** Most modern operating systems, including Linux, macOS, and Windows, use a modular design.

### **Structure of Operating Systems: Hybrid**

A Hybrid OS structure is a combination of different OS structures, primarily monolithic and microkernel. It takes the best aspects of both to improve performance, security, and flexibility.

*   **Architecture:** It has a smaller kernel like a microkernel but keeps some key services (like file systems or network stacks) inside the kernel for better performance, unlike a pure microkernel where they are in user space.
*   **Goal:** To achieve the speed of a monolithic kernel while having the modularity and stability benefits of a microkernel.
*   **Practicality:** Most modern operating systems are actually hybrid in nature. They are not purely monolithic or microkernel.
*   **Examples:** Microsoft Windows and Apple's macOS both use a hybrid kernel architecture.

### **Concept of Virtual Machine**

A Virtual Machine (VM) is a software-based emulation of a physical computer. It allows you to run a complete, separate operating system (called the **guest OS**) on top of your existing operating system (the **host OS**).

*   **How it works:** A software layer called a **hypervisor** or **Virtual Machine Monitor (VMM)** manages the host system's hardware resources and provides virtualized hardware to the guest OS.
*   **Purpose:**
    *   **Isolation:** VMs are isolated from each other and the host, improving security.
    *   **Testing:** Safely test new software or operating systems without affecting your main system.
    *   **Consolidation:** Run multiple servers on a single physical machine to save costs.
*   **Examples:** VMware Workstation, Oracle VirtualBox.

### **Command Interpreter / Shell**

The Command Interpreter, commonly known as the **Shell**, is the part of the operating system that acts as the primary interface between the user and the kernel. It reads and interprets commands entered by the user.

*   **Function:** When you type a command (e.g., `ls` in Linux or `dir` in Windows), the shell takes that command, finds the corresponding program, and asks the kernel to execute it.
*   **Types:**
    *   **Command-Line Interface (CLI):** Text-based shells like Bash (Linux) or PowerShell (Windows).
    *   **Graphical User Interface (GUI):** Icon-based interfaces like the Windows Desktop or GNOME in Linux.
*   The shell itself is just a program; different shells can be used on the same OS.

### **Kernel vs Shell**

The Kernel and the Shell are the two main components of an operating system, but they have very different roles.

*   **Kernel:**
    *   It is the **core** of the OS.
    *   It directly interacts with the hardware and manages all system resources (CPU, memory, etc.).
    *   It runs in a protected memory space (**kernel mode**).
    *   The user does not interact with the kernel directly.
*   **Shell:**
    *   It is the **outermost layer** of the OS.
    *   It is an interface for the user to communicate with the kernel.
    *   It runs in **user mode**.
    *   It takes user commands and requests the kernel to execute them.

In simple terms, the **kernel is the heart** of the OS, while the **shell is the face** of the OS.

### **Case Study: UNIX Operating System**

UNIX is a highly influential, multi-user, multi-tasking operating system developed in the 1970s. It is known for its simplicity, portability, and powerful command-line tools.

*   **Philosophy:** UNIX was designed with a simple philosophy: "Write programs that do one thing and do it well." Complex tasks are achieved by connecting these simple tools together using **pipes**.
*   **Structure:** It has a monolithic kernel but is highly modular. The system consists of the kernel, the shell, and a large collection of small utility programs.
*   **File System:** It introduced a hierarchical file system, where everything (including hardware devices) is treated as a file.
*   **Influence:** UNIX has been the foundation for many other operating systems, including Linux, macOS, and Android (which uses a Linux kernel).

### **Case Study: Windows Operating System**

Microsoft Windows is the most popular desktop operating system in the world. It is known for its user-friendly Graphical User Interface (GUI).

*   **Architecture:** Windows uses a **hybrid kernel** architecture. It combines features of a microkernel (for stability and security) with the performance of a monolithic design by keeping key components like the graphics subsystem within the kernel.
*   **Key Features:**
    *   **Plug and Play:** Automatically detects and configures new hardware.
    *   **Backward Compatibility:** Aims to run software designed for older versions of Windows.
    *   **NTFS File System:** A robust file system with features like security, compression, and journaling.
*   **Structure:** It is a highly modular system with different subsystems for managing memory, processes, and security, all communicating through the kernel.

---

### **UNIT 2 — Processes, Threads, and Scheduling**

### **Process: Definition and Process Components**

A process is a program in execution. When you run an application (like a web browser), the operating system creates a process for it. It is an active entity, unlike a program, which is a passive set of instructions stored on a disk.

A process consists of several components stored in its memory space:
*   **Text Section:** The compiled program code.
*   **Data Section:** Global variables.
*   **Heap:** Memory that is dynamically allocated during runtime (e.g., using `malloc` in C).
*   **Stack:** A temporary data storage for function parameters, return addresses, and local variables.
*   **Process Control Block (PCB):** Contains all the information about the process.

### **Process Relationship (Parent, Child, Process Tree)**

In many operating systems, processes can create other processes. This establishes a parent-child relationship.

*   **Parent Process:** The process that creates another process.
*   **Child Process:** The new process created by a parent process.
*   **Process Creation:** In UNIX-like systems, the `fork()` system call is used to create a child process, which is a duplicate of the parent. The `exec()` call can then be used to replace the child's memory space with a new program.
*   **Process Tree:** All processes in the system can be represented as a tree, with the very first process (called `init` in UNIX) at the root. Each parent can have multiple children, forming a hierarchical structure.

### **Process States and State Transition Diagram**

As a process executes, it changes its state. The state of a process is defined by its current activity. The main process states are:

*   **New:** The process is being created.
*   **Ready:** The process is waiting to be assigned to a CPU. It has everything it needs to run.
*   **Running:** Instructions are being executed by the CPU.
*   **Waiting (or Blocked):** The process is waiting for some event to occur, such as an I/O operation to complete.
*   **Terminated:** The process has finished execution.

A **State Transition Diagram** shows how a process moves from one state to another. For example, a process moves from Running to Waiting when it needs I/O, and from Waiting to Ready when the I/O is complete.

### **Process Control Block (PCB): Structure and Role**

The Process Control Block (PCB), also known as a Task Control Block, is a data structure in the operating system kernel that contains all the information about a specific process. The OS uses the PCB to manage processes.

*   **Role:** The PCB is like the "passport" of a process. It stores all the data needed by the OS to track and control the process.
*   **Structure (Key Information):**
    *   **Process State:** (e.g., new, ready, running).
    *   **Process ID (PID):** A unique identifier for the process.
    *   **Program Counter:** The address of the next instruction to be executed.
    *   **CPU Registers:** Values of all processor registers.
    *   **Memory-Management Information:** Pointers to page tables or segment tables.
    *   **I/O Status Information:** List of I/O devices allocated to the process.

### **Context Switching: Concept, overhead, optimization**

Context Switching is the process of saving the state of the currently running process and loading the state of the next process that is scheduled to run. This allows a single CPU to handle multiple processes.

*   **Concept:** When the OS decides to switch from Process A to Process B, it saves all the information from Process A's PCB (like register values, program counter) and then loads the corresponding information for Process B from its PCB.
*   **Overhead:** Context switching is pure overhead because the system does no useful work during the switch. The time it takes depends on hardware support and the complexity of the OS.
*   **Optimization:** Reducing the frequency of context switches can improve performance. Hardware support (e.g., multiple sets of registers) can also make context switching faster.

### **Threads: Definition**

A thread is the smallest unit of execution within a process. A process can have multiple threads, all sharing the same memory space and resources but executing independently.

*   **Analogy:** Think of a process as a house. A single-threaded process is like a house with one person doing one task. A multi-threaded process is like a house with multiple people, each doing a different task (e.g., one cooking, one cleaning) at the same time, sharing the same kitchen and rooms.
*   **Key Idea:** Threads within the same process share their code section, data section, and OS resources like open files. However, each thread has its own **program counter, registers, and stack**. This makes them lightweight compared to processes.

### **Threads: Thread States**

Similar to processes, threads also have states that describe their current activity. The common states for a thread are:

*   **New:** A thread is created but has not yet started running.
*   **Runnable (Ready):** The thread is ready to execute and is waiting for its turn on the CPU.
*   **Running:** The thread is currently being executed by the CPU.
*   **Blocked (Waiting):** The thread is waiting for an event, such as an I/O operation or for a lock to become available.
*   **Terminated:** The thread has completed its execution.

The state transitions for threads are managed by the thread library or the kernel.

### **Threads: Benefits of Threads**

Using multiple threads within a single process offers several significant advantages:

*   **Responsiveness:** In a GUI application, one thread can handle user interaction while another performs a long task in the background, keeping the application from freezing.
*   **Resource Sharing:** Threads share the memory and resources of their parent process, which is more efficient than sharing memory between separate processes.
*   **Economy:** Creating and switching between threads is much faster and less resource-intensive than creating and switching between processes because they share resources.
*   **Scalability:** In a multiprocessor system, multiple threads from the same process can run in parallel on different CPUs, significantly increasing performance.

### **Threads: Types of Threads: User-level, Kernel-level**

Threads can be managed either by the user-level library or by the operating system kernel.

*   **User-Level Threads (ULTs):**
    *   Managed by a thread library in user space without any kernel support. The kernel is unaware of their existence.
    *   **Advantage:** Fast to create and manage because no system calls are needed.
    *   **Disadvantage:** If one thread makes a blocking system call (e.g., for I/O), the entire process blocks, even if other threads are ready to run.
*   **Kernel-Level Threads (KLTs):**
    *   Managed directly by the operating system kernel.
    *   **Advantage:** If one thread blocks, the kernel can schedule another thread from the same process to run. They can also run in parallel on a multiprocessor system.
    *   **Disadvantage:** Slower to create and manage due to the overhead of system calls.

### **Multithreading concepts**

Multithreading is the ability of a process to manage multiple threads of execution concurrently. It allows a program to be more responsive and efficient.

*   **Concurrency vs. Parallelism:**
    *   **Concurrency:** On a single-core CPU, threads make progress by rapidly switching, giving the illusion of running at the same time.
    *   **Parallelism:** On a multi-core CPU, multiple threads can truly run at the same time, one on each core.
*   **Models:** There are different ways to map user-level threads to kernel-level threads:
    *   **Many-to-One:** Many user threads map to a single kernel thread. (Blocks the whole process).
    *   **One-to-One:** Each user thread maps to a kernel thread. (Provides true parallelism but has overhead).
    *   **Many-to-Many:** Maps many user threads to a smaller or equal number of kernel threads. (A flexible compromise).

### **Scheduling Foundations and Objectives**

CPU scheduling is the process of selecting which of the processes in the ready queue will be allocated the CPU. The primary objective is to make the system efficient, fast, and fair.

*   **Key Objectives:**
    *   **Maximize CPU Utilization:** Keep the CPU as busy as possible.
    *   **Maximize Throughput:** The number of processes completed per unit of time.
    *   **Minimize Turnaround Time:** The total time a process takes from submission to completion.
    *   **Minimize Waiting Time:** The total time a process spends waiting in the ready queue.
    *   **Minimize Response Time:** The time from when a request is submitted until the first response is produced (important for interactive systems).
    *   **Fairness:** Ensure that each process gets a fair share of the CPU.

### **Scheduling Criteria**

Scheduling criteria are the metrics used to compare and evaluate the performance of different CPU scheduling algorithms. The choice of algorithm depends on which criteria are most important for a given system.

*   **CPU utilization:** The percentage of time the CPU is busy. A higher value is better.
*   **Throughput:** The number of processes completed per unit time. Higher is better.
*   **Turnaround Time:** The interval from the time of submission to the time of completion of a process. (Completion Time - Arrival Time). Lower is better.
*   **Waiting Time:** The sum of the periods a process spends waiting in the ready queue. (Turnaround Time - Burst Time). Lower is better.
*   **Response Time:** The time from submission until the first response is produced. Lower is better, especially for interactive systems.

### **Types of Schedulers: Long-term, Medium-term, Short-term**

Operating systems use different schedulers for different purposes and at different frequencies.

*   **Long-Term Scheduler (or Job Scheduler):**
    *   Selects processes from the job pool on the disk and loads them into memory to be executed.
    *   Controls the **degree of multiprogramming** (the number of processes in memory).
    *   Runs infrequently.
*   **Short-Term Scheduler (or CPU Scheduler):**
    *   Selects a process from the ready queue and allocates the CPU to it.
    *   Runs very frequently (many times per second). Must be very fast.
*   **Medium-Term Scheduler (optional):**
    *   Removes processes from memory to reduce the degree of multiprogramming (a process of **swapping**). The process can be brought back in later.

### **Dispatcher and Dispatch Latency**

The dispatcher is the module that gives control of the CPU to the process selected by the short-term scheduler. It is the final step in the scheduling process.

*   **Functions of the Dispatcher:**
    1.  Switching context from the old process to the new process.
    2.  Switching to user mode.
    3.  Jumping to the proper location in the user program to restart that program.
*   **Dispatch Latency:** This is the time it takes for the dispatcher to stop one process and start another running. It is a form of overhead, so it needs to be as small as possible for the system to be efficient.

### **Scheduling Algorithms: FCFS**

First-Come, First-Served (FCFS) is the simplest CPU scheduling algorithm. The process that requests the CPU first is allocated the CPU first. It is a non-preemptive algorithm.

*   **How it works:** It uses a simple FIFO (First-In, First-Out) queue. When a process enters the ready queue, its PCB is linked to the tail of the queue.
*   **Advantages:** Very simple to understand and implement.
*   **Disadvantages:**
    *   Average waiting time can be very long.
    *   Suffers from the **convoy effect**, where a long process can make many short processes wait for a long time.
*   **Example:** If Process P1 (burst 24ms) arrives before P2 (burst 3ms) and P3 (burst 3ms), P2 and P3 have to wait for P1 to finish, leading to high waiting times.

### **Scheduling Algorithms: SJF**

Shortest-Job-First (SJF) is a scheduling algorithm that selects the process with the smallest CPU burst time to execute next. It can be either preemptive or non-preemptive.

*   **Non-Preemptive SJF:** Once the CPU is given to a process, it cannot be taken away until the process completes its CPU burst.
*   **Preemptive SJF (SRTF):** This is explained in the next topic.
*   **Advantage:** SJF is provably optimal, meaning it gives the minimum average waiting time for a given set of processes.
*   **Disadvantage:** The main problem is knowing the length of the next CPU burst. It is impossible to know in advance, so it is usually estimated based on previous bursts.

### **Scheduling Algorithms: SRTF**

Shortest-Remaining-Time-First (SRTF) is the preemptive version of the SJF algorithm. It is one of the most efficient scheduling algorithms.

*   **How it works:** When a new process arrives in the ready queue with a CPU burst shorter than the remaining time of the currently executing process, the SRTF algorithm will **preempt** the current process and start executing the new, shorter process.
*   **Advantage:** It provides better performance and a lower average waiting time than non-preemptive SJF.
*   **Disadvantage:** Like SJF, it requires knowledge of the future CPU burst times. It also has higher overhead due to frequent context switching.

### **Scheduling Algorithms: Priority (Preemptive and Non-preemptive)**

Priority Scheduling is an algorithm where a priority is associated with each process, and the CPU is allocated to the process with the highest priority.

*   **How it works:** Processes with equal priority are typically scheduled in FCFS order. Priority can be defined internally (e.g., based on memory requirements) or externally (e.g., based on user importance).
*   **Preemptive:** If a new process arrives with a higher priority than the currently running process, the current process is preempted.
*   **Non-Preemptive:** A high-priority process is simply put at the head of the ready queue and will run next.
*   **Problem:** It can lead to **starvation**, where low-priority processes may never get to run. This can be solved using **aging**, where the priority of waiting processes is gradually increased over time.

### **Scheduling Algorithms: Round Robin**

Round Robin (RR) is a scheduling algorithm designed specifically for time-sharing systems. It is a preemptive algorithm.

*   **How it works:** It uses a small unit of time called a **time quantum** or **time slice** (typically 10-100 milliseconds). The ready queue is treated as a circular queue. The CPU scheduler goes around the queue, allocating the CPU to each process for a time interval of up to one quantum.
*   **Performance:**
    *   If the quantum is very large, RR becomes similar to FCFS.
    *   If the quantum is very small, it results in a lot of context switching overhead.
*   **Advantage:** It provides good response time and fairness, as no process has to wait for more than (n-1) * q time units, where n is the number of processes and q is the quantum.

### **Scheduling Algorithms: Multi-level queue**

The Multi-level Queue scheduling algorithm partitions the ready queue into several separate queues. Processes are permanently assigned to one queue based on some property, such as memory size, process type, or priority.

*   **Architecture:** Each queue has its own scheduling algorithm. For example, one queue for **foreground (interactive) processes** might use Round Robin, while a queue for **background (batch) processes** might use FCFS.
*   **Scheduling between queues:** There must be scheduling among the queues, which is commonly implemented as fixed-priority preemptive scheduling. For example, the foreground queue may have absolute priority over the background queue.
*   **Disadvantage:** It is inflexible, as processes cannot move between queues.

### **Multiprocessor Scheduling**

Multiprocessor scheduling involves scheduling processes on a system with more than one CPU. This adds complexity because the scheduler must decide not only which process to run, but also which CPU to run it on.

*   **Asymmetric Multiprocessing:** One processor (the master) handles all scheduling decisions and I/O processing, while the other processors (the slaves) only execute user code. This is simple but can create a bottleneck.
*   **Symmetric Multiprocessing (SMP):** Each processor is self-scheduling. All processes may be in a common ready queue, or each processor may have its own private queue. This is the more common and efficient approach in modern systems.
*   **Key Issue:** **Processor affinity**, where a process has an "affinity" for the processor it is currently running on because its cache is populated with that process's data.

### **Real-Time Scheduling: Rate Monotonic Scheduling (RM)**

Rate Monotonic Scheduling (RM) is a priority-based, preemptive scheduling algorithm used in hard real-time systems. It assigns priorities to tasks based on their periods.

*   **Priority Assignment:** The shorter the period of a task, the higher its priority. (A task's "period" is the time interval within which it must complete its execution).
*   **How it works:** The scheduler always executes the task with the highest priority that is ready to run. It is a **static priority** algorithm because the priorities are fixed.
*   **Optimality:** RM is considered optimal among static-priority algorithms. If a set of periodic tasks cannot be scheduled by RM, it cannot be scheduled by any other static-priority algorithm.

### **Real-Time Scheduling: Earliest Deadline First (EDF)**

Earliest Deadline First (EDF) is a dynamic priority scheduling algorithm used in real-time systems. Priorities are not fixed but are assigned based on the upcoming deadlines of the tasks.

*   **Priority Assignment:** The task with the earliest (closest) deadline is given the highest priority. Since deadlines change over time, this is a **dynamic priority** algorithm.
*   **How it works:** Whenever a scheduling decision needs to be made (e.g., a task finishes), EDF selects the ready task that has the closest deadline.
*   **Optimality:** EDF is theoretically optimal. If a set of tasks can be scheduled by any algorithm, it can also be scheduled by EDF. It can achieve higher CPU utilization than RM.

### **Orphan, Zombie, Daemon Processes**

These are special types of processes in UNIX-like systems.

*   **Zombie Process:** A process that has completed its execution but still has an entry in the process table. This entry is needed so the parent process can read its child's exit status. Zombies are "dead" but not yet "reaped" by their parent. They are removed once the parent calls the `wait()` system call.
*   **Orphan Process:** A process whose parent process has terminated without waiting for its child to finish. Orphaned processes are immediately "adopted" by the `init` process (the ancestor of all processes), which then waits for them to finish, preventing them from becoming zombies.
*   **Daemon Process:** A background process that is not under the direct control of a user. It is typically started at boot time and runs continuously to perform system tasks, like handling network requests (`httpd`) or scheduling jobs (`cron`).

### **Forking and Process Creation**

Forking is the primary method of process creation in UNIX-like operating systems. It is done using the `fork()` system call.

*   **How `fork()` works:** When a process calls `fork()`, the OS creates a new process, which is an almost exact duplicate of the parent process. This new process is the **child**.
*   **Key Features:**
    *   The child process gets its own separate memory space, but it is a copy of the parent's at the time of the fork.
    *   The `fork()` call returns twice: it returns the **child's PID** to the parent and **0** to the child. This allows the program to differentiate between the parent and child and execute different code in each.
*   **`exec()`:** After forking, a child process often uses an `exec()` family system call to load a new program into its memory space, replacing its own code.

---

### **UNIT 3 — Inter-Process Communication & Synchronization**

### **Inter-process Communication (IPC): Definition and Methods**

Inter-Process Communication (IPC) refers to the mechanisms provided by an operating system that allow different processes to communicate with each other and share data. Processes are isolated by default, so IPC is necessary for them to cooperate.

*   **Purpose:** To enable data exchange, event notification, and resource sharing between processes.
*   **Common Methods:**
    *   **Shared Memory:** A region of memory is shared by cooperating processes. This is the fastest IPC method as data doesn't need to be copied.
    *   **Message Passing:** Processes communicate by sending and receiving messages without sharing the same address space. It is safer but slower than shared memory.
    *   **Pipes:** A simple communication channel where one process writes data and another reads it.

### **Critical Section Problem**

The Critical Section Problem arises when multiple processes need to access a shared resource or a shared piece of code. The part of the program where the shared resource is accessed is called the **critical section**.

*   **The Problem:** If multiple processes execute inside their critical sections simultaneously, it can lead to incorrect behavior or data corruption due to a race condition.
*   **The Goal:** To design a protocol that allows processes to cooperate without conflicting. Only one process should be allowed to execute in its critical section at any given time.
*   **Example:** Two processes trying to update the same bank account balance at the same time.

### **Requirements: Mutual Exclusion, Progress, Bounded Waiting**

A valid solution to the critical section problem must satisfy three essential requirements:

1.  **Mutual Exclusion:** If a process is executing in its critical section, then no other processes can be executing in their critical sections. This is the most fundamental requirement.
2.  **Progress:** If no process is in its critical section and some processes wish to enter, then the selection of the next process to enter cannot be postponed indefinitely. The decision must be made.
3.  **Bounded Waiting:** There must be a limit on the number of times that other processes are allowed to enter their critical sections after a process has made a request to enter its critical section and before that request is granted. This ensures that no process starves.

### **Race Conditions**

A race condition is an undesirable situation that occurs when a device or system attempts to perform two or more operations at the same time, but because of the nature of the device or system, the operations must be done in the proper sequence to be done correctly.

*   **In OS:** It happens when multiple processes or threads access and manipulate shared data concurrently, and the final outcome of the data depends on the particular order in which the access takes place.
*   **Example:** Consider a shared variable `counter`. If two processes both try to execute `counter++`, they might both read the value, both increment it, and both write it back, resulting in the counter only being incremented once instead of twice.

### **Hardware Solutions for Mutual Exclusion**

To solve the critical section problem, some systems provide special hardware instructions that are **atomic**, meaning they execute as a single, uninterruptible unit.

*   **Test-and-Set Instruction:** This instruction tests a memory word and sets its value in a single, atomic operation. It can be used to implement a simple lock. A process can enter its critical section only if it successfully "sets" the lock from false to true.
*   **Compare-and-Swap (CAS) Instruction:** This instruction atomically compares the content of a memory location with a given value and, only if they are the same, modifies the contents of that memory location to a new given value.
*   **Advantage:** These can be used to build synchronization primitives without complex software.
*   **Disadvantage:** They often lead to **busy waiting**, where a process wastes CPU cycles repeatedly checking a lock.

### **Strict Alternation**

Strict Alternation is a simple software-based solution to the critical section problem for two processes. It uses a shared turn variable to ensure that the two processes take turns entering their critical section.

*   **How it works:** A shared variable `turn` is initialized to 0 or 1. If `turn == 0`, process P0 can enter its critical section. After it exits, it sets `turn = 1`, allowing P1 to enter.
*   **Analysis:**
    *   It guarantees **mutual exclusion**.
    *   It violates the **progress** requirement. If P0 finishes its critical section and sets `turn = 1`, P1 is now allowed to enter. But if P1 doesn't need to enter its critical section, P0 is blocked from entering again, even though no process is in the critical section.

### **Peterson’s Solution**

Peterson's Solution is a classic software-based solution to the critical section problem for two processes. It elegantly combines the ideas of a turn variable and interest flags.

*   **How it works:** It uses two shared variables:
    *   `int turn;` // Indicates whose turn it is to enter.
    *   `boolean flag[2];` // `flag[i] = true` means process `Pi` is ready to enter.
*   A process `Pi` indicates its interest by setting `flag[i] = true` and then sets `turn = j` (giving the other process a chance). It then waits until either `flag[j]` is false or `turn == i`.
*   **Analysis:** It satisfies all three requirements for a correct solution: **mutual exclusion, progress, and bounded waiting**. It is a significant theoretical solution, though modern computer architectures can make its direct implementation tricky.

### **Producer–Consumer Problem**

The Producer-Consumer Problem (or Bounded-Buffer Problem) is a classic example of a multi-process synchronization problem.

*   **The Scenario:** There are two types of processes: a **Producer** and a **Consumer**, who share a common, fixed-size buffer.
    *   The Producer's job is to generate data and put it into the buffer.
    *   The Consumer's job is to take data out of the buffer and consume it.
*   **The Problem:**
    *   The producer must not try to add data to the buffer if it is full.
    *   The consumer must not try to remove data from the buffer if it is empty.
    *   Access to the buffer must be mutually exclusive to avoid race conditions.
*   **Solution:** This problem is typically solved using synchronization tools like semaphores or monitors.

### **Semaphores: Definition**

A semaphore is a synchronization tool used to manage concurrent processes' access to a common resource in a parallel programming environment. It is a simple integer variable.

*   **Core Idea:** It acts as a counter for a set of available resources.
*   **Operations:** A semaphore `S` can only be accessed via two standard atomic operations:
    1.  `wait(S)` or `P(S)`: Decrements the semaphore value. If the value becomes negative, the process executing the wait is blocked.
    2.  `signal(S)` or `V(S)`: Increments the semaphore value. If the value is not positive, a process blocked by a wait operation is unblocked.
*   These operations ensure that a process can only access a resource if the semaphore count is positive.

### **Semaphores: Binary and Counting Semaphores**

There are two main types of semaphores, based on the range of values the integer variable can take.

*   **Counting Semaphore:**
    *   The value can range over an unrestricted domain.
    *   It is used to control access to a resource that has multiple instances. The semaphore is initialized to the number of available resources. Each time a process uses a resource, it performs a `wait()`, and when it releases it, it performs a `signal()`.
*   **Binary Semaphore (or Mutex):**
    *   The value can only be 0 or 1.
    *   It is simpler to implement and is used to provide **mutual exclusion**. It acts like a lock. If the semaphore is 1, a process can acquire it (setting it to 0) and enter its critical section. If it's 0, the process must wait.

### **Semaphores: wait() and signal()**

`wait()` and `signal()` are the two fundamental, atomic operations performed on a semaphore. They are used to implement process synchronization.

*   **`wait(S)` operation (also called P operation):**
    *   This operation is used to acquire a resource.
    *   It first decrements the value of semaphore `S`.
    *   If the resulting value of `S` is less than 0, the process that called `wait()` is blocked and placed into the semaphore's waiting queue.
    *   `wait(S) { S.value--; if (S.value < 0) block(); }`
*   **`signal(S)` operation (also called V operation):**
    *   This operation is used to release a resource.
    *   It first increments the value of semaphore `S`.
    *   If the resulting value of `S` is less than or equal to 0, it means there are processes waiting, so one process is woken up from the waiting queue.
    *   `signal(S) { S.value++; if (S.value <= 0) wakeup(P); }`

### **Semaphores: Busy waiting issue**

A common but inefficient way to implement semaphores is with **busy waiting**. This is where a process, instead of blocking, continuously checks the semaphore's value in a loop until it can proceed.

*   **The Problem:** This type of implementation is called a **spinlock**. While the process is "waiting," it is still consuming CPU cycles by executing the loop. This is extremely wasteful, especially on a single-processor system where the waiting process is preventing other useful work from being done.
*   **Solution:** A better implementation blocks the waiting process. The process is put into a waiting queue associated with the semaphore and its state is changed to waiting. The CPU can then be given to another process. The process is woken up later by a `signal()` operation.

### **Event Counters**

An event counter is a synchronization variable that is used to record the occurrence of events. It is an integer that can only be incremented.

*   **Operations:**
    *   `advance(E)`: Atomically increments the event counter `E` to signal that an event has occurred.
    *   `read(E)`: Returns the current value of the event counter `E`.
    *   `await(E, v)`: Causes the calling process to block until the value of event counter `E` is greater than or equal to `v`.
*   **Usage:** They are useful for situations where a process needs to wait for a certain number of events to happen before it can proceed. For example, a consumer process might `await` for the producer to `advance` the counter a certain number of times.

### **Monitors: Concept and Use**

A monitor is a high-level synchronization construct that provides a more structured and less error-prone way to achieve mutual exclusion compared to semaphores.

*   **Concept:** A monitor is a programming language construct (like a class) that encapsulates shared data and the procedures that operate on that data.
    *   **Mutual Exclusion:** Only one process can be active within the monitor at any given time. This is automatically handled by the compiler, which simplifies programming.
    *   **Condition Variables:** Monitors use **condition variables** to allow processes to wait for certain conditions to become true inside the monitor. A process can `wait()` on a condition, which releases the monitor lock. Another process can later `signal()` the condition, which wakes up a waiting process.
*   **Use:** They are used to solve complex synchronization problems like the Producer-Consumer or Readers-Writers problems in a safe and structured manner.

### **Message Passing (Direct and Indirect Communication)**

Message passing is an IPC mechanism where processes communicate with each other by sending and receiving messages, without sharing memory.

*   **Mechanism:** The OS provides two basic primitives: `send(destination, message)` and `receive(source, message)`.
*   **Direct Communication:**
    *   The sender and receiver must explicitly name each other. For example, `send(P, message)` sends a message to process P.
    *   It creates a direct link between two specific processes.
*   **Indirect Communication:**
    *   Messages are sent to and received from **mailboxes** (or ports), which are shared message queues.
    *   Multiple processes can communicate through the same mailbox. A process can send a message to a mailbox, and another process can pick it up.
    *   This is more flexible as it decouples the sender and receiver.

### **Classical IPC Problems: Readers–Writers Problem**

The Readers-Writers Problem is a classic synchronization problem that models access to a shared database or file.

*   **The Scenario:** There are two types of processes, **Readers** and **Writers**, that want to access a shared data resource.
    *   **Readers:** Only read the data; they do not perform any updates.
    *   **Writers:** Can both read and write the data.
*   **The Rules:**
    1.  Multiple readers can access the shared resource at the same time.
    2.  Only one writer can access the shared resource at any given time.
    3.  If a writer is accessing the resource, no reader can access it.
*   **Variations:** The challenge is to design a solution that is fair and avoids starvation (e.g., preventing writers from being starved by a continuous stream of readers).

### **Classical IPC Problems: Dining Philosophers Problem**

The Dining Philosophers Problem is a classic synchronization problem used to illustrate the challenges of avoiding deadlock.

*   **The Scenario:** Five philosophers are sitting around a circular table. In the center of the table is a bowl of rice, and between each pair of adjacent philosophers is a single chopstick.
*   **The Rules:**
    *   A philosopher must pick up both their left and right chopsticks to eat.
    *   They can only pick up one chopstick at a time.
    *   When they are done eating, they put both chopsticks down.
*   **The Problem:** If all philosophers pick up their left chopstick simultaneously, they will all be waiting for their right chopstick, which is held by their neighbor. This creates a **deadlock**, and no one can eat. The challenge is to design a protocol that allows the philosophers to eat without deadlocking.

---

### **UNIT 4 — Deadlocks**

### **Definition of Deadlock**

A deadlock is a situation where a set of two or more processes are permanently blocked, each holding a resource and waiting to acquire a resource held by another process in the same set.

*   **Analogy:** Imagine two people on a narrow staircase. One wants to go up, and the other wants to go down. Neither is willing to step back. They are both blocked and will wait forever. This is a deadlock.
*   **In OS:** A process might be holding onto a printer and waiting for a scanner, while another process is holding the scanner and waiting for the printer. Neither can proceed. Deadlock is a permanent state that the OS must handle.

### **Necessary and Sufficient Conditions for Deadlock**

For a deadlock to occur, four conditions must hold simultaneously in a system. These are known as the Coffman conditions.

1.  **Mutual Exclusion:** At least one resource must be held in a non-sharable mode. Only one process can use the resource at a time.
2.  **Hold and Wait:** A process must be holding at least one resource and waiting to acquire additional resources that are currently being held by other processes.
3.  **No Preemption:** Resources cannot be forcibly taken away from a process. A resource can only be released voluntarily by the process holding it.
4.  **Circular Wait:** There must exist a set of waiting processes {P0, P1, ..., Pn} such that P0 is waiting for a resource held by P1, P1 is waiting for a resource held by P2, ..., and Pn is waiting for a resource held by P0.

### **Resource Allocation Graph (RAG)**

A Resource Allocation Graph (RAG) is a directed graph used to model the state of resource allocation in a system and to detect deadlocks.

*   **Components:**
    *   **Vertices:** The graph has two types of vertices:
        *   **Processes (P):** Represented by circles.
        *   **Resource Types (R):** Represented by squares. Dots inside the square represent instances of the resource.
    *   **Edges:** The graph has two types of directed edges:
        *   **Request Edge:** An edge from a process to a resource (P → R) indicates that the process has requested an instance of that resource.
        *   **Assignment Edge:** An edge from a resource to a process (R → P) indicates that an instance of the resource has been allocated to the process.
*   **Deadlock Detection:** If the graph contains a **cycle**, a deadlock may exist. If each resource type has only one instance, a cycle is a necessary and sufficient condition for deadlock.

### **Safe and Unsafe States**

These concepts are used in deadlock avoidance to determine if granting a resource request is safe.

*   **Safe State:** A system is in a safe state if there exists a sequence of process executions (a **safe sequence**) that allows all processes to complete their work. In a safe state, the OS can guarantee that deadlock will not occur. Even if all processes suddenly request their maximum resources, there is a way to satisfy them one by one.
*   **Unsafe State:** A system is in an unsafe state if no such safe sequence exists. An unsafe state does not guarantee a deadlock will happen, but it means a deadlock *might* happen if processes make a particular sequence of requests.
*   **Goal of Deadlock Avoidance:** To ensure the system never enters an unsafe state.

### **Deadlock Prevention**

Deadlock prevention is a set of methods for ensuring that at least one of the four necessary conditions for deadlock cannot hold. By preventing one of the conditions, we can prevent deadlocks from ever occurring.

*   **Breaking Mutual Exclusion:** Not always possible, as some resources like printers are inherently non-sharable.
*   **Breaking Hold and Wait:**
    1.  Require a process to request all its resources before it begins execution. (Poor resource utilization).
    2.  Allow a process to request resources only when it has none.
*   **Breaking No Preemption:** If a process holding resources requests another resource that cannot be immediately allocated, it must release all its current resources.
*   **Breaking Circular Wait:** Impose a total ordering on all resource types and require that each process requests resources in an increasing order of enumeration.

### **Deadlock Avoidance**

Deadlock avoidance is a more flexible approach than prevention. Here, the OS is given advance information about the maximum number of resources each process might request. The OS then uses this information to decide whether granting a request is safe or not.

*   **Mechanism:** When a process requests a resource, the system checks if allocating that resource would leave the system in a **safe state**.
*   **Algorithm:** The decision is made using an algorithm like the **Banker's Algorithm**.
*   **Difference from Prevention:** Prevention uses broad rules to make deadlocks structurally impossible. Avoidance uses real-time information to make decisions on-the-fly, allowing for better resource utilization.

### **Banker’s Algorithm (Concept + Theory)**

The Banker's Algorithm is a deadlock avoidance algorithm. It is named so because it models how a bank would not grant loans that it cannot safely cover.

*   **Concept:** Before granting a resource request, the algorithm simulates the allocation. It checks if there is at least one possible sequence (a **safe sequence**) in which all processes can finish their execution. If such a sequence exists, the system is in a **safe state**, and the request can be granted. If not, the system would enter an **unsafe state**, so the requesting process must wait.
*   **Data Structures Needed:**
    *   **Max:** Maximum number of resources of each type that each process may need.
    *   **Allocation:** Number of resources currently allocated to each process.
    *   **Need:** Remaining resources needed by each process (Max - Allocation).
    *   **Available:** Number of available resources in the system.

### **Deadlock Detection (Detection Algorithm)**

If a system does not use deadlock prevention or avoidance, then deadlocks may occur. In this case, the system needs an algorithm to detect if a deadlock has occurred.

*   **Algorithm:**
    1.  The algorithm maintains information about the current resource allocations and requests.
    2.  It works similarly to the Banker's Algorithm's safety check. It looks for a sequence of processes that can finish given the currently available resources.
    3.  If, after the algorithm runs, there are any processes that are marked as "unfinished," it means these processes are part of a deadlock.
*   **When to run it:** The detection algorithm can be run periodically or whenever a resource request is denied. Running it frequently is costly, but running it infrequently means a deadlock may persist for a long time.

### **Deadlock Recovery: Process termination**

Once a deadlock has been detected, the system must recover from it. One of the simplest ways to break a deadlock is to terminate one or more of the processes involved.

*   **Methods:**
    1.  **Abort all deadlocked processes:** This is a drastic approach that is guaranteed to break the deadlock but involves losing a lot of computation.
    2.  **Abort one process at a time:** The system can abort one process in the deadlock cycle and then re-run the deadlock detection algorithm. This is more targeted but adds overhead.
*   **Choosing a victim:** Deciding which process to terminate is difficult. Factors to consider include the process's priority, how long it has been running, and how many resources it holds.

### **Deadlock Recovery: Resource preemption**

Another way to recover from a deadlock is to preempt (forcibly take away) resources from some processes and give them to other processes until the deadlock cycle is broken.

*   **Issues to address:**
    1.  **Selecting a victim:** We must decide which process and which resources to preempt. This decision should minimize the cost.
    2.  **Rollback:** If a resource is preempted from a process, that process cannot continue from its current state. It must be rolled back to some earlier safe state and restarted from there. This can be complex to implement.
    3.  **Starvation:** We must ensure that the same process is not always chosen as the victim, which could lead to it never completing its work.

### **Deadlock Recovery: Rollback**

Rollback is a crucial part of deadlock recovery, especially when using resource preemption. When a resource is taken from a process, the process is returned to a previous safe state.

*   **Concept:** The system periodically saves the state of a process, known as a **checkpoint**. When a deadlock occurs and a process is chosen as a victim for resource preemption, the OS can "roll back" the process to its most recent checkpoint.
*   **Challenges:**
    *   Determining what constitutes a "safe state" to roll back to can be difficult.
    *   The process of checkpointing itself creates overhead.
*   This approach is common in database systems to handle transaction failures, but it is complex to implement in a general-purpose operating system.

### **Starvation and Livelock**

Starvation and Livelock are two other process-related problems, often discussed alongside deadlock.

*   **Starvation (or Indefinite Blocking):**
    *   This is a situation where a process is ready to run but is continuously overlooked by the scheduler. For example, in a priority-based scheduling system, a low-priority process might never get the CPU if there is a constant stream of high-priority processes.
    *   It is different from deadlock because the process is not blocked holding a resource; it is just never chosen to run.
*   **Livelock:**
    *   This occurs when processes are not blocked but are still not making any progress. They are actively changing their state in response to each other's actions, but in a way that prevents any useful work from being done.
    *   **Analogy:** Two people trying to pass in a hallway. Both step aside to let the other pass, but they both step in the same direction, and they repeat this "polite" dance forever.

---

### **UNIT 5 — Memory Management**

### **Basics of Memory Management**

Memory management is one of the core functions of an operating system. It involves managing the computer's main memory (RAM) to ensure it is used efficiently.

*   **Key Responsibilities:**
    *   **Keeping Track:** The OS must keep track of which parts of memory are currently in use and by which process.
    *   **Allocation:** Deciding which processes (or parts of processes) get memory and when they get it.
    *   **Deallocation:** Reclaiming the memory when a process terminates or no longer needs it, making it available for other processes.
*   **Goal:** To allocate memory to multiple processes in a way that maximizes memory utilization and provides a good level of performance.

### **Logical vs Physical Address**

An operating system uses a two-level address scheme to manage memory and provide protection.

*   **Logical Address (or Virtual Address):**
    *   This is an address generated by the CPU.
    *   It is the address that a program "sees." Each process has its own separate logical address space, starting from 0.
    *   This allows a program to be written without knowing where it will be loaded in physical memory.
*   **Physical Address:**
    *   This is the actual address in the main memory (RAM).
    *   The **Memory Management Unit (MMU)**, a hardware device, is responsible for translating the logical address into a physical address at runtime.

### **Memory Allocation Methods: Contiguous Allocation**

Contiguous memory allocation is one of the earliest memory allocation schemes. In this method, each process is contained in a single, contiguous block of physical memory.

*   **How it works:** When a process needs to be loaded, the OS looks for a block of free memory large enough to hold the entire process.
*   **Types:**
    *   **Fixed Partition Allocation:** Memory is divided into fixed-size partitions.
    *   **Variable Partition Allocation:** The partitions are not fixed; a partition is created to be the exact size of the process.
*   **Main Problem:** It suffers from fragmentation (both internal and external), which leads to wasted memory.

### **Fixed Partition Allocation**

In Fixed Partition Allocation, the main memory is divided into a number of static (fixed-size) partitions at system generation time.

*   **Mechanism:** When a process arrives, it is put into a queue for the smallest partition that is large enough to hold it.
*   **Partition Sizes:** The partitions can be of equal or unequal sizes.
*   **Disadvantage:** This scheme suffers from **internal fragmentation**. If a process is smaller than the partition it is placed in, the leftover space within the partition is wasted because it cannot be allocated to another process.
*   **Limitation:** The degree of multiprogramming is limited by the number of partitions.

### **Variable Partition Allocation**

In Variable Partition Allocation, the operating system keeps a table indicating which parts of memory are available and which are occupied. The partitions are created dynamically.

*   **Mechanism:** When a process arrives, the OS searches for a free block of memory (a "hole") that is large enough for the process. If the hole is larger than the process, it is split into two parts: one for the process and one that becomes a new, smaller hole.
*   **Advantage:** It avoids internal fragmentation because the partition is the exact size of the process.
*   **Disadvantage:** It suffers from **external fragmentation**, where there is enough total free memory to satisfy a request, but it is not contiguous; it is fragmented into many small, non-contiguous holes.

### **Internal Fragmentation**

Internal fragmentation occurs when memory is divided into fixed-size blocks (partitions or pages), and a process is allocated a block that is larger than what it actually needs.

*   **Cause:** The memory allocation policy allocates a fixed-size block, and the process's memory requirement is not a perfect multiple of that block size.
*   **Example:** In a fixed partitioning scheme, if a 20KB process is loaded into a 32KB partition, 12KB of memory inside that partition is wasted. This wasted space is "internal" to the allocated partition and cannot be used by any other process.
*   **Where it occurs:** Fixed partition allocation and paging.

### **External Fragmentation**

External fragmentation occurs when there is enough total free memory in the system to satisfy a request, but the free memory is not contiguous. It is scattered in small, non-contiguous blocks.

*   **Cause:** It happens in systems with dynamic memory allocation, like variable partition allocation, after a series of loading and unloading processes. This creates small "holes" of free memory between allocated blocks.
*   **Example:** The system might have 50KB of total free memory, but it's available as one 20KB block and one 30KB block. If a process needs 40KB of contiguous memory, it cannot be loaded, even though there is enough total memory.
*   **Where it occurs:** Variable partition allocation and segmentation.

### **Compaction**

Compaction is the solution to the problem of external fragmentation. It involves shuffling the memory contents to place all free memory together into one large block.

*   **How it works:** The OS moves all the occupied blocks of memory to one end of memory. This consolidates all the small holes into one large, contiguous free block.
*   **Disadvantage:** Compaction is a very time-consuming process because it requires moving large amounts of data. It also requires the system to stop all other processing while it is happening.
*   **Requirement:** It is only possible if relocation is dynamic and done at execution time (i.e., addresses can be changed while the process is running).

### **Paging: Concept**

Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. It solves the problem of external fragmentation.

*   **Concept:**
    *   **Physical Memory** is divided into fixed-size blocks called **frames**.
    *   **Logical Memory** (the process's address space) is divided into blocks of the same size called **pages**.
*   **Mechanism:** When a process is to be executed, its pages are loaded into any available frames from anywhere in physical memory. The pages of a process do not need to be in contiguous frames. The OS keeps track of the mapping between pages and frames using a **page table**.

### **Paging: Page Allocation**

Page allocation refers to the process of loading the pages of a program into the frames of physical memory.

*   **Mechanism:** The operating system maintains a **free-frame list**, which is a list of all the frames that are not currently allocated to any process.
*   **Loading a Process:** When a process needs to be loaded, the OS allocates the required number of frames from the free-frame list. For each page of the process, it allocates a frame and updates the process's page table with the corresponding frame number.
*   **No External Fragmentation:** Since any free frame can be allocated to any page, there is no external fragmentation. However, there can be a small amount of internal fragmentation in the last page of a process.

### **Paging: Page Table**

A page table is a data structure used by the virtual memory system to store the mapping between the logical addresses (pages) of a process and their corresponding physical addresses (frames).

*   **Structure:** Each process has its own page table. The page table is an array where the index is the **page number**, and the entry at that index is the **frame number** where that page is stored in physical memory.
*   **Role in Address Translation:** When the CPU generates a logical address, the MMU splits it into a page number (p) and an offset (d).
    1.  The page number (p) is used as an index into the page table to find the base address of the frame.
    2.  This frame base address is combined with the offset (d) to form the final physical address.

### **Paging: Hardware Support**

Paging requires dedicated hardware support from the Memory Management Unit (MMU) to perform the address translation efficiently.

*   **Page Table Base Register (PTBR):** The CPU has a special register, the PTBR, which holds the starting address of the page table for the currently running process.
*   **Translation Lookaside Buffer (TLB):** Accessing the page table in main memory for every address translation is slow. To speed this up, a special, fast-lookup hardware cache called the TLB is used. The TLB stores recently used page-to-frame mappings. When an address needs to be translated, the hardware first checks the TLB. If a match (**TLB hit**) is found, the translation is very fast. If not (**TLB miss**), the page table is consulted, and the mapping is added to the TLB.

### **Paging: Protection and Sharing**

Paging provides mechanisms for both protecting and sharing memory between processes.

*   **Protection:** Protection is implemented by associating protection bits with each entry in the page table. Common bits include:
    *   **Read/Write/Execute bits:** Control whether a page can be read from, written to, or executed.
    *   **Valid/Invalid bit:** A 'valid' bit indicates that the associated page is in the process's logical address space. An 'invalid' bit indicates it is not. This prevents a process from accessing memory outside its own address space.
*   **Sharing:** Paging allows for easy sharing of common code. For example, multiple processes running the same editor can share a single copy of the editor's code pages in memory. Each process would have its own page table, but the entries for the shared code pages would point to the same physical frames.

### **Segmentation (if required by curriculum)**

Segmentation is a memory management scheme that supports the user's view of memory. A program is a collection of logical units like a main program, procedures, functions, and data structures. Segmentation views a program as a collection of these segments.

*   **Concept:** The logical address space is a collection of segments. Each segment has a name and a length.
*   **Address Translation:** A logical address consists of two parts: a **segment number** and an **offset** within that segment. The mapping is done using a **segment table**, which contains the base address and limit (length) of each segment.
*   **Advantages:** It provides better protection and sharing capabilities at a logical level (e.g., you can protect a whole function).
*   **Disadvantage:** It suffers from external fragmentation as segments are of variable sizes.

### **Paged Segmentation (hybrid model)**

Paged Segmentation is a hybrid memory management scheme that combines the features of both paging and segmentation. It tries to get the best of both worlds: the logical separation of segmentation and the physical memory management advantages of paging.

*   **How it works:**
    1.  The user's address space is broken down into logical segments.
    2.  Each of these segments is then further broken down into fixed-size pages.
*   **Address Translation:** A logical address is composed of a segment number, a page number, and an offset. The translation requires both a segment table and page tables for each segment.
*   **Benefit:** It eliminates external fragmentation (because memory is managed in frames) while still providing the logical protection and sharing benefits of segmentation.

### **Virtual Memory: Concept**

Virtual Memory is a memory management technique that allows a process to have a very large logical address space, which can be much larger than the physical memory available.

*   **Core Idea:** It creates the illusion that the system has a very large main memory. It does this by keeping only the necessary parts of a program in the main memory and the rest on the disk.
*   **Mechanism:** It is usually implemented using **demand paging**. Pages of a process are brought into main memory only when they are needed (on demand).
*   **Benefits:**
    *   Allows programs larger than physical memory to run.
    *   Increases the degree of multiprogramming because less memory is needed for each process.
    *   Makes programming simpler, as the programmer doesn't have to worry about physical memory limits.

### **Virtual Memory: Demand Paging**

Demand Paging is the most common method for implementing virtual memory. It is a form of lazy loading where a page is brought into main memory only when it is actually needed.

*   **How it works:** When a process starts, the OS loads none of its pages into memory. The page table is set up to indicate that all pages are on the disk.
*   **Page Fault:** When the process tries to access a page that is not in memory, the MMU hardware traps to the OS. This event is called a **page fault**.
*   **Handling a Page Fault:** The OS handles the page fault by:
    1.  Finding the required page on the disk.
    2.  Finding a free frame in memory.
    3.  Loading the page from the disk into the free frame.
    4.  Updating the page table to reflect the new mapping.
    5.  Restarting the instruction that caused the fault.

### **Virtual Memory: Page Fault**

A page fault is an exception (or trap) that is generated by the memory management unit (MMU) when a running program tries to access a page that is mapped in the virtual address space but is not loaded into physical memory.

*   **Is it an error?** A page fault is not an error. It is a normal event in a demand-paged system. It is the mechanism that tells the operating system it needs to load a required page from the disk into memory.
*   **The Process:** The hardware trap transfers control to the operating system's page fault handler, which then orchestrates loading the required page. The entire process is transparent to the user program, which simply resumes execution after the page is loaded.

### **Virtual Memory: Dirty Page / Dirty Bit**

A dirty bit, also known as a modify bit, is a hardware bit associated with each frame in memory. It is used to optimize page replacement.

*   **How it works:** When a page is loaded into a frame, its dirty bit is set to 0. If the CPU writes to any part of that page, the hardware automatically sets the dirty bit to 1.
*   **Purpose:** When the OS needs to replace a page in memory, it checks the dirty bit.
    *   If the dirty bit is 0, it means the page has not been modified since it was loaded from the disk. The OS can simply overwrite this frame with the new page.
    *   If the dirty bit is 1 (the page is "dirty"), it means the page has been modified. The OS must first write this page back to the disk to save the changes before replacing it. This avoids unnecessary disk I/O.

### **Locality of Reference**

Locality of Reference is a principle that describes the tendency of a processor to access the same set of memory locations repetitively over a short period of time. It is a key reason why virtual memory and caching are effective.

*   **Types of Locality:**
    1.  **Temporal Locality:** If a memory location is referenced, it is likely to be referenced again soon. (e.g., variables in a loop).
    2.  **Spatial Locality:** If a memory location is referenced, nearby memory locations are likely to be referenced soon. (e.g., accessing elements of an array sequentially).
*   **Importance:** Demand paging works well because of locality. When a page is brought into memory, it is likely that the program will access other data on that same page soon (spatial locality).

### **Working Set Model**

The Working Set Model is a concept in virtual memory management based on the principle of locality of reference. A process's "working set" is the set of pages that it is actively using at a given point in time.

*   **Concept:** For a process to run efficiently, its entire working set should be in main memory. If it is not, the process will generate a large number of page faults, a condition known as **thrashing**.
*   **Implementation:** The OS monitors the pages referenced by a process over a recent time interval (called the working-set window, Δ). The set of pages referenced during this window is the working set.
*   **Usage:** The OS can use the working set size to decide on the degree of multiprogramming. If the total size of all working sets exceeds the available physical memory, the OS might suspend a process to prevent thrashing.

### **Page Replacement Algorithms: Optimal**

The Optimal Page Replacement algorithm is the best possible page replacement algorithm. It has the lowest page-fault rate of all algorithms.

*   **Algorithm:** When a page needs to be replaced, this algorithm replaces the page that will **not be used for the longest period of time in the future**.
*   **Implementation:** It is impossible to implement in a real system because it requires future knowledge of the program's memory access pattern.
*   **Purpose:** It is used mainly for **comparison and analysis**. It serves as a benchmark against which other real-world algorithms (like LRU and FIFO) can be measured to see how well they perform.

### **Page Replacement Algorithms: FIFO**

The First-In, First-Out (FIFO) page replacement algorithm is the simplest page replacement algorithm.

*   **Algorithm:** When a page must be replaced, the oldest page in memory is chosen. The OS keeps track of all the pages in memory in a queue, with the newest page at the back and the oldest at the front.
*   **Implementation:** It is very easy to implement using a simple queue.
*   **Disadvantage:** It performs poorly in practice because the oldest page might be a very frequently used page (e.g., containing an important variable). It also suffers from **Belady's Anomaly**, where increasing the number of available frames can sometimes increase the number of page faults.

### **Page Replacement Algorithms: Second Chance (SC)**

The Second-Chance algorithm is a modified version of FIFO that improves its performance by giving an "old" page a second chance before it is replaced.

*   **Mechanism:** It uses a **reference bit** associated with each page. When a page is referenced, its reference bit is set to 1.
*   **Algorithm:** When a page needs to be replaced, the algorithm looks at the oldest page (the front of the FIFO queue).
    *   If its reference bit is 0, the page is replaced.
    *   If its reference bit is 1, it is given a second chance. The bit is reset to 0, and the page is moved to the back of the queue as if it were a new page. The algorithm then moves on to the next page in the queue.
*   It is a simple approximation of the LRU algorithm.

### **Page Replacement Algorithms: NRU (Not Recently Used)**

The Not Recently Used (NRU) page replacement algorithm selects a page at random from the category of pages that have not been used recently.

*   **Mechanism:** It uses two hardware bits for each page: a **reference bit (R)** and a **modify/dirty bit (M)**.
    *   R is set to 1 when the page is referenced.
    *   M is set to 1 when the page is modified.
*   **Algorithm:** Periodically, the R bit is cleared. When a page must be replaced, the algorithm divides pages into four classes based on (R, M) and picks a random page from the lowest-numbered non-empty class:
    1.  Class 0: (0, 0) – not referenced, not modified.
    2.  Class 1: (0, 1) – not referenced, modified.
    3.  Class 2: (1, 0) – referenced, not modified.
    4.  Class 3: (1, 1) – referenced, modified.

### **Page Replacement Algorithms: LRU**

The Least Recently Used (LRU) page replacement algorithm is an excellent approximation of the Optimal algorithm and performs very well in practice.

*   **Algorithm:** When a page needs to be replaced, LRU chooses the page that has not been used for the longest period of time. It is based on the idea that pages that have been heavily used in the recent past are likely to be used again in the near future.
*   **Implementation:**
    *   **Counter:** Associate a timestamp with every page entry. The page with the smallest timestamp is the LRU page. (High overhead).
    *   **Stack:** Keep a stack of page numbers. Whenever a page is referenced, move it to the top of the stack. The page at the bottom is the LRU page.
*   It does not suffer from Belady's Anomaly.

### **TLB (Translation Lookaside Buffer)**

A Translation Lookaside Buffer (TLB) is a memory cache that is part of the CPU's memory management unit (MMU). It is used to speed up the translation of logical addresses to physical addresses.

*   **Function:** The TLB stores a small number of recent page-to-frame mappings from the page table.
*   **How it works:** When a logical address is generated, the MMU first checks the TLB.
    *   **TLB Hit:** If the page number is found in the TLB, the corresponding frame number is retrieved immediately, and the physical address is formed. This is very fast.
    *   **TLB Miss:** If the page number is not in the TLB, a more expensive lookup in the main memory page table is required. The mapping is then added to the TLB for future use.
*   The high hit rate of the TLB is due to the principle of locality of reference.

### **Swapping**

Swapping is a memory management technique where an entire process can be temporarily swapped out of main memory to a backing store (like a hard disk) and then brought back into memory for continued execution.

*   **Purpose:** It is used to manage the degree of multiprogramming. If memory is full and a higher-priority process needs to be loaded, a lower-priority process can be swapped out to free up space.
*   **Mechanism:** The **medium-term scheduler** typically handles swapping.
*   **Overhead:** Swapping is a very slow process because it involves large data transfers to and from the disk.
*   **Modern Systems:** Traditional swapping of entire processes is less common now. A modified version is used in demand paging, where individual pages are "swapped" in and out, rather than entire processes.

### **Belady’s Anomaly**

Belady's Anomaly is a phenomenon observed in some page replacement algorithms, most notably FIFO. It is a situation where increasing the number of frames allocated to a process can, paradoxically, increase the number of page faults.

*   **Why it happens:** In FIFO, the age of a page is the key factor for replacement, not its usage pattern. It is possible for a memory access pattern to be such that with more frames, a frequently needed page gets pushed out just before it is needed again, whereas with fewer frames it might have remained.
*   **Significance:** This is counter-intuitive and undesirable. Algorithms like LRU and Optimal do not suffer from Belady's Anomaly; for them, more frames will always result in an equal or lower number of page faults.

---

### **UNIT 6 — I/O Systems, Disk Management & File Systems**

### **I/O Hardware: I/O Devices**

I/O (Input/Output) devices are hardware components that allow a computer to communicate with the outside world and to store data. They are managed by the operating system.

*   **Classification:**
    *   **Human-Readable:** Devices that communicate with the user (e.g., keyboard, mouse, display screen, printer).
    *   **Machine-Readable:** Devices that communicate with electronic equipment (e.g., disk drives, sensors, network interface cards).
    *   **Communication:** Devices for communicating with remote devices (e.g., modems, network adapters).
*   **Key Components:** Each I/O device consists of a mechanical component (the device itself) and an electronic component (the device controller).

### **I/O Hardware: Device Controllers**

A device controller is a hardware unit that acts as an interface between an I/O device and the computer's system bus. It translates commands from the CPU into device-specific signals.

*   **Role:** The CPU does not directly control I/O devices. Instead, it issues high-level commands to the device controller (e.g., "read block 500"). The controller then takes care of the low-level details of operating the device.
*   **Components:** A controller has its own local buffer (for data storage) and special-purpose registers for commands, status, and data.
*   **Example:** A disk controller manages the hard disk, handling tasks like head movement and data transfer.

### **I/O Hardware: Direct Memory Access (DMA)**

Direct Memory Access (DMA) is a feature of computer systems that allows certain high-speed I/O devices to transfer data directly to or from main memory, without involving the CPU.

*   **Purpose:** To reduce the CPU's workload. For large data transfers (like from a disk), it is inefficient for the CPU to manage the transfer one byte at a time (this is called programmed I/O).
*   **How it works:**
    1.  The CPU sets up the DMA transfer by telling the DMA controller the source address, destination address, and the number of bytes to transfer.
    2.  The DMA controller then manages the entire transfer directly.
    3.  Once the transfer is complete, the DMA controller sends an interrupt to the CPU.

### **I/O Software Goals**

The I/O software in an operating system is typically organized in layers. The goals of this software are to manage I/O operations and devices efficiently and consistently.

*   **Device Independence:** Programs should be able to access any I/O device without having to specify the device in advance. For example, a program that reads input should work whether the input comes from a keyboard, a file, or a network socket.
*   **Uniform Naming:** The name of a file or a device should be a simple string or an integer and should not depend on the device itself.
*   **Error Handling:** Errors should be handled as close to the hardware as possible and should generally be transparent to higher-level software.
*   **Efficiency:** The I/O system should be efficient, especially for devices like disks where performance is critical.

### **Interrupt Handlers**

An interrupt handler, also known as an Interrupt Service Routine (ISR), is a piece of code in the operating system that is responsible for handling a specific interrupt.

*   **Function:** When an I/O device completes an operation or an error occurs, it generates an interrupt signal to the CPU. The CPU stops what it is doing, saves its current state, and jumps to the address of the appropriate interrupt handler.
*   **Process:**
    1.  The handler determines the cause of the interrupt.
    2.  It performs the necessary processing (e.g., transferring data from a device controller buffer to memory).
    3.  It restores the state of the interrupted process and allows it to continue.
*   Interrupts are the primary way the OS is notified about events in the I/O system.

### **Device Drivers**

A device driver is a specific type of software that acts as a translator between the operating system and a particular hardware device.

*   **Role:** Each device controller has a corresponding device driver. The driver understands the specific details and command language of the controller. It presents a uniform interface for the device to the rest of the OS.
*   **Example:** When the OS wants to read from a hard disk, it calls generic functions in the disk driver. The disk driver then translates these calls into the specific sequence of commands that the disk controller understands.
*   **Benefit:** This abstraction allows new hardware to be added to the system simply by installing the correct driver, without changing the OS itself.

### **Device-Independent I/O Software**

The device-independent I/O software is the layer in the OS I/O subsystem that provides a uniform interface to the user-level software, hiding the differences between various hardware devices.

*   **Goal:** To make it possible to write application programs that can work with many different I/O devices without modification.
*   **Functions:**
    *   **Uniform Interfacing:** Providing a consistent set of functions for all drivers (e.g., `open`, `read`, `write`, `close`).
    *   **Buffering:** Storing data in memory while it is being transferred between devices to handle speed mismatches.
    *   **Error Reporting:** Providing a consistent way to report errors from different devices.
    *   **Device Naming:** Mapping symbolic device names to their proper drivers.

### **Secondary Storage Structure**

Secondary storage, most commonly a magnetic disk (hard disk drive or HDD), provides the bulk of storage in a computer system. It is non-volatile, meaning it retains data even when powered off.

*   **Purpose:** To store programs and data that cannot fit in the main memory or that need to be kept for a long time.
*   **Characteristics:** It is much larger and cheaper than main memory but also much slower.
*   **Structure:** A hard disk is organized into platters, which are coated with magnetic material. Each platter has circular tracks, and each track is divided into sectors. Data is read and written by a read/write head that moves across the spinning platters.

### **Disk Structure**

A magnetic disk consists of one or more flat circular plates called **platters**.

*   **Platters:** Each platter has two surfaces coated with magnetic material.
*   **Tracks:** Each surface is divided into concentric circles called tracks.
*   **Sectors:** Each track is further divided into smaller arcs called sectors, which are the smallest unit of data transfer.
*   **Cylinder:** A cylinder is the set of all tracks that are at the same distance from the center of the disk, spanning across all platter surfaces.
*   **Read/Write Head:** There is a read/write head for each surface, all attached to a single arm that moves them together. To access data, the arm must first move to the correct cylinder (**seek time**) and then wait for the desired sector to rotate under the head (**rotational latency**).

### **Disk Scheduling Algorithms: FCFS**

First-Come, First-Served (FCFS) is the simplest disk scheduling algorithm. It services I/O requests in the order in which they arrive.

*   **How it works:** The disk scheduler maintains a queue of pending requests. When the current request is complete, it picks the next one from the front of the queue.
*   **Advantage:** It is fair, as no request has to wait for too long.
*   **Disadvantage:** It is generally inefficient. It does not try to optimize the movement of the disk head. The head may move back and forth across the disk to service requests, leading to a long total seek time.
*   **Example:** If requests are for tracks 98, 183, 37, 122, the head will move from 98 to 183, then back to 37, then to 122, which is very inefficient.

### **Disk Scheduling Algorithms: SSTF**

Shortest-Seek-Time-First (SSTF) is a disk scheduling algorithm that selects the request with the minimum seek time from the current head position.

*   **How it works:** From the current head position, the scheduler chooses the pending request that is closest to the current track, regardless of when it arrived.
*   **Advantage:** It significantly improves performance over FCFS by minimizing the total seek time.
*   **Disadvantage:** It is not optimal and can lead to **starvation**. If new requests keep arriving that are close to the current head position, requests for tracks far away might never get serviced.

### **Disk Scheduling Algorithms: SCAN**

The SCAN algorithm, also known as the elevator algorithm, is a disk scheduling algorithm where the disk arm moves in one direction, servicing requests as it goes, until it reaches the end of the disk. Then, it reverses direction and repeats.

*   **How it works:**
    1.  The head starts at one end of the disk and moves towards the other end.
    2.  It services all the requests in its path.
    3.  When it reaches the other end, it reverses its direction and services the requests in the opposite path.
*   **Advantage:** It provides better performance than FCFS and SSTF and avoids starvation.
*   **Disadvantage:** It is not perfectly fair, as it favors requests near the ends of the disk.

### **Disk Scheduling Algorithms: C-SCAN**

Circular SCAN (C-SCAN) is a variation of the SCAN algorithm that provides a more uniform wait time.

*   **How it works:**
    1.  Like SCAN, the head moves from one end of the disk to the other, servicing requests along the way.
    2.  However, when it reaches the other end, it immediately returns to the beginning of the disk **without servicing any requests on the return trip**.
    3.  The scan then starts again from the beginning.
*   **Advantage:** It treats all tracks more fairly than SCAN because the wait time for a request depends only on its position, not on whether the head is moving towards it or away from it.

### **Disk Scheduling Algorithms: LOOK / C-LOOK**

LOOK and C-LOOK are optimizations of the SCAN and C-SCAN algorithms. The main difference is that they do not go all the way to the end of the disk.

*   **LOOK Algorithm:**
    *   Similar to SCAN, but the disk arm only goes as far as the last request in each direction. It then reverses direction immediately, without going to the end of the disk. It "looks" ahead for a request before moving.
*   **C-LOOK Algorithm:**
    *   A version of LOOK based on C-SCAN. The arm moves to the last request in one direction, then jumps to the first request in the opposite direction to begin the next scan.
*   **Benefit:** These optimizations reduce the total head movement compared to their SCAN counterparts.

### **Disk Reliability**

Disk reliability is a measure of how likely a disk is to perform its function without failure. Since disks are mechanical devices, they are prone to failure.

*   **Mean Time To Failure (MTTF):** A common measure of reliability, indicating the average time the device is expected to run before it fails.
*   **Improving Reliability:**
    *   **Redundancy:** The most common approach is to introduce redundancy by storing extra information that is not strictly needed.
    *   **RAID (Redundant Array of Independent Disks):** A popular technique that uses multiple disks working together to provide increased reliability and performance. Data can be striped across disks (for performance) and parity information can be stored to recover from a disk failure.

### **Disk Formatting (low-level, high-level)**

Disk formatting is the process of preparing a data storage device such as a hard disk drive for initial use.

*   **Low-Level Formatting (or Physical Formatting):**
    *   This is done at the factory. It divides the disk into sectors that the disk controller can read and write.
    *   It creates the physical structure on the disk surface, including tracks, sectors, and control information like sector headers and trailers.
*   **High-Level Formatting (or Logical Formatting):**
    *   This is done by the operating system. It creates the file system structure on the disk.
    *   This involves writing the file system data structures, such as the boot block, free space management information, and an initial empty directory, onto the disk.

### **Boot Block**

The boot block is a special region on a storage device (like a hard disk or SSD) that contains the initial bootstrap program used to start the computer's operating system.

*   **Location:** It is typically located in the first sector of the disk (e.g., Sector 0, also known as the Master Boot Record or MBR on partitioned disks).
*   **Function:** When a computer is powered on, the firmware (BIOS or UEFI) loads the code from the boot block into memory and executes it. This small bootstrap program's job is then to load the full operating system kernel from the disk into memory and start its execution.

### **Bad Blocks**

A bad block (or bad sector) is a sector on a disk drive that has become defective and can no longer be used to reliably store data.

*   **Causes:** They can be caused by manufacturing defects or by physical damage to the disk surface over time.
*   **Handling:**
    *   Most disks come from the factory with a list of bad blocks. The disk controller has built-in logic to avoid using these blocks.
    *   If a block goes bad during use, the file system or the controller can perform **sector sparing** or **sector slipping**, where the bad block is logically replaced with a spare block that was reserved for this purpose. The OS is then redirected to the spare block.

### **File Concepts: File types, attributes, operations**

A file is a named collection of related information that is recorded on secondary storage. From a user's perspective, a file is the smallest logical unit of storage.

*   **File Types:** The OS may recognize different file types, often indicated by the file extension (e.g., `.txt`, `.exe`, `.jpg`). This can determine the default operations or applications associated with the file.
*   **File Attributes:** This is metadata about the file, such as:
    *   **Name:** The symbolic file name.
    *   **Size:** Current size of the file.
    *   **Timestamps:** Date and time of creation, last modification, and last access.
    *   **Permissions:** Controls who can read, write, or execute the file.
*   **File Operations:** Basic operations the OS provides include: Create, Write, Read, Reposition (seek), Delete, and Truncate.

### **Access Methods: Sequential, Direct, Indexed**

Access methods define how the information in a file is accessed and read into memory.

*   **Sequential Access:**
    *   This is the simplest access method. Information in the file is processed in order, one record after another.
    *   This is the most common method, used for files like text documents.
*   **Direct Access (or Relative Access):**
    *   A file is made up of fixed-length logical records, which allows the program to read and write records rapidly in no particular order.
    *   This is useful for databases, where you might need to quickly access a specific record.
*   **Indexed Access:**
    *   This is a variation of direct access. An index (like an index in a book) is built for the file, containing pointers to various blocks. To find a record, you first search the index to get the block address and then access that block directly.

### **Directory Structure: Single-level**

A single-level directory is the simplest directory structure. All files in the system are contained in the same directory.

*   **Structure:** There is one root directory, and all files reside directly within it.
*   **Advantages:** Simple to implement and understand.
*   **Disadvantages:**
    *   **Naming Problem:** As the number of files increases, it becomes difficult to manage, and all files must have unique names.
    *   **Grouping Problem:** It is difficult to group related files together.
*   **Usage:** It is suitable only for very simple, single-user systems.

### **Directory Structure: Two-level**

A two-level directory structure is an improvement over the single-level structure, designed for multi-user systems.

*   **Structure:** There is a master directory, and under it, each user has their own separate user file directory (UFD).
*   **How it works:** When a user logs in, the system uses their UFD as the current directory. Files in different user directories can have the same name.
*   **Advantages:** It solves the naming problem between users.
*   **Disadvantages:**
    *   It does not allow for subgrouping of files within a user's directory.
    *   It isolates users, making it difficult for them to cooperate and share files.

### **Directory Structure: Tree-structured**

A tree-structured directory is the most common directory structure used in modern operating systems like Windows and UNIX.

*   **Structure:** The directory is organized as a tree of arbitrary height. There is one root directory, and every file in the system has a unique path name.
*   **Features:**
    *   It allows users to create their own subdirectories to organize their files.
    *   The concept of a **current working directory** is used to simplify path names.
*   **Advantages:** It is highly flexible and allows for efficient searching and grouping of files.
*   **Disadvantage:** Sharing files can be slightly complex, and deleting a directory might require recursively deleting all its subdirectories and files.

### **Directory Structure: Acyclic graph**

An acyclic-graph directory structure is a generalization of the tree-structured directory that allows for sharing of files and subdirectories.

*   **Structure:** It allows directories to have shared subdirectories and files. A shared file or directory exists in the file system in one place but appears in multiple directories.
*   **Implementation:** This is often implemented using **links** or **shortcuts**. A link is a pointer to another file or subdirectory.
*   **Advantage:** It allows for easy sharing without making multiple copies of a file.
*   **Challenge:** The main problem is to ensure that the graph remains acyclic (no cycles). If cycles are allowed, searching algorithms could go into an infinite loop. Deleting a shared file also requires careful handling (e.g., using reference counts).

### **File System Structure**

A file system is a method and data structure that an operating system uses to control how data is stored and retrieved. It is typically organized in layers.

*   **Layered Architecture:**
    1.  **Application Programs:** User-level programs that interact with the file system.
    2.  **Logical File System:** Manages metadata, including all the details of the directory structure and file attributes.
    3.  **File-Organization Module:** Knows about files and their logical blocks. It translates logical block addresses to physical block addresses.
    4.  **Basic File System:** Issues generic commands to the appropriate device driver to read and write physical blocks on the storage device.
    5.  **I/O Control (Device Drivers):** Manages the hardware devices.

### **File Allocation Methods: Contiguous**

Contiguous allocation is a file allocation method where each file occupies a set of contiguous blocks on the disk.

*   **How it works:** The directory entry for a file contains the starting block address and the length of the file (in blocks).
*   **Advantages:**
    *   Simple to implement.
    *   Excellent read performance because the disk head does not have to move much to read the entire file.
*   **Disadvantages:**
    *   Suffers from **external fragmentation**.
    *   It is difficult to grow a file once it has been created, as the space after it might already be allocated to another file.

### **File Allocation Methods: Linked**

Linked allocation is a file allocation method where each file is a linked list of disk blocks. The disk blocks may be scattered anywhere on the disk.

*   **How it works:** The directory entry for a file contains a pointer to the first block of the file. Each block then contains a pointer to the next block in the sequence. The last block has a null pointer.
*   **Advantages:**
    *   It solves the external fragmentation problem.
    *   Files can be easily grown.
*   **Disadvantages:**
    *   It is inefficient for direct access, as you have to traverse the list from the beginning to find a specific block.
    *   The space used for pointers in each block reduces the storage capacity for data.
    *   It is not very reliable; a lost pointer can corrupt the entire file.

### **File Allocation Methods: Indexed**

Indexed allocation is a file allocation method that brings all the pointers for a file's blocks together into one location, called the **index block**.

*   **How it works:** The directory entry for a file points to its index block. The index block is an array of disk block addresses. The i-th entry in the index block points to the i-th block of the file.
*   **Advantages:**
    *   It supports direct access efficiently.
    *   It solves the external fragmentation problem.
*   **Disadvantages:**
    *   It can be wasteful if files are very small, as an entire index block is still allocated.
    *   For very large files, a single index block may not be enough to hold all the pointers, requiring more complex schemes (like multi-level indexing or chaining index blocks).

### **Free Space Management: Bit Vector**

The bit vector (or bitmap) method is a technique for managing free space on a disk.

*   **How it works:** The free-space list is implemented as a bit vector. Each block on the disk is represented by one bit.
    *   If a block is free, its corresponding bit is 1.
    *   If a block is allocated, its corresponding bit is 0.
*   **Advantages:**
    *   It is simple and efficient for finding a contiguous block of free space. For example, to find `n` free blocks, the OS just needs to search the bitmap for `n` consecutive 1s.
*   **Disadvantage:** The bit vector can be large and must be kept in main memory for efficiency, which consumes memory.

### **Free Space Management: Linked List**

The linked list method for free-space management links all the free disk blocks together, keeping a pointer to the first free block.

*   **How it works:** The first free block contains a pointer to the next free block, and so on. The directory or a special location on the disk stores the head of this free-list.
*   **Allocation:** To allocate a block, the OS takes the first block from the list and updates the head pointer.
*   **Advantage:** It is simple to implement, and no space is wasted on a large bitmap.
*   **Disadvantage:** It is not efficient for finding contiguous blocks of free space, as you have to traverse the list.

### **Free Space Management: Grouping Method**

The grouping method is a modification of the linked list approach for free-space management. It stores the addresses of multiple free blocks in the first free block.

*   **How it works:** The first free block on the list contains the addresses of `n-1` other free blocks. The last of these `n-1` blocks contains the addresses of another `n-1` free blocks, and so on.
*   **Advantage:** This allows a large number of free block addresses to be found quickly. When a request for multiple blocks arrives, the OS can find them all from a single free block, which is much more efficient than traversing a simple linked list.

### **Directory Implementation: Linear List**

A linear list is the simplest way to implement a directory. It uses a simple list of file names with pointers to the corresponding data blocks.

*   **Structure:** A linear list of directory entries, where each entry contains the file name and its attributes (including pointers to the file's data).
*   **Operations:**
    *   **Creating a file:** Find an empty slot in the list (or add to the end) and fill in the information.
    *   **Deleting a file:** Search the list for the file name and mark the slot as free.
    *   **Finding a file:** Requires a linear search through the list.
*   **Disadvantage:** Searching for a file can be very slow, especially for large directories.

### **Directory Implementation: Hash Table**

A hash table is a more efficient method for implementing a directory. It uses a hash function to speed up file lookups.

*   **Structure:** A hash table is used in addition to a linear list of directory entries. The hash table takes a file name as input and returns a pointer to the corresponding entry in the linear list.
*   **Operations:**
    *   **Finding a file:** The file name is hashed, which directly gives the location of the file's entry. This avoids a slow linear search.
*   **Advantage:** It makes searching for a file very fast, typically with O(1) complexity.
*   **Disadvantage:** It is more complex to implement, and the hash function must be chosen carefully to avoid collisions (where multiple file names hash to the same location).

### **FAT File System**

The File Allocation Table (FAT) is a simple and widely used file system architecture. It is a variation of the linked allocation method.

*   **Structure:** A section of the disk at the beginning of the volume is set aside to be the **File Allocation Table**. This table has one entry for each block on the disk.
*   **How it works:** The directory entry for a file contains the block number of the file's first block. The FAT entry corresponding to that block number then contains the block number of the next block in the file. This chain continues until the last block, which has a special end-of-file value in its FAT entry.
*   **Advantage:** The entire linked list of blocks can be cached in memory, making random access much faster than traditional linked allocation.

### **i-node Structure**

An i-node (index-node) is a data structure used in UNIX-based file systems (like ext4 in Linux) to store all the essential information about a file or directory, except for its name.

*   **Information Stored:** An i-node contains the file's attributes (permissions, owner, size, timestamps) and, most importantly, the disk block addresses of the file's data.
*   **Structure for Block Pointers:** To support both small and large files efficiently, the i-node typically contains:
    *   A few **direct pointers** to the first few data blocks.
    *   A **single indirect pointer** that points to a block of direct pointers.
    *   A **double indirect pointer** that points to a block of single indirect pointers.
    *   A **triple indirect pointer** for very large files.
*   The directory entry simply maps a file name to an i-node number.
