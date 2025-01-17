const api = '15KYEBKYOTXM4JJ2';
// Fetch data from the API and create the chart
    async function fetchAndCreateChart(range = "5y",symbol ="AMRN") {
          const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey=${api}`;
      try{
         const response = await fetch(url);
        const result = await response.json();
        const chartData = [];
        const labels = [];
        const monthlyData = result["Monthly Adjusted Time Series"];
        for (const date in monthlyData) {
        if (monthlyData.hasOwnProperty(date)) {
            const adjClose = parseFloat(monthlyData[date]["5. adjusted close"]);
            const formattedDate = new Date(date).toLocaleDateString();
            chartData.push(adjClose);
            labels.push(formattedDate);
        }
        }

const stockName = result["Meta Data"]["2. Symbol"];
drawChart(chartData, labels, stockName);
          //   getStocks(st);
        //   getStats(st);
        //   displayName(stockName);
        } catch (error) {
          console.error(error);
        }
  
      const onedaybtn = document.getElementById("btn1d");
      const onemonbtn = document.getElementById("btn1mo");
      const oneyrbtn = document.getElementById("btn1y");
      const fiveyrbtn = document.getElementById("btn5y");
      onedaybtn.addEventListener('click',()=>{
        fetchAndCreateChart("1mo",symbol);
      })
      onemonbtn.addEventListener('click',()=>{
        fetchAndCreateChart("3mo",symbol);
      })
      oneyrbtn.addEventListener('click',()=>{
        fetchAndCreateChart("1y",symbol);
      })
      fiveyrbtn.addEventListener('click',()=>{
        fetchAndCreateChart("5y",symbol);
      })
  
      }
  
      // Function to draw the chart on the canvas
      function drawChart(data, labels, stockName) {
        const canvas = document.getElementById('chartCanvas');
        const ctx = canvas.getContext('2d');
        const chartHeight = canvas.height - 40;
        const chartWidth = canvas.width - 60;
        const dataMax = Math.max(...data);
        const dataMin = Math.min(...data);
        const dataRange = dataMax - dataMin;
        const dataStep = dataRange > 0 ? chartHeight / dataRange : 0;
        const stepX = chartWidth / (data.length - 1);
      
        // Clear the canvas at the beginning
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // Draw the chart
        ctx.beginPath();
        ctx.moveTo(0, chartHeight - (data[0] - dataMin) * dataStep);
        for (let i = 1; i < data.length; i++) {
          ctx.lineTo(i * stepX, chartHeight - (data[i] - dataMin) * dataStep);
        }
        ctx.strokeStyle = '#39FF14';
        ctx.lineWidth = 2;
        ctx.stroke();
      
        // Draw a dotted horizontal line for value 0
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        const zeroY = chartHeight - (0 - dataMin) * dataStep;
        ctx.moveTo(0, zeroY);
        ctx.lineTo(canvas.width, zeroY);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
        ctx.setLineDash([]); // Reset the line dash
      
        // Show tooltip and x-axis value on hover
        const tooltip = document.getElementById('tooltip');
        const xAxisLabel = document.getElementById('xAxisLabel');
      
        canvas.addEventListener('mousemove', (event) => {
          const x = event.offsetX;
          const y = event.offsetY;
          const dataIndex = Math.min(Math.floor(x / stepX), data.length - 1); // Ensure not to go out of bounds
          const stockValue = data[dataIndex].toFixed(2);
          const xAxisValue = labels[dataIndex];
      
          tooltip.style.display = 'block';
          tooltip.style.left = `${x + 10}px`;
          tooltip.style.top = `${y - 20}px`;
          tooltip.textContent = `${stockName}: $${stockValue}`;
      
          xAxisLabel.style.display = 'block';
          xAxisLabel.style.fontSize = '14px';
          xAxisLabel.style.fontWeight = 'bolder';   
          xAxisLabel.style.left = `${x}px`;
          xAxisLabel.textContent = xAxisValue;
      
          // Clear the canvas except for the vertical line and data point
          ctx.clearRect(0, 0, canvas.width, chartHeight);
          ctx.clearRect(0, chartHeight + 20, canvas.width, canvas.height - chartHeight - 20);
      
          // Draw the chart
          ctx.beginPath();
          ctx.moveTo(0, chartHeight - (data[0] - dataMin) * dataStep);
          for (let i = 1; i < data.length; i++) {
            ctx.lineTo(i * stepX, chartHeight - (data[i] - dataMin) * dataStep);
          }
          ctx.strokeStyle = '#39FF14';
          ctx.lineWidth = 2;
          ctx.stroke();
      
          // Draw the dotted horizontal line for value 0
          ctx.beginPath();
          ctx.setLineDash([2, 2]);
          ctx.moveTo(0, zeroY);
          ctx.lineTo(canvas.width, zeroY);
          ctx.strokeStyle = '#ccc';
          ctx.stroke();
          ctx.setLineDash([]); // Reset the line dash
      
          // Draw a vertical line at the current x position when hovering over the chart
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, chartHeight);
          ctx.strokeStyle = '#ccc';
          ctx.stroke();
      
          // Draw the data point as a bolder ball
          ctx.beginPath();
          ctx.arc(x, chartHeight - (data[dataIndex] - dataMin) * dataStep, 6, 0, 2 * Math.PI);
          ctx.fillStyle = '#39FF14';
          ctx.fill();
        });
      
        canvas.addEventListener('mouseout', () => {
          tooltip.style.display = 'none';
          xAxisLabel.style.display = 'none';
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawChart(data, labels, stockName);
        });
  
      }
      fetchAndCreateChart('5y',"AAPL");
  
  //////////////////////////////////////////////////////////////
  
  
//       async function getStocks(symbol){
//       const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-profile?symbol=${symbol}&region=US&lang=en-US`;
//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key': '8d6f9f02e6mshd315a58504e4be5p1ba04bjsnab1c417e2480',
//           'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
//         }
//       };
//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//         const stocksummary = document.querySelector('#summary');
//         stocksummary.querySelector('p').textContent = result.quoteSummary.result[0].summaryProfile.longBusinessSummary;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     function displayName(name){
//       const stocksummary = document.querySelector('#summary');
//       stocksummary.querySelector('#name').textContent = name;
//     }
    
//   ///////////////////////////////////////////////////////////
//     async function getStats(symbol){
//       const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v4/get-statistics?symbol=${symbol}&region=US&lang=en-US`;
//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key': '8d6f9f02e6mshd315a58504e4be5p1ba04bjsnab1c417e2480',
//           'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
//         }
//       };
//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         // console.log(result);
//         const bookValue = result.quoteSummary.result[0].defaultKeyStatistics.bookValue.raw;
//         const profit = result.quoteSummary.result[0].defaultKeyStatistics.profitMargins.raw;
//         const Profit = document.getElementById("profit")
//         Profit.textContent = `${profit}%`;
//         if (profit > 0) {
//           Profit.setAttribute('style', 'color: green');
//         } else {
//           Profit.setAttribute('style', 'color: red');
//         }
//         document.getElementById("bookValue").textContent = `$${bookValue}`;
      
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//   // //Side div
  
  async function getStatusinList(symbol){
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${api}`;
    let bookValue;
    let profit;
        try {
          const response = await fetch(url);
          const result = await response.json();
          console.log(result);
          bookValue = result["Global Quote"]["05. price"];
          profit = result["Global Quote"]["10. change Percent"];
        } catch (error) {
          console.error(error);
        }
        return {bookValue,profit};
      }
  
  async function renderList(){
  const list = ['AAPL' ,'MSFT' ,'GOOGL' ,'AMZN' ,'PYPL' ,'TSLA' ,'JPM' ,'NVDA', 'NFLX', 'DIS'];
  const listEl = document.getElementById('stock-list');
  
  for (const stock of list) {
    const { bookValue, profit } = await getStatusinList(stock);
    const list_item = document.createElement("div");
    const name = document.createElement('span');
    const bookV = document.createElement('span');
    const proft = document.createElement('span');
    if (profit > 0) {
            proft.setAttribute('style', 'color: #90EE90');
          } else {
            proft.setAttribute('style', 'color: red');
          }
    list_item.classList.add('list');
    name.textContent = stock;
    name.value = stock;
    bookV.textContent = `$${bookValue}`;
    proft.textContent = `${profit}%`;
  
    list_item.append(name, bookV, proft);
    listEl.append(list_item);
    name.addEventListener('click',(e)=>{
    fetchAndCreateChart('5y',stock)
    })
  }
  }
  renderList();