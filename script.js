   let expenses = [];

    function addExpense() {
      const item = document.getElementById("item").value.trim();
      const amount = parseFloat(document.getElementById("amount").value);

      if (item === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid item and amount.");
        return;
      }

      expenses.push({ item, amount });
      document.getElementById("item").value = "";
      document.getElementById("amount").value = "";
      updateList();
    }

    function updateList() {
      const list = document.getElementById("expenseList");
      const totalEl = document.getElementById("total");
      list.innerHTML = "";

      let total = 0;
      expenses.forEach((expense, index) => {
        total += expense.amount;
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${expense.item} - $${expense.amount.toFixed(2)}</span>
          <button class="remove-btn" onclick="removeExpense(${index})">X</button>
        `;
        list.appendChild(li);
      });

      totalEl.textContent = total.toFixed(2);
    }

    function removeExpense(index) {
      expenses.splice(index, 1);
      updateList();
    }
