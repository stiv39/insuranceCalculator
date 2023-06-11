import { FC, useState, ChangeEvent, FormEvent } from 'react'
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  SelectChangeEvent,
} from '@mui/material'
import { InsuranceCalculatorProps } from './types'
import {
  BALIK_EXTRA,
  BALIK_ROZSIRENY,
  BALIK_ZAKLAD,
  CELOROCNE_POISTENIE_POCET_DNI,
  SPORTOVE_AKTIVITY,
  STORNO_POISTENIE,
  VARIANT_CELOROCNE,
  VARIANT_CELOROCNE_BALIK_EXTRA_SADZBA,
  VARIANT_CELOROCNE_BALIK_ROZSIRENY_SADZBA,
  VARIANT_CELOROCNE_BALIK_ZAKLAD_SADZBA,
  VARIANT_CELOROCNE_SPORTOVE_AKTIVITY_SADZBA,
  VARIANT_CELOROCNE_STORNO_POISTENIE_SADZBA,
  VARIANT_KRATKODOBE,
  VARIANT_KRATKODOBE_BALIK_EXTRA_SADZBA,
  VARIANT_KRATKODOBE_BALIK_ROZSIRENY_SADZBA,
  VARIANT_KRATKODOBE_BALIK_ZAKLAD_SADZBA,
  VARIANT_KRATKODOBE_SPORTOVE_AKTIVITY_SADZBA,
  VARIANT_KRATKODOBE_STORNO_POISTENIE_SADZBA,
} from './constants'

