import { PresetLecture, StudyMaterial } from '../types';

export const PRESET_LECTURES: PresetLecture[] = [
  {
    id: 'os-round-robin',
    title: 'Round Robin CPU Scheduling Algorithm with Solved Example',
    subject: 'Operating Systems',
    channel: 'Gate Smashers',
    youtubeId: 'A0h_p1yVn8E',
    videoUrl: 'https://www.youtube.com/watch?v=A0h_p1yVn8E',
    duration: '14:22',
    description: 'Preemptive CPU scheduling algorithm designed for time-sharing systems using a Time Quantum and Ready Queue FIFO order.',
    badge: 'GATE & Semester Favorite',
    transcriptSample: `Hello students, welcome to Gate Smashers. Today we will discuss Round Robin CPU scheduling algorithm with an example. Round Robin is a preemptive scheduling algorithm designed especially for time-sharing systems. 
In Round Robin, each process is allocated CPU for a fixed time interval called Time Quantum or Time Slice. The ready queue is treated as a circular queue or FIFO queue. 
When the time quantum of a running process expires, a timer interrupt occurs, context switching takes place, and the process is preempted and put back at the end of the ready queue. If the process finishes before the time quantum expires, it releases the CPU voluntarily.
Key characteristics taught in this lecture:
1. Mode of execution: Preemptive only.
2. Criteria: Time Quantum and Arrival Time.
3. Ready queue structure: First-In-First-Out (FIFO) queue.
4. Gantt chart construction step-by-step: Process P1 arrives at 0 with Burst Time 5, P2 arrives at 1 with BT 3, P3 arrives at 2 with BT 1, P4 arrives at 3 with BT 2. Time Quantum is 2.
At time 0, P1 starts. At time 1, P2 arrives in ready queue. At time 2, P3 arrives, P1 quantum expires, P1 goes to tail.
5. Turnaround Time formula: Completion Time (CT) minus Arrival Time (AT).
6. Waiting Time formula: Turnaround Time (TAT) minus Burst Time (BT).
7. Impact of Time Quantum: If Time Quantum is very large, Round Robin degenerates into First-Come First-Served (FCFS). If Time Quantum is extremely small, excessive context switching occurs, causing CPU overhead and processor thrashing. Rule of thumb: 80% of CPU bursts should be shorter than the time slice.
8. Starvation: Round Robin is starvation-free because every process in the ready queue is guaranteed a turn in circular order.
9. Response time is best compared to FCFS and SJF, which makes it ideal for interactive multi-user operating systems.
10. Viva & exam point: Round Robin has higher average waiting time than Shortest Job First, but provides fair CPU distribution and minimal response time.`
  },
  {
    id: 'dbms-acid',
    title: 'ACID Properties in DBMS Transaction Management',
    subject: 'Database Management Systems',
    channel: 'Neso Academy',
    youtubeId: 'sRJj8bX87Yc',
    videoUrl: 'https://www.youtube.com/watch?v=sRJj8bX87Yc',
    duration: '11:45',
    description: 'Detailed explanation of Atomicity, Consistency, Isolation, and Durability required to ensure transaction integrity.',
    badge: '10 Marks Univ Exam Classic',
    transcriptSample: `Welcome to Neso Academy. In this video, we will learn ACID Properties in Database Management Systems.
A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. To ensure data integrity, any DBMS must satisfy four fundamental ACID properties:
1. Atomicity ('All or None' property): Either all operations of the transaction are executed successfully and committed, or none of them are. If a transaction fails mid-way due to power failure, system crash, or network failure, all partial modifications must be rolled back. Managed by the Transaction Manager and Recovery Manager using undo logs.
2. Consistency (Correctness of State): The database must remain in a consistent state before and after the transaction execution. Integrity constraints (such as primary keys, foreign keys, balance cannot be negative) must be preserved. For example, if account A transfers Rs 500 to account B, the sum of balances (A + B) before transaction must equal (A + B) after transaction.
3. Isolation: Multiple transactions executing concurrently should not interfere with one another. Each transaction must execute as if it is the only transaction running in the system. Intermediate states of an uncommitted transaction should not be visible to other transactions. Handled by the Concurrency Control component using locking protocols and timestamp ordering.
4. Durability (Permanence): Once a transaction commits successfully, all its changes become permanent in non-volatile storage (disk) and cannot be lost, even in the event of a system crash or power outage. Managed by the Recovery Manager through Write-Ahead Logging (WAL) and Redo operations.
Common university exam questions: Write short notes on ACID properties with bank transfer example; explain which DBMS module is responsible for Atomicity vs Isolation.`
  },
  {
    id: 'algo-knapsack',
    title: '0/1 Knapsack Problem Dynamic Programming Approach',
    subject: 'Design & Analysis of Algorithms',
    channel: 'Abdul Bari',
    youtubeId: 'nLmhmB6NzcM',
    videoUrl: 'https://www.youtube.com/watch?v=nLmhmB6NzcM',
    duration: '18:50',
    description: 'Tabulation method for 0/1 Knapsack problem with time complexity O(n*W) and state transition equation.',
    badge: 'Core GATE / DAA Syllabus',
    transcriptSample: `Hello everyone, in this video we will discuss 0/1 Knapsack Problem using Dynamic Programming.
In 0/1 Knapsack, we are given n items, each with a specific profit P[i] and weight W[i], and a knapsack of capacity W.
Unlike Fractional Knapsack which can be solved greedily, in 0/1 Knapsack we cannot break items. An item is either completely included (1) or excluded (0).
Greedy approach fails here because selecting items based solely on profit, weight, or profit-to-weight ratio does not guarantee the global optimal solution.
Dynamic Programming solves it using optimal substructure and overlapping subproblems:
1. Table construction: We create a 2D table V[i][w] where i ranges from 0 to n (number of items) and w ranges from 0 to W (capacity).
2. Base case: When i = 0 (no items) or w = 0 (zero capacity), V[i][w] = 0.
3. Recurrence relation:
   If weight of item i is greater than current capacity w (w_i > w), we cannot include it:
   V[i][w] = V[i-1][w]
   Else, we take the maximum of excluding the item or including the item:
   V[i][w] = max( V[i-1][w], P[i] + V[i-1][w - w_i] )
4. Time Complexity: To fill the table of dimensions (n+1) x (W+1), each cell takes O(1) time. Therefore, overall time complexity is O(n * W). Notice that W is numeric capacity, so this is Pseudo-Polynomial time complexity.
5. Space Complexity: O(n * W) for the 2D matrix, which can be optimized to O(W) using a single 1D array traversed backwards.
6. Backtracking to find selected items: If V[i][w] != V[i-1][w], then item i was included; subtract w_i from w and move to row i-1.`
  },
  {
    id: 'cn-osi-layers',
    title: 'OSI 7 Layer Reference Model Architecture & Protocols',
    subject: 'Computer Networks',
    channel: 'Gate Smashers',
    youtubeId: 'vv4y_uOneC8',
    videoUrl: 'https://www.youtube.com/watch?v=vv4y_uOneC8',
    duration: '16:05',
    description: 'Complete breakdown of OSI 7 layers from Physical to Application, data encapsulation, PDU names, and responsibilities.',
    badge: 'Foundational Networking',
    transcriptSample: `Welcome to Gate Smashers. Today we will understand the Open Systems Interconnection (OSI) 7 layer reference model developed by ISO in 1984.
OSI is a conceptual model that standardizes the communication functions of a telecommunication or computing network.
The 7 layers from bottom to top (mnemonic: Please Do Not Throw Sausage Pizza Away):
1. Physical Layer: Responsible for transmission of raw unstructured bits over a physical medium. Deals with voltages, pin layout, cables (twisted pair, coaxial, optical fiber), topology, and transmission mode (simplex, half-duplex, full-duplex). PDU: Bits.
2. Data Link Layer (DLL): Responsible for node-to-node (hop-to-hop) delivery of data frames. Divided into LLC (Logical Link Control) and MAC (Media Access Control). Functions: Framing, Physical addressing (48-bit MAC address), Flow control (Stop-and-Wait, Sliding Window), Error control (CRC, parity), and Access control (CSMA/CD). PDU: Frames.
3. Network Layer: Responsible for host-to-host packet delivery across multiple heterogeneous networks. Functions: Logical addressing (IP address: IPv4 32-bit, IPv6 128-bit), Routing (finding best path using Dijkstra, Bellman-Ford, OSPF, BGP), and Congestion control. Protocols: IP, ICMP, ARP, RARP. PDU: Packets.
4. Transport Layer: Considered the 'Heart of OSI Model'. Responsible for end-to-end (process-to-process) reliable communication. Functions: Port addressing (16-bit port numbers), Segmentation & Reassembly, Connection management (TCP 3-way handshake), Flow control, and Error recovery. Protocols: TCP (reliable, connection-oriented) and UDP (unreliable, connectionless). PDU: Segments (TCP) / Datagrams (UDP).
5. Session Layer: Establishes, maintains, and terminates communication sessions between processes. Key functions: Dialog control (simplex/half/full duplex) and Checkpointing/Synchronization.
6. Presentation Layer: Handles translation, formatting, encryption/decryption, and data compression (syntax & semantics). Formats: ASCII, EBCDIC, JPEG, SSL/TLS.
7. Application Layer: Provides user interface and network services directly to end-user applications. Protocols: HTTP, HTTPS, FTP, SMTP, DNS, DHCP. PDU: Message/Data.`
  },
  {
    id: 'de-kmap',
    title: 'Karnaugh Map (K-Map) Minimization Technique for Boolean Algebra',
    subject: 'Digital Electronics',
    channel: 'Neso Academy',
    youtubeId: 'RO5alU6PpSU',
    videoUrl: 'https://www.youtube.com/watch?v=RO5alU6PpSU',
    duration: '13:30',
    description: '2, 3, and 4-variable K-Map grouping rules, Gray code cell numbering, prime implicants, and don’t care conditions.',
    badge: 'Score Booster in Sem 3',
    transcriptSample: `In this lecture, we introduce the Karnaugh Map or K-Map, an algebraic minimization tool invented by Maurice Karnaugh in 1953.
K-Map is a graphical representation of a truth table used to simplify Boolean expressions without applying complex Boolean algebra theorems.
Key rules and concepts taught in this video:
1. Structure: For an n-variable Boolean function, the K-Map contains 2^n cells. A 2-variable map has 4 cells, 3-variable map has 8 cells, and 4-variable map has 16 cells.
2. Gray Code Ordering: Adjacent cells must differ by only one binary bit (unit distance code). This is why rows and columns are arranged in order: 00, 01, 11, 10 (not 00, 01, 10, 11). This ensures that adjacent cells represent minterms that can be combined using the identity AB + AB' = A.
3. Grouping Rules:
   - Groups can only contain 1s for Sum of Products (SOP) or 0s for Product of Sums (POS).
   - Group size must always be a power of 2: 1, 2 (pair), 4 (quad), 8 (octet), or 16.
   - Groups can be horizontal or vertical; diagonal groups are strictly forbidden.
   - K-Maps are toroidally wrapped (edges wrap around): top edge is adjacent to bottom edge; leftmost column is adjacent to rightmost column. The four corner cells (0, 2, 8, 10 in a 4-variable map) form a valid quad!
   - Make groups as large as possible to eliminate maximum variables. A pair eliminates 1 variable, a quad eliminates 2 variables, an octet eliminates 3 variables.
   - Minimize total number of groups to have fewest terms in final expression.
   - Overlapping of groups is allowed and encouraged to form larger groups.
4. Don't Care Conditions (marked as X or d): Can be treated as 1 if it helps create a larger group; otherwise treated as 0. Never group don't cares alone!
5. Definitions:
   - Implicant: Any minterm where the function is 1.
   - Prime Implicant (PI): A group obtained by combining maximum possible adjacent cells that cannot be merged further.
   - Essential Prime Implicant (EPI): A prime implicant that contains at least one minterm (1) that is not covered by any other prime implicant.`
  }
];

