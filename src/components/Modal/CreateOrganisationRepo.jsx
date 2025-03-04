import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";

export default function CreateOrganisationRepo({ show, closeModal, refreshPage }) {
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        github_repo_url: "",
        visibility: "public",
        language: "",
        license: "",
        forks_count: 0,
        open_issues_count: 0,
        watchers_count: 0,
        default_branch: "main",
        topics: "",
    });

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            github_repo_url: "",
            visibility: "public",
            language: "",
            license: "",
            forks_count: 0,
            open_issues_count: 0,
            watchers_count: 0,
            default_branch: "main",
            topics: "",
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axiosInstance.post("/user/org_repository/add_repository", formData);
            toast.success("Repository created successfully!");
            handleClose();
            refreshPage();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationError(error.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="CreateRepo">
            <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Repository</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Name */}
                        <Form.Group className="mb-3">
                            <h6>Name</h6>
                            <Form.Control
                                type="text"
                                placeholder="Enter repository name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {validationError.name && (
                                <small className="text-danger">{validationError.name[0]}</small>
                            )}
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-3">
                            <h6>Description</h6>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {validationError.description && (
                                <small className="text-danger">{validationError.description[0]}</small>
                            )}
                        </Form.Group>

                        {/* URL */}
                        <Form.Group className="mb-3">
                            <h6>Repository URL</h6>
                            <Form.Control
                                type="url"
                                placeholder="Enter repository URL"
                                name="github_repo_url"
                                value={formData.github_repo_url}
                                onChange={handleChange}
                            />
                            {validationError.github_repo_url && (
                                <small className="text-danger">{validationError.github_repo_url[0]}</small>
                            )}
                        </Form.Group>

                        {/* Visibility */}
                        <Form.Group className="mb-3">
                            <h6>Visibility</h6>
                            <Form.Select
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Language */}
                        <Form.Group className="mb-3">
                            <h6>Programming Language</h6>
                            <Form.Control
                                type="text"
                                placeholder="Enter language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                            />
                            {validationError.language && (
                                <small className="text-danger">{validationError.language[0]}</small>
                            )}
                        </Form.Group>

                        {/* License */}
                        <Form.Group className="mb-3">
                            <h6>License</h6>
                            <Form.Control
                                type="text"
                                placeholder="Enter license type"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                            />
                            {validationError.license && (
                                <small className="text-danger">{validationError.license[0]}</small>
                            )}
                        </Form.Group>

                        {/* Forks Count */}
                        <Form.Group className="mb-3">
                            <h6>Forks Count</h6>
                            <Form.Control
                                type="number"
                                placeholder="Enter forks count"
                                name="forks_count"
                                value={formData.forks_count}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Open Issues Count */}
                        <Form.Group className="mb-3">
                            <h6>Open Issues Count</h6>
                            <Form.Control
                                type="number"
                                placeholder="Enter open issues count"
                                name="open_issues_count"
                                value={formData.open_issues_count}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Watchers Count */}
                        <Form.Group className="mb-3">
                            <h6>Watchers Count</h6>
                            <Form.Control
                                type="number"
                                placeholder="Enter watchers count"
                                name="watchers_count"
                                value={formData.watchers_count}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Default Branch */}
                        <Form.Group className="mb-3">
                            <h6>Default Branch</h6>
                            <Form.Control
                                type="text"
                                placeholder="Enter default branch"
                                name="default_branch"
                                value={formData.default_branch}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Topics */}
                        {/* <Form.Group className="mb-3">
                            <h6>Topics (comma-separated)</h6>
                            <Form.Control
                                type="text"
                                placeholder="Enter topics"
                                name="topics"
                                value={formData.topics}
                                onChange={handleChange}
                            />
                            <small className="text-muted">Example: laravel, vuejs, api</small>
                        </Form.Group> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            style={{ backgroundColor: "#c4281b", color: "#fff", border: "none" }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
