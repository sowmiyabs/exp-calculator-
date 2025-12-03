let entries = JSON.parse(localStorage.getItem("entries")) || [];
let editingId = null;


const descInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const entryList = document.getElementById("entry-list");

document.getElementById("add-btn").addEventListener("click", addEntry);
document.getElementById("reset-btn").addEventListener("click", resetInputs);

document.querySelectorAll("input[name='filter']").forEach(radio =>
    radio.addEventListener("change", displayEntries)
);

function addEntry() {
    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = document.querySelector("input[name='type']:checked").value;

    if (!description || !amount) {
        alert("Please fill all fields");
        return;
    }

    if (editingId) {
        let entry = entries.find(e => e.id === editingId);
        entry.description = description;
        entry.amount = amount;
        entry.type = type;
        editingId = null;
    } else {
        const newEntry = {
            id: Date.now(),
            description,
            amount,
            type
        };
        entries.push(newEntry);
    }

    saveData();
    resetInputs();
    displayEntries();
}


function displayEntries() {
    entryList.innerHTML = "";

    const filter = document.querySelector("input[name='filter']:checked").value;
    const filtered = entries.filter(e => (filter === "all" ? true : e.type === filter));

    filtered.forEach(entry => {
        const li = document.createElement("li");
        li.className = `entry ${entry.type}`;
        li.innerHTML = `
            <span>${entry.description} - $${entry.amount}</span>
            <div class="actions">
                <button onclick="editEntry(${entry.id})">Edit</button>
                <button onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
        `;
        entryList.appendChild(li);
    });

    calculateTotals();
}


function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    descInput.value = entry.description;
    amountInput.value = entry.amount;
    document.querySelector(`input[value="${entry.type}"]`).checked = true;
    editingId = id;
}

function deleteEntry(id) {
    entries = entries.filter(e => e.id !== id);
    saveData();
    displayEntries();
}


function calculateTotals() {
    const income = entries.filter(e => e.type === "income")
        .reduce((t, e) => t + e.amount, 0);

    const expense = entries.filter(e => e.type === "expense")
        .reduce((t, e) => t + e.amount, 0);

    document.getElementById("total-income").innerText = "$" + income;
    document.getElementById("total-expense").innerText = "$" + expense;
    document.getElementById("balance").innerText = "$" + (income - expense);
}
function resetInputs() {
    descInput.value = "";
    amountInput.value = "";
    
    // Reset type radio to income
    document.querySelector("input[name='type'][value='income']").checked = true;

    // Reset filter back to "all"
    document.querySelector("input[name='filter'][value='all']").checked = true;

    editingId = null;

    displayEntries();
}
function saveData() {
    localStorage.setItem("entries", JSON.stringify(entries));
}

displayEntries();