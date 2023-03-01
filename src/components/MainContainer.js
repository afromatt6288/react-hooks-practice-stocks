import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portStocks, setPortStocks] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("All")

  useEffect(()=> {
    fetch("http://localhost:3001/stocks")
    .then(r=> r.json())
    .then(data => setStocks(data))
  },[])
  console.log(stocks)

  function buyStock(stock){
    const stockInPort = portStocks.find((port) => port.id === stock.id)
    const updatedStocks = !stockInPort ? [...portStocks, stock] : portStocks
    setPortStocks(updatedStocks)
    console.log("buyStock", portStocks)
  }

  function sellStock(stock){
    const updatedStocks = portStocks.filter((port) => port.id !== stock.id)
    setPortStocks(updatedStocks)
    console.log("sellStock", portStocks)
  }

  // handle my sort
  const sortedStocks = [...stocks].sort((stock1, stock2) => {
   if (sortBy === "Alphabetically") {
    return stock1.name.localeCompare(stock2.name)
   } else{
    return stock1.price - stock2.price
   }
  })

 // handle my filter
  const stocksToDisplay = sortedStocks.filter((stock)=> filterBy === "All" ? sortedStocks : stock.type === filterBy )

  // duplicated the above to sort and filter the stocks in my portfolio as well
  const sortedPortStocks = [...portStocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
     return stock1.name.localeCompare(stock2.name)
    } else{
     return stock1.price - stock2.price
    }
   })

   const portStocksToDisplay = sortedPortStocks.filter((stock)=> filterBy === "All" ? sortedStocks : stock.type === filterBy )


  return (
    <div>
      <SearchBar filterBy={filterBy} onHandleFilter={setFilterBy} sortBy={sortBy} onSortChange={setSortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocksToDisplay} onOnBuyStock={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portStocksToDisplay} onOnSellStock={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
