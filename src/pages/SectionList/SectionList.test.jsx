import { render, screen } from "../../test-utils";
import  SectionList  from './SectionList';
import AuthContext from '../../context/AuthContext';

describe('SectionList', ()=>{
    test('renders correctly', () => {
        const mockUser = { user_id: 1, username: 'JohnDoe' };
        render(
          <AuthContext.Provider value={{ user: mockUser, logoutUser: jest.fn() }}>
            <SectionList />
          </AuthContext.Provider>
        );
    
        const sectionListElement = screen.getByText(/Sections/i);
        expect(sectionListElement).toBeInTheDocument();
    });

    test('renders page for unauthenticated users', ()=>{
        const mockUser = { user_id: 1, username: 'JohnDoe' };    
        render(
          <AuthContext.Provider value={{ user: mockUser, logoutUser: jest.fn() }}>
            <SectionList />
          </AuthContext.Provider>
        );
        const loginLinkElement = screen.getByRole('link', {name:/login/i})
        expect(loginLinkElement).toBeInTheDocument()
        
        const registerLinkElement = screen.getByRole('link', {name:/register/i})
        expect(registerLinkElement).toBeInTheDocument()
    })
    
    // test('renders a list of sections', async () => {
    //     const mockUser = { user_id: 1, username: 'JohnDoe' };        
    //     const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IkpvaG5Eb2UifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    //     localStorage.setItem('authTokens', JSON.stringify({ access: mockToken, refresh: 'valid-refresh-token' }));
      
    //     render(
    //       <AuthContext.Provider value={{ user: mockUser, logoutUser: jest.fn() }}>
    //         <SectionList />
    //       </AuthContext.Provider>
    //     );
      
    //     const sectionElements = await screen.findAllByTestId('section-item');
    //     expect(sectionElements).toHaveLength(3);
    //   });
      
})