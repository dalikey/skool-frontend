import { Button, Stack, TextField, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import { useCreateCustomerMutation } from "../../api/customer/customerApi";
import { useFormDialogStore } from "../../components/dialog/FormDialog";
import { CustomerSchema } from "../../schemas/customerSchemas";

const CustomerForm = () => {
  const { close } = useFormDialogStore();

  const [createCustomer, { isSuccess, isError, isLoading }] =
    useCreateCustomerMutation();

  const handleCreateCustomer = (values): void => {
    createCustomer(values);
    close();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      emailAddress: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      logo: "",
    },
    validationSchema: CustomerSchema,
    validateOnChange: false,
    onSubmit: handleCreateCustomer,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "500px" }}>
      <Stack spacing={1}>
        <TextField
          id="name"
          name="name"
          label="Naam"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
        />
        <TextField
          id="emailAddress"
          name="emailAddress"
          label="E-mailadres"
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          error={
            formik.touched?.emailAddress && Boolean(formik.errors?.emailAddress)
          }
          helperText={
            formik.touched?.emailAddress && formik.errors?.emailAddress
          }
          variant="standard"
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Telefoonnummer"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched?.phoneNumber && Boolean(formik.errors?.phoneNumber)
          }
          helperText={formik.touched?.phoneNumber && formik.errors?.phoneNumber}
          variant="standard"
        />
        <TextField
          id="address"
          name="address"
          label="Straat + huisnummer"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors?.address)}
          helperText={formik.touched?.address && formik.errors?.address}
          variant="standard"
        />
        <TextField
          id="postalCode"
          name="postalCode"
          label="Postcode"
          value={formik.values?.postalCode}
          onChange={formik.handleChange}
          error={
            formik.touched?.postalCode && Boolean(formik.errors?.postalCode)
          }
          helperText={formik.touched?.postalCode && formik.errors?.postalCode}
          variant="standard"
        />
        <TextField
          id="city"
          name="city"
          label="Stad"
          value={formik.values?.city}
          onChange={formik.handleChange}
          error={formik.touched?.city && Boolean(formik.errors?.city)}
          helperText={formik.touched?.city && formik.errors?.city}
          variant="standard"
        />
        <TextField
          id="country"
          name="country"
          label="Land"
          value={formik.values?.country}
          onChange={formik.handleChange}
          error={formik.touched?.country && Boolean(formik.errors?.country)}
          helperText={formik.touched?.country && formik.errors?.country}
          variant="standard"
        />

        {isError && (
          <FormHelperText error={true} sx={{ textAlign: "center" }}>
            Klant kan niet worden aangemaakt. Probeer het later nog een keer.
          </FormHelperText>
        )}
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Button onClick={close} variant="text" sx={{ mt: "16px" }}>
            Annuleren
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{ mt: "16px" }}
          >
            Opslaan
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default CustomerForm;
