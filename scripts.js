/* Florida COVID-19 Tracker by ZIP Code
Gelson Cardoso Jr / 2020 Shellhacks */

"use strict";

function myFunction() {

  const zipCodeRegex = /^\d{5}$/;
  let input = document.getElementById("userinput");
  let zipCode = input.value;
  let invalidMessage = "<p class='red'>Invalid Input. Please enter a 5-digit Zip Code.</p>";

  if (!zipCodeRegex.test(zipCode)) {
    return document.getElementById("output").innerHTML = invalidMessage;
  }

  // Fetching API from Florida Department of Health Open Data (open-fdoh.hub.arcgis.com)
  fetch(`https://services1.arcgis.com/CY1LXxl9zlJeBuRZ/arcgis/rest/services/Florida_Cases_Zips_COVID19/FeatureServer/0/query?where=ZIP%3D${zipCode}&outFields=ZIP%2CCOUNTYNAME%2CCases_1&returnGeometry=false&f=pjson`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      document.getElementById("output").innerHTML = "error: " + err;
    });
}

function appendData(data) {

  let zip = data.features[0].attributes.ZIP;
  let county = data.features[0].attributes.COUNTYNAME;
  let cases = data.features[0].attributes.Cases_1;

  let template = `
  <p>
    Zip Code: ${zip}<br>
    County: ${county}<br>
    Number of cases: ${cases}
  </p>`;

  document.getElementById("output").innerHTML = template;
}