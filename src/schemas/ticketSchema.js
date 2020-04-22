import * as Yup from "yup";

const ticketSchema = Yup.object({
    ticket: Yup.object({
        booking_type: Yup.string().required("Required"),
        quantity: Yup.number().required("Required").nullable(),
        vehicle_id: Yup.number().nullable(),
        passenger_id: Yup.number().nullable(),
        kin_name: Yup.string()
            .max(50, "Too long, max 50 characters")
            .required("Required")
            .nullable(),
        kin_contact: Yup.number().required("Required").nullable(),
        departureTime: Yup.string().required("Required").nullable(),
        arrivalTime: Yup.string().required("Required").nullable(),
        origin: Yup.string().nullable(),
        destination: Yup.string().nullable(),
        status: Yup.number().required("Required").nullable(),
    }),
    passenger: Yup.object({
        name: Yup.string()
            .max(50, "Too long, max 50 characters")
            .required("Required")
            .nullable(),
        father_name: Yup.string()
            .max(50, "Too long, max 50 characters")
            .required("Required")
            .nullable(),
        cnic: Yup.number().required("Required").nullable(),
        gender: Yup.string().required("Required").nullable(),
        contact: Yup.object({
            phone: Yup.number().required("Required").nullable(),
            email: Yup.string().required("Required").nullable(),
        }),
        address: Yup.object({
            full_address: Yup.string().required("Required").nullable(),
            city: Yup.number().nullable(),
        }),
    }),
});

export default ticketSchema;
