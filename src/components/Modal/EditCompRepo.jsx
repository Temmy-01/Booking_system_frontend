import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";

export default function EditCompRepo({
    showEdit,
    closeModal,
    refreshPage,
    currentRepo,
}) {
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "",
        no_of_stars: "",
    });

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            status: "",
            no_of_stars: "",
        });
        setValidationError({});
    };

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClose = () => {
        resetForm();
        closeModal();
        refreshPage();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axiosInstance.put(`/user/repository/update/${formData.id}`, formData);
            toast.success("Repository updated successfully!");
            handleClose(); // Close modal on success
        } catch (error) {
            console.error("Error updating repository:", error);

            if (error.response?.data?.errors) {
                setValidationError(error.response.data.errors);
                toast.error("Failed to update repository.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (currentRepo) {
           
            setFormData({
                id: currentRepo?.id,
                description: currentRepo?.description,
                name: currentRepo?.name,
                no_of_stars: currentRepo?.no_of_stars,
            });
        }
    }, [currentRepo]);

    return (
        <div className="CreateRepository">
            <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-md">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Repository</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <div>
                                <h6>Name</h6>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="Enter..."
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {validationError.name && (
                                <small className="text-danger my-1">
                                    {validationError.name[0]}
                                </small>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <div>
                                <h6>Description</h6>
                            </div>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter..."
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {validationError.description && (
                                <small className="text-danger my-1">
                                    {validationError.description[0]}
                                </small>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <div>
                                <h6>No of Stars</h6>
                            </div>
                            <Form.Control
                                type="text"
                                placeholder="Enter..."
                                name="no_of_stars"
                                value={formData.no_of_stars}
                                onChange={handleChange}
                            />
                            {validationError.no_of_stars && (
                                <small className="text-danger my-1">
                                    {validationError.no_of_stars[0]}
                                </small>
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className=""
                            style={{
                                backgroundColor: "#c4281b",
                                color: "#fff",
                                border: "none",
                            }}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
