
getData();


// setInterval(() => {
//    getData();
// }, 1000);

const filter = document.querySelector('.filter');
let tableBody = document.querySelector('.table-body');
 
async function getData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    const response = await fetch(url);
    const data = await response.json();

    
        
        for(i = 0; i < data.length; i++){
            let row = `
                <tr>
                    <td>${data[i].market_cap_rank}</td>
                    <td><img src=${data[i].image} class="icon"></td>
                    <td class="name">${data[i].name}</td>
                    <td>${data[i].symbol}</td>
                    <td>${data[i].current_price}</td>
                    <td class="percentage">${data[i].price_change_percentage_24h}</td>
                    <td>${data[i].market_cap}</td>
                    <td><a class="btn btn-success" href="#">Buy</a></td>
                    
                </tr>
            `
            
            
            
           tableBody.innerHTML += row;

           const percentage = document.querySelectorAll('.percentage');
           const arr = Array.from(percentage)
           arr.map(item => {
              let value = item.innerText;
              if(value < 0){
                  item.style.color = 'red';
              }
              else if (value >= 0){
                  item.style.color = 'green'
              }
           })
            
        }
       
}


filter.addEventListener('keyup', searchCoin)
//search 
function searchCoin(e){
    const textInput = e.target.value.toLowerCase();

    document.querySelectorAll('.name').forEach(
        function(items){
            const item = items.firstChild.textContent;
            if(item.toLowerCase().indexOf(textInput) != -1){
                items.style.display = 'block';
            } else {
                items.parentElement.style.display = 'none';
            }
        }
    )
}
