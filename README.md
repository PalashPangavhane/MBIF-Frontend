# Magic Bus Finance Intelligence Dashboard

A clean, modern finance dashboard for Magic Bus India Foundation with AI-powered insights.

![Dashboard Preview](https://img.shields.io/badge/Status-Demo-yellow)
![Version](https://img.shields.io/badge/Version-1.0-blue)

## Overview

This dashboard provides a ChatGPT-style interface for querying and analyzing financial data across projects, funders, and regions.

## Features

- **AI Chat Interface** - Natural language queries for financial data
- **Real-time Analytics** - Session insights with live metrics
- **Regional Distribution** - Visual breakdown by WR, NR, SR, HO
- **Expense Tracking** - Category-wise expense analysis
- **Search History** - Quick access to previous queries
- **DB Updates Feed** - Live updates on database changes

## Use Cases

### 1. Budget vs Actual Analysis
> "Show me the budget vs actual for this quarter"

Get instant insights on budget utilization across all projects and regions.

### 2. Expense Monitoring
> "What are the top expenses this month?"

View categorized expense breakdown (Salary, Training, Events, Admin).

### 3. Project Status Tracking
> "Show project status for West Region"

Monitor active, pending, and closed projects with funder details.

### 4. Funder Reports
> "Generate funder allocation report"

Create comprehensive reports on funder contributions and project allocations.

### 5. Regional Insights
> "How is North Region performing?"

Analyze regional budget distribution and utilization metrics.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/PalashPangavhane/MBIF-Frontend.git

# Navigate to directory
cd MBIF-Frontend

# Start local server
python -m http.server 8080

# Open in browser
# http://localhost:8080
```

## Tech Stack

- HTML5 / CSS3 / JavaScript
- No external dependencies
- Python HTTP server for local development

## Project Structure

```
MBIF-Frontend/
├── index.html          # Main dashboard
├── styles.css          # Styling
├── script.js           # Chat & analytics logic
├── magic-bus-logo.png  # Logo asset
├── mbdbschema.txt      # Database schema reference
└── README.md
```

## License

Internal use - Magic Bus India Foundation

---

*Demo version for presentation purposes*
