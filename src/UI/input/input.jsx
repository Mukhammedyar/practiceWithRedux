import { FormControl, FormHelperText, FormLabel, TextField } from '@mui/material'
import React from 'react'

export default function Input({Label, onChange, more, className, value , error}) {
  return (
    <FormControl sx={{fontSize:30}}>
      <FormLabel>{Label}</FormLabel>
      <TextField error={error} id="outlined-basic" label={""} variant="outlined" onChange={onChange} className={className} value={value} />
      <FormHelperText>
        {more}
      </FormHelperText>
  </FormControl>
  )
}
