
var mainDiv = $("#mainDiv");
var mainDiv = $("#mainDiv1");
var mainDiv = $("#mainDiv2");
var mainDiv = $("#mainDiv3");
var mainDiv = $("#mainDiv4");
var mainDiv = $("#mainDiv5");
var mainDiv = $("#mainDiv6");

var currDate = dayjs();
var currDay = currDate.format('MMDYYYY');
$('#currentDay').text(currDate.format('MMM D, YYYY'));

var currHour = dayjs().hour();
var currMins = dayjs().minute();
var time;
var timetheme;
var displayTime;
var txtKey;
var txtValue;

var pastClass = "row time-block past";
var presentClass = "row time-block present";
var futureClass = "row time-block future";
  

for (var i = 9; i <= 17; i++){
  if ( i>= 9 && i < 12) {
    time = " AM";
    displayTime = i;
  }
  else {
    if (i === 12) {
      displayTime = i;
    }
    else {
      displayTime = i - 12;
    }
    time = " PM";
  }

  if (i === currHour) {
    timetheme = "row time-block present";
  }
  else if (i < currHour) {
    timetheme = "row time-block past";
  }
  else {
     timetheme = "row time-block future";
  }

  // The code will dynamically create the time block element.
  mainDiv.append(
    $("<div>", {
      id: "hour-" + i,
      class: timetheme,
    }));
  
    $("#hour-" + i + "").append(
      $("<div>", {
        text: displayTime + time,
        class: "col-2 col-md-1 hour text-center py-3",
        id: "time-" + i
      }));
  
    $("#hour-" + i + "").append(
      $("<textarea>", {
        text: localStorage.getItem(currDay+"textarea-"+i),
        class: "col-8 col-md-10 description",
        rows: "3",
        id: "textarea-" + i
      }));
  
    $("#hour-" + i + "").append(
      $("<button>", {
        class: "btn saveBtn col-2 col-md-1",
        "aria-label": "save",
        id: "button-" + i
      }));
  
    $("#button-" + i + "").append($("<i>", {
        class: "fas fa-save",
        "aria-hidden":"true"
      }));
}

//https://stackoverflow.com/questions/21064724/jquery-get-id-value-from-dynamically-created-div
// Referred the above link to access the dynamically created element. Here, once the page is ready and on button click, I get the value of the textarea

$(document).ready(function () {
  $('button[id^="button-"]').on('click', function() {  
    var idNo = this.id.split("-");
    txtKey = "textarea-" + idNo[1];
    console.log(txtKey);
    txtValue = $("#"+txtKey).val();
    if (txtValue.length > 0) {
      saveEventDescription(txtKey, txtValue);
    }
    else { 
      window.alert("Please enter the event description to save!");
    }
  });
});

// This function stores the data into local storage
function saveEventDescription(key, value) { 
  // Changing the value to uniquely identify the task according to the date.
  key = currDay + key;
  localStorage.setItem(key, value);
}

document.addEventListener("DOMContentLoaded", () => {
  const mainDiv = document.getElementById("mainDiv");
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const createScheduler = () => {
    daysOfWeek.forEach((day) =>{
      const daySection = `
      <div class="mb-5">
      <h2 class="text-center">${day}</h2>
      <table class="table table-bordered">
      ${hours
        .map(
          (hour) =>`
          <tr>
          <td class="text-center fw-bold">${hour}</td>
          <td contenteditable="true" id="${day}-${hour}"></td>
          </tr>`
        )
        .join("")}
        </table>
        <button class="btn-primary save-btn" data-day="${day}">Save ${day}</button>
        </div>`;
        mainDiv.innerHTML += daySection;
      });
    };

    const saveData = (day) => {
      const schedule = {};
      hours.forEach((hour) => {
        const cell = document.getElementById(`${day}-${hour}`);
        schedule[hour] = cell.textContent || "";
      });
      localStorage.setItem(day, JSON.stringify(schedule));
      alert(`Schedule for ${day} saved!`);
    };

    const loadData = () => {
      daysOfWeek.forEach((day) => {
        const savedData = JSON.parse(localStorage.getItem(day)) || {};
        hours.forEach((hour) => {
          const cell = document.getElementById(`${day}-${hour}`);
          if (cell && sevedData[hour]) {
            cell.textContent = sevedData[hour];
          }
        });
      });
    };
    createScheduler();
    loadData();

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("save-btn")) {
        const day = e.target.getAttribute("data-day");
        saveData(day);
      }
    });
  });






