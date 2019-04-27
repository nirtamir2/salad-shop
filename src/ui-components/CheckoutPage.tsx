import React from "react";
import { IngredientsContext } from "./IngredientsContext";
import Card from "../ui-core/Card";
import Button from "../ui-core/Button";
import TextField from "../ui-core/TextField";
import "./CheckoutPage.css";

function CheckoutPage() {
  const ingredientsContext = React.useContext(IngredientsContext);

  const { order } = ingredientsContext;
  const orderItems = order.items;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [note, setNote] = React.useState("");

  const [shouldOpenModal, setShouldOpenModal] = React.useState(false);
  function handleBuy(e: React.FormEvent) {
    e.preventDefault();
    console.log("name", name);
    console.log("email", email);
    console.log("note", note);
    setShouldOpenModal(true);
  }

  return (
    <div>
      <form onSubmit={handleBuy} className="CheckoutPage">
        <div className="CheckoutPage__form">
          <Card>
            <div className="CheckoutPage__formContent">
              <TextField
                label="Name"
                value={name}
                required
                placeholder="Name"
                onChange={value => setName(value)}
              />
              <TextField
                label="Email"
                value={email}
                type="email"
                required
                placeholder="Email"
                onChange={value => setEmail(value)}
              />
              <TextField
                label="Note"
                value={note}
                placeholder="Note"
                onChange={value => setNote(value)}
                textArea
              />
            </div>
          </Card>
        </div>

        <div className="CheckoutPage__overview">
          <Card>
            <div className="CheckoutPage__overview__card">
              <h2>Order summary</h2>
              {orderItems.length === 0 ? null : (
                <ul>
                  {orderItems.map(o => {
                    const { ingredient, count } = o;
                    return (
                      <li key={ingredient.id}>
                        <div>
                          {ingredient.title} x {count} ={" "}
                          {(count * ingredient.priceInUsd).toFixed(2)}$
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Card>
        </div>
        <div className="CheckoutPage__button">
          <Button type="submit" disabled={orderItems.length === 0}>
            Buy Now
          </Button>
        </div>
      </form>
      {shouldOpenModal ? (
        <div className="modal">
          <Card>
            <div
              onClick={() => {
                setShouldOpenModal(false);
              }}
            >
              hi all
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default CheckoutPage;
