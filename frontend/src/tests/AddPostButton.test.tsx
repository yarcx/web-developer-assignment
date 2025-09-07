import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddPostButton from "../components/common/AddPostButton";

jest.mock("../../assets/icons/AddCircle", () => {
  return function MockAddCircle() {
    return <div data-testid="add-circle-icon">AddCircle Icon</div>;
  };
});

jest.mock("./Button", () => {
  return function MockButton({ children, variant, className }: never) {
    return (
      <button data-testid="mock-button" className={className} data-variant={variant}>
        {children}
      </button>
    );
  };
});

describe("AddPostButton", () => {
  const mockHandleOpenAddUserModal = jest.fn();

  beforeEach(() => {
    mockHandleOpenAddUserModal.mockClear();
  });

  it("renders the component with correct elements", () => {
    render(<AddPostButton handleOpenAddUserModal={mockHandleOpenAddUserModal} />);

    expect(screen.getByTestId("add-circle-icon")).toBeInTheDocument();

    expect(screen.getByText("New Post")).toBeInTheDocument();

    const button = screen.getByTestId("mock-button");
    expect(button).toHaveAttribute("data-variant", "ghost");
  });

  it("applies correct CSS classes", () => {
    render(<AddPostButton handleOpenAddUserModal={mockHandleOpenAddUserModal} />);

    const container = screen.getByRole("button").closest("div");
    expect(container).toHaveClass(
      "h-[290px]",
      "w-[273px]",
      "cursor-pointer",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "rounded-md",
      "border-dashed",
      "border",
      "border-border-100"
    );
  });

  it("calls handleOpenAddUserModal when clicked", () => {
    render(<AddPostButton handleOpenAddUserModal={mockHandleOpenAddUserModal} />);

    const container = screen.getByRole("button").closest("div");
    fireEvent.click(container!);

    expect(mockHandleOpenAddUserModal).toHaveBeenCalledTimes(1);
  });

  it("calls handleOpenAddUserModal when button is clicked directly", () => {
    render(<AddPostButton handleOpenAddUserModal={mockHandleOpenAddUserModal} />);

    const button = screen.getByText("New Post");
    fireEvent.click(button);

    expect(mockHandleOpenAddUserModal).toHaveBeenCalledTimes(1);
  });
});
