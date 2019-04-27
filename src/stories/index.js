import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { State, Store } from "@sambego/storybook-state";

import TextField from "../ui-core/TextField";

storiesOf("TextField", module).add("<TextField>", () => {
  const store = new Store({
    value: "😀 😎 👍 💯"
  });

  return (
    <>
      <style>{`
      body {
        background-color: var(--primary-color);
        padding: var(--gutter);
      }
      `}</style>
      <State store={store}>
        <TextField
          value={store.get("value")}
          label="labelName"
          placeholder="Placeholder"
          onChange={function(value) {
            action("onChange()")(...arguments);
            store.set({ value });
          }}
        />
      </State>
    </>
  );
});
