import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from ".";

const { getByRole, queryByText } = screen;

it("should render the form", () => {
  render(<SummaryForm />);
  const button = getByRole("button", { name: /confirm order/i });
  const checkbox = getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });

  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

it("should enable the button when the checkbox is checked and disable button if unchecked", () => {
  render(<SummaryForm />);
  const button = getByRole("button", { name: /confirm order/i });
  const checkbox = getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

it("should respond to hover with popover", async () => {
  render(<SummaryForm />);
  // popover is hidden
  const nullPopover = queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // appears on hover
  const termsAndConditions = queryByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = queryByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // disappears on mouseLeave
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    queryByText(/no ice cream will actually be delivered/i)
  );
});
