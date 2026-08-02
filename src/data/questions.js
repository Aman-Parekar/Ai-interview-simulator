export const questions = [
  // ---------- React ----------
  {
    id: 'react-1',
    category: 'react',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between props and state in React?',
    tags: ['props', 'state', 'basics'],
    answer:
      'Props are read-only inputs passed from a parent component to a child, while state is internal data managed by the component itself. Props are immutable within the receiving component; state is mutable via setState and triggers re-renders when it changes.',
    hints: [
      'Think about ownership and mutability.',
      'Props flow down; state lives inside the component.',
    ],
  },
  {
    id: 'react-2',
    category: 'react',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Explain the React reconciliation algorithm and the role of keys.',
    tags: ['reconciliation', 'keys', 'performance'],
    answer:
      'Reconciliation is React’s process of diffing the previous and next virtual DOM trees to compute the minimal set of DOM mutations. Keys help React identify which children changed by giving them a stable identity across renders, enabling efficient reordering instead of destructive re-creation.',
    hints: [
      'Mention the virtual DOM.',
      'Why are stable keys important in lists?',
    ],
  },
  {
    id: 'react-3',
    category: 'react',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'When would you use useMemo vs useCallback? What are the trade-offs?',
    tags: ['hooks', 'performance', 'memoization'],
    answer:
      'useMemo memoizes a computed value, useCallback memoizes a callback. Use them when the value/function is expensive or is a dependency of another memoized child. Trade-off: memoization itself costs memory and comparison time, so over-using them can hurt more than help.',
    hints: [
      'Consider referential equality.',
      'What is the cost of memoizing?',
    ],
  },
  {
    id: 'react-4',
    category: 'react',
    type: 'conceptual',
    difficulty: 'hard',
    question: 'How does React 18’s concurrent rendering change state updates? Explain transitions.',
    tags: ['concurrent', 'transitions', 'react-18'],
    answer:
      'Concurrent rendering lets React interrupt, pause, or discard in-progress renders. startTransition marks a state update as non-urgent, so React can keep the UI responsive to higher-priority input and render the transition in the background without blocking the main thread.',
    hints: [
      'Urgent vs non-urgent updates.',
      'What does useTransition return?',
    ],
  },
  {
    id: 'react-5',
    category: 'react',
    type: 'coding',
    difficulty: 'medium',
    question: 'Implement a custom hook useDebounce(value, delay) that returns a debounced value.',
    tags: ['hooks', 'debounce', 'custom-hooks'],
    answer:
      'function useDebounce(value, delay) { const [debounced, setDebounced] = useState(value); useEffect(() => { const t = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(t); }, [value, delay]); return debounced; }',
    hints: [
      'Use useEffect with a cleanup.',
      'setTimeout + clearTimeout.',
    ],
  },

  // ---------- JavaScript ----------
  {
    id: 'js-1',
    category: 'frontend',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between == and === in JavaScript?',
    tags: ['equality', 'coercion', 'basics'],
    answer:
      '== performs type coercion before comparing, while === checks both type and value without coercion. As a result, 0 == "0" is true but 0 === "0" is false. Prefer === to avoid subtle coercion bugs.',
    hints: [
      'Think about type coercion.',
      'Which one is stricter?',
    ],
  },
  {
    id: 'js-2',
    category: 'frontend',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Explain the event loop and the difference between the microtask and macrotask queues.',
    tags: ['event-loop', 'async', 'promises'],
    answer:
      'The event loop processes tasks from the call stack, then the microtask queue, then the macrotask queue. Microtasks (Promise callbacks, queueMicrotask) run after the current task and before the next macrotask (setTimeout, I/O). Microtasks are drained completely before rendering or macrotasks execute.',
    hints: [
      'Promises are microtasks.',
      'setTimeout is a macrotask.',
    ],
  },
  {
    id: 'js-3',
    category: 'frontend',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'What is a closure? Give a practical example.',
    tags: ['closures', 'scope', 'functions'],
    answer:
      'A closure is a function that retains access to its lexical scope even when called outside that scope. Example: a counter factory where an inner function increments a private variable declared in the outer function, and the inner function is returned and used elsewhere.',
    hints: [
      'Functions retain their lexical scope.',
      'Think about data privacy.',
    ],
  },
  {
    id: 'js-4',
    category: 'frontend',
    type: 'coding',
    difficulty: 'medium',
    question: 'Write a function that flattens a nested array of any depth without using Array.flat.',
    tags: ['arrays', 'recursion', 'coding'],
    answer:
      'function flatten(arr) { return arr.reduce((acc, v) => Array.isArray(v) ? acc.concat(flatten(v)) : acc.concat(v), []); }',
    hints: [
      'Recursion works well here.',
      'reduce + concat.',
    ],
  },

  // ---------- HTML / CSS ----------
  {
    id: 'html-1',
    category: 'frontend',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between inline, inline-block, and block elements?',
    tags: ['css', 'display', 'layout'],
    answer:
      'Block elements take the full width and start on a new line; inline elements flow with text and ignore width/height; inline-block flows like inline but allows width, height, margins and padding to be set.',
    hints: [
      'Think about width and line breaks.',
      'Which ones respect width/height?',
    ],
  },
  {
    id: 'css-1',
    category: 'frontend',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Explain the CSS box model and how box-sizing: border-box changes it.',
    tags: ['css', 'box-model', 'layout'],
    answer:
      'The box model consists of content, padding, border, and margin. With the default content-box, width/height apply only to content; padding and border add to the total size. border-box includes padding and border in the declared width/height, making sizing far more predictable.',
    hints: [
      'What does width include by default?',
      'Why is border-box popular?',
    ],
  },

  // ---------- Backend ----------
  {
    id: 'be-1',
    category: 'backend',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between SQL and NoSQL databases? When would you choose each?',
    tags: ['databases', 'sql', 'nosql'],
    answer:
      'SQL databases are relational, schema-driven and use ACID transactions — great for structured data and complex queries. NoSQL databases are non-relational, schema-flexible and designed for horizontal scale — good for unstructured data, high write throughput and rapid iteration.',
    hints: [
      'Think about schema and scaling.',
      'ACID vs BASE.',
    ],
  },
  {
    id: 'be-2',
    category: 'backend',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Explain idempotency in REST APIs and which HTTP methods are idempotent.',
    tags: ['rest', 'http', 'api-design'],
    answer:
      'An operation is idempotent if calling it multiple times has the same effect as calling it once. GET, PUT, and DELETE are idempotent; POST and PATCH are generally not. For example, repeated PUT updates produce the same final state, while repeated POST creates multiple resources.',
    hints: [
      'Same result after repeated calls.',
      'POST vs PUT.',
    ],
  },
  {
    id: 'be-3',
    category: 'backend',
    type: 'conceptual',
    difficulty: 'hard',
    question: 'How would you design a rate limiter for a public API? Compare token bucket and leaky bucket.',
    tags: ['rate-limiting', 'system-design', 'scalability'],
    answer:
      'A token bucket refills tokens at a fixed rate and allows bursts up to the bucket capacity. A leaky bucket processes requests at a constant rate, smoothing bursts. Token bucket is better for bursty but bounded traffic; leaky bucket enforces a strict steady rate. Store counters in Redis for shared state across instances.',
    hints: [
      'Burst vs steady rate.',
      'Where do you store the counters?',
    ],
  },

  // ---------- Java ----------
  {
    id: 'java-1',
    category: 'java',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between an interface and an abstract class in Java?',
    tags: ['oop', 'interfaces', 'abstract'],
    answer:
      'Abstract classes can have fields, constructors, and method implementations; a class can extend only one. Interfaces historically contained only abstract methods (now also default/static methods) and a class can implement many. Use abstract classes for shared state/behavior, interfaces for capability contracts.',
    hints: [
      'Single vs multiple inheritance.',
      'Fields and constructors?',
    ],
  },
  {
    id: 'java-2',
    category: 'java',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Explain how the JVM handles garbage collection. What is a generational GC?',
    tags: ['jvm', 'gc', 'memory'],
    answer:
      'The JVM heap is split into generations. Most objects die young, so a generational GC collects the young generation frequently (minor GCs) and the old generation less often (major GCs). Modern collectors like G1 and ZGC aim for low pause times by dividing the heap into regions and collecting concurrently.',
    hints: [
      'Most objects die young.',
      'Minor vs major GC.',
    ],
  },
  {
    id: 'java-3',
    category: 'java',
    type: 'coding',
    difficulty: 'medium',
    question: 'Implement a thread-safe singleton using double-checked locking.',
    tags: ['concurrency', 'singleton', 'patterns'],
    answer:
      'Use a private static volatile field, check it without locking first, then synchronize on the class, check again, and assign. The volatile keyword prevents publication of a partially-constructed object.',
    hints: [
      'Why volatile?',
      'Check twice before creating.',
    ],
  },

  // ---------- C++ ----------
  {
    id: 'cpp-1',
    category: 'cpp',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between a pointer and a reference in C++?',
    tags: ['pointers', 'references', 'basics'],
    answer:
      'A pointer is a variable holding an address; it can be null and reassigned. A reference is an alias for an existing object; it must be initialized, cannot be null, and cannot be reseated. References are generally safer and used for function parameters.',
    hints: [
      'Can it be null?',
      'Can it be reassigned?',
    ],
  },
  {
    id: 'cpp-2',
    category: 'cpp',
    type: 'conceptual',
    difficulty: 'hard',
    question: 'Explain RAII and how smart pointers enforce it.',
    tags: ['raii', 'smart-pointers', 'memory'],
    answer:
      'RAII (Resource Acquisition Is Initialization) ties resource lifetimes to object lifetimes — resources are acquired in constructors and released in destructors. unique_ptr enforces exclusive ownership and deletes on scope exit; shared_ptr uses reference counting; weak_ptr avoids cycles.',
    hints: [
      'Destructors release resources.',
      'unique_ptr vs shared_ptr.',
    ],
  },

  // ---------- Python ----------
  {
    id: 'py-1',
    category: 'python',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'What is the difference between a list and a tuple in Python?',
    tags: ['data-structures', 'basics'],
    answer:
      'Lists are mutable and use square brackets; tuples are immutable and use parentheses. Tuples are slightly faster and can be used as dictionary keys or set elements because they are hashable.',
    hints: [
      'Mutable vs immutable.',
      'Which can be a dict key?',
    ],
  },
  {
    id: 'py-2',
    category: 'python',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Explain decorators in Python and how they use closures.',
    tags: ['decorators', 'closures', 'functions'],
    answer:
      'A decorator is a function that takes a function and returns a new function, typically wrapping the original. Decorators rely on closures to capture the wrapped function and any arguments, allowing behavior to be added without modifying the original.',
    hints: [
      'A function that wraps another function.',
      'Closures capture the wrapped function.',
    ],
  },

  // ---------- Node.js ----------
  {
    id: 'node-1',
    category: 'node',
    type: 'conceptual',
    difficulty: 'easy',
    question: 'Is Node.js single-threaded? How does it handle concurrency?',
    tags: ['event-loop', 'concurrency', 'basics'],
    answer:
      'Node runs JavaScript on a single main thread, but delegates I/O to libuv, which maintains a thread pool for some operations and uses async I/O for others. Callbacks from completed I/O are queued back onto the event loop, giving the appearance of concurrency without multiple JS threads.',
    hints: [
      'One JS thread, but I/O is async.',
      'libuv and the thread pool.',
    ],
  },
  {
    id: 'node-2',
    category: 'node',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'What is a memory leak in a Node app and how would you diagnose one?',
    tags: ['memory', 'debugging', 'performance'],
    answer:
      'A leak occurs when references to objects are retained after they are no longer needed. Diagnose with heap snapshots in the Node inspector, compare snapshots before/after a workload, and look for retained closures, caches, or event listeners that grow unbounded.',
    hints: [
      'Retained references prevent GC.',
      'Heap snapshots help find them.',
    ],
  },

  // ---------- System Design ----------
  {
    id: 'sd-1',
    category: 'system-design',
    type: 'conceptual',
    difficulty: 'medium',
    question: 'Design a URL shortener like bit.ly. Walk through the key components.',
    tags: ['system-design', 'scalability', 'hashing'],
    answer:
      'Key components: an API service that accepts long URLs and returns short codes; a key-generation service (counter + base62 or hash) to produce unique codes; a datastore mapping short codes to long URLs; a cache (Redis) for hot URLs; and a redirect service that looks up and 301-redirects visitors. Scale with read replicas and CDN caching of redirects.',
    hints: [
      'How do you generate unique short codes?',
      'How do you make reads fast?',
    ],
  },
  {
    id: 'sd-2',
    category: 'system-design',
    type: 'conceptual',
    difficulty: 'hard',
    question: 'How would you design a distributed rate limiter that works across multiple servers?',
    tags: ['rate-limiting', 'distributed', 'redis'],
    answer:
      'Use a shared store like Redis to hold counters per client/key. Each server increments the counter atomically (INCR with TTL) and checks the limit. To reduce latency, use a sliding-window log or token bucket in Redis Lua scripts, and consider local pre-checks with periodic sync to avoid a Redis round trip on every request.',
    hints: [
      'Shared state across servers.',
      'Atomic increments in Redis.',
    ],
  },

  // ---------- Behavioral ----------
  {
    id: 'beh-1',
    category: 'behavioral',
    type: 'behavioral',
    difficulty: 'easy',
    question: 'Tell me about a time you faced a conflict with a teammate. How did you resolve it?',
    tags: ['conflict', 'teamwork', 'communication'],
    answer:
      'Use the STAR method: describe the Situation, the Task you were responsible for, the Action you took to address the conflict, and the Result. Emphasize listening, finding common ground, and the positive outcome for the team.',
    hints: [
      'Use STAR: Situation, Task, Action, Result.',
      'Focus on what you did, not what others did wrong.',
    ],
  },
  {
    id: 'beh-2',
    category: 'behavioral',
    type: 'behavioral',
    difficulty: 'medium',
    question: 'Describe a project that failed. What did you learn?',
    tags: ['failure', 'learning', 'reflection'],
    answer:
      'Be honest about what went wrong, take ownership, and focus on the lessons you applied afterward. A strong answer shows self-awareness, a concrete change in behavior, and a later success that demonstrates the lesson stuck.',
    hints: [
      'Take ownership rather than blaming.',
      'What did you change afterward?',
    ],
  },
  {
    id: 'beh-3',
    category: 'behavioral',
    type: 'behavioral',
    difficulty: 'medium',
    question: 'Tell me about a time you led a project under a tight deadline.',
    tags: ['leadership', 'prioritization', 'delivery'],
    answer:
      'Highlight how you prioritized scope, communicated trade-offs, delegated effectively, and kept stakeholders informed. End with the measurable result and what you would do differently.',
    hints: [
      'How did you prioritize?',
      'How did you keep stakeholders informed?',
    ],
  },
];

