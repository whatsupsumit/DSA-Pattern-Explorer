// Comprehensive DSA Patterns Data
const patternsData = [
    {
        topic: 'Arrays & Hashing',
        patterns: [
            {
                id: 'two-sum',
                title: 'Two Sum / Pair Sum',
                description: 'Find two numbers in an array that sum to a target value.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                overview: `<p>The Two Sum pattern uses a hash map to store numbers we've seen and their indices. For each number, we check if its complement (target - current) exists in the map. This reduces the time complexity from O(n²) brute force to O(n).</p>
                
                <h4>Key Insights:</h4>
                <ul>
                    <li>Use a hash map to store visited numbers and their indices</li>
                    <li>For each number, calculate complement = target - current</li>
                    <li>Check if complement exists in the map</li>
                    <li>Return indices when found, otherwise add current number to map</li>
                </ul>`,
                problems: [
                    { name: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' },
                    { name: 'Two Sum II - Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Medium' },
                    { name: 'Two Sum IV - BST', url: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/', difficulty: 'Easy' }
                ],
                codeExample: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
                visualization: {
                    type: 'custom',
                    setup: (container) => {
                        const nums = [2, 7, 11, 15];
                        const target = 9;
                        container.innerHTML = `
                            <div class="text-center mb-4">
                                <p class="text-lg font-semibold">Finding Two Sum for target = ${target}</p>
                                <p class="text-sm text-gray-600">Array: [${nums.join(', ')}]</p>
                            </div>
                            <div id="array-container" class="flex justify-center gap-2 mb-4"></div>
                            <div id="map-container" class="bg-gray-100 p-4 rounded-lg mb-4">
                                <h4 class="font-semibold mb-2">Hash Map:</h4>
                                <div id="map-content" class="text-sm font-mono"></div>
                            </div>
                            <div id="step-info" class="text-center text-sm text-gray-600"></div>
                        `;
                        
                        const arrayContainer = container.querySelector('#array-container');
                        const mapContent = container.querySelector('#map-content');
                        const stepInfo = container.querySelector('#step-info');
                        
                        arrayContainer.innerHTML = nums.map((num, i) => 
                            `<div class="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center font-semibold" id="elem-${i}">${num}</div>`
                        ).join('');
                        
                        const map = new Map();
                        let step = 0;
                        
                        const interval = setInterval(() => {
                            if (step >= nums.length) {
                                clearInterval(interval);
                                return;
                            }
                            
                            const current = nums[step];
                            const complement = target - current;
                            
                            // Highlight current element
                            document.querySelector(`#elem-${step}`).classList.add('bg-yellow-400');
                            
                            stepInfo.textContent = `Step ${step + 1}: Current = ${current}, Complement = ${complement}`;
                            
                            if (map.has(complement)) {
                                // Found solution
                                const foundIndex = map.get(complement);
                                document.querySelector(`#elem-${foundIndex}`).classList.add('bg-green-400');
                                document.querySelector(`#elem-${step}`).classList.add('bg-green-400');
                                stepInfo.textContent = `Solution found! Indices: [${foundIndex}, ${step}]`;
                                clearInterval(interval);
                                return;
                            }
                            
                            map.set(current, step);
                            mapContent.innerHTML = Array.from(map.entries())
                                .map(([key, value]) => `${key} → ${value}`)
                                .join('<br>');
                            
                            step++;
                        }, 1500);
                    }
                }
            },
            {
                id: 'three-sum',
                title: 'Three Sum / Four Sum',
                description: 'Find unique triplets or quadruplets that sum to a target value.',
                timeComplexity: 'O(n²) for 3Sum, O(n³) for 4Sum',
                spaceComplexity: 'O(1)',
                overview: `<p>The Three Sum pattern extends Two Sum by adding a loop and using two pointers. Sort the array first, then for each element, use two pointers to find pairs that sum to the remaining target.</p>
                
                <h4>Key Steps:</h4>
                <ul>
                    <li>Sort the array to enable two-pointer technique</li>
                    <li>Use outer loop to fix first element</li>
                    <li>Use two pointers (left, right) for remaining elements</li>
                    <li>Skip duplicates to avoid duplicate triplets</li>
                </ul>`,
                problems: [
                    { name: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' },
                    { name: '3Sum Closest', url: 'https://leetcode.com/problems/3sum-closest/', difficulty: 'Medium' },
                    { name: '4Sum', url: 'https://leetcode.com/problems/4sum/', difficulty: 'Medium' }
                ],
                codeExample: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
                visualization: {
                    type: 'custom',
                    setup: (container) => {
                        container.innerHTML = `<p class="text-center">3Sum visualization - try the code implementation!</p>`;
                    }
                }
            },
            {
                id: 'subarray-sum-k',
                title: 'Subarray Sum Equals K',
                description: 'Count number of continuous subarrays whose sum equals k.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                overview: `<p>Use prefix sums and hash map. The key insight is that if prefixSum[j] - prefixSum[i] = k, then subarray from i+1 to j has sum k.</p>`,
                problems: [
                    { name: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium' },
                    { name: 'Subarray Sums Divisible by K', url: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/', difficulty: 'Medium' }
                ],
                codeExample: `function subarraySum(nums, k) {
    const map = new Map([[0, 1]); // prefixSum -> count
    let prefixSum = 0;
    let count = 0;
    
    for (const num of nums) {
        prefixSum += num;
        
        if (map.has(prefixSum - k)) {
            count += map.get(prefixSum - k);
        }
        
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
    }
    
    return count;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Prefix sum visualization</p>' }
            },
            {
                id: 'product-except-self',
                title: 'Product of Array Except Self',
                description: 'Return array where each element is product of all other elements.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Use left and right pass approach. First pass calculates left products, second pass calculates right products.</p>`,
                problems: [
                    { name: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium' }
                ],
                codeExample: `function productExceptSelf(nums) {
    const result = new Array(nums.length);
    
    // Left pass
    result[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right pass
    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }
    
    return result;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Product calculation visualization</p>' }
            },
            {
                id: 'merge-intervals',
                title: 'Merge Intervals',
                description: 'Merge overlapping intervals in an array.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Sort intervals by start time, then iterate and merge overlapping intervals.</p>`,
                problems: [
                    { name: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium' },
                    { name: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium' }
                ],
                codeExample: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.push(current);
        }
    }
    
    return result;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Interval merging visualization</p>' }
            },
            {
                id: 'kadane-algorithm',
                title: 'Kadane\'s Algorithm (Maximum Subarray)',
                description: 'Find the contiguous subarray with the largest sum.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Dynamic programming approach: at each position, decide whether to extend the existing subarray or start a new one.</p>`,
                problems: [
                    { name: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Easy' },
                    { name: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium' }
                ],
                codeExample: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Kadane\'s algorithm visualization</p>' }
            }
        ]
    },
    {
        topic: 'Two Pointers',
        patterns: [
            {
                id: 'two-pointers-basic',
                title: 'Two Pointers Technique',
                description: 'Use two pointers moving towards each other or in same direction.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Two pointers technique is used when you need to find pairs, remove duplicates, or search in sorted arrays efficiently.</p>`,
                problems: [
                    { name: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy' },
                    { name: 'Move Zeroes', url: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'Easy' },
                    { name: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium' }
                ],
                codeExample: `function removeDuplicates(nums) {
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Two pointers visualization</p>' }
            },
            {
                id: 'container-most-water',
                title: 'Container With Most Water',
                description: 'Find two lines that together with x-axis forms container holding most water.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Use two pointers at ends. Move the pointer with smaller height inward.</p>`,
                problems: [
                    { name: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium' },
                    { name: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard' }
                ],
                codeExample: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const water = Math.min(height[left], height[right]) * (right - left);
        maxWater = Math.max(maxWater, water);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Container visualization</p>' }
            }
        ]
    },
    {
        topic: 'Sliding Window',
        patterns: [
            {
                id: 'sliding-window-fixed',
                title: 'Fixed Size Sliding Window',
                description: 'Window of fixed size slides through array.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Maintain a window of fixed size k and slide it through the array, updating the result.</p>`,
                problems: [
                    { name: 'Maximum Average Subarray I', url: 'https://leetcode.com/problems/maximum-average-subarray-i/', difficulty: 'Easy' },
                    { name: 'Contains Duplicate II', url: 'https://leetcode.com/problems/contains-duplicate-ii/', difficulty: 'Easy' }
                ],
                codeExample: `function findMaxAverage(nums, k) {
    let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = sum;
    
    for (let i = k; i < nums.length; i++) {
        sum = sum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, sum);
    }
    
    return maxSum / k;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Fixed sliding window visualization</p>' }
            },
            {
                id: 'sliding-window-variable',
                title: 'Variable Size Sliding Window',
                description: 'Window size changes based on conditions.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(k)',
                overview: `<p>Expand window by moving right pointer, shrink by moving left pointer when condition is violated.</p>`,
                problems: [
                    { name: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
                    { name: 'Longest Repeating Character Replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium' }
                ],
                codeExample: `function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Variable sliding window visualization</p>' }
            }
        ]
    },
    {
        topic: 'Stack',
        patterns: [
            {
                id: 'valid-parentheses',
                title: 'Valid Parentheses',
                description: 'Check if parentheses are balanced using stack.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                overview: `<p>Use stack to track opening brackets, pop when closing bracket matches.</p>`,
                problems: [
                    { name: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy' },
                    { name: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium' }
                ],
                codeExample: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Stack parentheses validation</p>' }
            },
            {
                id: 'monotonic-stack',
                title: 'Monotonic Stack',
                description: 'Stack that maintains elements in sorted order.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                overview: `<p>Monotonic stack is used for finding next/previous greater/smaller elements efficiently.</p>`,
                problems: [
                    { name: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium' },
                    { name: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy' },
                    { name: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard' }
                ],
                codeExample: `function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // indices
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    }
    
    return result;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Monotonic stack visualization</p>' }
            }
        ]
    },
    {
        topic: 'Binary Search',
        patterns: [
            {
                id: 'binary-search-basic',
                title: 'Binary Search',
                description: 'Search in sorted array by repeatedly dividing search space.',
                timeComplexity: 'O(log n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Binary search divides the search space in half at each step, making it very efficient for sorted data.</p>`,
                problems: [
                    { name: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy' },
                    { name: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/', difficulty: 'Easy' }
                ],
                codeExample: `function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Binary search visualization</p>' }
            },
            {
                id: 'search-rotated-array',
                title: 'Search in Rotated Sorted Array',
                description: 'Binary search in rotated sorted array.',
                timeComplexity: 'O(log n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Determine which half is sorted, then decide which half to search.</p>`,
                problems: [
                    { name: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium' },
                    { name: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium' }
                ],
                codeExample: `function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) { // left half sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { // right half sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Rotated array search visualization</p>' }
            }
        ]
    },
    {
        topic: 'Linked List',
        patterns: [
            {
                id: 'reverse-linked-list',
                title: 'Reverse Linked List',
                description: 'Reverse the direction of pointers in linked list.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Use three pointers: prev, current, and next to reverse the links iteratively.</p>`,
                problems: [
                    { name: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy' },
                    { name: 'Reverse Linked List II', url: 'https://leetcode.com/problems/reverse-linked-list-ii/', difficulty: 'Medium' }
                ],
                codeExample: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Linked list reversal visualization</p>' }
            },
            {
                id: 'cycle-detection',
                title: 'Cycle Detection (Floyd\'s Algorithm)',
                description: 'Detect cycle in linked list using tortoise and hare.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Use two pointers: slow (moves 1 step) and fast (moves 2 steps). If there's a cycle, they'll meet.</p>`,
                problems: [
                    { name: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy' },
                    { name: 'Linked List Cycle II', url: 'https://leetcode.com/problems/linked-list-cycle-ii/', difficulty: 'Medium' }
                ],
                codeExample: `function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Cycle detection visualization</p>' }
            }
        ]
    },
    {
        topic: 'Trees',
        patterns: [
            {
                id: 'tree-traversals',
                title: 'Tree Traversals (DFS & BFS)',
                description: 'Different ways to visit all nodes in a tree.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h) for DFS, O(w) for BFS',
                overview: `<p>DFS (inorder, preorder, postorder) uses recursion or stack. BFS uses queue for level-by-level traversal.</p>`,
                problems: [
                    { name: 'Binary Tree Inorder Traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', difficulty: 'Easy' },
                    { name: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium' }
                ],
                codeExample: `function inorderTraversal(root) {
    const result = [];
    
    function dfs(node) {
        if (!node) return;
        
        dfs(node.left);
        result.push(node.val);
        dfs(node.right);
    }
    
    dfs(root);
    return result;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Tree traversal visualization</p>' }
            },
            {
                id: 'validate-bst',
                title: 'Validate Binary Search Tree',
                description: 'Check if tree satisfies BST property.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(h)',
                overview: `<p>For each node, check if it's within valid range (min, max) passed down from parent.</p>`,
                problems: [
                    { name: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium' },
                    { name: 'Recover Binary Search Tree', url: 'https://leetcode.com/problems/recover-binary-search-tree/', difficulty: 'Medium' }
                ],
                codeExample: `function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">BST validation visualization</p>' }
            }
        ]
    },
    {
        topic: 'Tries',
        patterns: [
            {
                id: 'implement-trie',
                title: 'Implement Trie (Prefix Tree)',
                description: 'Tree-like data structure for storing strings efficiently.',
                timeComplexity: 'O(m) for operations',
                spaceComplexity: 'O(ALPHABET_SIZE * N * M)',
                overview: `<p>Trie stores strings character by character. Each node represents a character and paths represent prefixes.</p>`,
                problems: [
                    { name: 'Implement Trie (Prefix Tree)', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium' },
                    { name: 'Word Search II', url: 'https://leetcode.com/problems/word-search-ii/', difficulty: 'Hard' }
                ],
                codeExample: `class Trie {
    constructor() {
        this.root = {};
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
        node.isEnd = true;
    }
    
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) return false;
            node = node[char];
        }
        return node.isEnd === true;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node[char]) return false;
            node = node[char];
        }
        return true;
    }
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Trie structure visualization</p>' }
            }
        ]
    },
    {
        topic: 'Heaps / Priority Queue',
        patterns: [
            {
                id: 'top-k-elements',
                title: 'Top K Elements',
                description: 'Find K largest/smallest elements using heap.',
                timeComplexity: 'O(n log k)',
                spaceComplexity: 'O(k)',
                overview: `<p>Use min-heap of size K for K largest elements, max-heap for K smallest elements.</p>`,
                problems: [
                    { name: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium' },
                    { name: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium' }
                ],
                codeExample: `function findKthLargest(nums, k) {
    // Using quickselect algorithm
    function partition(left, right, pivotIndex) {
        const pivot = nums[pivotIndex];
        [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
        
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (nums[i] > pivot) {
                [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
                storeIndex++;
            }
        }
        [nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]];
        return storeIndex;
    }
    
    function select(left, right, kSmallest) {
        if (left === right) return nums[left];
        
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const finalIndex = partition(left, right, pivotIndex);
        
        if (kSmallest === finalIndex) {
            return nums[kSmallest];
        } else if (kSmallest < finalIndex) {
            return select(left, finalIndex - 1, kSmallest);
        } else {
            return select(finalIndex + 1, right, kSmallest);
        }
    }
    
    return select(0, nums.length - 1, k - 1);
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Heap operations visualization</p>' }
            }
        ]
    },
    {
        topic: 'Backtracking',
        patterns: [
            {
                id: 'backtracking-subsets',
                title: 'Generate Subsets/Permutations',
                description: 'Generate all possible combinations using backtracking.',
                timeComplexity: 'O(2^n) for subsets',
                spaceComplexity: 'O(n)',
                overview: `<p>Use recursive backtracking: make choice, recurse, then backtrack (undo choice).</p>`,
                problems: [
                    { name: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium' },
                    { name: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium' },
                    { name: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium' }
                ],
                codeExample: `function subsets(nums) {
    const result = [];
    
    function backtrack(start, path) {
        result.push([...path]);
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop(); // backtrack
        }
    }
    
    backtrack(0, []);
    return result;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Backtracking tree visualization</p>' }
            }
        ]
    },
    {
        topic: 'Graphs',
        patterns: [
            {
                id: 'graph-dfs-bfs',
                title: 'Graph Traversal (DFS/BFS)',
                description: 'Visit all nodes in graph using DFS or BFS.',
                timeComplexity: 'O(V + E)',
                spaceComplexity: 'O(V)',
                overview: `<p>DFS uses stack (recursion), BFS uses queue. Both visit all reachable nodes.</p>`,
                problems: [
                    { name: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' },
                    { name: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium' }
                ],
                codeExample: `function numIslands(grid) {
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
            return;
        }
        
        grid[i][j] = '0'; // mark as visited
        
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j);
                count++;
            }
        }
    }
    
    return count;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Graph traversal visualization</p>' }
            },
            {
                id: 'topological-sort',
                title: 'Topological Sort',
                description: 'Linear ordering of vertices in DAG.',
                timeComplexity: 'O(V + E)',
                spaceComplexity: 'O(V)',
                overview: `<p>Use Kahn's algorithm: start with nodes having in-degree 0, remove edges, repeat.</p>`,
                problems: [
                    { name: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium' },
                    { name: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium' }
                ],
                codeExample: `function findOrder(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    const indegree = Array(numCourses).fill(0);
    
    // Build graph
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    while (queue.length) {
        const course = queue.shift();
        result.push(course);
        
        for (const nextCourse of graph[course]) {
            indegree[nextCourse]--;
            if (indegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    return result.length === numCourses ? result : [];
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Topological sort visualization</p>' }
            }
        ]
    },
    {
        topic: 'Dynamic Programming',
        patterns: [
            {
                id: 'dp-1d',
                title: '1D Dynamic Programming',
                description: 'DP problems with single dimension state.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n) or O(1)',
                overview: `<p>State depends on previous states in single dimension. Often can optimize space to O(1).</p>`,
                problems: [
                    { name: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy' },
                    { name: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium' },
                    { name: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium' }
                ],
                codeExample: `function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1; // f(1)
    let prev1 = 2; // f(2)
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">1D DP visualization</p>' }
            },
            {
                id: 'dp-2d',
                title: '2D Dynamic Programming',
                description: 'DP problems with two-dimensional state.',
                timeComplexity: 'O(m*n)',
                spaceComplexity: 'O(m*n)',
                overview: `<p>State depends on two dimensions, often representing grid problems or string comparisons.</p>`,
                problems: [
                    { name: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium' },
                    { name: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium' },
                    { name: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard' }
                ],
                codeExample: `function uniquePaths(m, n) {
    const dp = Array(m).fill(0).map(() => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">2D DP grid visualization</p>' }
            }
        ]
    },
    {
        topic: 'Greedy Algorithms',
        patterns: [
            {
                id: 'greedy-intervals',
                title: 'Interval Scheduling',
                description: 'Select maximum number of non-overlapping intervals.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Sort by end time, greedily select intervals that don't overlap with previously selected.</p>`,
                problems: [
                    { name: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium' },
                    { name: 'Minimum Number of Arrows to Burst Balloons', url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', difficulty: 'Medium' }
                ],
                codeExample: `function eraseOverlapIntervals(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let end = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            count++; // overlap, remove this interval
        } else {
            end = intervals[i][1];
        }
    }
    
    return count;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Greedy interval scheduling</p>' }
            }
        ]
    },
    {
        topic: 'Bit Manipulation',
        patterns: [
            {
                id: 'xor-properties',
                title: 'XOR Properties',
                description: 'Use XOR properties for efficient solutions.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                overview: `<p>Key XOR properties: x^x=0, x^0=x, commutative and associative.</p>`,
                problems: [
                    { name: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy' },
                    { name: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy' }
                ],
                codeExample: `function singleNumber(nums) {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">XOR operations visualization</p>' }
            }
        ]
    },
    {
        topic: 'Mathematics & Number Theory',
        patterns: [
            {
                id: 'gcd-lcm',
                title: 'GCD and LCM',
                description: 'Greatest Common Divisor and Least Common Multiple.',
                timeComplexity: 'O(log min(a,b))',
                spaceComplexity: 'O(1)',
                overview: `<p>Use Euclidean algorithm for GCD. LCM = (a*b)/GCD(a,b).</p>`,
                problems: [
                    { name: 'Find GCD of Array', url: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/', difficulty: 'Easy' }
                ],
                codeExample: `function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">GCD algorithm visualization</p>' }
            }
        ]
    },
    {
        topic: 'Strings',
        patterns: [
            {
                id: 'string-matching',
                title: 'String Matching Algorithms',
                description: 'Efficient algorithms for finding patterns in strings.',
                timeComplexity: 'O(n+m) for KMP',
                spaceComplexity: 'O(m)',
                overview: `<p>KMP uses failure function to avoid redundant comparisons. Rabin-Karp uses rolling hash.</p>`,
                problems: [
                    { name: 'Find the Index of the First Occurrence in a String', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', difficulty: 'Easy' },
                    { name: 'Repeated Substring Pattern', url: 'https://leetcode.com/problems/repeated-substring-pattern/', difficulty: 'Easy' }
                ],
                codeExample: `function strStr(haystack, needle) {
    if (needle.length === 0) return 0;
    
    // Build failure function for KMP
    const lps = Array(needle.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < needle.length) {
        if (needle[i] === needle[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    // KMP search
    i = 0; // haystack index
    let j = 0; // needle index
    
    while (i < haystack.length) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
        }
        
        if (j === needle.length) {
            return i - j;
        } else if (i < haystack.length && haystack[i] !== needle[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return -1;
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">String matching visualization</p>' }
            }
        ]
    },
    {
        topic: 'Advanced Topics',
        patterns: [
            {
                id: 'segment-trees',
                title: 'Segment Trees',
                description: 'Tree data structure for range queries and updates.',
                timeComplexity: 'O(log n) per operation',
                spaceComplexity: 'O(n)',
                overview: `<p>Segment tree allows range queries and updates in O(log n) time. Build tree bottom-up.</p>`,
                problems: [
                    { name: 'Range Sum Query - Mutable', url: 'https://leetcode.com/problems/range-sum-query-mutable/', difficulty: 'Medium' }
                ],
                codeExample: `class SegmentTree {
    constructor(nums) {
        this.n = nums.length;
        this.tree = Array(2 * this.n);
        
        // Build tree
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = nums[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
        }
    }
    
    update(index, val) {
        index += this.n;
        this.tree[index] = val;
        
        while (index > 1) {
            this.tree[Math.floor(index / 2)] = 
                this.tree[index] + this.tree[index ^ 1];
            index = Math.floor(index / 2);
        }
    }
    
    sumRange(left, right) {
        left += this.n;
        right += this.n + 1;
        let sum = 0;
        
        while (left < right) {
            if (left % 2 === 1) {
                sum += this.tree[left];
                left++;
            }
            if (right % 2 === 1) {
                right--;
                sum += this.tree[right];
            }
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        
        return sum;
    }
}`,
                visualization: { type: 'custom', setup: (c) => c.innerHTML = '<p class="text-center">Segment tree structure visualization</p>' }
            }
        ]
    }
];