export const InsuranceCalculator: FC<InsuranceCalculatorProps> = () => {
  const [variant, setVariant] = useState<string>('')
  const [zaciatok, setZaciatok] = useState<string>('')
  const [koniec, setKoniec] = useState<string>('')
  const [balik, setBalik] = useState<string>('')
  const [pocetOsob, setPocetOsob] = useState<string>('')
  const [pripoistenia, setPripoistenia] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [cenaPoistenia, setCenaPoistenia] = useState<number | null>(null)

  const handleVariantChange = (event: SelectChangeEvent<string>) => {
    setVariant(event.target.value)
  }

  const handleZaciatokChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZaciatok(event.target.value)
  }

  const handleKoniecChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKoniec(event.target.value)
  }

  const handleBalikChange = (event: SelectChangeEvent<string>) => {
    setBalik(event.target.value as string)
  }

  const handleStornoPoistenieChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setPripoistenia((prevPripoistenia) =>
      isChecked ? [...prevPripoistenia, STORNO_POISTENIE] : prevPripoistenia.filter((p) => p !== STORNO_POISTENIE)
    )
  }

  const handleSportoveAktivityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setPripoistenia((prevPripoistenia) =>
      isChecked ? [...prevPripoistenia, SPORTOVE_AKTIVITY] : prevPripoistenia.filter((p) => p !== SPORTOVE_AKTIVITY)
    )
  }

  const handlePocetOsobChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value

    let intValue = parseInt(value)

    if (intValue < 1 || intValue > 3) {
      intValue = Math.min(Math.max(intValue, 1), 3)

      value = intValue.toString()
    }

    setPocetOsob(value)
  }

  const calculateCenaPoistenia = (
    pocetDni: number,
    sadzbaBalika: number,
    sadzbaPripojenychPoistenii: number
  ): number => {
    const cenaPoistenia = pocetDni * sadzbaBalika * (1 + sadzbaPripojenychPoistenii) * parseInt(pocetOsob)

    return cenaPoistenia
  }

  const handleVariantShort = (startDate: Date, endDate: Date) => {
    let sadzbaBalika = 0
    let sadzbaPripojenychPoistenii = 0

    if (balik === BALIK_ZAKLAD.value) {
      sadzbaBalika = VARIANT_KRATKODOBE_BALIK_ZAKLAD_SADZBA
    } else if (balik === BALIK_ROZSIRENY.value) {
      sadzbaBalika = VARIANT_KRATKODOBE_BALIK_ROZSIRENY_SADZBA
    } else if (balik === BALIK_EXTRA.value) {
      sadzbaBalika = VARIANT_KRATKODOBE_BALIK_EXTRA_SADZBA
    }

    if (pripoistenia.includes(STORNO_POISTENIE)) {
      sadzbaPripojenychPoistenii += VARIANT_KRATKODOBE_STORNO_POISTENIE_SADZBA
    }

    if (pripoistenia.includes(SPORTOVE_AKTIVITY)) {
      sadzbaPripojenychPoistenii += VARIANT_KRATKODOBE_SPORTOVE_AKTIVITY_SADZBA
    }

    const pocetDni = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)

    return calculateCenaPoistenia(pocetDni, sadzbaBalika, sadzbaPripojenychPoistenii)
  }

  const handleVariantLong = () => {
    let sadzbaBalika = 0
    let sadzbaPripojenychPoistenii = 0

    if (balik === BALIK_ZAKLAD.value) {
      sadzbaBalika = VARIANT_CELOROCNE_BALIK_ZAKLAD_SADZBA
    } else if (balik === BALIK_ROZSIRENY.value) {
      sadzbaBalika = VARIANT_CELOROCNE_BALIK_ROZSIRENY_SADZBA
    } else if (balik === BALIK_EXTRA.value) {
      sadzbaBalika = VARIANT_CELOROCNE_BALIK_EXTRA_SADZBA
    }

    if (pripoistenia.includes(STORNO_POISTENIE)) {
      sadzbaPripojenychPoistenii += VARIANT_CELOROCNE_STORNO_POISTENIE_SADZBA
    }

    if (pripoistenia.includes(SPORTOVE_AKTIVITY)) {
      sadzbaPripojenychPoistenii += VARIANT_CELOROCNE_SPORTOVE_AKTIVITY_SADZBA
    }

    const pocetDni = CELOROCNE_POISTENIE_POCET_DNI

    return calculateCenaPoistenia(pocetDni, sadzbaBalika, sadzbaPripojenychPoistenii)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    let cenaPoistenia = 0
    const zaciatokDatum = new Date(zaciatok)
    const koniecDatum = new Date(koniec)

    if (zaciatokDatum > koniecDatum || zaciatokDatum.getTime() === koniecDatum.getTime()) {
      setError('Koniec poistenia musí byť väčší ako začiatok poistenia')
      return
    } else {
      setError('')
    }

    if (variant === VARIANT_KRATKODOBE.value) {
      cenaPoistenia = handleVariantShort(zaciatokDatum, koniecDatum)
    } else if (variant === VARIANT_CELOROCNE.value) {
      cenaPoistenia = handleVariantLong()
    }

    setCenaPoistenia(cenaPoistenia)
  }

  // CHYBA PODMIENKA KTORA BY OMBEDZOVALA AKE DLHE MOZE BYT KRATKODOBE POISTENIE

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={2}>
        <Typography variant="h4">Kalkulačka poistenia</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="variant-label">Variant poistenia</InputLabel>
              <Select
                labelId="variant-label"
                id={'variant-select'}
                label="Variant poistenia"
                data-testid="variant-poistenia"
                variant="filled"
                value={variant}
                onChange={handleVariantChange}
                required
              >
                <MenuItem value={VARIANT_KRATKODOBE.value} data-testid="kratkodob">
                  {VARIANT_KRATKODOBE.label}
                </MenuItem>
                <MenuItem value={VARIANT_CELOROCNE.value} data-testid="celorocne">
                  {VARIANT_CELOROCNE.label}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              type="date"
              label="Začiatok poistenia"
              value={zaciatok}
              onChange={handleZaciatokChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {variant === VARIANT_KRATKODOBE.value ? (
            <Grid item xs={12}>
              <TextField
                variant="filled"
                type="date"
                label="Koniec poistenia"
                data-testid="koniec"
                value={koniec}
                onChange={handleKoniecChange}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                data-test-id="koniec"
                inputProps={{ 'data-testid': 'koniec' }}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="balik-label">Balík poistenia</InputLabel>
              <Select
                labelId="balik-label"
                id="balik-select"
                label="Balík poistenia"
                data-testid="balik-poistenia"
                variant="filled"
                value={balik}
                onChange={handleBalikChange}
                required
              >
                <MenuItem value={BALIK_ZAKLAD.value} data-testid="test1">
                  {BALIK_ZAKLAD.label}
                </MenuItem>
                <MenuItem value={BALIK_ROZSIRENY.value} data-testid="test2">
                  {BALIK_ROZSIRENY.label}
                </MenuItem>
                <MenuItem value={BALIK_EXTRA.value}>{BALIK_EXTRA.label}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              type="number"
              label="Počet osôb"
              value={pocetOsob}
              onChange={handlePocetOsobChange}
              inputProps={{ min: 1, max: 3 }}
              required
              fullWidth
            />
            <Typography variant="caption">Maximálny počet osôb je 3</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" onChange={handleStornoPoistenieChange} />}
              label="Storno poistenie"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" onChange={handleSportoveAktivityChange} />}
              label="Športové aktivity"
            />
          </Grid>
          {error && error.length > 0 ? (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Vypočítať
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box marginTop={4}>
        {cenaPoistenia ? (
          <Typography>
            Cena poistenia pre variant <strong>{variant}</strong> s balíkom <strong>{balik}</strong> pre{' '}
            <strong>{pocetOsob}</strong> osoby je <strong>{cenaPoistenia.toFixed(2)} €</strong>.
          </Typography>
        ) : (
          <Typography>{'Vyplňte formulár a kliknite na tlačidlo vypočítať'}</Typography>
        )}
      </Box>
    </Container>
  )
}
