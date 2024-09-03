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