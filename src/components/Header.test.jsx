import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { authActions } from "../store/authSlice";

// Create mutable variables so they can be set before each test
let mockDispatch;
let mockNavigate;

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Header Component", () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate = vi.fn();
  });

  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  test("renders logo and site name", () => {
    renderHeader();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText("MyWebLink")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /products/i })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute(
      "href",
      "/about"
    );
  });

  test("calls logout action and navigates on Logout button click", () => {
    renderHeader();
    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(mockDispatch).toHaveBeenCalledWith(authActions.logout());
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
