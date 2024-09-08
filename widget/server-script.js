(function() {
    data.eventList=[];
    
    // Get events from table
    var events = new GlideRecord('incident')
    // Add queries to narrow down data
    events.addQuery('date>=javascript:gs.beginningOfLastMonth()')
    events.query()
    while (events.next()) {
        var eventJSON = {};
        
        // Set event JSON fields with useful data
    
        // Set title of event
        eventJSON.title = events.getValue('short_description');
        // Set date field to tell calendar when to display event
        eventJSON.date = events.getValue('due_date');
        // Set allDay to true to remove time display on event in calendar
        eventJSON.allDay = true;

        // Set custom fields for specific use cases
        eventJSON.sys_id = events.getValue('sys_id');
        eventJSON.assigned_to = events.getValue('assigned_to');
        
        // Set additional fields based on criteria
        if (events.getValue('assigned_to') == false) {
            eventJSON.color = 'white';
            eventJSON.textColor = '#344C38';
            eventJSON.borderColor = '#344C38';
        }
            
        data.eventList.push(eventJSON);
    }
})();