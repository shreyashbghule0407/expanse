let transactions = [];
let financialChart;

// Sign-Up Modal functions
function openSignUpModal() {
  document.getElementById("signUpModal").style.display = "block";
}

function closeSignUpModal() {
  document.getElementById("signUpModal").style.display = "none";
}

document.getElementById("signUpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  console.log("User Info Submitted:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  closeSignUpModal();
  document.getElementById("signUpForm").reset();
  alert("Sign-Up Successful!");
});

// Transaction form functions
function toggleTransactionType() {
  const type = document.getElementById("transactionType").value;
  const categorySelect = document.getElementById("category");

  if (type === "Income") {
    categorySelect.innerHTML = 
     ` <option value="Salary">Salary</option>
      <option value="Bonus">Bonus</option>
      <option value="Investment">Investment</option>
      <option value="Other">Other</option>`
    ;
  } else {
    categorySelect.innerHTML = 
      `<option value="Rent">Rent</option>
      <option value="Bills">Bills</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Food">Food</option>
      <option value="Other">Other</option>`
    ;
  }
}

function addTransaction() {
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const type = document.getElementById("transactionType").value;
  const date = new Date().toLocaleDateString();

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  const transaction = { amount, category, type, date };
  transactions.push(transaction);
  updateTransactionHistory();
  updateFinancialOverview();
  document.getElementById("amount").value = '';
}

function updateTransactionHistory() {
  const container = document.getElementById("transactions");
  container.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const entry = document.createElement("div");
    entry.innerHTML = `
      <strong>${transaction.category}</strong>: ₹${transaction.amount} (${transaction.type}) on ${transaction.date}
      <button onclick="removeTransaction(${index})">Remove</button>`
    ;
    container.appendChild(entry);
  });
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateTransactionHistory();
  updateFinancialOverview();
}

function updateFinancialOverview() {
  const income = transactions.filter(t => t.type === "Income").reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "Expense").reduce((acc, t) => acc + t.amount, 0);

  if (financialChart) {
    financialChart.destroy();
  }

  const ctx = document.getElementById('financialChart').getContext('2d');
  
  financialChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        label: 'Financial Overview',
        data: [income, expenses],
        backgroundColor: ['#4CAF50', '#FF6347'],
        borderColor: ['#4CAF50', '#FF6347'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ₹' + tooltipItem.raw.toFixed(2);
            }
          }
        }
      }
    }
  });
}

async function askBot() {
  const query = document.getElementById("query").value;
  const resDiv = document.getElementById("response");
  resDiv.textContent = "Thinking...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     "Authorization": "Bearer YOUR_API_KEY",

    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }]
    })
  });
  const data = await response.json();
  resDiv.textContent = data.choices[0].message.content;
}

document.addEventListener('DOMContentLoaded', function () {
  toggleTransactionType(); // Initialize the category dropdown
  updateFinancialOverview();
}); 