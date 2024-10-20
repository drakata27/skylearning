import { render, screen } from "../../test-utils";
import Header from "./Header";

describe('Header', ()=> {
    test('renders correctly', () => {
        render(<Header />);
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });
    
    test('renders logo correctly', () => {
        render(<Header />);
        const logo = screen.getByRole('img', {name:/logo/i});
        expect(logo).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(<Header />);
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
    });
    
    test('renders login and register when not authenticated', () => {
        localStorage.removeItem('authTokens');
        render(<Header />);
        
        const loginLink = screen.getByText('Login');
        const registerLink = screen.getByText('Register');
        expect(loginLink).toBeInTheDocument();
        expect(registerLink).toBeInTheDocument();
    });
})