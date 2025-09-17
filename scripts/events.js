// Sample events data - updated with 2025 dates
const events = [
    {
        id: 1,
        title: "Da Vinci Spanking",
        date: "2025-09-19",
        time: "9:00 AM - 4:00 PM",
        description: "Our main spring camp session for children affected by cancer. A full day of activities, crafts, and support.",
        category: "camp"
    },
    {
        id: 2,
        title: "Volunteer Training",
        date: "2025-10-08",
        time: "6:00 PM - 8:00 PM",
        description: "Training session for new volunteers interested in supporting our camp programs.",
        category: "volunteer"
    },
    {
        id: 3,
        title: "Winter Fundraising Event",
        date: "2025-12-22",
        time: "7:00 PM - 11:00 PM",
        description: "Winter fundraising event to support Camp Kesem UTD programs and activities.",
        category: "fundraising"
    },
    {
        id: 4,
        title: "Family Support Group",
        date: "2026-01-30",
        time: "10:00 AM - 12:00 PM",
        description: "Monthly support group meeting for families affected by cancer.",
        category: "support"
    },
    {
        id: 5,
        title: "Valentine's Craft Workshop",
        date: "2026-02-14",
        time: "2:00 PM - 5:00 PM",
        description: "Special Valentine's Day-themed craft workshop for camp families.",
        category: "activity"
    },
    {
        id: 6,
        title: "Summer Camp Planning",
        date: "2026-04-05",
        time: "7:00 PM - 9:00 PM",
        description: "Planning meeting for our summer camp session. Volunteers and staff welcome.",
        category: "planning"
    },
    {
        id: 7,
        title: "Community Outreach Fair",
        date: "2026-03-25",
        time: "11:00 AM - 3:00 PM",
        description: "Representing Camp Kesem at the UTD community outreach fair.",
        category: "outreach"
    },
    {
        id: 8,
        title: "Holiday Party",
        date: "2026-12-20",
        time: "3:00 PM - 6:00 PM",
        description: "End-of-year holiday celebration for camp families and volunteers.",
        category: "social"
    }
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentEventPage = 1;
const eventsPerPage = 5;

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Initialize the page
function init() {
    console.log("Initializing events page...");
    updateCalendar();
    updateEventsList();
}

// Update the calendar display
function updateCalendar() {
    console.log("Updating calendar for", monthNames[currentMonth], currentYear);
    
    const monthYearElement = document.getElementById('monthYear');
    if (monthYearElement) {
        monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) {
        console.error("Calendar days container not found");
        return;
    }
    
    calendarDays.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if day is in current month
        if (cellDate.getMonth() !== currentMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Check if day is today
        if (cellDate.getTime() === today.getTime()) {
            dayElement.classList.add('today');
        }
        
        // Check for events on this day
        const dateStr = cellDate.toISOString().split('T')[0];
        const dayEvents = events.filter(event => event.date === dateStr);
        
        if (dayEvents.length > 0) {
            dayElement.classList.add('has-event');
            dayElement.onclick = () => showEventPopup(dayEvents[0]);
        }
        
        dayElement.innerHTML = `
            <div class="day-number">${cellDate.getDate()}</div>
            ${dayEvents.length > 0 ? `
                <div class="event-indicator"></div>
                <div class="event-title-calendar">${dayEvents[0].title}</div>
            ` : ''}
        `;
        
        calendarDays.appendChild(dayElement);
    }
    
    console.log("Calendar updated with", calendarDays.children.length, "days");
}

// Update the events sidebar list with pagination
function updateEventsList() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) {
        console.error("Events list container not found");
        return;
    }
    
    eventsList.innerHTML = '';

    // Sort events by date and filter for future events
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const allFutureEvents = events
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (allFutureEvents.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: #666;">No upcoming events</p>';
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(allFutureEvents.length / eventsPerPage);
    const startIndex = (currentEventPage - 1) * eventsPerPage;
    const endIndex = Math.min(startIndex + eventsPerPage, allFutureEvents.length);
    const eventsToShow = allFutureEvents.slice(startIndex, endIndex);

    // Display events for current page
    eventsToShow.forEach(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        
        // Calculate time periods
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        // Determine time-based classes
        let timeClass = 'future-event'; // Default green for future events
        if (eventDate <= oneWeekFromNow) {
            timeClass = 'this-week'; // Red for this week
        } else if (eventDate <= endOfMonth) {
            timeClass = 'this-month'; // Yellow for this month
        }
        
        const eventElement = document.createElement('div');
        eventElement.className = `event-item ${timeClass}`;
        eventElement.onclick = () => showEventPopup(event);
        
        eventElement.innerHTML = `
            <div class="event-date">${eventDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            })}</div>
            <div class="event-time">${event.time}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}</div>
        `;
        
        eventsList.appendChild(eventElement);
    });

    // Add pagination controls if there are multiple pages
    if (totalPages > 1) {
        const paginationElement = document.createElement('div');
        paginationElement.className = 'pagination';
        
        let paginationHTML = '<div class="pagination-controls">';
        
        // Previous button
        if (currentEventPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentEventPage - 1})">« Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentEventPage ? 'active' : '';
            paginationHTML += `<button class="pagination-btn page-number ${activeClass}" onclick="changePage(${i})">${i}</button>`;
        }
        
        // Next button
        if (currentEventPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentEventPage + 1})">Next »</button>`;
        }
        
        paginationHTML += '</div>';
        paginationHTML += `<div class="pagination-info">Page ${currentEventPage} of ${totalPages} (${allFutureEvents.length} events total)</div>`;
        
        paginationElement.innerHTML = paginationHTML;
        eventsList.appendChild(paginationElement);
    }
    
    console.log(`Events list updated with ${eventsToShow.length} events (page ${currentEventPage} of ${totalPages})`);
}

// Change page function for pagination
function changePage(pageNumber) {
    currentEventPage = pageNumber;
    updateEventsList();
    
    // Scroll to top of events list
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.scrollTop = 0;
    }
}

// Navigate to previous month
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

// Navigate to next month
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

// Show event details popup
function showEventPopup(event) {
    const eventDate = new Date(event.date);
    const popupTitle = document.getElementById('popupTitle');
    const popupDate = document.getElementById('popupDate');
    const popupTime = document.getElementById('popupTime');
    const popupDescription = document.getElementById('popupDescription');
    const eventPopup = document.getElementById('eventPopup');
    
    if (popupTitle) popupTitle.textContent = event.title;
    if (popupDate) {
        popupDate.textContent = `Date: ${eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        })}`;
    }
    if (popupTime) popupTime.textContent = `Time: ${event.time}`;
    if (popupDescription) popupDescription.textContent = event.description;
    
    if (eventPopup) eventPopup.style.display = 'flex';
}

// Close event popup
function closePopup() {
    const eventPopup = document.getElementById('eventPopup');
    if (eventPopup) {
        eventPopup.style.display = 'none';
    }
}

// Function to initialize mobile menu functionality (duplicate from scripts.js for fallback)
function initializeMobileMenuFallback() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Events page");
    
    // Small delay to ensure all external content is loaded
    setTimeout(() => {
        init();
        initializeMobileMenuFallback();
        
        // Close popup when clicking outside
        const eventPopup = document.getElementById('eventPopup');
        if (eventPopup) {
            eventPopup.addEventListener('click', function(e) {
                if (e.target === this) {
                    closePopup();
                }
            });
        }
        
        console.log("Events page initialization complete");
    }, 200);
});