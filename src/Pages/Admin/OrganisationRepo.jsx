import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateOrganisationRepo from "../../components/Modal/CreateOrganisationRepo";
import axiosInstance from "../../hooks/axiosInstance";
import EditOrganisationRepo from "../../components/Modal/EditOrganisationRepo";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



export default function OrganisationRepo() {
    const MySwal = withReactContent(Swal);

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("");
    const [pagination, setPagination] = useState({ last_page: 1, links: [] });
    const [page, setPage] = useState(1);
    const [refreshKey, setRefreshKey] = useState(0);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [current, setCurrentRepo] = useState(null);


    const setCurrent = (data) => {
        setCurrentRepo(data);
    };

    const handleShow = () => setShow(true);
    const handleShowEdit = () => setShowEdit(true);



    const handleRefresh = () => {
        setRefreshKey((prevRefreshKey) => prevRefreshKey + 1);
    };

    const handleClose = () => {
        setShow(false);
        setShowEdit(false);

    };

    useEffect(() => {
        const fetchRepositories = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await axiosInstance.get("/user/org_repository/fetch", {
                    params: { page, filter },
                });

                setRepos(response.data.data.data || []);
                setPagination(response.data.data);
            } catch (err) {
                setError("Error fetching repositories. Please try again.");
            }

            setLoading(false);
        };

        fetchRepositories();
    }, [page, filter, refreshKey]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.last_page) {
            setPage(newPage);
        }
    };

    const handleDelete = async (id) => {
        const result = await MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/user/org_repository/delete/${id}`);
                toast.success("User deleted successfully!");
                handleRefresh();
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error("Error deleting user.");
            }
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0" style={{ color: "#c4281c" }}>
                            Organisation Repositories
                        </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/app">Dashboard</Link>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    style={{ color: "#c4281c" }}
                                >
                                    Repo List
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" id="contactList">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header d-flex align-items-center border-0">
                            <h5
                                className="card-title mb-0 flex-grow-1"
                                style={{ color: "#c4281b" }}
                            >
                                Organisation Repositories
                            </h5>
                        </div>

                        <div className="card-body border border-dashed border-end-0 border-start-0">
                            <div className="d-flex justify-content-end">
                                <div>
                                    <button
                                        className="vehicle-button btn "
                                        style={{
                                            backgroundColor: "#c4281b",
                                            color: "#fff",
                                            border: "none",
                                        }}
                                        onClick={handleShow}
                                    >
                                        <i className="mdi mdi-plus-circle-outline"></i> Add
                                        Repository
                                    </button>
                                </div>
                            </div>{" "}
                            <br />
                            <div className="col-xl-4 col-md-6">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        className="form-control search"
                                        placeholder="Search repositories..."
                                        value={filter}
                                        onChange={handleFilterChange}
                                    />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="table-responsive table-card">
                                    <table className="table align-middle table-nowrap table-striped table-borderless table-hover">
                                        <thead className="table-light text-muted">
                                            <tr>
                                                <th>#</th>
                                                <th>Repo Name</th>
                                                <th>Description</th>
                                                <th>Url</th>
                                                <th>Visibility</th>
                                                <th>default_branch</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center">
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : error ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center text-danger">
                                                        {error}
                                                    </td>
                                                </tr>
                                            ) : repos.length > 0 ? (
                                                repos.map((repo, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{repo.name || "N/A"}</td>
                                                        <td>
                                                            {repo.description || "No description available"}
                                                        </td>
                                                        <td>{repo.url}</td>
                                                        <td>{repo.visibility}</td>
                                                        <td>{repo.default_branch}</td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                                                    type="button"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="mdi mdi-apps"></i>
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            onClick={() => {
                                                                                handleShowEdit();
                                                                                setCurrent(repo);
                                                                            }}
                                                                        >
                                                                            <i className="mdi mdi-pencil me-2 text-success"></i>{" "}
                                                                            Edit
                                                                        </Link>
                                                                    </li>

                                                                    <li>
                                                                        <Link
                                                                            className="dropdown-item"
                                                                            onClick={() => handleDelete(repo.id)}
                                                                        >
                                                                            <i className="mdi mdi-trash-can-outline me-2 text-danger"></i>
                                                                            Delete
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center">
                                                        No repositories found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer text-center">
                            <div className="d-flex justify-content-end mt-5 mb-5">
                                <div className="pagination-wrap hstack gap-2">
                                    <ul className="pagination listjs-pagination mb-0">
                                        {(pagination.links || []).map((link, index) => {
                                            const pageNumber = link.url
                                                ? new URL(link.url).searchParams.get("page")
                                                : null;

                                            return (
                                                <li
                                                    key={index}
                                                    className={`page-item ${link.active ? "active" : ""}`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() =>
                                                            pageNumber && handlePageChange(Number(pageNumber))
                                                        }
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    ></button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CreateOrganisationRepo
                    show={show}
                    closeModal={handleClose}
                    refreshPage={handleRefresh}
                />

                <EditOrganisationRepo
                    showEdit={showEdit}
                    closeModal={handleClose}
                    refreshPage={handleRefresh}
                    currentRepo={current}
                />
            </div>
        </>
    );
}
