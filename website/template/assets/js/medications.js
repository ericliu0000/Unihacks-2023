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
    startDateMonth: 1,
    startDateDay: 2,
    startDateYear: 2022,
    finishDateMonth: 1,
    finishDateDay: 10,
    finishDateYear: 2023,
    indefiniteUsage: false,
    notes: "take with water and a meal",
  },
];

editCurrentMedicine();
// updates the current medicine container with the medicine dictionary
function editCurrentMedicine() {
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
                              <button
                                onclick()
                                href="#!"
                                class="label theme-bg2 text-white f-12"
                                >Delete</button
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
  //return final;
}

// removes a medication from the medicines list
function deleteMedicine(name) {
  delete medicines[name];
}

// manually adds a medication to the medicines list
function manualCreateMedicine() {
  const yes = {
    "name": document.getElementById("manualName").value,
    "disease": document.getElementById("manualDisease").value,
    "dosageAmount": Number(document.getElementById("manualDosageAmount").value),
    "dosageUnit": document.getElementById("manualDosageUnit").value,
    "frequencyNumber": Number(
      document.getElementById("manualFrequencyNumber").value
    ),
    "frequencyUnit": document.getElementById("manualFrequencyUnit").value,
    "takeAsNeeded": document.getElementById("manualTakeAsNeeded").checked,
    "startDateMonth": document.getElementById("manualStartDateMonth").value,
    "startDateDay": Number(document.getElementById("manualStartDateDay").value),
    "startDateYear": Number(document.getElementById("manualStartDateYear").value),
    "finishDateMonth": document.getElementById("manualFinishDateMonth").value,
    "finishDateDay": Number(document.getElementById("manualFinishDateDay").value),
    "finishDateYear": Number(
      document.getElementById("manualFinishDateYear").value
    ),
    "indefiniteUsage": document.getElementById("manualIndefiniteUsage").checked,
    "notes": document.getElementById("manualNotes").value,
  }
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
