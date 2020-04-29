import * as Yup from "yup";

const merchantSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    father_name: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    cnic: Yup.number().required("Required").nullable(),
    gender: Yup.string()
        .max(1, "Something odd happened, can not process further")
        .required("Required"),
    dob: Yup.date().required("Required"),
    religion: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    nationality: Yup.string()
        .max(50, "Too long, max 50 characters")
        .required("Required"),
    joining: Yup.date().required("Required"),
    password: Yup.string().max(50, "Too long, max 50 characters"),
    contact: Yup.object({
        phone: Yup.number().required("Required"),
        email: Yup.string().email().required("Required"),
        s_phone: Yup.number().nullable(),
        s_email: Yup.string().email().nullable(),
    }),
    address: Yup.object({
        full_address: Yup.string()
            .required("Required")
            .max(190, "Address too long"),
    }),
});

export default merchantSchema;