export const codingChallenges = [
  {
    id: 'code-1',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'frontend',
    statement:
      'Given an array of integers array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may assume each input has exactly one solution.',
    sampleInput: 'nums = [2, 7, 11, 15], target = 9',
    sampleOutput: '[0, 1]',
    starterCode:
      'function twoSum(nums, target) {\n  // your code here\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));',
    solution:
      'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n}',
  },
  {
    id: 'code-2',
    title: 'Valid Parentheses',
    difficulty: 'medium',
    category: 'frontend',
    statement:
      'Given a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. A string is valid if open brackets are closed by the same type and in the correct order.',
    sampleInput: 's = "()[]{}"',
    sampleOutput: 'true',
    starterCode:
      'function isValid(s) {\n  // your code here\n}\n\nconsole.log(isValid("()[]{}"));',
    solution:
      'function isValid(s) {\n  const stack = [];\n  const pairs = { ")": "(", "}": "{", "]": "[" };\n  for (const c of s) {\n    if (c in pairs) {\n      if (stack.pop() !== pairs[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}',
  },
  {
    id: 'code-3',
    title: 'Reverse a Linked List',
    difficulty: 'medium',
    category: 'backend',
    statement:
      'Given the head of a singly linked list, reverse the list and return the new head. Represent each node as `{ val, next }`.',
    sampleInput: 'head = 1 -> 2 -> 3 -> 4 -> 5',
    sampleOutput: '5 -> 4 -> 3 -> 2 -> 1',
    starterCode:
      'function reverseList(head) {\n  // your code here\n}',
    solution:
      'function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}',
  },
];
