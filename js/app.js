// Main Application Logic for DSA Pattern Explorer

class DSAPatternExplorer {
    constructor() {
        this.allPatterns = patternsData.flatMap(topic => 
            topic.patterns.map(p => ({ ...p, topic: topic.topic }))
        );
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderSidebar();
        this.renderContent();
        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        // Search functionality
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('md:block');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target) &&
                sidebar.classList.contains('md:block')) {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('md:block');
            }
        });

        // Handle hash changes for direct navigation
        window.addEventListener('hashchange', () => {
            this.scrollToPattern();
        });

        // Initial scroll if hash exists
        if (window.location.hash) {
            setTimeout(() => this.scrollToPattern(), 100);
        }
    }

    handleSearch(query) {
        this.renderSidebar(query);
        if (query.trim()) {
            this.highlightSearchResults(query);
        } else {
            this.clearHighlights();
        }
    }

    highlightSearchResults(query) {
        const sections = document.querySelectorAll('#content-sections section');
        sections.forEach(section => {
            const title = section.querySelector('h2').textContent.toLowerCase();
            const description = section.querySelector('.text-gray-600').textContent.toLowerCase();
            const isMatch = title.includes(query.toLowerCase()) || 
                           description.includes(query.toLowerCase());
            
            if (isMatch) {
                section.style.border = '2px solid #3b82f6';
                section.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
            } else {
                section.style.border = '';
                section.style.boxShadow = '';
            }
        });
    }

    clearHighlights() {
        const sections = document.querySelectorAll('#content-sections section');
        sections.forEach(section => {
            section.style.border = '';
            section.style.boxShadow = '';
        });
    }

    renderSidebar(filter = '') {
        const sidebarNav = document.getElementById('sidebar-nav');
        sidebarNav.innerHTML = '';

        patternsData.forEach(topic => {
            const filteredPatterns = topic.patterns.filter(p => 
                filter === '' || 
                p.title.toLowerCase().includes(filter.toLowerCase()) ||
                p.description.toLowerCase().includes(filter.toLowerCase()) ||
                topic.topic.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredPatterns.length === 0 && filter !== '') return;

            // Create topic section
            const topicDiv = document.createElement('div');
            topicDiv.className = 'mb-4';

            const topicHeader = document.createElement('h3');
            topicHeader.className = 'text-sm font-semibold text-gray-900 mb-2 px-2 py-1 bg-gray-100 rounded';
            topicHeader.textContent = topic.topic;
            topicDiv.appendChild(topicHeader);

            const patternsList = document.createElement('ul');
            patternsList.className = 'space-y-1 ml-2';

            (filter === '' ? topic.patterns : filteredPatterns).forEach(pattern => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${pattern.id}`;
                a.textContent = pattern.title;
                a.className = 'block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200';
                
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToPattern(pattern.id);
                    
                    // Close mobile menu
                    if (window.innerWidth < 768) {
                        const sidebar = document.getElementById('sidebar');
                        sidebar.classList.add('hidden');
                        sidebar.classList.remove('md:block');
                    }
                });

                li.appendChild(a);
                patternsList.appendChild(li);
            });

            topicDiv.appendChild(patternsList);
            sidebarNav.appendChild(topicDiv);
        });
    }

    renderContent() {
        const contentSections = document.getElementById('content-sections');
        contentSections.innerHTML = '';

        this.allPatterns.forEach(pattern => {
            const section = this.createPatternSection(pattern);
            contentSections.appendChild(section);
        });

        // Setup tab functionality
        this.setupTabs();
    }

    createPatternSection(pattern) {
        const section = document.createElement('section');
        section.id = pattern.id;
        section.className = 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden';

        section.innerHTML = `
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <h2 class="text-2xl font-bold text-gray-900">${pattern.title}</h2>
                            <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">${pattern.topic}</span>
                        </div>
                        <p class="text-gray-600 mb-3">${pattern.description}</p>
                        <div class="flex gap-4 text-sm">
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-md font-mono">
                                Time: ${pattern.timeComplexity}
                            </span>
                            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-md font-mono">
                                Space: ${pattern.spaceComplexity}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Tab Navigation -->
                <nav class="flex space-x-1" role="tablist">
                    <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700" 
                            data-tab="overview" data-pattern="${pattern.id}">
                        Overview
                    </button>
                    <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700" 
                            data-tab="problems" data-pattern="${pattern.id}">
                        Problems (${pattern.problems.length})
                    </button>
                    <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700" 
                            data-tab="code" data-pattern="${pattern.id}">
                        Code
                    </button>
                    <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700" 
                            data-tab="visualization" data-pattern="${pattern.id}">
                        Visualization
                    </button>
                </nav>
            </div>
            
            <div class="p-6">
                <!-- Overview Tab -->
                <div class="tab-content active" data-tab="overview" data-pattern="${pattern.id}">
                    <div class="prose max-w-none">
                        ${pattern.overview}
                    </div>
                </div>
                
                <!-- Problems Tab -->
                <div class="tab-content hidden" data-tab="problems" data-pattern="${pattern.id}">
                    <div class="grid gap-3">
                        ${pattern.problems.map(problem => `
                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div>
                                    <a href="${problem.url}" target="_blank" 
                                       class="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                        ${problem.name}
                                    </a>
                                    <span class="ml-2 px-2 py-1 text-xs rounded-full ${this.getDifficultyClass(problem.difficulty)}">
                                        ${problem.difficulty}
                                    </span>
                                </div>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Code Tab -->
                <div class="tab-content hidden" data-tab="code" data-pattern="${pattern.id}">
                    <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre class="text-gray-100 text-sm"><code>${this.escapeHtml(pattern.codeExample)}</code></pre>
                    </div>
                    <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">💡 Key Points:</h4>
                        <ul class="text-sm text-blue-800 space-y-1">
                            <li>• Time Complexity: <code class="bg-blue-200 px-1 rounded">${pattern.timeComplexity}</code></li>
                            <li>• Space Complexity: <code class="bg-blue-200 px-1 rounded">${pattern.spaceComplexity}</code></li>
                            <li>• This implementation showcases the core algorithm pattern</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Visualization Tab -->
                <div class="tab-content hidden" data-tab="visualization" data-pattern="${pattern.id}">
                    <div class="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div id="viz-${pattern.id}" class="w-full p-4">
                            <p class="text-center text-gray-500">Click to load interactive visualization</p>
                            <div class="text-center mt-4">
                                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        onclick="loadVisualization('${pattern.id}')">
                                    Load Visualization
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return section;
    }

    setupTabs() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                const patternId = e.target.dataset.pattern;
                const tabName = e.target.dataset.tab;
                this.switchTab(patternId, tabName, e.target);
            }
        });
    }

    switchTab(patternId, tabName, clickedBtn) {
        // Update button states
        const allTabBtns = document.querySelectorAll(`[data-pattern="${patternId}"].tab-btn`);
        allTabBtns.forEach(btn => {
            btn.className = 'tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700';
        });
        clickedBtn.className = 'tab-btn px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700';

        // Update content visibility
        const allTabContent = document.querySelectorAll(`[data-pattern="${patternId}"].tab-content`);
        allTabContent.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });

        const activeContent = document.querySelector(`[data-pattern="${patternId}"][data-tab="${tabName}"].tab-content`);
        if (activeContent) {
            activeContent.classList.remove('hidden');
            activeContent.classList.add('active');
        }
    }

    getDifficultyClass(difficulty) {
        switch(difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    navigateToPattern(patternId) {
        const element = document.getElementById(patternId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, null, `#${patternId}`);
        }
    }

    scrollToPattern() {
        const patternId = window.location.hash.substring(1);
        if (patternId) {
            setTimeout(() => {
                const element = document.getElementById(patternId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.updateActiveNavItem(id);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-10% 0px -80% 0px'
        });

        // Observe all pattern sections
        document.querySelectorAll('#content-sections section').forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavItem(activeId) {
        // Remove active class from all nav items
        document.querySelectorAll('#sidebar-nav a').forEach(link => {
            link.classList.remove('font-semibold', 'text-blue-600', 'bg-blue-50');
            link.classList.add('text-gray-600');
        });

        // Add active class to current nav item
        const activeLink = document.querySelector(`#sidebar-nav a[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.remove('text-gray-600');
            activeLink.classList.add('font-semibold', 'text-blue-600', 'bg-blue-50');
        }
    }
}

// Global function to load visualizations
window.loadVisualization = function(patternId) {
    const pattern = patternsData.flatMap(topic => topic.patterns).find(p => p.id === patternId);
    if (pattern && pattern.visualization && pattern.visualization.setup) {
        const vizContainer = document.getElementById(`viz-${patternId}`);
        vizContainer.innerHTML = '';
        
        try {
            pattern.visualization.setup(vizContainer);
        } catch (error) {
            vizContainer.innerHTML = `
                <div class="text-center text-red-600">
                    <p>Error loading visualization</p>
                    <p class="text-sm mt-2">${error.message}</p>
                </div>
            `;
        }
    }
};

// Performance optimization: Lazy loading for code syntax highlighting
function loadSyntaxHighlighter() {
    // Future enhancement: Add syntax highlighting library
    console.log('Syntax highlighter would be loaded here');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DSAPatternExplorer();
    
    // Add some CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .tab-content {
            transition: opacity 0.2s ease-in-out;
        }
        
        .tab-content.hidden {
            opacity: 0;
        }
        
        .tab-content.active {
            opacity: 1;
        }
        
        section {
            scroll-margin-top: 100px;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        section {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Custom scrollbar */
        #sidebar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
        }
        
        #sidebar::-webkit-scrollbar {
            width: 6px;
        }
        
        #sidebar::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        
        #sidebar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 3px;
        }
        
        #sidebar::-webkit-scrollbar-thumb:hover {
            background-color: #94a3b8;
        }
    `;
    document.head.appendChild(style);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-bar').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchBar = document.getElementById('search-bar');
        if (document.activeElement === searchBar) {
            searchBar.value = '';
            searchBar.blur();
            // Trigger search clear
            const event = new Event('input');
            searchBar.dispatchEvent(event);
        }
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DSAPatternExplorer;
}
