let requests = JSON.parse(localStorage.getItem("requests")) || [];

// ADD REQUEST
function addRequest() {
  const name = document.getElementById("name").value.trim();
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  if (!name || !title || !category || !description) {
    alert("Fill all fields");
    return;
  }

  const request = {
    id: Date.now(),
    name,
    title,
    category,
    description,
    status: "Pending"
  };

  requests.push(request);
  saveData();
  displayRequests(requests);
  clearForm();
}

// DISPLAY
function displayRequests(data) {
  const container = document.getElementById("requestsContainer");
  container.innerHTML = "";

  data.forEach(req => {
    const div = document.createElement("div");
    div.className = "request-card";

    div.innerHTML = `
      <h3>${req.title}</h3>
      <p>${req.description}</p>
      <div class="tag">${req.category}</div>
      <div class="tag">${req.status}</div>
      <p><small>By ${req.name}</small></p>
      <button class="delete-btn" onclick="deleteRequest(${req.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

// DELETE
function deleteRequest(id) {
  requests = requests.filter(r => r.id !== id);
  saveData();
  displayRequests(requests);
}

// SAVE
function saveData() {
  localStorage.setItem("requests", JSON.stringify(requests));
}

// CLEAR FORM
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("description").value = "";
}

// SEARCH
document.getElementById("searchBar").addEventListener("input", function () {
  const query = this.value.toLowerCase();

  const filtered = requests.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.description.toLowerCase().includes(query) ||
    r.category.toLowerCase().includes(query)
  );

  displayRequests(filtered);
});

// INITIAL LOAD
displayRequests(requests);
