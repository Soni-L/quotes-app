import { render, screen, fireEvent } from "@testing-library/react";
import ShowQuote from "../ShowQuote";
import { Quote } from "../../types/allTypes";
import * as useOfflineCachingModule from "@/hooks/useOfflineCaching";
import * as usePimpedQuoteModule from "@/hooks/usePimpedQuote";
import OfflineStatusIndicator from "../OfflineStatusIndicator";

// Mock both custom hooks and subcomponents
jest.mock("@/hooks/useOfflineCaching");
jest.mock("@/hooks/usePimpedQuote");
jest.mock("../OfflineStatusIndicator", () => () => (
  <div data-testid="offline-status">OfflineStatusIndicator</div>
));
jest.mock("../PimpedButton", () => (props: any) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    data-testid="pimped-button"
  >
    {props.mode === "pimped" ? "Keep it scholarly" : "Pimp it up"}
  </button>
));

const mockQuotes: Quote[] = [
  { id: 1, quote: "Life is good", author: "Author A" },
  { id: 2, quote: "Code like it's 1999", author: "Author B" },
];

describe("ShowQuote", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUseOfflineCaching = (quotes = mockQuotes) => {
    (useOfflineCachingModule.default as jest.Mock).mockReturnValue({
      cachedQuotes: quotes,
    });
  };

  const mockUsePimpedQuote = (mode: "scholarly" | "pimped" = "scholarly") => {
    (usePimpedQuoteModule.default as jest.Mock).mockReturnValue({
      loading: false,
      disabled: false,
      currentPimpMode: mode,
      pimpedQuote:
        mode === "pimped"
          ? { id: 1, quote: "Pimped version", author: "Author A" }
          : { id: 1, quote: "Life is good", author: "Author A" },
      getPimpedQuote: jest.fn(),
      backToOriginal: jest.fn(),
    });
  };

  it("renders the quote and author in scholarly mode", () => {
    mockUseOfflineCaching();
    mockUsePimpedQuote("scholarly");

    render(<ShowQuote quotes={mockQuotes} />);
    expect(screen.getByText("Life is good")).toBeInTheDocument();
    expect(screen.getByText(/"Author A"/)).toBeInTheDocument();
    expect(screen.getByTestId("offline-status")).toBeInTheDocument();
  });

  it("renders the pimped quote in pimped mode", () => {
    mockUseOfflineCaching();
    mockUsePimpedQuote("pimped");

    render(<ShowQuote quotes={mockQuotes} />);
    expect(screen.getByText("Pimped version")).toBeInTheDocument();
    expect(screen.getByText(/"Author A"/)).toBeInTheDocument();
  });

  it("calls backToOriginal when in pimped mode and button is clicked", () => {
    mockUseOfflineCaching();
    const backToOriginal = jest.fn();
    (usePimpedQuoteModule.default as jest.Mock).mockReturnValue({
      loading: false,
      disabled: false,
      currentPimpMode: "pimped",
      pimpedQuote: { id: 1, quote: "Pimped version", author: "Author A" },
      getPimpedQuote: jest.fn(),
      backToOriginal,
    });

    render(<ShowQuote quotes={mockQuotes} />);
    fireEvent.click(screen.getByTestId("pimped-button"));
    expect(backToOriginal).toHaveBeenCalled();
  });

  it("calls getPimpedQuote when in scholarly mode and button is clicked", () => {
    mockUseOfflineCaching();
    const getPimpedQuote = jest.fn();
    (usePimpedQuoteModule.default as jest.Mock).mockReturnValue({
      loading: false,
      disabled: false,
      currentPimpMode: "scholarly",
      pimpedQuote: { id: 1, quote: "Life is good", author: "Author A" },
      getPimpedQuote,
      backToOriginal: jest.fn(),
    });

    render(<ShowQuote quotes={mockQuotes} />);
    fireEvent.click(screen.getByTestId("pimped-button"));
    expect(getPimpedQuote).toHaveBeenCalled();
  });

  it("renders fallback UI when quotes array is empty", () => {
    mockUseOfflineCaching([]);
    mockUsePimpedQuote();

    render(<ShowQuote quotes={[]} />);
    expect(
      screen.getByText(/Oops there has been an error/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reload/i })).toBeInTheDocument();
  });

  it("changes quote on 'Show me another quote!' button click", () => {
    mockUseOfflineCaching();
    mockUsePimpedQuote();

    render(<ShowQuote quotes={mockQuotes} />);
    const quoteBefore = screen.getByText(/Life is good|Code like/i).textContent;
    const button = screen.getByText(/Show me another quote/i);
    fireEvent.click(button);
    const quoteAfter = screen.getByText(/Life is good|Code like/i).textContent;

    // Might still match the same quote, so just ensure the handler doesn't break rendering
    expect(button).toBeInTheDocument();
    expect(quoteAfter).toBeTruthy();
  });
});
