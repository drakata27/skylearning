import { render, screen } from "@testing-library/react";
import EditButton from "./EditButton";
import user from "@testing-library/user-event"

describe('EditButton', ()=>{
    test('renders correctly', () => { 
        render(<EditButton />)
        const editBtn = screen.getByRole('button', {name: /edit/i})
        expect(editBtn).toBeInTheDocument()   
    })

    test('renders correct color', () => { 
        render(<EditButton />)
        const editBtn = screen.getByRole('button', {name: /edit/i})
        expect(editBtn).toHaveStyle({color: 'ButtonText'})   
    })

    test('calls handleNavigation', async ()=>{
        user.setup()
        const handleNavigation = jest.fn()

        render(<EditButton handleNavigation={handleNavigation}/>)
        const editBtn = screen.getByRole('button', {name: /edit/i})
        await user.click(editBtn)
        expect(handleNavigation).toHaveBeenCalledTimes(1)
    })
    
})