export const INITIAL_PRESET_MATERIALS: Record<string, StudyMaterial> = {
  'os-round-robin': {
    videoTitle: 'Round Robin CPU Scheduling Algorithm with Solved Example',
    channelOrInstructor: 'Gate Smashers (Varun Singla)',
    subject: 'Operating Systems',
    targetExamContext: 'Directly tested in GATE CSE, VTU/AKTU 4th Sem OS Papers, and Tech Interviews',
    language: 'English',
    summaryBullets: [
      'Round Robin is a preemptive CPU scheduling algorithm specifically engineered for time-sharing and interactive multi-user operating systems.',
      'A fixed slice of CPU execution time, termed Time Quantum (or Time Slice), is allocated to each process in cyclic sequence.',
      'The ready queue operates strictly on a First-In-First-Out (FIFO) circular order based on process Arrival Time (AT).',
      'When a running process exhausts its Time Quantum, a hardware timer interrupt triggers a preemption and CPU context switch.',
      'The preempted process is repositioned at the tail of the ready queue while the CPU is dispatched to the next head process.',
      'If a process finishes execution before its Time Quantum lapses, it relinquishes the CPU voluntarily and exits.',
      'Turnaround Time (TAT) is calculated as Completion Time (CT) minus Arrival Time (AT).',
      'Waiting Time (WT) is determined by subtracting Burst Time (BT) from Turnaround Time (TAT).',
      'Selection of Time Quantum is critical: an excessively large quantum degenerates Round Robin into FCFS, whereas a tiny quantum causes CPU thrashing due to heavy context switching overhead.',
      'Round Robin guarantees freedom from starvation since every runnable process is guaranteed its turn every (n - 1) * q time units.'
    ],
    keyTopics: [
      { timestamp: '00:00', seconds: 0, topic: 'Introduction & Core Premise of Round Robin', oneLineDescription: 'Explains why time-sharing systems require preemptive circular scheduling over batch FCFS.' },
      { timestamp: '02:15', seconds: 135, topic: 'Time Quantum & Ready Queue Structure', oneLineDescription: 'Defines time slice allocation and FIFO queue mechanics upon timer interrupt.' },
      { timestamp: '05:30', seconds: 330, topic: 'Step-by-Step Gantt Chart Construction', oneLineDescription: 'Walks through 4 processes (P1-P4) with arrival times, burst times, and ready queue trace.' },
      { timestamp: '09:10', seconds: 550, topic: 'Calculating Completion, TAT, and Waiting Time', oneLineDescription: 'Tabulates CT, TAT = CT - AT, and WT = TAT - BT with final average calculations.' },
      { timestamp: '11:45', seconds: 705, topic: 'Impact of Time Quantum Magnitude', oneLineDescription: 'Demonstrates degeneration to FCFS versus thrashing due to context-switch overhead.' },
      { timestamp: '13:20', seconds: 800, topic: 'Starvation & Response Time Characteristics', oneLineDescription: 'Proves starvation-free property and why Round Robin delivers best average response time.' }
    ],
    definitions: [
      {
        term: 'Time Quantum (Time Slice)',
        definition: 'A predetermined, fixed amount of CPU time assigned to a process in the ready queue before preemption occurs.',
        examNote: 'Standard 2-mark question in VTU/AKTU: State significance of quantum size.'
      },
      {
        term: 'Preemptive Scheduling',
        definition: 'A scheduling strategy where an actively executing process can be interrupted and returned to the ready state by the operating system before completing its burst.',
        examNote: 'Often contrasted with Non-Preemptive scheduling in 5-mark university questions.'
      },
      {
        term: 'Context Switch',
        definition: 'The procedure of saving the execution state (registers, program counter) of a running process and loading the saved state of another process so CPU execution can resume.',
        examNote: 'Pure overhead with zero productive user work done; minimized by tuning quantum.'
      },
      {
        term: 'Turnaround Time (TAT)',
        definition: 'The total elapsed time interval from the instant a process is submitted (Arrival Time) until its final completion (Completion Time). Formula: TAT = CT - AT.',
        examNote: 'Mandatory column in all numerical CPU scheduling exam problems.'
      },
      {
        term: 'Response Time',
        definition: 'The elapsed duration from the time of process submission until the CPU produces its first response/execution unit.',
        examNote: 'Key metric where Round Robin outperforms SJF and FCFS in interactive environments.'
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'What happens to the Round Robin scheduling algorithm if the Time Quantum is set extremely large?',
        options: [
          'It behaves identically to Shortest Job First (SJF)',
          'It degenerates into First-Come First-Served (FCFS)',
          'It causes excessive context switches and CPU deadlock',
          'It guarantees minimum possible average waiting time'
        ],
        correctAnswerIndex: 1,
        explanation: 'If the quantum exceeds the largest burst time, every process runs to completion on its first turn, behaving exactly like FCFS.'
      },
      {
        id: 2,
        question: 'What is the primary trade-off of selecting an extremely small Time Quantum in Round Robin?',
        options: [
          'Processes will suffer starvation',
          'CPU throughput increases dramatically',
          'Excessive context switching creates high CPU overhead and reduces useful work',
          'Average response time deteriorates significantly'
        ],
        correctAnswerIndex: 2,
        explanation: 'Very frequent interruptions force the OS to spend most clock cycles saving and loading process states rather than executing instructions.'
      },
      {
        id: 3,
        question: 'Which data structure is fundamentally utilized to maintain the ready queue in Round Robin?',
        options: [
          'Min-Heap Priority Queue',
          'FIFO Circular Queue',
          'LIFO Stack',
          'Binary Search Tree'
        ],
        correctAnswerIndex: 1,
        explanation: 'A FIFO (First-In-First-Out) queue ensures fair cyclical dispatch of ready processes.'
      },
      {
        id: 4,
        question: 'How is Waiting Time (WT) mathematically derived for a process in CPU scheduling?',
        options: [
          'WT = Turnaround Time + Burst Time',
          'WT = Completion Time - Arrival Time',
          'WT = Turnaround Time - Burst Time',
          'WT = Burst Time - Arrival Time'
        ],
        correctAnswerIndex: 2,
        explanation: 'Waiting time equals total time in the system (Turnaround Time) minus the time actively spent executing on the CPU (Burst Time).'
      },
      {
        id: 5,
        question: 'Why is Round Robin inherently immune to process starvation?',
        options: [
          'Priority of aged processes is increased dynamically',
          'CPU burst times are calculated beforehand',
          'Every process in the circular ready queue is guaranteed a time slice each cycle',
          'It is a non-preemptive scheduling policy'
        ],
        correctAnswerIndex: 2,
        explanation: 'Because the queue rotates continuously, no low-priority or long process can be starved by incoming short processes.'
      },
      {
        id: 6,
        question: 'Which metric is Round Robin optimal at minimizing compared to non-preemptive algorithms?',
        options: [
          'Turnaround Time',
          'Waiting Time',
          'Response Time',
          'Context Switch Count'
        ],
        correctAnswerIndex: 2,
        explanation: 'By cycling quickly through all processes, each process receives its initial CPU slice very rapidly, yielding minimal response time.'
      },
      {
        id: 7,
        question: 'If 4 processes are in the ready queue with quantum q, what is the maximum time a process waits for its next slice?',
        options: [
          '4 * q',
          '(4 - 1) * q = 3q',
          'q / 4',
          '16 * q'
        ],
        correctAnswerIndex: 1,
        explanation: 'In a set of n processes, each process waits at most (n - 1) * q time units before getting another quantum.'
      },
      {
        id: 8,
        question: 'According to empirical rule-of-thumb, what percentage of CPU bursts should ideally be shorter than the time quantum?',
        options: [
          '20%',
          '50%',
          '80%',
          '100%'
        ],
        correctAnswerIndex: 2,
        explanation: 'About 80% of CPU bursts should be shorter than the quantum so that interactive jobs complete without unnecessary preemption.'
      },
      {
        id: 9,
        question: 'When does a process in Round Robin release the CPU voluntarily before its quantum expires?',
        options: [
          'When higher priority process arrives',
          'When it completes its execution or requests an I/O operation',
          'When the timer hardware interrupts',
          'When ready queue reaches maximum capacity'
        ],
        correctAnswerIndex: 1,
        explanation: 'A process yields voluntarily either when its CPU burst terminates or when it blocks waiting for I/O.'
      },
      {
        id: 10,
        question: 'Which scheduling objective is primarily compromised in Round Robin in exchange for fairness?',
        options: [
          'Fair CPU sharing',
          'Minimum average waiting time (compared to SJF)',
          'Interactive responsiveness',
          'Starvation freedom'
        ],
        correctAnswerIndex: 1,
        explanation: 'SJF is provably optimal for minimum average waiting time; Round Robin trades off average waiting time to achieve fairness and responsiveness.'
      }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'External Examiner: "Why don’t we set the Time Quantum to 1 microsecond so all processes feel completely parallel to the user?"',
        shortAnswer: 'Setting an infinitesimal time quantum causes context switching overhead to dominate CPU cycles, resulting in severe thrashing where the CPU spends more time swapping registers than executing user instructions.',
        examinerTip: 'Keyword to score full marks: Mention "Context Switching Overhead" and "CPU Thrashing".'
      },
      {
        id: 2,
        question: 'External Examiner: "Can Round Robin suffer from Convoy Effect like FCFS? Explain in one sentence."',
        shortAnswer: 'No, because CPU-bound processes with long burst times are preempted after their time quantum expires, allowing I/O-bound and short processes behind them to execute promptly.',
        examinerTip: 'Contrast this with FCFS where a single CPU-hog holds all subsequent short processes in queue.'
      },
      {
        id: 3,
        question: 'External Examiner: "If an OS has both interactive user jobs and background batch jobs, how would you adapt Round Robin?"',
        shortAnswer: 'Use a Multi-Level Feedback Queue (MLFQ) with smaller quanta on high-priority interactive queues and longer quanta or FCFS on lower-priority background batch queues.',
        examinerTip: 'Shows you know both basic Round Robin and advanced OS kernel design principles.'
      }
    ],
    quickFormulaSheet: [
      { name: 'Turnaround Time (TAT)', formulaOrRule: 'TAT = Completion Time (CT) - Arrival Time (AT)', significance: 'Time spent from submission to end' },
      { name: 'Waiting Time (WT)', formulaOrRule: 'WT = Turnaround Time (TAT) - Burst Time (BT)', significance: 'Time spent idling in ready queue' },
      { name: 'Max Delay Rule', formulaOrRule: 'Max Wait = (n - 1) × q', significance: 'Upper bound on wait between consecutive slices for n processes' },
      { name: 'Quantum Rule of Thumb', formulaOrRule: 'Quantum > 80% of CPU bursts', significance: 'Prevents excessive context switch thrashing' }
    ],
    twoMinuteRevision: 'Round Robin is a preemptive, starvation-free scheduling algorithm using a FIFO ready queue and a fixed Time Quantum. Small quantum increases context switch overhead; huge quantum degenerates into FCFS. Remember formulas: TAT = CT - AT and WT = TAT - BT for the numerical.'
  },
  'os-round-robin_Hinglish': {
    videoTitle: 'Round Robin CPU Scheduling Algorithm with Solved Example (Hinglish)',
    channelOrInstructor: 'Gate Smashers (Varun Singla)',
    subject: 'Operating Systems',
    targetExamContext: 'GATE CSE, AKTU/VTU 4th Sem OS Exam, Technical Interviews',
    language: 'Hinglish',
    summaryBullets: [
      'Round Robin ek preemptive CPU scheduling algorithm hai jo time-sharing and interactive multi-user operating systems ke liye design kiya gaya hai.',
      'Har process ko ek fixed time duration diya jata hai jise Time Quantum ya Time Slice kehte hain.',
      'Ready queue ko strictly First-In-First-Out (FIFO) circular queue ki tarah treat kiya jata hai, jo processes ke Arrival Time (AT) par based hoti hai.',
      'Jab chal rahi process ka Time Quantum khatam ho jata hai, tab ek hardware timer interrupt occur hota hai aur Context Switch perform hota hai.',
      'Preempt hui process ko wapas ready queue ke tail (aakhri) par append kar diya jata hai, aur next head process ko CPU dispatch kiya jata hai.',
      'Agar koi process apna Time Quantum khatam hone se pehle execute ho jati hai, toh woh CPU ko voluntarily release kar deti hai.',
      'Turnaround Time (TAT) calculate karne ka universal formula hai: Completion Time (CT) minus Arrival Time (AT).',
      'Waiting Time (WT) calculate karne ka formula hai: Turnaround Time (TAT) minus Burst Time (BT).',
      'Time Quantum ka selection bohot critical hota hai: agar quantum bohot bada ho toh algorithm FCFS ban jata hai, aur agar bohot chota ho toh high Context Switching overhead ki wajah se processor thrashing shuru ho jati hai.',
      'Round Robin starvation-free hota hai kyunki circular queue mein har runnable process ko guaranteed cyclic interval par CPU time milta hai.'
    ],
    keyTopics: [
      { timestamp: '00:00', seconds: 0, topic: 'Introduction & Time-Sharing Concept', oneLineDescription: 'Batch FCFS ke bajay interactive systems mein circular scheduling ki zaroorat samjhayi gayi hai.' },
      { timestamp: '02:15', seconds: 135, topic: 'Time Quantum & Ready Queue Structure', oneLineDescription: 'Time slice aur timer interrupt par FIFO ready queue ka functioning explained.' },
      { timestamp: '05:30', seconds: 330, topic: 'Step-by-Step Gantt Chart Construction', oneLineDescription: 'P1 se P4 processes ke saath step-by-step Gantt chart aur ready queue trace draw kiya.' },
      { timestamp: '09:10', seconds: 550, topic: 'Completion, TAT, aur Waiting Time Calculation', oneLineDescription: 'CT, TAT = CT - AT, aur WT = TAT - BT calculate karke average nikala gaya.' },
      { timestamp: '11:45', seconds: 705, topic: 'Time Quantum Magnitude ka Asar', oneLineDescription: 'Bade quantum par FCFS degeneration aur chote quantum par context switch thrashing samjhayi.' },
      { timestamp: '13:20', seconds: 800, topic: 'Starvation & Minimum Response Time', oneLineDescription: 'Starvation-free guarantee aur interactive responsiveness ka mathematical reason diya.' }
    ],
    definitions: [
      {
        term: 'Time Quantum (Time Slice)',
        definition: 'Ek predetermined fixed time interval jo CPU har ready process ko preemption se pehle execute karne ke liye assign karta hai.',
        examNote: 'University exams mein 2 marks ka compulsory question: Time Quantum ka role samjhao.'
      },
      {
        term: 'Preemptive Scheduling',
        definition: 'Aisi scheduling technique jisme OS ek executing process ko forcibly interrupt karke CPU se hata sakta hai aur ready state mein wapas bhej sakta hai.',
        examNote: 'Non-Preemptive vs Preemptive ke 5-mark comparison mein key point.'
      },
      {
        term: 'Context Switch',
        definition: 'Running process ke CPU state (registers, program counter) ko save karne aur doosri ready process ke state ko load karne ka procedure.',
        examNote: 'Pure overhead time hota hai jisme koi productive user instruction run nahi hoti.'
      },
      {
        term: 'Turnaround Time (TAT)',
        definition: 'Process ke system mein submit hone (Arrival Time) se lekar uske complete execution (Completion Time) tak ka total time. Formula: TAT = CT - AT.',
        examNote: 'Numerical solve karte waqt CT nikalne ke baad pehla step hota hai.'
      },
      {
        term: 'Response Time',
        definition: 'Process submit hone ke baad se lekar CPU par pehli baar execute hone tak ka elapsed duration.',
        examNote: 'Round Robin is metric mein SJF aur FCFS dono se behtar perform karta hai.'
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Agar Round Robin algorithm mein Time Quantum ko bohot bada (infinity tak) set kar diya jaye toh kya hoga?',
        options: [
          'Yeh Shortest Job First (SJF) ban jayega',
          'Yeh First-Come First-Served (FCFS) mein degenerate ho jayega',
          'Yeh deadlock aur starvation create karega',
          'CPU utilization zero ho jayegi'
        ],
        correctAnswerIndex: 1,
        explanation: 'Agar quantum har process ke burst time se bada hoga, toh har process pehli baar mein hi khatam ho jayegi, jo bilkul FCFS jaisa behave karta hai.'
      },
      {
        id: 2,
        question: 'Round Robin mein Time Quantum ko extremely chota rakhne par sabse bada disadvantage kya hota hai?',
        options: [
          'Processes starve ho jayengi',
          'System throughput infinite ho jayegi',
          'Frequent Context Switching ki wajah se high CPU overhead hoga aur thrashing ho sakti hai',
          'Memory leak ho jayega'
        ],
        correctAnswerIndex: 2,
        explanation: 'Baar-baar interrupt aane se CPU registers save aur load karne mein hi busy rahega, actual user code execute nahi ho payega.'
      },
      {
        id: 3,
        question: 'Round Robin CPU scheduling ready queue ko maintain karne ke liye kaun sa data structure use karta hai?',
        options: [
          'Priority Queue (Min-Heap)',
          'FIFO Circular Queue',
          'Stack (LIFO)',
          'Binary Search Tree'
        ],
        correctAnswerIndex: 1,
        explanation: 'FIFO (First-In-First-Out) circular queue har process ko fair sequence mein CPU turn provide karti hai.'
      },
      {
        id: 4,
        question: 'Process scheduling mein Waiting Time (WT) nikalne ka sahi mathematical formula kya hai?',
        options: [
          'WT = Turnaround Time + Burst Time',
          'WT = Completion Time - Arrival Time',
          'WT = Turnaround Time - Burst Time',
          'WT = Burst Time - Arrival Time'
        ],
        correctAnswerIndex: 2,
        explanation: 'Total system time (Turnaround Time) mein se actual execution time (Burst Time) minus karne par waiting time milta hai.'
      },
      {
        id: 5,
        question: 'Round Robin algorithm mein process starvation kyun nahi ho sakti?',
        options: [
          'Aging algorithm use kiya jata hai',
          'Burst time pehle se measure hota hai',
          'Har process ko cyclic order mein guaranteed Time Quantum milta hai',
          'Priority dynamic hoti hai'
        ],
        correctAnswerIndex: 2,
        explanation: 'Circular queue continuous ghoomti rehti hai, isliye koi bhi lambi process choti processes ki wajah se hamesha ke liye block nahi hoti.'
      },
      {
        id: 6,
        question: 'Interactive environments mein Round Robin kaun se metric ko minimize karne ke liye best mana jata hai?',
        options: [
          'Turnaround Time',
          'Waiting Time',
          'Response Time',
          'Context Switch Count'
        ],
        correctAnswerIndex: 2,
        explanation: 'Sabhi processes ko foran CPU ka chota time slice mil jata hai, isliye pehla response bohot fast generate hota hai.'
      },
      {
        id: 7,
        question: 'Agar ready queue mein n processes hain aur time quantum q hai, toh kisi process ko agla slice lene ke liye maximum kitna wait karna hoga?',
        options: [
          'n * q',
          '(n - 1) * q',
          'q / n',
          '2 * n * q'
        ],
        correctAnswerIndex: 1,
        explanation: 'Baaqi (n - 1) processes apna 1-1 quantum use karengi, isliye maximum wait time (n - 1) * q hota hai.'
      },
      {
        id: 8,
        question: 'Rule of thumb ke mutabik kitne percent CPU bursts time quantum se chote hone chahiye?',
        options: [
          '20%',
          '50%',
          '80%',
          '100%'
        ],
        correctAnswerIndex: 2,
        explanation: 'Kam se kam 80% CPU bursts quantum se chote hone chahiye taaki unnecessary context switches avoid ho sakein.'
      },
      {
        id: 9,
        question: 'Round Robin mein process time quantum khatam hone se pehle CPU kab surrender karti hai?',
        options: [
          'Jab high priority job aati hai',
          'Jab process execute ho jaye ya I/O operation request kare',
          'Jab OS timer fail ho jaye',
          'Jab ready queue full ho jaye'
        ],
        correctAnswerIndex: 1,
        explanation: 'Agar process ka kaam complete ho jaye ya use user input / disk I/O chahiye ho, toh woh CPU voluntarily release karti hai.'
      },
      {
        id: 10,
        question: 'Fairness aur responsiveness achieve karne ke liye Round Robin kis cheez ka compromise karta hai?',
        options: [
          'Preemption capability',
          'Average Waiting Time (compared to SJF)',
          'Starvation immunity',
          'Circular queue support'
        ],
        correctAnswerIndex: 1,
        explanation: 'Shortest Job First minimum average waiting time ke liye optimal hai; Round Robin fairness ke liye thoda extra average waiting time accept karta hai.'
      }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'External Examiner: "Time Quantum ko 1 microsecond kyun nahi rakh dete taaki sab processes bilkul parallel mehsoos hon?"',
        shortAnswer: 'Agar Time Quantum infinitesimal kar diya toh Context Switching overhead poore CPU cycles consume kar lega, jisse CPU Thrashing hogi aur useful execution almost band ho jayega.',
        examinerTip: 'Viva mein "Context Switching Overhead" aur "CPU Thrashing" terms bolna compulsory hai.'
      },
      {
        id: 2,
        question: 'External Examiner: "Kya Round Robin mein FCFS ki tarah Convoy Effect hota hai? Ek line mein batao."',
        shortAnswer: 'Nahi, kyunki badi CPU burst wali process ko Time Quantum ke baad preempt kar diya jata hai, jisse peeche khadi choti I/O processes block nahi rehti.',
        examinerTip: 'FCFS ke saath contrast dikhana examiner ko bohot pasand aata hai.'
      },
      {
        id: 3,
        question: 'External Examiner: "Agar interactive aur background batch dono type ki processes hon toh Round Robin ko kaise modify karoge?"',
        shortAnswer: 'Multi-Level Feedback Queue (MLFQ) use karenge jisme top interactive queue par chota quantum hoga aur bottom batch queue par bada quantum ya FCFS hoga.',
        examinerTip: 'Yeh batane se prove hota hai ki aap basic theory ke sath advanced OS kernel design bhi samajhte hain.'
      }
    ],
    quickFormulaSheet: [
      { name: 'Turnaround Time (TAT)', formulaOrRule: 'TAT = Completion Time (CT) - Arrival Time (AT)', significance: 'Process submission se completion tak ka total time' },
      { name: 'Waiting Time (WT)', formulaOrRule: 'WT = Turnaround Time (TAT) - Burst Time (BT)', significance: 'Ready queue mein idle wait time' },
      { name: 'Maximum Waiting Delay', formulaOrRule: 'Max Wait = (n - 1) × q', significance: 'n processes ke circular loop mein maximum wait' },
      { name: 'Quantum Selection Rule', formulaOrRule: 'Quantum > 80% CPU bursts', significance: 'Context switch overhead reduce karne ke liye' }
    ],
    twoMinuteRevision: 'Round Robin ek preemptive, starvation-free scheduling algorithm hai jo FIFO ready queue aur Time Quantum par chalta hai. Chota quantum context switch overhead badhata hai, bada quantum FCFS ban jata hai. Numerical ke liye formulas yaad rakhein: TAT = CT - AT aur WT = TAT - BT.'
  },
  'os-round-robin_Hindi': {
    videoTitle: 'Round Robin CPU Scheduling Algorithm with Solved Example (Hindi)',
    channelOrInstructor: 'Gate Smashers (Varun Singla)',
    subject: 'Operating Systems',
    targetExamContext: 'GATE CSE, AKTU/VTU 4th Sem OS Exam, Technical Interviews',
    language: 'Hindi',
    summaryBullets: [
      'Round Robin एक Preemptive CPU Scheduling Algorithm है जिसे Time-Sharing और Interactive Systems के लिए तैयार किया गया है।',
      'प्रत्येक Process को निष्पादन के लिए एक निश्चित समय अंतराल दिया जाता है जिसे Time Quantum या Time Slice कहते हैं।',
      'Ready Queue को पूर्ण रूप से First-In-First-Out (FIFO) Circular Queue की तरह प्रबंधित किया जाता है।',
      'जब कार्यरत Process का Time Quantum समाप्त होता है, तब Hardware Timer Interrupt ट्रिगर होता है और Context Switch संपन्न होता है।',
      'Preempt की गई Process को Ready Queue के अंतिम सिरे (Tail) पर जोड़ दिया जाता है और अगली Process को CPU आवंटित किया जाता है।',
      'यदि कोई Process Time Quantum समाप्त होने से पहले अपना कार्य समाप्त कर लेती है, तो वह स्वेच्छा से CPU मुक्त कर देती है।',
      'Turnaround Time (TAT) की गणना का सूत्र है: Completion Time (CT) minus Arrival Time (AT)।',
      'Waiting Time (WT) की गणना का सूत्र है: Turnaround Time (TAT) minus Burst Time (BT)।',
      'Time Quantum का आकार अत्यंत महत्वपूर्ण है: अत्यधिक बड़ा Quantum इसे FCFS बना देता है, और अत्यधिक छोटा Quantum भारी Context Switching Overhead तथा Processor Thrashing उत्पन्न करता है।',
      'Round Robin पूर्णतः Starvation-Free होता है क्योंकि प्रत्येक Process को चक्रीय क्रम में CPU मिलने की गारंटी होती है।'
    ],
    keyTopics: [
      { timestamp: '00:00', seconds: 0, topic: 'Introduction & Time-Sharing Concept', oneLineDescription: 'बैच FCFS के स्थान पर इंटरैक्टिव प्रणालियों में चक्रीय शेड्यूलिंग की आवश्यकता।' },
      { timestamp: '02:15', seconds: 135, topic: 'Time Quantum & Ready Queue Structure', oneLineDescription: 'टाइम स्लाइस तथा टाइमर इंटरप्ट पर FIFO रेडी क्यू की कार्यप्रणाली।' },
      { timestamp: '05:30', seconds: 330, topic: 'Step-by-Step Gantt Chart Construction', oneLineDescription: 'P1 से P4 प्रक्रियाओं के साथ चरणबद्ध गैंट चार्ट तथा रेडी क्यू ट्रेसिंग।' },
      { timestamp: '09:10', seconds: 550, topic: 'Completion, TAT, और Waiting Time Calculation', oneLineDescription: 'CT, TAT = CT - AT, और WT = TAT - BT की गणना तथा औसत तालिका।' },
      { timestamp: '11:45', seconds: 705, topic: 'Time Quantum Magnitude का प्रभाव', oneLineDescription: 'विशाल क्वांटम पर FCFS तथा लघु क्वांटम पर थ्रैशिंग का प्रभाव।' },
      { timestamp: '13:20', seconds: 800, topic: 'Starvation & Minimum Response Time', oneLineDescription: 'भुखमरी से मुक्ति तथा न्यूनतम प्रतिक्रिया समय का गणितीय विश्लेषण।' }
    ],
    definitions: [
      {
        term: 'Time Quantum (Time Slice)',
        definition: 'एक पूर्व-निर्धारित निश्चित समय अंतराल जो CPU प्रत्येक Ready Process को Preemption से पूर्व प्रदान करता है।',
        examNote: 'विश्वविद्यालय परीक्षाओं में 2 अंक का अनिवार्य प्रश्न।'
      },
      {
        term: 'Preemptive Scheduling',
        definition: 'वह Scheduling नीति जिसमें ऑपरेटिंग सिस्टम किसी कार्यरत Process को बीच में रोककर Ready State में वापस भेज सकता है।',
        examNote: 'Non-Preemptive और Preemptive के 5 अंक के अंतर वाले प्रश्न के लिए मुख्य बिंदु।'
      },
      {
        term: 'Context Switch',
        definition: 'वर्तमान Process की स्थिति (Registers, Program Counter) को सहेजने तथा अगली Process की स्थिति लोड करने की आंतरिक प्रक्रिया।',
        examNote: 'यह शुद्ध रूप से Overhead समय है जिसमें कोई उपयोगी यूजर कोड नहीं चलता।'
      },
      {
        term: 'Turnaround Time (TAT)',
        definition: 'Process के सबमिट होने (Arrival Time) से पूर्ण होने (Completion Time) तक की कुल समयावधि। सूत्र: TAT = CT - AT।',
        examNote: 'संख्यात्मक प्रश्नों में CT के बाद सबसे पहली गणना।'
      },
      {
        term: 'Response Time',
        definition: 'Process के आगमन से लेकर CPU पर पहली बार निष्पादित होने तक का बीता हुआ समय।',
        examNote: 'Round Robin इस मापदंड में FCFS तथा SJF दोनों से श्रेष्ठ परिणाम देता है।'
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'यदि Round Robin Scheduling में Time Quantum को अनंत रूप से बड़ा कर दिया जाए तो क्या होगा?',
        options: [
          'यह Shortest Job First (SJF) बन जाएगा',
          'यह First-Come First-Served (FCFS) में परिवर्तित हो जाएगा',
          'यह Deadlock उत्पन्न कर देगा',
          'CPU की कार्यक्षमता शून्य हो जाएगी'
        ],
        correctAnswerIndex: 1,
        explanation: 'यदि Quantum सबसे लंबे Burst Time से अधिक होगा, तो प्रत्येक प्रक्रिया पहली बार में ही समाप्त हो जाएगी, जो कि FCFS का व्यवहार है।'
      },
      {
        id: 2,
        question: 'Round Robin में Time Quantum को अत्यधिक छोटा रखने की मुख्य हानि क्या है?',
        options: [
          'प्रक्रियाएं भुखमरी (Starvation) का शिकार होंगी',
          'CPU की कार्यक्षमता अनंत हो जाएगी',
          'लगातार Context Switching के कारण भारी CPU Overhead तथा Thrashing होगी',
          'मेमोरी लीक हो जाएगी'
        ],
        correctAnswerIndex: 2,
        explanation: 'अत्यधिक इंटरप्ट आने से CPU रजिस्टरों को सेव और लोड करने में ही उलझा रहेगा और उपयोगी यूजर निर्देश नहीं चलेंगे।'
      },
      {
        id: 3,
        question: 'Round Robin CPU Scheduling में Ready Queue को व्यवस्थित करने हेतु किस Data Structure का उपयोग होता है?',
        options: [
          'Priority Queue (Min-Heap)',
          'FIFO Circular Queue',
          'Stack (LIFO)',
          'Binary Search Tree'
        ],
        correctAnswerIndex: 1,
        explanation: 'FIFO सर्कुलर क्यू सभी प्रक्रियाओं को एक समान चक्रीय अवसर प्रदान करती है।'
      },
      {
        id: 4,
        question: 'CPU Scheduling में Waiting Time (WT) ज्ञात करने का सही गणितीय सूत्र क्या है?',
        options: [
          'WT = Turnaround Time + Burst Time',
          'WT = Completion Time - Arrival Time',
          'WT = Turnaround Time - Burst Time',
          'WT = Burst Time - Arrival Time'
        ],
        correctAnswerIndex: 2,
        explanation: 'सिस्टम में बिताए गए कुल समय (Turnaround Time) में से CPU निष्पादन समय (Burst Time) घटाने पर प्रतीक्षारत समय मिलता है।'
      },
      {
        id: 5,
        question: 'Round Robin Algorithm भुखमरी (Starvation) से मुक्त क्यों होता है?',
        options: [
          'एजिंग तकनीक का प्रयोग होता है',
          'बर्स्ट टाइम पहले से मापा जाता है',
          'प्रत्येक प्रक्रिया को चक्रीय क्रम में निश्चित Time Quantum मिलने की गारंटी होती है',
          'प्राथमिकता गतिशील होती है'
        ],
        correctAnswerIndex: 2,
        explanation: 'सर्कुलर क्यू लगातार घूमती रहती है, जिससे किसी भी लंबी प्रक्रिया के कारण छोटी प्रक्रिया हमेशा के लिए नहीं अटकती।'
      },
      {
        id: 6,
        question: 'इंटरैक्टिव सिस्टम में Round Robin किस मापदंड को न्यूनतम करने हेतु सर्वोत्तम है?',
        options: [
          'Turnaround Time',
          'Waiting Time',
          'Response Time',
          'Context Switch Count'
        ],
        correctAnswerIndex: 2,
        explanation: 'सभी प्रक्रियाओं को तुरंत छोटा समय मिल जाता है, जिससे पहला प्रत्युत्तर अत्यंत तीव्र गति से प्राप्त होता है।'
      },
      {
        id: 7,
        question: 'यदि n प्रक्रियाएं हैं और Time Quantum q है, तो किसी प्रक्रिया को अगला चांस मिलने में अधिकतम कितना विलंब होगा?',
        options: [
          'n * q',
          '(n - 1) * q',
          'q / n',
          '2 * n * q'
        ],
        correctAnswerIndex: 1,
        explanation: 'शेष (n - 1) प्रक्रियाएं अपना एक-एक क्वांटम लेंगी, इसलिए अधिकतम प्रतीक्षा (n - 1) * q होती है।'
      },
      {
        id: 8,
        question: 'सामान्य इंजीनियरिंग नियम के अनुसार कितने प्रतिशत CPU Bursts टाइम क्वांटम से छोटे होने चाहिए?',
        options: [
          '20%',
          '50%',
          '80%',
          '100%'
        ],
        correctAnswerIndex: 2,
        explanation: 'लगभग 80% बर्स्ट क्वांटम से छोटे होने चाहिए ताकि अनावश्यक कॉन्टेक्स्ट स्विच को रोका जा सके।'
      },
      {
        id: 9,
        question: 'Round Robin में प्रक्रिया Time Quantum समाप्त होने से पहले CPU कब छोड़ती है?',
        options: [
          'जब उच्च प्राथमिकता वाली जॉब आए',
          'जब कार्य पूर्ण हो जाए या I/O ऑपरेशन की आवश्यकता हो',
          'जब टाइमर हार्डवेयर विफल हो जाए',
          'जब रेडी क्यू भर जाए'
        ],
        correctAnswerIndex: 1,
        explanation: 'प्रक्रिया का निष्पादन समाप्त होने अथवा I/O के लिए प्रतीक्षा करने की स्थिति में CPU स्वेच्छा से मुक्त हो जाता है।'
      },
      {
        id: 10,
        question: 'निष्पक्षता और त्वरित प्रतिक्रिया पाने हेतु Round Robin किस पहलू से समझौता करता है?',
        options: [
          'Preemption क्षमता',
          'Average Waiting Time (SJF की तुलना में)',
          'भुखमरी से मुक्ति',
          'सर्कुलर क्यू सपोर्ट'
        ],
        correctAnswerIndex: 1,
        explanation: 'SJF न्यूनतम औसत प्रतीक्षा समय देता है; Round Robin निष्पक्षता और प्रतिक्रिया हेतु थोड़ा अधिक प्रतीक्षा समय स्वीकार करता है।'
      }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'External Examiner: "Time Quantum को 1 microsecond क्यों नहीं रख देते ताकि सभी processes यूजर को पूरी तरह पैरेलल लगें?"',
        shortAnswer: 'अत्यधिक सूक्ष्म क्वांटम रखने पर Context Switching Overhead सारे CPU चक्रों को नष्ट कर देगा, जिससे CPU Thrashing होगी और वास्तविक उपयोगी निष्पादन ठप हो जाएगा।',
        examinerTip: 'मौखिक परीक्षा में "Context Switching Overhead" और "CPU Thrashing" अवश्य बोलें।'
      },
      {
        id: 2,
        question: 'External Examiner: "क्या Round Robin में FCFS की तरह Convoy Effect संभव है? एक पंक्ति में उत्तर दें।"',
        shortAnswer: 'नहीं, क्योंकि भारी CPU Burst वाली प्रक्रिया को Time Quantum के बाद Preempt कर दिया जाता है, जिससे पीछे कतारबद्ध लघु I/O प्रक्रियाएं बाधित नहीं रहतीं।',
        examinerTip: 'FCFS के साथ तुलनात्मक अंतर परीक्षक को बहुत प्रभावित करता है।'
      },
      {
        id: 3,
        question: 'External Examiner: "यदि आपके पास Interactive और Background Batch दोनों तरह की प्रक्रियाएं हों तो Round Robin को कैसे ढालेंगे?"',
        shortAnswer: 'Multi-Level Feedback Queue (MLFQ) अपनाएंगे जिसमें शीर्ष इंटरैक्टिव कतार पर छोटा क्वांटम तथा निचली बैच कतार पर बड़ा क्वांटम अथवा FCFS होगा।',
        examinerTip: 'यह आपके OS कर्नल डिजाइन के गहन ज्ञान को प्रदर्शित करता है।'
      }
    ],
    quickFormulaSheet: [
      { name: 'Turnaround Time (TAT)', formulaOrRule: 'TAT = Completion Time (CT) - Arrival Time (AT)', significance: 'सबमिशन से पूर्ण होने तक का कुल समय' },
      { name: 'Waiting Time (WT)', formulaOrRule: 'WT = Turnaround Time (TAT) - Burst Time (BT)', significance: 'रेडी क्यू में व्यर्थ प्रतीक्षा का समय' },
      { name: 'Maximum Delay Rule', formulaOrRule: 'Max Wait = (n - 1) × q', significance: 'n प्रक्रियाओं के चक्रीय फेरे में अधिकतम प्रतीक्षा' },
      { name: 'Quantum Selection Rule', formulaOrRule: 'Quantum > 80% CPU bursts', significance: 'अनावश्यक स्विचिंग रोकने हेतु मानक नियम' }
    ],
    twoMinuteRevision: 'Round Robin एक Preemptive, Starvation-Free शेड्यूलिंग एल्गोरिदम है जो FIFO Ready Queue और Time Quantum पर कार्य करता है। छोटा क्वांटम स्विचिंग ओवरहेड बढ़ाता है, बड़ा क्वांटम FCFS बन जाता है। परीक्षा के लिए सूत्र याद रखें: TAT = CT - AT और WT = TAT - BT।'
  }
};

export function getPresetStudyMaterial(presetId: string, language: 'English' | 'Hinglish' | 'Hindi'): StudyMaterial | null {
  const specificKey = `${presetId}_${language}`;
  if (INITIAL_PRESET_MATERIALS[specificKey]) {
    return INITIAL_PRESET_MATERIALS[specificKey];
  }
  if (INITIAL_PRESET_MATERIALS[presetId]) {
    return {
      ...INITIAL_PRESET_MATERIALS[presetId],
      language
    };
  }
  return null;
}
