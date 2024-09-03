# ServiceNow Calendar Widget

A calendar widget for ServiceNow that uses [fullcalendar](https://fullcalendar.io)

## Features

- [x] Easy implementation for simple use cases
- [x] Custom CSS
- [x] Dynamic events based on ServiceNow table(s)
- [x] Custom on-click actions

## Getting Started

1. Create a new widget in your ServiceNow instance.

2.  Add required dependencies.
    - Go to the widget platform view, scroll down to the `Dependencies` related list. 
    - Click on `New` and name it `Calendar`. Press `Submit`.
    - Once your widget dependency has been created, open it and click on the `JS Includes` related list.
    - Click on `New` and set the `Source` to `URL`
    - Enter this URL into the `JS file URL` field: `https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.5.1/fullcalendar.min.js`. Press `Submit`.
    - Navigate back to your widget dependency record and click on the `CSS Includes` related list.
    - Click on `New` and set the `Source` to `URL`.
    - Enter this URL into the `CSS file URL` field: `https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.5.1/fullcalendar.min.css` . Press `Submit`.

3. Insert the code into your widget by copy and pasting from the provided files.
    - Open your widget in the `Widget Editor`
    - Paste this code into the HTML Template section:
    ```html
    <div>
        <!-- This div is a placeholer for the calendar (see Client Script) -->
        <div id="calendar"></div>
    </div>
    ```
    - Paste this code into the CSS-SCSS section:
    ```css
    /* Override existing calendar CSS. Find these classes in Google Inspect */
    .fc td,.fc th {
        border-color: #309C42;
        background-color: #ffffff;
    }
    
    .fc-left {
        color: #212121;
        font-family: 'GT Super Text';
    }

    .fc button {
        border-color: #309C42;
        background-color: #ffffff;
    }
    ```
    - Paste this code into the Client Script section:
    ```javascript
    api.controller=function() {
        /* widget controller */
        var c = this;

        // Load fullcalendar.io calendar with options
        $("#calendar").fullCalendar({
        events: c.data.eventList,
        // Set default event color
        eventColor: '#344C38',
        // Do something when clicked
        eventClick: function (event) {
            alert("Give some sort of alert/message");
            // Redirect to page
            top.window.location = 'https://github.com/ben-meeker/servicenow-calendar-widget';
        }
        });
    };
    ```
    - Paste this code into the Server Script section: 
    ```javascript
    (function() {
        data.eventList=[];
        
        // Get events from table
        var events = new GlideRecord('some table')
        // Add queries to narrow down data
        events.addQuery('date>=javascript:gs.beginningOfLastMonth()')
        events.query()
        while (events.next()) {
            var eventJSON = {};
            
            // Set event JSON fields with useful data
            eventJSON.sys_id = events.getValue('sys_id');
            eventJSON.venue = events.getValue('venue');
            eventJSON.title = events.getValue('event_name');
            eventJSON.date = events.getValue('date');
            eventJSON.allDay = true;
            
            // Set additional fields based on criteria
            if (events.getValue('u_available_tickets') == false) {
                eventJSON.color = 'white';
                eventJSON.textColor = '#344C38';
                eventJSON.borderColor = '#344C38';
                eventJSON.available_tickets = false;
            }
                
            data.eventList.push(eventJSON);
        }
    })();

    ```

4. Play with the code and make a calendar that works for you!