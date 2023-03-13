// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeBlocks = $('.time-block');
var buttons = $('.saveBtn');
var currentHour = dayjs().format('HH');

$(function () {
  // listener for click events on the save button
  buttons.click(function() {
    var hour = $(this).parent()[0].id;
    var toDoItem = $(this).siblings("textarea")[0].value
    
    localStorage.setItem(hour, toDoItem)
  })

  // apply the past, present, or future class to each time block by comparing the id to the current hour. 

  for (var i = 0; i < timeBlocks.length; i ++) {
    if (timeBlocks[i].id.substr(-2) == currentHour) {
      $(timeBlocks[i]).addClass('present');
    } else if (timeBlocks[i].id.substr(-2) < currentHour) {
      $(timeBlocks[i]).addClass('past');
    } else {
      $(timeBlocks[i]).addClass('future');
    }
  }

  // get any user input that was saved in localStorage and set the values of the corresponding textarea elements. 

  if (localStorage.length > 0) {
    for (var id in localStorage) {
      if (localStorage.getItem(id) === null) {
        break
      }
      $("#"+id).children("textarea")[0].value = localStorage.getItem(id);
    }
  }

 // current date is displayed in the header of the page.
  $('#currentDay').text(dayjs().format('dddd, MMMM Do'));
});
