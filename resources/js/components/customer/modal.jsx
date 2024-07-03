import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CustomerModal = ({ isOpen, idSelected = null, onClose = null }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalLoading, setModalLoading] = useState(false);
    const token = "f47ac10b58cc4372a5670e02b2c3d479";
    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (idSelected && isOpen && !hasFetchedData.current) {
            setModalLoading(true);
            axios
                .get("/api/customers/" + idSelected, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    setFirstName(response.data.data.firstname);
                    setLastName(response.data.data.lastname);
                    setEmail(response.data.data.email);
                    setContactNumber(response.data.data.contactno);
                    hasFetchedData.current = true;
                    setModalLoading(false);
                })
                .catch((error) => {
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.errors
                    ) {
                        console.log(error.response.data.errors);
                        setErrors(error.response.data.errors);
                    } else {
                        console.error("Error:", error);
                    }
                });
        }
    });

    const handleSave = (event) => {
        setIsLoading(true);
        if (idSelected) {
            console.log(idSelected);
            editCustomer();
        } else {
            addCustomer();
        }
    };

    const editCustomer = () => {
        axios
            .put(
                "/api/customers/" + idSelected,
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    contactno: contactNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                resetForm();
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                } else {
                    console.error("Error:", error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const addCustomer = () => {
        axios
            .post(
                "/api/customers",
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    contactno: contactNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                resetForm();
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.errors);
                } else {
                    console.error("Error:", error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleClose = () => {
        resetForm();
        hasFetchedData.current = false;
        onClose();
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setContactNumber("");
        setErrors({});
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 w-1/2 rounded-lg shadow-xl z-50">
                        <h2 className="text-lg font-semibold mb-4">
                            Customer Information
                        </h2>
                        <div className="space-y-12 sm:space-y-16">
                            <div>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600"></p>
                                {errors && Object.keys(errors).length > 0 && (
                                    <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                        role="alert"
                                    >
                                        <strong className="font-bold">
                                            Error:
                                        </strong>
                                        <ul>
                                            {Object.keys(errors).map(
                                                (key, index) => (
                                                    <li key={index}>
                                                        {errors[key]}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                                {isModalLoading ? (
                                    <div>
                                        Getting information please wait...
                                    </div>
                                ) : (
                                    <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                            >
                                                First name
                                            </label>
                                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    value={firstName}
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                            <label
                                                htmlFor="last-name"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                            >
                                                Last name
                                            </label>
                                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    value={lastName}
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                            <label
                                                htmlFor="contact-number"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                            >
                                                Contact Number
                                            </label>
                                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                                <input
                                                    type="text"
                                                    value={contactNumber}
                                                    onChange={(e) =>
                                                        setContactNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    name="contact-number"
                                                    id="contact-number"
                                                    autoComplete="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md mr-4 hover:bg-gray-400"
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSave()}
                                className={
                                    isLoading
                                        ? "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
                                        : "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                }
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving please wait.." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerModal;
