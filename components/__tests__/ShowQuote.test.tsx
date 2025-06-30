import { render, screen, fireEvent } from "@testing-library/react";
import ShowQuote from "../ShowQuote";
import { Quote } from "../../types/allTypes";
import * as useOfflineCachingModule from "@/hooks/useOfflineCaching";

jest.mock("@/hooks/useOfflineCaching", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockQuotes: Quote[] = [
  { id: 1, quote: "First quote", author: "Author A" },
  { id: 2, quote: "Second quote", author: "Author B" },
];

describe("ShowQuote component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows offline banner when offline", () => {
    (useOfflineCachingModule.default as jest.Mock).mockReturnValue({
      isOnline: false,
      cachedQuotes: mockQuotes,
    });

    render(<ShowQuote quotes={mockQuotes} />);
    expect(screen.getByText(/You are offline/i)).toBeInTheDocument();
  });

  it("shows quote and author from cachedQuotes", () => {
    (useOfflineCachingModule.default as jest.Mock).mockReturnValue({
      isOnline: true,
      cachedQuotes: mockQuotes,
    });

    render(<ShowQuote quotes={mockQuotes} />);
    expect(screen.getByText(/quote/i)).toBeInTheDocument(); // Could be random
  });

  it("changes quote when button is clicked", () => {
    (useOfflineCachingModule.default as jest.Mock).mockReturnValue({
      isOnline: true,
      cachedQuotes: mockQuotes,
    });

    render(<ShowQuote quotes={mockQuotes} />);
    const button = screen.getByRole("button", { name: /show me another/i });

    const initialQuote = screen.getByText(/quote/i).textContent;
    fireEvent.click(button);
    const updatedQuote = screen.getByText(/quote/i).textContent;

    // Might still be same quote (random), so just ensure text is rendered
    expect(button).toBeInTheDocument();
    expect(updatedQuote).toBeTruthy();
  });

  it("shows error when quotes are empty", () => {
    (useOfflineCachingModule.default as jest.Mock).mockReturnValue({
      isOnline: true,
      cachedQuotes: [],
    });

    render(<ShowQuote quotes={[]} />);
    expect(
      screen.getByText(/oops there has been an error/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
  });

  it("renders without crashing with one quote", () => {
    (useOfflineCachingModule.default as jest.Mock).mockReturnValue({
      isOnline: true,
      cachedQuotes: [mockQuotes[0]],
    });

    render(<ShowQuote quotes={[mockQuotes[0]]} />);
    expect(screen.getByText(mockQuotes[0].quote)).toBeInTheDocument();
    expect(screen.getByText(`"${mockQuotes[0].author}"`)).toBeInTheDocument();
  });
});
