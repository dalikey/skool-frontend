import { useGetUserProfileQuery } from '../../api/user/userApi';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ProfileForm from './ProfileForm';

const Profile = () => {
    const { data } = useGetUserProfileQuery();

    const openProfileForm = () => {
        if (data?.result) {
            formDialog('Profiel bewerken', <ProfileForm user={data.result}/>);
        }
    };

    return (
        <>
            <FormDialog />
            <button onClick={openProfileForm}>edit</button>
        </>
    );
};

export default Profile;
