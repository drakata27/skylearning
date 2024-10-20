import { render, screen } from "@testing-library/react";
import ActionButton from "./ActionButton";
import user from "@testing-library/user-event"

describe('ActionButton', ()=>{
    test('renders edit correctly', () => { 
        render(<ActionButton type='edit'/>)
        const editBtn = screen.getByRole('button', {name: /edit/i})
        expect(editBtn).toBeInTheDocument()   
    })
    
    test('renders delete correctly', () => { 
        render(<ActionButton type='delete'/>)
        const deleteBtn = screen.getByRole('button', {name: /delete/i})
        expect(deleteBtn).toBeInTheDocument()   
    })

    test('calls handleAction', async ()=>{
        user.setup()
        const handleAction = jest.fn()

        render(<ActionButton handleAction={handleAction}/>)
        const editBtn = screen.getByRole('button', {name: /delete/i})
        await user.click(editBtn)
        expect(handleAction).toHaveBeenCalledTimes(1)
    })
    
})