import React from "react";
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard";
import ShoppingListProductCard from "../components/ShoppingListProductCard";

const ShoppingListPage = () => {
  const testProducts = [
    {
      name: "Cat food",
      brand: "Mjau",
      amount: 3,
      price: 30,
      onSale: false,
    },
    {
      name: "Bröd",
      brand: "Ica",
      amount: 1,
      price: 12,
      onSale: true,
    },
    {
      name: "Godis",
      brand: "Godiskungen",
      amount: 2,
      price: 30,
      onSale: false,
    },
  ];

  const PrintProducts = () => {
    return (
      <>
        {testProducts.map((product, index) => {
          return (
            <ShoppingListProductCard
              key={`${index}${product.name}`}
              product={ product }
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <h1>shopping list</h1>
      <PrintProducts />
    </>
  );
};

export default withRouter(ShoppingListPage);
