
        // Sample events data - you can modify this to add your actual events
        const events = [
            {
                id: 1,
                title: "Camp Kesem Fall Session",
                date: "2024-10-15",
                time: "9:00 AM - 4:00 PM",
                description: "Our main fall camp session for children affected by cancer. A full day of activities, crafts, and support.",
                category: "camp"
            },
            {
                id: 2,
                title: "Volunteer Training",
                date: "2024-10-08",
                time: "6:00 PM - 8:00 PM",
                description: "Training session for new volunteers interested in supporting our camp programs.",
                category: "volunteer"
            },
            {
                id: 3,
                title: "Fundraising Gala",
                date: "2024-11-22",
                time: "7:00 PM - 11:00 PM",
                description: "Annual fundraising gala to support Camp Kesem UTD programs and activities.",
                category: "fundraising"
            },
            {
                id: 4,
                title: "Family Support Group",
                date: "2024-10-30",
                time: "10:00 AM - 12:00 PM",
                description: "Monthly support group meeting for families affected by cancer.",
                category: "support"
            },
            {
                id: 5,
                title: "Holiday Craft Workshop",
                date: "2024-12-10",
                time: "2:00 PM - 5:00 PM",
                description: "Special holiday-themed craft workshop for camp families.",
                category: "activity"
            },
            {
                id: 6,
                title: "Spring Camp Planning",
                date: "2024-11-05",
                time: "7:00 PM - 9:00 PM",
                description: "Planning meeting for our spring camp session. Volunteers and staff welcome.",
                category: "planning"
            },
            {
                id: 7,
                title: "Community Outreach Fair",
                date: "2024-10-25",
                time: "11:00 AM - 3:00 PM",
                description: "Representing Camp Kesem at the UTD community outreach fair.",
                category: "outreach"
            }
        ];

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Initialize the page
        function init() {
            updateCalendar();
            updateEventsList();
        }

        // Update the calendar display
        function updateCalendar() {
            const monthYearElement = document.getElementById('monthYear');
            monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

            const calendarDays = document.getElementById('calendarDays');
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
        }

        // Update the events sidebar list
        function updateEventsList() {
            const eventsList = document.getElementById('eventsList');
            eventsList.innerHTML = '';

            // Sort events by date
            const sortedEvents = events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 8); // Show next 8 events

            sortedEvents.forEach(event => {
                const eventDate = new Date(event.date);
                const isUpcoming = eventDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Next 7 days
                
                const eventElement = document.createElement('div');
                eventElement.className = `event-item ${isUpcoming ? 'upcoming' : ''}`;
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
            document.getElementById('popupTitle').textContent = event.title;
            document.getElementById('popupDate').textContent = `Date: ${eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
            })}`;
            document.getElementById('popupTime').textContent = `Time: ${event.time}`;
            document.getElementById('popupDescription').textContent = event.description;
            
            document.getElementById('eventPopup').style.display = 'flex';
        }

        // Close event popup
        function closePopup() {
            document.getElementById('eventPopup').style.display = 'none';
        }

        // Close popup when clicking outside
        document.getElementById('eventPopup').addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });

        // Mobile menu toggle functionality
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

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

        // Initialize everything when the page loads
        document.addEventListener('DOMContentLoaded', init);
