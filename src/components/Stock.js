import React from "react";

function Stock({stock, onHandleClick}) {
  const {id, ticker, name, type, price} = stock

  function handleClick(){
    onHandleClick(stock)
    console.log("stock",stock)
  }
  
  return (
    <div>
      <div className="card">
        <div className="card-body" id={id} name={type} onClick={handleClick}>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
