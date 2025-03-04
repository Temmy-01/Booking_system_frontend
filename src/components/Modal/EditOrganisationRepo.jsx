import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";

export default function EditOrganisationRepo({ showEdit, closeModal, refreshPage, currentRepo }) {
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
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
    });

    // Reset form
    const resetForm = () => {
        setFormData({
            id: "",
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
        });
        setValidationError({});
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Close modal and reset form
    const handleClose = () => {
        resetForm();
        closeModal();
        refreshPage();
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axiosInstance.put(`/user/org_repository/update/${formData.id}`, formData);
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

    // Load current repo data when modal opens
    useEffect(() => {
        if (currentRepo) {
            setFormData({
                id: currentRepo?.id || "",
                name: currentRepo?.name || "",
                description: currentRepo?.description || "",
                github_repo_url: currentRepo?.url || "",
                visibility: currentRepo?.visibility || "public",
                language: currentRepo?.language || "",
                license: currentRepo?.license || "",
                forks_count: currentRepo?.forks_count || 0,
                open_issues_count: currentRepo?.open_issues_count || 0,
                watchers_count: currentRepo?.watchers_count || 0,
                default_branch: currentRepo?.default_branch || "main",
            });
        }
    }, [currentRepo]);

    return (
        <div className="EditOrganisationRepo">
            <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-md">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Repository</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter repository name..."
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {validationError.name && <small className="text-danger">{validationError.name[0]}</small>}
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description..."
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {validationError.description && <small className="text-danger">{validationError.description[0]}</small>}
                        </Form.Group>

                        {/* GitHub Repo URL */}
                        <Form.Group className="mb-3">
                            <Form.Label>GitHub Repository URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Enter GitHub repository URL..."
                                name="github_repo_url"
                                value={formData.github_repo_url}
                                onChange={handleChange}
                                required
                            />
                            {validationError.github_repo_url && <small className="text-danger">{validationError.github_repo_url[0]}</small>}
                        </Form.Group>

                        {/* Visibility */}
                        <Form.Group className="mb-3">
                            <Form.Label>Visibility</Form.Label>
                            <Form.Select name="visibility" value={formData.visibility} onChange={handleChange}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Language */}
                        <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter language..."
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* License */}
                        <Form.Group className="mb-3">
                            <Form.Label>License</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter license..."
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Forks Count */}
                        <Form.Group className="mb-3">
                            <Form.Label>Forks Count</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                name="forks_count"
                                value={formData.forks_count}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Open Issues Count */}
                        <Form.Group className="mb-3">
                            <Form.Label>Open Issues Count</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                name="open_issues_count"
                                value={formData.open_issues_count}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Watchers Count */}
                        <Form.Group className="mb-3">
                            <Form.Label>Watchers Count</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                name="watchers_count"
                                value={formData.watchers_count}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Default Branch */}
                        <Form.Group className="mb-3">
                            <Form.Label>Default Branch</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter default branch..."
                                name="default_branch"
                                value={formData.default_branch}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
