import {
    Grid,
    Typography,
    Avatar,
    Box,
    Button,
    Checkbox,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useGetPersonalProfileQuery } from "../../api/user/userApi";
import FormDialog, { formDialog } from "../../components/dialog/FormDialog";
import ProfileForm from "./ProfileForm";
import ProfilePicture from "../../assets/no_profile_picture.jpg";

const Profile = () => {
    const { data } = useGetPersonalProfileQuery();
    const user = data?.result;

    const openProfileForm = () => {
        if (data?.result) {
            formDialog("Profiel bewerken", <ProfileForm user={data.result} />);
        }
    };

    return (
        <Grid
            container
            spacing={2}
            border={1}
            borderColor="#f0f0f0"
            style={{
                color: "black",
                backgroundColor: "#ffffff",
                paddingBottom: "15px",
                paddingRight: "50px",
            }}
        >
            <FormDialog />
            <Grid item xs={12} md={4}>
                <Avatar
                    alt="Profile picture"
                    src={ProfilePicture}
                    sx={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    paddingTop={"15px"}
                >
                    Adresgegevens
                </Typography>
                <Typography>{user?.location?.address ?? "Onbekend"}</Typography>
                <Typography>{user?.location?.city ?? "Onbekend"}</Typography>
                <Typography>{user?.location?.country ?? "Onbekend"}</Typography>
                <Typography>
                    {user?.location?.postalCode ?? "Onbekend"}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    paddingTop={"15px"}
                >
                    Vervoersgegevens
                </Typography>
                <Box padding={'-100px'}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Checkbox checked={user?.transport?.hasDriversLicense ?? false} disabled/>
                        <Typography>Geldig rijbewijs in bezit</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                        <Checkbox checked={user?.transport?.hasVehicle ?? false} disabled/>
                        <Typography>Auto in bezit</Typography>
                    </Box>
                </Box>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    paddingTop={"15px"}
                >
                    Persoonlijke gegevens
                </Typography>
                <Typography>
                    {`KvK: ${user?.kvkNumber ?? "Onbekend"}`}
                </Typography>
                <Typography>
                    {`IBAN: ${user?.paymentInfo?.IBAN ?? "Onbekend"}`}
                </Typography>
                <Typography>
                    {`BIC: ${user?.paymentInfo?.BIC ?? "Onbekend"}`}
                </Typography>
                <Typography>
                    {`Vat ID: ${user?.vatID ?? "Onbekend"}`}
                </Typography>
                <Typography>
                    {`Contract: ${user?.contractType ?? "Onbekend"}`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    fontSize="25px"
                    fontWeight="bold"
                    paddingBottom={"15px"}
                    paddingTop={"15px"}
                >
                    {user?.firstName ?? "Onbekend"}{" "}
                    {user?.lastName ?? "Onbekend"}
                </Typography>
                <Typography>
                    {user?.gender === "f" ? "Vrouw" : "Man"}
                </Typography>
                <Typography>{user?.emailAddress ?? "Onbekend"}</Typography>
                <Typography>
                    {user?.dateOfBirth != null
                        ? new Date(user?.dateOfBirth).toLocaleDateString(
                              "nl-NL"
                          )
                        : "Onbekend"}
                </Typography>
                <Typography>{user?.mobileNumber}</Typography>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    paddingTop={"15px"}
                >
                    Oorsprong
                </Typography>
                <Typography>
                    {`Land van herkomst: ${
                        user?.countryOfOrigin ?? "Onbekend"
                    }`}
                </Typography>
                <Typography>
                    {`Nationaliteit: ${user?.nationality ?? "Onbekend"}`}
                </Typography>
                {/* <Typography>
                    {`Geboorteplaats: ${user?.placeOfBirth ?? "Onbekend"}`}
                </Typography> */}
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    paddingTop={"15px"}
                >
                    Workshopvoorkeuren
                </Typography>

                {user?.workshopPreferences != null &&
                    user.workshopPreferences.length > 0 &&
                    user.workshopPreferences.map((workshop) => (
                        <Typography key={workshop._id}>{workshop.name}</Typography>
                    ))}

                <Typography
                    variant="subtitle1"
                    color="secondary"
                    paddingTop={"15px"}
                >
                    Niveauvoorkeuren
                </Typography>

                {user?.levelPreferences != null &&
                    user?.levelPreferences?.length > 0 &&
                    user?.levelPreferences.map((level) => (
                        <Typography key={level}>{level}</Typography>
                    ))}
            </Grid>
            <Grid item paddingTop={'30px'} xs={12} md={2}>
                <Button
                    onClick={() => openProfileForm()}
                    aria-label="edit"
                    color="primary"
                >
                    <Edit />
                    Profiel bewerken
                </Button>
            </Grid>
        </Grid>
    );
};

export default Profile;
