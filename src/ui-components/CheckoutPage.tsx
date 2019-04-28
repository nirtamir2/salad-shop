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

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  function handleBuy(e: React.FormEvent) {
    e.preventDefault();
    setIsModalVisible(true);
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
            <div className="CheckoutPage__overview__content">
              <h2>Order summary</h2>
              <OrderSummary order={order} />
            </div>
          </Card>
        </div>
        <div className="CheckoutPage__button">
          <Button
            type="submit"
            disabled={
              order.items.length === 0 ||
              name.length === 0 ||
              email.length === 0
            }
          >
            Buy Now
          </Button>
        </div>
      </form>

      <Modal isVisible={isModalVisible}>
        <Card>
          <div>
            <h2>Invoice</h2>
            <OrderSummary order={order} />
            <div className="CheckoutPage__modal__checkoutDetails">
              <div>Name:</div>
              <div>{name}</div>
              <div>Email:</div>
              <div>{email}</div>
              {note.length === 0 ? null : (
                <>
                  <div>Note:</div>
                  <div>{note}</div>
                </>
              )}
            </div>

            <p className="CheckoutPage__modal__thanks">
              Thank you! - Delivery is on its way
            </p>

            <div className="CheckoutPage__modal__button">
              <Button
                to="/"
                onClick={() => {
                  setIsModalVisible(false);
                  clearOrder();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
}

export default CheckoutPage;
