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
        const responseData = generateResponse(message);
        addMessage(responseData.response, 'assistant', responseData.prompts);
    }, 800);
}

// Add message to chat
function addMessage(content, type, recommendedPrompts = null) {
    const chatMessages = document.getElementById('chat-messages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const avatarInitials = type === 'user' ? 'JR' : 'AI';

    let promptsHTML = '';
    if (recommendedPrompts && recommendedPrompts.length > 0) {
        promptsHTML = `
            <div class="recommended-prompts">
                <div class="prompts-title">Recommended next queries:</div>
                <div class="prompt-chips">
                    ${recommendedPrompts.map(p => `<button class="prompt-chip" data-query="${p}">${p}</button>`).join('')}
                </div>
            </div>
        `;
    }

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarInitials}</div>
        <div class="message-content">${content}${promptsHTML}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add click handlers to prompt chips
    if (recommendedPrompts) {
        messageDiv.querySelectorAll('.prompt-chip').forEach(chip => {
            chip.addEventListener('click', function() {
                document.getElementById('chat-input').value = this.dataset.query;
                sendMessage();
            });
        });
    }
}

// Generate demo response with recommended prompts
function generateResponse(query) {
    const queryLower = query.toLowerCase();

    if (queryLower.includes('budget') && queryLower.includes('actual')) {
        dataPoints += 256;
        return {
            response: `<strong>Budget vs Actual Analysis - FY 2024-25</strong><br><br>
            Based on the current financial data:<br><br>
            <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                <tr style="background: #f7f7f8;"><td style="padding: 8px; border: 1px solid #e5e5e5;"><strong>Total Income</strong></td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹142.8 Cr</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #e5e5e5;"><strong>Programme Expenses</strong></td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹118.4 Cr (82.9%)</td></tr>
                <tr style="background: #f7f7f8;"><td style="padding: 8px; border: 1px solid #e5e5e5;"><strong>Admin Expenses</strong></td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹17.1 Cr (12%)</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #e5e5e5;"><strong>Surplus</strong></td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹7.3 Cr</td></tr>
            </table>
            <br><strong>Key Insight:</strong> Programme spending efficiency improved by 4.2% compared to FY 2023-24. West Region shows highest budget utilization at 94%.`,
            prompts: [
                'Show regional budget breakdown',
                'Compare with last year',
                'Which projects are over budget?',
                'Forecast next quarter spend'
            ]
        };
    }

    if (queryLower.includes('expense') || queryLower.includes('spending') || queryLower.includes('top expenses')) {
        dataPoints += 189;
        return {
            response: `<strong>Expense Analysis - FY 2024-25</strong><br><br>
            <strong>Category-wise Breakdown:</strong><br><br>
            1. <strong>Salary & Benefits:</strong> ₹49.7 Cr (42%)<br>
            &nbsp;&nbsp;&nbsp;• 1,847 employees across 22 states<br>
            &nbsp;&nbsp;&nbsp;• YoY increase: 8.3%<br><br>
            2. <strong>Training & Programme:</strong> ₹33.2 Cr (28%)<br>
            &nbsp;&nbsp;&nbsp;• Life Skills Education: ₹18.4 Cr<br>
            &nbsp;&nbsp;&nbsp;• AI-Connect Programme: ₹8.2 Cr<br>
            &nbsp;&nbsp;&nbsp;• Livelihood Training: ₹6.6 Cr<br><br>
            3. <strong>Events & Activities:</strong> ₹21.3 Cr (18%)<br>
            &nbsp;&nbsp;&nbsp;• 475 volunteering events conducted<br><br>
            4. <strong>Administrative:</strong> ₹14.2 Cr (12%)<br>
            &nbsp;&nbsp;&nbsp;• Office operations, travel, utilities<br><br>
            <strong>Retail Fundraising Performance:</strong> ₹11.98 Cr (+31.8% vs LY)`,
            prompts: [
                'Break down salary by region',
                'Show training cost trends',
                'Compare admin costs YoY',
                'AI-Connect programme details'
            ]
        };
    }

    if (queryLower.includes('project') || queryLower.includes('status')) {
        dataPoints += 327;
        return {
            response: `<strong>Project Status Overview - FY 2024-25</strong><br><br>
            <strong>Portfolio Summary:</strong><br>
            • <strong>Total Active Projects:</strong> 127<br>
            • <strong>Running:</strong> 98 projects<br>
            • <strong>Closing Soon:</strong> 18 projects<br>
            • <strong>New This Year:</strong> 11 projects<br><br>
            <strong>By Programme Type:</strong><br>
            • Adolescent Programme (Direct): 45 projects<br>
            • Government Partnership: 38 projects<br>
            • Livelihood Programme: 32 projects<br>
            • AI-Connect: 12 projects<br><br>
            <strong>Top Projects by Budget:</strong><br>
            1. Co Impact-GP-HO (₹18.2 Cr) - Running<br>
            2. Magic Bus UK-C2L (₹14.9 Cr) - Running<br>
            3. Michael Dell Foundation (₹10.1 Cr) - Running<br>
            4. Ripple Works Training (₹7.5 Cr) - Running<br><br>
            <strong>Impact:</strong> 50 Lakh+ lives impacted since 1999`,
            prompts: [
                'Show projects ending this quarter',
                'West Region project details',
                'Which funders have most projects?',
                'Project-wise budget utilization'
            ]
        };
    }

    if (queryLower.includes('funder') || queryLower.includes('report') || queryLower.includes('donor')) {
        dataPoints += 403;
        reportsCount++;
        updateReportsCount();
        return {
            response: `<strong>Funder Allocation Report - FY 2024-25</strong><br><br>
            <strong>Top 10 Funders by Contribution:</strong><br><br>
            <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                <tr style="background: #ffc107; color: #c41e3a;"><th style="padding: 8px; border: 1px solid #e5e5e5;">Funder</th><th style="padding: 8px; border: 1px solid #e5e5e5;">Projects</th><th style="padding: 8px; border: 1px solid #e5e5e5;">Amount</th></tr>
                <tr><td style="padding: 8px; border: 1px solid #e5e5e5;">Magic Bus UK</td><td style="padding: 8px; border: 1px solid #e5e5e5;">14</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹18.2 Cr</td></tr>
                <tr style="background: #f7f7f8;"><td style="padding: 8px; border: 1px solid #e5e5e5;">Co Impact</td><td style="padding: 8px; border: 1px solid #e5e5e5;">12</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹14.9 Cr</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #e5e5e5;">Michael & Susan Dell Foundation</td><td style="padding: 8px; border: 1px solid #e5e5e5;">8</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹10.1 Cr</td></tr>
                <tr style="background: #f7f7f8;"><td style="padding: 8px; border: 1px solid #e5e5e5;">Ripple Works Inc</td><td style="padding: 8px; border: 1px solid #e5e5e5;">5</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹7.5 Cr</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #e5e5e5;">British Asian Trust</td><td style="padding: 8px; border: 1px solid #e5e5e5;">6</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹6.0 Cr</td></tr>
                <tr style="background: #f7f7f8;"><td style="padding: 8px; border: 1px solid #e5e5e5;">Barclays</td><td style="padding: 8px; border: 1px solid #e5e5e5;">4</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹4.8 Cr</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #e5e5e5;">JP Morgan</td><td style="padding: 8px; border: 1px solid #e5e5e5;">3</td><td style="padding: 8px; border: 1px solid #e5e5e5;">₹3.9 Cr</td></tr>
            </table>
            <br><strong>Funding Source Mix:</strong><br>
            • Foreign Contribution (FC): 65%<br>
            • Non-FC (Domestic): 30%<br>
            • CSR: 5%<br><br>
            <strong>New Donors Acquired:</strong> 87,177 (+76% YoY)`,
            prompts: [
                'Show FC vs NFC breakdown',
                'Funder-wise project mapping',
                'Donor retention rate',
                'Pending funder payments'
            ]
        };
    }

    if (queryLower.includes('region') || queryLower.includes('west') || queryLower.includes('north') || queryLower.includes('south')) {
        dataPoints += 278;
        return {
            response: `<strong>Regional Distribution Analysis - FY 2024-25</strong><br><br>
            <strong>Budget Allocation by Region:</strong><br><br>
            <strong>1. West Region (WR) - 38%</strong><br>
            &nbsp;&nbsp;&nbsp;Budget: ₹54.3 Cr | Utilized: 94%<br>
            &nbsp;&nbsp;&nbsp;States: Maharashtra, Gujarat, Rajasthan<br>
            &nbsp;&nbsp;&nbsp;Projects: 45 | Staff: 628<br><br>
            <strong>2. North Region (NR) - 27%</strong><br>
            &nbsp;&nbsp;&nbsp;Budget: ₹38.6 Cr | Utilized: 87%<br>
            &nbsp;&nbsp;&nbsp;States: Delhi, UP, Bihar, Jharkhand<br>
            &nbsp;&nbsp;&nbsp;Projects: 38 | Staff: 512<br><br>
            <strong>3. South Region (SR) - 22%</strong><br>
            &nbsp;&nbsp;&nbsp;Budget: ₹31.4 Cr | Utilized: 82%<br>
            &nbsp;&nbsp;&nbsp;States: Karnataka, Tamil Nadu, AP, Telangana<br>
            &nbsp;&nbsp;&nbsp;Projects: 28 | Staff: 398<br><br>
            <strong>4. Head Office (HO) - 13%</strong><br>
            &nbsp;&nbsp;&nbsp;Budget: ₹18.5 Cr | Utilized: 91%<br>
            &nbsp;&nbsp;&nbsp;Central operations, IT, Finance, HR<br><br>
            <strong>Coverage:</strong> 22 States & UTs`,
            prompts: [
                'West Region project details',
                'Compare regional efficiency',
                'Staff distribution by region',
                'State-wise expense breakdown'
            ]
        };
    }

    if (queryLower.includes('ai') || queryLower.includes('connect') || queryLower.includes('skill')) {
        dataPoints += 156;
        return {
            response: `<strong>AI-Connect Programme Status - FY 2024-25</strong><br><br>
            <strong>Programme Overview:</strong><br>
            Magic Bus's "AI for Masses" initiative equips underserved youth with AI literacy and future-ready skills.<br><br>
            <strong>Key Metrics:</strong><br>
            • <strong>Youth Skilled:</strong> 35,000<br>
            • <strong>Target FY 25-26:</strong> 1,50,000<br>
            • <strong>Budget Allocated:</strong> ₹8.2 Cr<br>
            • <strong>Utilized:</strong> ₹6.8 Cr (83%)<br><br>
            <strong>AI VANI:</strong> Multilingual AI-powered voice tutor<br>
            • Languages: Hindi, Marathi, Tamil, Telugu<br>
            • Daily active users: 12,400<br>
            • Average session: 18 mins<br><br>
            <strong>Partnerships:</strong> Microsoft, Google, Infosys Foundation`,
            prompts: [
                'AI-Connect state-wise rollout',
                'Compare with traditional training',
                'Youth employment outcomes',
                'Technology infrastructure costs'
            ]
        };
    }

    if (queryLower.includes('livelihood') || queryLower.includes('employment') || queryLower.includes('job')) {
        dataPoints += 234;
        return {
            response: `<strong>Livelihood Programme Analysis - FY 2024-25</strong><br><br>
            <strong>Programme Focus:</strong><br>
            Empowering youth (18-25) and women (25+) with employability skills for sustainable livelihoods.<br><br>
            <strong>Key Outcomes:</strong><br>
            • <strong>Total Trained:</strong> 48,500<br>
            • <strong>Placed in Jobs:</strong> 32,400 (67% placement rate)<br>
            • <strong>Average Starting Salary:</strong> ₹14,200/month<br>
            • <strong>Women Participants:</strong> 58%<br><br>
            <strong>Budget:</strong> ₹33.2 Cr<br>
            <strong>Cost per Placement:</strong> ₹10,250<br><br>
            <strong>Top Employment Partners:</strong><br>
            Amazon, Flipkart, TCS, Infosys, Tata Projects, Barclays`,
            prompts: [
                'Placement rate by region',
                'Women employment stats',
                'Employer feedback analysis',
                'Cost efficiency comparison'
            ]
        };
    }

    if (queryLower.includes('retail') || queryLower.includes('fundraising')) {
        dataPoints += 145;
        return {
            response: `<strong>Retail Fundraising Performance - FY 2024-25</strong><br><br>
            <strong>Revenue:</strong> ₹11.98 Cr<br>
            <strong>Previous Year:</strong> ₹9.09 Cr<br>
            <strong>Growth:</strong> +31.8% YoY<br><br>
            <strong>Donor Metrics:</strong><br>
            • <strong>New Donors Acquired:</strong> 87,177<br>
            • <strong>Previous Year:</strong> 49,485<br>
            • <strong>Growth:</strong> +76%<br>
            • <strong>Retention Rate:</strong> 72%<br><br>
            <strong>City Expansion:</strong><br>
            • Cities covered: 10 (up from 2)<br>
            • Fleet-on-street: 160 people<br><br>
            <strong>Innovations:</strong><br>
            • IVR-based welcome calls<br>
            • WhatsApp messaging integration<br>
            • New mobile app for data collection`,
            prompts: [
                'City-wise fundraising breakdown',
                'Donor acquisition cost',
                'Monthly collection trends',
                'Compare with institutional fundraising'
            ]
        };
    }

    // Default response
    dataPoints += 95;
    return {
        response: `Based on your query about "<em>${query}</em>", here's what I found in the Magic Bus Finance database:<br><br>
        <strong>Organization Snapshot - FY 2024-25:</strong><br>
        • <strong>Total Income:</strong> ₹142.8 Cr (+18.2% YoY)<br>
        • <strong>Programme Expenses:</strong> ₹118.4 Cr (82.9% efficiency)<br>
        • <strong>Active Projects:</strong> 127 across 22 states<br>
        • <strong>Funders:</strong> 48 institutional partners<br>
        • <strong>Lives Impacted:</strong> 50 Lakh+ since 1999<br>
        • <strong>Staff:</strong> 1,847 employees<br><br>
        Would you like me to provide more specific information?`,
        prompts: [
            'Show budget vs actual',
            'Top funders report',
            'Regional breakdown',
            'AI-Connect programme status'
        ]
    };
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
console.log('%c FY 2024-25 | Demo Mode ', 'background: #fff8e1; color: #c41e3a; font-size: 12px; padding: 4px;');
