import React from "react";
import { IngredientsContext } from "./IngredientsContext";
import Card from "../ui-core/Card";
import Button from "../ui-core/Button";
import TextField from "../ui-core/TextField";
import Modal from "../ui-core/Modal";
import OrderSummary from "./OrderSummary";
import "./CheckoutPage.css";

function CheckoutPage() {
  const ingredientsContext = React.useContext(IngredientsContext);

  const { order, clearOrder } = ingredientsContext;

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
            <h2>Order summary</h2>
            <OrderSummary order={order} />
          </Card>
        </div>
        <div className="CheckoutPage__button">
          <Button type="submit" disabled={order.items.length === 0}>
            Buy Now
          </Button>
        </div>
      </form>

      <Modal isVisible={shouldOpenModal}>
        <Card>
          <h2>Summary order</h2>
          <OrderSummary order={order} />
          <div>
            <p>name: {name}</p>
            <p>email: {email}</p>
            {note == null ? null : <p>note: {note}</p>}
          </div>
          <div>
            <p>Thank you!</p>
            <p>Delivery is on its way</p>
          </div>
          <Button
            to="/"
            onClick={() => {
              setShouldOpenModal(false);
              clearOrder();
            }}
          >
            Close
          </Button>
        </Card>
      </Modal>
    </div>
  );
}

export default CheckoutPage;
