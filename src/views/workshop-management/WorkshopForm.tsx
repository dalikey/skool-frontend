import { useFormik } from 'formik';

const WorkshopForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            content: '',
            material: [],
        },
        validateOnChange: false,
        onSubmit: () => console.log('hey'),
    });

    return <div>tiddies</div>;
};

export default WorkshopForm;
