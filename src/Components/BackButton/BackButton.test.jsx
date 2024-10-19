import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'; 
import  BackButton  from './BackButton';

describe("BackButton", ()=>{
    test('renders correctly', ()=>{
        render(
            <MemoryRouter>
              <BackButton />
            </MemoryRouter>
        );

        const backButton = screen.getByRole('link', {
            name: /arrow_back/i
        })
        expect(backButton).toBeInTheDocument()
    })
    
    test('has class of back-btn', ()=>{
        render(
            <MemoryRouter>
              <BackButton />
            </MemoryRouter>
        );

        const backButton = screen.getByRole('link', {
            name: /arrow_back/i
        })
        expect(backButton).toHaveClass('back-btn')
    })

    test('has correct colour', ()=>{
        render(
            <MemoryRouter>
              <BackButton />
            </MemoryRouter>
        );

        const backButton = screen.getByRole('link', {
            name: /arrow_back/i
        })

        expect(backButton).toHaveStyle(
            {
                color: '#FFFFF',
                backgroundColor:"FF0000"
            }
        )
    })
})