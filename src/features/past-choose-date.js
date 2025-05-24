function init() {
  const rows = document.querySelectorAll("table.itemlist > tbody > tr");

  // Check if the expected row for the navigator exists
  // The navigator is typically in the 4th row (index 3) of the itemlist table structure on "past" date pages
  if (rows.length < 4) {
    return false; // Not the "past" page structure we expect
  }

  const navigatorRow = rows[3];
  if (!navigatorRow) {
    return false; // Should be caught by rows.length check, but for safety
  }

  const navigatorCells = navigatorRow.querySelectorAll("td");

  // Check if the expected cell within the navigator row exists
  if (navigatorCells.length < 2) {
    return false; // The expected TD structure for the navigator is not present
  }

  const navigator = navigatorCells[1];
  if (!navigator) {
    return false; // Should be caught by navigatorCells.length check
  }

  // Further check: the navigator cell on past pages typically contains "Go back to <date>" text.
  // This is a more specific check to ensure we are on the correct type of /front page.
  if (!navigator.innerText.includes("Go back to")) {
    return false; // This doesn't look like the date navigation bar
  }

  const yearInput = document.createElement("select");
  const monthInput = document.createElement("select");
  const dayInput = document.createElement("select");

  // Year Input
  for (let y = new Date().getFullYear(); y >= 2007; y--) {
    yearInput.innerHTML += `<option value=${y}>${y}</option>`;
  }

  // Month Input
  for (let m = 1; m <= 12; m++) {
    const monthString = String(m).padStart(2, "0"); // Renamed for clarity
    monthInput.innerHTML += `<option value=${monthString}>${monthString}</option>`;
  }

  // Day Input
  for (let d = 1; d <= 31; d++) {
    const dayString = String(d).padStart(2, "0"); // Renamed for clarity
    dayInput.innerHTML += `<option value=${dayString}>${dayString}</option>`;
  }

  const goSpan = document.createElement("span");
  goSpan.classList.add("hnmore");

  const goBtn = document.createElement("a");
  goBtn.href = "javascript:void(0)";
  goBtn.innerHTML = "Go";
  goBtn.addEventListener("click", () => {
    window.location.href = `front?day=${yearInput.value}-${monthInput.value}-${
      dayInput.value
    }`;
  });

  goSpan.append(goBtn);

  navigator.append(
    " Choose a date: ", // Added space for better formatting
    yearInput,
    "-",
    monthInput,
    "-",
    dayInput,
    " ", // Added space before Go button
    goSpan,
    "."
  );

  return true;
}

const details = {
  id: "past-choose-date",
  pages: {
    include: ["/front"],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;