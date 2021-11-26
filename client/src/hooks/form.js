import React, { useState } from "react";

const useForm = (sendData) => {
    const [values, setValues] = useState({});

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
        console.log(values);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        await sendData(values);
        e.target.reset();

    }

    return {
        handleChange,
        handleSubmit,
        values
    }
}
export default useForm;