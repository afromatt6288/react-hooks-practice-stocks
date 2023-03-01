import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, onOnBuyStock}) {

  function onBuyStock(stock) {
    onOnBuyStock(stock)
  }

  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => <Stock key={stock.id} stock={stock} onHandleClick={onBuyStock}/> )}
    </div>
  );
}

export default StockContainer;
