import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";
import Spinner from "react-bootstrap/Spinner"; 

export default function CreateBooking({ show, closeModal, refreshPage }) {
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSlotsLoading, setIsSlotsLoading] = useState(false); 
    const [availableSlots, setAvailableSlots] = useState([]);
    const [formData, setFormData] = useState({
        appointment_for: "",
        meeting_date: "",
        meeting_time: "",
        booker_name: "",
        booker_email: "",
    });

    const fetchAvailableSlots = async (date) => {
        setIsSlotsLoading(true); 
        try {
            const response = await axiosInstance.get("user/booking/slots", { params: { date } });
            setAvailableSlots(response.data.data.values);
        } catch (error) {
            toast.error("Failed to fetch available slots.");
        } finally {
            setIsSlotsLoading(false); 
        }
    };

    useEffect(() => {
        if (formData.meeting_date) {
            fetchAvailableSlots(formData.meeting_date);
        } else {
            setAvailableSlots([]); 
        }
    }, [formData.meeting_date]);

    const resetForm = () => {
        setFormData({
            appointment_for: "",
            meeting_date: "",
            meeting_time: "",
            booker_name: "",
            booker_email: "",
        });
        setValidationError({});
        setAvailableSlots([]);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axiosInstance.post("user/booking/create", formData);
            toast.success(`Appointment booked for ${formData.meeting_time} on ${formData.meeting_date}!`);
            handleClose();
            refreshPage();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationError(error.response.data.errors);
            } else {
                toast.error("Failed to book appointment.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="CreateBooking">
            <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book Appointment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formAppointmentFor">
                            <Form.Label>Book Appointment For</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter reason or details..."
                                name="appointment_for"
                                value={formData.appointment_for}
                                onChange={handleChange}
                            />
                            {validationError.appointment_for && (
                                <small className="text-danger">{validationError.appointment_for[0]}</small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBookerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="booker_name"
                                value={formData.booker_name}
                                onChange={handleChange}
                            />
                            {validationError.booker_name && (
                                <small className="text-danger">{validationError.booker_name[0]}</small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBookerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="booker_email"
                                value={formData.booker_email}
                                onChange={handleChange}
                            />
                            {validationError.booker_email && (
                                <small className="text-danger">{validationError.booker_email[0]}</small>
                            )}
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="meeting_date"
                                        value={formData.meeting_date}
                                        onChange={handleChange}
                                    />
                                    {validationError.meeting_date && (
                                        <small className="text-danger">{validationError.meeting_date[0]}</small>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formTime">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Select
                                        name="meeting_time"
                                        value={formData.meeting_time}
                                        onChange={handleChange}
                                        disabled={isSlotsLoading || !formData.meeting_date} // Disable while loading or no date selected
                                    >
                                        <option value="">
                                            {isSlotsLoading
                                                ? "Loading slots..."
                                                : formData.meeting_date
                                                    ? "Select a time slot"
                                                    : "Select a date first"}
                                        </option>
                                        {!isSlotsLoading &&
                                            availableSlots.map((slot) => (
                                                <option
                                                    key={slot.time}
                                                    value={slot.time}
                                                    disabled={!slot.available}
                                                    style={{ opacity: slot.available ? 1 : 0.5 }}
                                                >
                                                    {slot.time}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    {isSlotsLoading && (
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            className="mt-2"
                                            style={{ display: "block" }}
                                        />
                                    )}
                                    {validationError.meeting_time && (
                                        <small className="text-danger">{validationError.meeting_time[0]}</small>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            style={{
                                backgroundColor: "#c4281b",
                                color: "#fff",
                                border: "none",
                            }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Booking..." : "Submit"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}