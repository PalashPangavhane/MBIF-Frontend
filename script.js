/* ========================================
   MAGIC BUS FINANCE DASHBOARD
   Chat Interface JavaScript
   ======================================== */

// State
let queryCount = 0;
let dataPoints = 0;
let reportsCount = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeDate();
    initializeChat();
    initializeSuggestionChips();
    initializeAnalyticsPanel();
    console.log('Magic Bus Finance Dashboard initialized');
});

// Update Current Date
function initializeDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-GB', options);
}

// Initialize Chat
function initializeChat() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });

    // Send on Enter (without Shift)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener('click', sendMessage);
}

// Send Message
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (!message) return;

    // Hide welcome screen, show chat
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chat-messages').style.display = 'block';

    // Show analytics panel
    showAnalyticsPanel();

    // Add user message
    addMessage(message, 'user');

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Update counters
    updateSessionStats();

    // Simulate AI response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'assistant');
    }, 800);
}

// Add message to chat
function addMessage(content, type) {
    const chatMessages = document.getElementById('chat-messages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const avatarInitials = type === 'user' ? 'JR' : 'AI';

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarInitials}</div>
        <div class="message-content">${content}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate demo response
function generateResponse(query) {
    const queryLower = query.toLowerCase();

    if (queryLower.includes('budget') && queryLower.includes('actual')) {
        dataPoints += 156;
        return `<strong>Budget vs Actual Analysis - FY 2025-26</strong><br><br>
        Based on the current data:<br><br>
        <strong>Total Budget:</strong> ₹24.5 Cr<br>
        <strong>Actual Spent:</strong> ₹18.9 Cr (77.3% utilized)<br>
        <strong>Variance:</strong> ₹5.5 Cr (Under budget)<br><br>
        The organization is tracking well within budget. West Region shows the highest utilization at 82%, while South Region has the most room at 68% utilized.`;
    }

    if (queryLower.includes('expense') || queryLower.includes('spending')) {
        dataPoints += 89;
        return `<strong>Top Expenses This Month</strong><br><br>
        1. <strong>Salary & Benefits:</strong> ₹1.2 Cr (45%)<br>
        2. <strong>Training Programs:</strong> ₹58 L (22%)<br>
        3. <strong>Events & Activities:</strong> ₹47 L (18%)<br>
        4. <strong>Administrative:</strong> ₹39 L (15%)<br><br>
        Notable: Training costs increased 8% compared to last month due to the new coach onboarding program in West Region.`;
    }

    if (queryLower.includes('project') || queryLower.includes('status')) {
        dataPoints += 127;
        return `<strong>Project Status Overview</strong><br><br>
        <strong>Active Projects:</strong> 127<br>
        <strong>Running:</strong> 98 projects<br>
        <strong>Pending Approval:</strong> 15 projects<br>
        <strong>Closed This Month:</strong> 14 projects<br><br>
        Key projects:<br>
        • Co Impact-GP-HO - Running (₹4.2 Cr budget)<br>
        • Magic Bus UK-C2L - Running (₹3.8 Cr budget)<br>
        • Ripple Works Training - Closing soon`;
    }

    if (queryLower.includes('funder') || queryLower.includes('report')) {
        dataPoints += 203;
        reportsCount++;
        updateReportsCount();
        return `<strong>Funder Allocation Report Generated</strong><br><br>
        <strong>Top 5 Funders by Allocation:</strong><br><br>
        1. <strong>Co Impact-FC:</strong> 12 projects, ₹4.2 Cr<br>
        2. <strong>Magic Bus UK-FC:</strong> 8 projects, ₹3.8 Cr<br>
        3. <strong>Ripple Works Inc:</strong> 5 projects, ₹2.1 Cr<br>
        4. <strong>Corporate CSR Pool:</strong> 15 projects, ₹1.9 Cr<br>
        5. <strong>Government Grants:</strong> 22 projects, ₹1.5 Cr<br><br>
        <em>Report saved to your downloads.</em>`;
    }

    if (queryLower.includes('region') || queryLower.includes('west') || queryLower.includes('north')) {
        dataPoints += 78;
        return `<strong>Regional Distribution Analysis</strong><br><br>
        <strong>West Region (WR):</strong> 35% of budget, ₹8.6 Cr<br>
        <strong>North Region (NR):</strong> 28% of budget, ₹6.9 Cr<br>
        <strong>South Region (SR):</strong> 22% of budget, ₹5.4 Cr<br>
        <strong>Head Office (HO):</strong> 15% of budget, ₹3.7 Cr<br><br>
        West Region has the most active projects (45) and highest staff count (328 employees).`;
    }

    // Default response
    dataPoints += 45;
    return `I found relevant information in the database. Based on your query about "${query}", here's what I can tell you:<br><br>
    The Magic Bus Finance system currently tracks:<br>
    • <strong>127 active projects</strong> across 4 regions<br>
    • <strong>42 funders</strong> contributing to programs<br>
    • <strong>₹24.5 Cr</strong> total budget for FY 2025-26<br><br>
    Would you like me to drill down into any specific area?`;
}

// Update session statistics
function updateSessionStats() {
    queryCount++;
    document.getElementById('query-count').textContent = queryCount;
    document.getElementById('data-points').textContent = dataPoints.toLocaleString();
}

function updateReportsCount() {
    document.getElementById('reports-count').textContent = reportsCount;
}

// Suggestion Chips
function initializeSuggestionChips() {
    const chips = document.querySelectorAll('.chip');

    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const query = this.dataset.query;
            document.getElementById('chat-input').value = query;
            sendMessage();
        });
    });
}

// Analytics Panel
function initializeAnalyticsPanel() {
    const closeBtn = document.getElementById('close-analytics');

    closeBtn.addEventListener('click', function() {
        document.getElementById('sidebar-right').classList.remove('visible');
    });
}

function showAnalyticsPanel() {
    document.getElementById('sidebar-right').classList.add('visible');
}

// New Chat
document.querySelector('.new-chat-btn')?.addEventListener('click', function() {
    // Reset state
    queryCount = 0;
    dataPoints = 0;
    reportsCount = 0;

    // Update displays
    document.getElementById('query-count').textContent = '0';
    document.getElementById('data-points').textContent = '0';
    document.getElementById('reports-count').textContent = '0';

    // Clear messages
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('chat-messages').style.display = 'none';

    // Show welcome screen
    document.getElementById('welcome-screen').style.display = 'flex';

    // Hide analytics
    document.getElementById('sidebar-right').classList.remove('visible');
});

// History item clicks
document.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', function() {
        const query = this.querySelector('.history-text').textContent;
        document.getElementById('chat-input').value = query;
        sendMessage();
    });
});

// Console
console.log('%c Magic Bus Finance Dashboard ', 'background: #ffc107; color: #c41e3a; font-size: 16px; font-weight: bold; padding: 8px;');
