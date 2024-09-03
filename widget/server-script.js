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