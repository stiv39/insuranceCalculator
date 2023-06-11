import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InsuranceCalculator } from '../../app/components/calculator'

describe('InsuranceCalculator', () => {
  test('renders the form correctly', () => {
    render(<InsuranceCalculator />)

    expect(screen.getByLabelText('Variant poistenia')).toBeInTheDocument()
    expect(screen.getByText('Začiatok poistenia')).toBeInTheDocument()
    expect(screen.getByLabelText('Balík poistenia')).toBeInTheDocument()
    expect(screen.getByText('Počet osôb')).toBeInTheDocument()
    expect(screen.getByText('Maximálny počet osôb je 3')).toBeInTheDocument()
    expect(screen.getByLabelText('Storno poistenie')).toBeInTheDocument()
    expect(screen.getByLabelText('Športové aktivity')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Vypočítať' })).toBeInTheDocument()
  })

  test('renders Koniec poistenie field after selecting krakodobe poistenie option', async () => {
    render(<InsuranceCalculator />)

    const dropdownButton = screen.getByRole('button', { name: /variant poistenia ​/i })
    userEvent.click(dropdownButton)

    const dropdownItem = await screen.findByTestId(/kratkodob/i)
    userEvent.click(dropdownItem)
    expect(await waitFor(() => screen.getByText('Koniec poistenia'))).toBeInTheDocument()
  })

  test('doesnt render Koniec poistenie field after selecting celorocne poistenie option', async () => {
    render(<InsuranceCalculator />)

    const dropdownButton = screen.getByRole('button', { name: /variant poistenia ​/i })
    userEvent.click(dropdownButton)

    const dropdownItem = await screen.findByTestId(/celorocne/i)
    userEvent.click(dropdownItem)

    var element = await waitFor(() => screen.queryByText('Koniec poistenia'))
    expect(element).not.toBeInTheDocument()
  })
})
