let medicines = [
  {
    name: "Vitamin D",
    disease: "Vitamin D Deficiency",
    dosageAmount: 1,
    dosageUnit: "softgel",
    frequencyAmount: 1,
    frequencyNumber: 1,
    frequencyUnit: "Day(s)",
    takeAsNeeded: false,
    startDate: new Date(2022, 1, 2),
    finishDate: new Date(2023, 1, 10),
    indefiniteUsage: false,
    notes: "take with water and a meal",
  },
];

editCurrentMedicine();
// updates the current medicine container with the medicine dictionary
function editCurrentMedicine() {
  if (medicines.length > 0) {
    let final = `<tbody>
                          <tr class="unread">
                            <td>
                              <h6 class="mb-1">Medication/Illness</h6>
                            </td>
                            <td>
                              <h6 class="mb-1">Dosage</h6>
                            </td>
                            <td><h6 class="mb-1">Actions</h6></td>
                          </tr>\n`;

    for (let index = 0; index < medicines.length; index++) {
      final +=
        `<tr class="unread">
                            <td>
                              <h6 class="mb-1">` +
        medicines[index]["name"] +
        `</h6>
                              <p class="m-0">` +
        medicines[index]["disease"] +
        `</p>
                            </td>
                            <td>
                              <h6 class="text-muted">
                                <i
                                  class="fas fa-circle text-c-green f-10 m-r-15"></i
                                >` +
        medicines[index]["dosageAmount"].toString() +
        " " +
        medicines[index]["dosageUnit"] +
        " every " +
        medicines[index]["frequencyNumber"].toString() +
        " " +
        medicines[index]["frequencyUnit"] +
        `
                              </h6>
                            </td>
                    
                            <td>
                              <a
                                type="button"
                                onclick="deleteMedicine('` +
        medicines[index]["name"] +
        `')"
                        
                                class="label theme-bg2 text-white f-12"
                                style="cursor: pointer;"
                                >Delete</a
                              ><a
                                href="#!"
                                class="label theme-bg text-white f-12"
                                >Edit</a
                              >
                            </td>
                          </tr>`;
    }
    final += "</tbody>";
    document.getElementById("current-medication-table").innerHTML = final;
  } else {
    document.getElementById("current-medication-table").innerHTML =
      "No medications found.";
  }
  nextDosage();
}

// removes a medication from the medicines list
function deleteMedicine(name) {
  console.log(name);
  for (let i = 0; i < medicines.length; i++) {
    if (medicines[i]["name"] == name) {
      medicines.splice(i, 1);
      break;
    }
  }

  editCurrentMedicine();
}

function editMedicine() {}

function nextDosage() {
  if (medicines.length <= 0) {
    document.getElementById("next-dosage").innerHTML = "No medications found.";
  } else {
    let maxTime;
    const currentTime = new Date();
    for (let i = 0; i < medicines.length; i++) {
      let factor = medicines[i]["frequencyNumber"];
      switch (medicines[i]["frequencyUnit"]) {
        case "Hour(s)":
          factor *= 1;
          break;
        case "Day(s)":
          factor *= 24;
          break;
        case "Month(s)":
          factor *= 24 * 31
          break;
        case "Year(s)":
          factor *= 24 * 31 * 365
          break;
      }
      
    }
  }
}

// manually adds a medication to the medicines list
function manualCreateMedicine() {
  const yes = {
    name: document.getElementById("manualName").value,
    disease: document.getElementById("manualDisease").value,
    dosageAmount: Number(document.getElementById("manualDosageAmount").value),
    dosageUnit: document.getElementById("manualDosageUnit").value,
    frequencyNumber: Number(
      document.getElementById("manualFrequencyNumber").value
    ),
    frequencyUnit: document.getElementById("manualFrequencyUnit").value,
    takeAsNeeded: document.getElementById("manualTakeAsNeeded").checked,
    startDate: new Date(
      Number(document.getElementById("manualStartDateYear").value),
      monthToInt(document.getElementById("manualStartDateMonth").value),
      Number(document.getElementById("manualStartDateDay").value)
    ),
    finishDate: new Date(
      Number(document.getElementById("manualFinishDateYear").value),
      monthToInt(document.getElementById("manualFinishDateMonth").value),
      Number(document.getElementById("manualFinishDateDay").value)
    ),
    indefiniteUsage: document.getElementById("manualIndefiniteUsage").checked,
    notes: document.getElementById("manualNotes").value,
  };
  console.log(yes);
  medicines.push(yes);
  editCurrentMedicine();
}

function monthToInt(month) {
  if (month === "January") {
    return 1;
  } else if (month === "February") {
    return 2;
  } else if (month === "March") {
    return 3;
  } else if (month === "April") {
    return 4;
  } else if (month === "May") {
    return 5;
  } else if (month === "June") {
    return 6;
  } else if (month === "July") {
    return 7;
  } else if (month === "August") {
    return 8;
  } else if (month === "September") {
    return 9;
  } else if (month === "October") {
    return 10;
  } else if (month === "November") {
    return 11;
  } else if (month === "December") {
    return 12;
  } else {
    return false;
  }
}
