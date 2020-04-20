import * as Yup from "yup";

const aclSchema = Yup.object().shape({
    name: Yup.string()
        .required("Required")
        .max(50, "Role name is too long."),
});

export default aclSchema;
