import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyButton from "./MyButton";

test("renders the button and handles click", async () => {
  const onClick = jest.fn();
  render(<MyButton onClick={onClick}>Click me</MyButton>);

  const button = screen.getByRole("button", { name: /click me/i });
  await userEvent.click(button);

  expect(onClick).toHaveBeenCalled();
});
