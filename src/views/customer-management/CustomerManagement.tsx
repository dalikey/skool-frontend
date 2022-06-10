import { Add } from "@mui/icons-material";
import { Box, IconButton, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useGetAllCustomersQuery } from "../../api/customer/customerApi";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import { CustomerModel } from "../../models/customerModels";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";

const CustomerManagement = () => {
  const [tab, setTab] = useState<number>(1);

  const { data, isLoading } = useGetAllCustomersQuery();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClickCreate = () => {
    // console.log("create customer!");
    formDialog('Klant aanmaken', <CustomerForm/>);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <ConfirmDialog />
      <Box p={1} display="flex" justifyContent="flex-end" alignItems="center">
      <FormDialog />
      <IconButton
          aria-label="add"
          color="primary"
          sx={{ backgroundColor: 'primary', margin: 0 }}
          onClick={() => handleClickCreate()}
        >
          <Add />
        </IconButton>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={0}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="KLANTEN" />
        </Tabs>
      </Box>
      <CustomerTable
        isLoading={isLoading}
        customers={data?.result as CustomerModel[]}
      />
    </Paper>
  );
};

export default CustomerManagement;
