import { render, screen } from "@testing-library/react";
import DeleteButton from "./DeleteButton";
import user from "@testing-library/user-event"

describe('DeleteButton', ()=>{
    test('renders correctly', () => { 
        render(<DeleteButton />)
        const deleteBtn = screen.getByRole('button', {name: /delete/i})
        expect(deleteBtn).toBeInTheDocument()   
    })
    
    test('renders correct color', () => { 
        render(<DeleteButton />)
        const deleteBtn = screen.getByRole('button', {name: /delete/i})
        expect(deleteBtn).toHaveStyle(
            {
                color: 'ButtonText',
                backgroundColor:"FF0000"
            }
        )   
    })
    
    test('calls deleteCard', async () => { 
        user.setup()
        const deleteCard = jest.fn()

        render(<DeleteButton deleteCard={deleteCard}/>)
        const deleteBtn = screen.getByRole('button', {name: /delete/i})
        await user.click(deleteBtn)
        expect(deleteCard).toHaveBeenCalledTimes(1)   
    })
    
})