let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

let dark = document.querySelector(".toggle-dark");
let open = document.querySelector(".add-btn");
let close = document.querySelector(".close");
let cance = document.getElementById("cancel");
let addJobButton = document.getElementById("add");
let jobList = document.querySelector(".job-list");

let isEditing = false;
let editingCard = null;

let search = document.querySelector(".search-bar");

dark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

open.addEventListener("click", () => {
  document.querySelector(".form").style.display = "flex";
});

close.addEventListener("click", () => {
  document.querySelector(".form").style.display = "none";
});

cance.addEventListener("click", () => {
  document.querySelector(".form").style.display = "none";
  isEditing = false;
  editingCard = null;
});

function jobcard(company, role, status, date, notes) {
  const jobCard = document.createElement("div");
  jobCard.classList.add("job-card");

  jobCard.innerHTML = `
    <div class="first">
      <h2>${company.toUpperCase()}</h2>
      <div class="but">
        <button class="edit">
          <i class="fa-solid fa-pencil icon"></i>
        </button>
        <button class="delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="second">
      <p>${role}</p>
    </div>
    <div class="third">
      <span class="status ${status.toLowerCase()}">${status}</span>
      <div class="date">${date}</div>
    </div>
    <div class="fourth">
      <span class="through">${notes}</span>
    </div>
  `;

  const editBtn = jobCard.querySelector(".edit");
  const deleteBtn = jobCard.querySelector(".delete");

  editBtn.addEventListener("click", () => {
    isEditing = true;
    editingCard = jobCard;

    // Fill the form with existing values
    document.getElementById("company").value = company;
    document.getElementById("role").value = role;
    document.getElementById("status").value = status;
    document.getElementById("date").value = date;
    document.getElementById("notes").value = notes;

    document.querySelector(".form").style.display = "flex";
  });

  deleteBtn.addEventListener("click", () => {
    jobCard.remove();
  });

  jobList.appendChild(jobCard);
}

addJobButton.addEventListener("click", () => {
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  if (company && role && status && date) {
    if (isEditing && editingCard) {
      editingCard.querySelector("h2").textContent = company.toUpperCase();
      editingCard.querySelector(".second p").textContent = role;

      const statusEl = editingCard.querySelector(".status");
      statusEl.textContent = status;
      statusEl.className = `status ${status.toLowerCase()}`;

      editingCard.querySelector(".date").textContent = date;
      editingCard.querySelector(".through").textContent = notes;

      isEditing = false;
      editingCard = null;
    } else {
      // Create new card
      jobcard(company, role, status, date, notes);
    }

    // Reset and close form
    document.querySelector("form").reset();
    document.querySelector(".form").style.display = "none";
  } else {
    alert("Please fill in all the fields.");
  }
  jobs.push({ company, role, status, date, notes });
  localStorage.setItem("jobs", JSON.stringify(jobs));
});

window.addEventListener("DOMContentLoaded", () => {
  jobs.forEach((job) => {
    jobcard(job.company, job.role, job.status, job.date, job.notes);
  });
});
search.addEventListener("input", () => {
  const query = search.value.toLowerCase(); // Use 'search' here instead of 'searchInput'
  const jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach((card) => {
    const company = card.querySelector("h2").textContent.toLowerCase();
    const role = card.querySelector(".second p").textContent.toLowerCase();

    if (company.includes(query) || role.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
