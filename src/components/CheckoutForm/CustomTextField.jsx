import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        fullWidth
        name={name}
        defaultValue=""
        render={({ field }) => (
          <TextField name={name} label={label} required {...field} />
        )}
      />
    </Grid>
  );
};

export default FormInput;
