import React, { useState } from "react";
import axios from "axios";

const DeleteCustomerModal = ({ isOpen, idSelected, onClose = null }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const token = "f47ac10b58cc4372a5670e02b2c3d479";

    const handleDelete = () => {
        setIsLoading(true);
        axios
            .delete("/api/customers/" + idSelected, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                onClose();
                window.location.href = "/dashboard"; // or use a callback to refresh the list
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
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
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 w-1/2 rounded-lg shadow-xl z-50">
                        <h2 className="text-lg font-semibold mb-4">
                            Confirm Deletion
                        </h2>
                        {errors && Object.keys(errors).length > 0 && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <strong className="font-bold">Error:</strong>
                                <ul>
                                    {Object.keys(errors).map((key, index) => (
                                        <li key={index}>
                                            {errors[key].join(", ")}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p>Are you sure you want to delete this customer?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md mr-4 hover:bg-gray-400"
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete()}
                                className={
                                    isLoading
                                        ? "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
                                        : "px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                }
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteCustomerModal;
