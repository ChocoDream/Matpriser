import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col } from "reactstrap";
import willys from "../images/willys.jpg";
import coop from "../images/coop4.png";
import hemkop from "../images/hemkop.jpg";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ShoppingListCard = () => {
  const allProducts = useContext(ProductContext);
  const [coopTotalPrice, setcoopTotalPrice] = useState(0);
  const [willysTotalPrice, setwillysTotalPrice] = useState(0);
  const [hemkopTotalPrice, sethemkopTotalPrice] = useState(0);

  const getPrice = () => {
    let itemsFromLocalStorage = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    let willysPrices = 0;
    let coopPrices = 0;
    let hemkopPrices = 0;

    itemsFromLocalStorage.forEach(async (item) => {
      if (item.pricePerItem) {
        if (item.storeId === 1) {
          coopPrices += item.pricePerItem;
        } else if (item.storeId === 2) {
          hemkopPrices += item.pricePerItem;
        } else if (item.storeId === 3) {
          willysPrices += item.pricePerItem;
        }
      } else {
        console.error("pricePerItem is null or undefined");
      }
    });
    setcoopTotalPrice(coopPrices.toFixed(2));
    setwillysTotalPrice(willysPrices.toFixed(2));
    sethemkopTotalPrice(hemkopPrices.toFixed(2));
  };

  useEffect(() => {
    if (localStorage.getItem("shoppingList")) {
      getPrice();
    }
  }, [allProducts]);

  return (
    <>
      <Card body>
        <Row>
          <Col xs="6">
            <img src={willys} height="100vh" width="150vw" alt="affär"></img>
          </Col>
          <Col xs="6">
            <h2 className="text-right mt-4">{willysTotalPrice} kr</h2>
          </Col>
        </Row>
      </Card>

      <Card body>
        <Row>
          <Col xs="6">
            <img src={coop} height="100vh" width="150vw" alt="affär"></img>
          </Col>
          <Col xs="6">
            <h2 className="text-right mt-3">{coopTotalPrice} kr</h2>
          </Col>
        </Row>
      </Card>

      <Card body>
        <Row>
          <Col xs="6">
            <img src={hemkop} height="100 vh" width="150vw" alt="affär"></img>
          </Col>
          <Col xs="6">
            <h2 className="text-right mt-3">{hemkopTotalPrice} kr</h2>
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default ShoppingListCard;
