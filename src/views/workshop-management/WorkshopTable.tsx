// import { IconButton, TableCell } from "@mui/material";
// import {
//   useActivateUserMutation,
//   useDeactivateUserMutation,
// } from "../../api/user/userApi";
// import Row from "../../components/table/Row";
// import Table from "../../components/table/Table";
// import { Clear, Check } from "@mui/icons-material";
// import { confirmDialog } from "../../components/dialog/ConfirmDialog";
// import { RegistrationModel } from "../../models/userModels";

// const WorkshopTable = () => {
//   const handleClickActivate = (user: RegistrationModel): void => {
//     confirmDialog(
//       "Registratie goedkeuren",
//       `Weet u zeker dat u de registratie van ${user.firstName} ${user.lastName} wilt goedkeuren?`,
//       () => activateUser(user._id)
//     );
//   };

//   const handleClickDeactivate = (user: RegistrationModel): void => {
//     confirmDialog(
//       "Registratie afkeuren",
//       `Weet u zeker dat u de registratie van ${user.firstName} ${user.lastName} wilt afkeuren?`,
//       () => deactivateUser(user._id)
//     );
//   };

//   return (
//     <Table
//       columns={["Naam", "Beschrijving"]}
//       isLoading={isLoading || isActivateLoading || isDeactiveLoading}
//     >
//       {users &&
//         users.map((user) => (
//           <Row key={user._id}>
//             <TableCell>{user.firstName}</TableCell>
//             <TableCell>{user.lastName}</TableCell>
//             <TableCell align="right">
//               <IconButton
//                 aria-label="accept"
//                 color="success"
//                 onClick={() => handleClickActivate(user)}
//               >
//                 <Check />
//               </IconButton>
//               <IconButton
//                 aria-label="deny"
//                 color="error"
//                 onClick={() => handleClickDeactivate(user)}
//               >
//                 <Clear />
//               </IconButton>
//             </TableCell>
//           </Row>
//         ))}
//       {users?.length === 0 && (
//         <Row>
//           <TableCell>Er zijn geen nieuwe registraties.</TableCell>
//         </Row>
//       )}
//     </Table>
//   );
// };

// export default WorkshopTable;

export default {};