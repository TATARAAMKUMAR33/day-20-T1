// Container Element creation
let container = document.createElement("div");
container.className = "container";

// Section 1 Element creation
let section1 = document.createElement("section");
section1.className = "section1";
section1.innerHTML = `<h1 class="covid-head">Covid-19</h1>
<h1 class="mt-4 mb-4 covid-head">India State-wise Statistics</h1>

<div class="form-group">
  <label for="stateDropdown" class="table-head">Select State:</label>
  <select id="stateDropdown" class="form-control">
    <!-- State options will be added here-->
  </select>
</div>
<button id="fetchDataBtn" onclick="fetchDataAndDisplayStateDetails()" class="btn btn-primary">Search</button>`;

// Section 2 Element creation
let section2 = document.createElement("section");
section2.className = "section1";
section2.innerHTML =`<div id="covidData" class="card mt-4">
<div class="card-body">
  <h5 class="card-title">State Details</h5>
  <div id="stateDetailsTable" class="table-responsive">
    <!-- State details table will be added here -->
  </div>
</div>
</div>`;

container.append(section1,section2);
document.body.append(container);

// ============================================================

// Fetch data from the COVID-19 India API
const fetchData = async () => {
  try {
    const response = await fetch("https://data.covid19india.org/data.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Populate the dropdown list with state names
const populateDropdown = (data) => {
  const stateDropdown = document.getElementById("stateDropdown");
  data.statewise.slice(1).forEach((state) => {
    const option = document.createElement("option");
    option.value = state.statecode;
    option.text = state.state;
    stateDropdown.appendChild(option);
  });
};

// Display state details in a table
const displayStateDetails = (stateDetails) => {
  const tableHtml = `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deceased</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> ${parseInt(stateDetails.confirmed).toLocaleString()}</td>
            <td>${parseInt(stateDetails.active).toLocaleString()}</td>
            <td>${parseInt(stateDetails.recovered).toLocaleString()}</td>
            <td>${parseInt(stateDetails.deaths).toLocaleString()}</td>
            <td>${stateDetails.lastupdatedtime}</td>
          </tr>
        </tbody>
      </table>
    `;
  document.getElementById("stateDetailsTable").innerHTML = tableHtml;
};

const fetchDataAndPopulateDropdown = async () => {
  try {
    const data = await fetchData();
    populateDropdown(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Check input data and API data is equal or not.
const fetchDataAndDisplayStateDetails = async () => {
  try {
    const selectedStateCode = document.getElementById("stateDropdown").value;
    console.log(selectedStateCode);
    const data = await fetchData();
    const selectedState = data.statewise.find(
      (state) => state.statecode === selectedStateCode
    );
    if (selectedState) {
      displayStateDetails(selectedState);
    } else {
      console.error("State not found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Initial population of dropdown
fetchDataAndPopulateDropdown();