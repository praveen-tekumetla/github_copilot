function getMonthlyData() {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const incomeData = [];
  const expensesData = [];

  months.forEach(month => {
    const incomeInput = document.getElementById(`${month}-income`);
    const expensesInput = document.getElementById(`${month}-expenses`);

    const incomeValue = incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
    const expensesValue = expensesInput ? parseFloat(expensesInput.value) || 0 : 0;

    incomeData.push(incomeValue);
    expensesData.push(expensesValue);
  });

  return { incomeData, expensesData };
}

window.onload = function() {
    // input with id "username" on change
    document.getElementById('username').addEventListener('input', function() {
        const username = document.getElementById('username').value;
        // regex to check if username has at least 1 capital letter, 1 special character, 1 number and is at least 8 characters long
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
        if (regex.test(username)) {
            document.getElementById('username').style.borderColor = 'green';
            document.getElementById('username').style.color = 'green';
        } else {
            document.getElementById('username').style.borderColor = 'red';
            document.getElementById('username').style.color = 'red';
        }
    });

    document.getElementById('download-btn').addEventListener('click', () => {
        const canvas = document.getElementById('barChart');
        const image = canvas.toDataURL('image/png'); // Convert canvas to a data URL
        const link = document.createElement('a'); // Create a temporary link element
        link.href = image;
        link.download = 'chart.png'; // Set the download filename
        link.click(); // Trigger the download
    });
    const ctx = document.getElementById('barChart').getContext('2d');

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [
            {
              label: 'Monthly Income',
              data: [],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Monthly Expenses',
              data: [],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });


    document.getElementById('chart-tab').addEventListener('click', () => {
        const { incomeData, expensesData } = getMonthlyData(); // Fetch data when the tab is clicked

            barChart.data.datasets[0].data = incomeData;
            barChart.data.datasets[1].data = expensesData;

            barChart.update(); // Update the chart with new data
            
    });
}

