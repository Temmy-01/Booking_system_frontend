import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateBooking from "../../components/Modal/CreateBooking";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Booking() {
    const MySwal = withReactContent(Swal);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("");
    const [pagination, setPagination] = useState({ last_page: 1, links: [] });
    const [page, setPage] = useState(1);
    const [refreshKey, setRefreshKey] = useState(0);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleRefresh = () => {
        setRefreshKey((prevRefreshKey) => prevRefreshKey + 1);
    };

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await axiosInstance.get("/user/booking/fetch", {
                    params: { page, filter },
                });

                setEvents(response.data.data.data || []);
                setPagination(response.data.data);
            } catch (err) {
                setError("Error fetching events. Please try again.");
                toast.error("Error fetching events.");
            }

            setLoading(false);
        };

        fetchEvents();
    }, [page, filter, refreshKey]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(1); 
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
                await axiosInstance.delete(`/user/booking/delete/${id}`);
                toast.success("Event deleted successfully!");
                handleRefresh();
            } catch (error) {
                console.error("Error deleting event:", error);
                toast.error("Error deleting event.");
            }
        }
    };


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0" style={{ color: "#c4281c" }}>
                            Booking Appointments
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
                                    Appointment List
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" id="eventList">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header d-flex align-items-center border-0">
                            <h5
                                className="card-title mb-0 flex-grow-1"
                                style={{ color: "#c4281b" }}
                            >
                                Booking Appointments
                            </h5>
                        </div>

                        <div className="card-body border border-dashed border-end-0 border-start-0">
                            <div className="d-flex justify-content-end">
                                <div>
                                    <button
                                        className="vehicle-button btn"
                                        style={{
                                            backgroundColor: "#c4281b",
                                            color: "#fff",
                                            border: "none",
                                        }}
                                        onClick={handleShow}
                                    >
                                        <i className="mdi mdi-plus-circle-outline"></i> Create Booking
                                    </button>
                                </div>
                            </div>
                            <br />
                            <div className="col-xl-4 col-md-6">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        className="form-control search"
                                        placeholder="Search appointments..."
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
                                                <th>Appointment</th>
                                                <th>Booker Name</th>
                                                <th>Booker Email</th>
                                                <th>Date & Time</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan={6} className="text-center">
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : error ? (
                                                <tr>
                                                    <td colSpan={6} className="text-center text-danger">
                                                        {error}
                                                    </td>
                                                </tr>
                                            ) : events.length > 0 ? (
                                                events.map((event, index) => (
                                                    <tr key={event.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{event.name || "N/A"}</td>
                                                        <td>{event.booker_name || "N/A"}</td>
                                                        <td>{event.booker_email || "N/A"}</td>
                                                        <td>
                                                            {new Date(event.startDateTime).toLocaleString("en-US", {
                                                                dateStyle: "medium",
                                                                timeStyle: "short",
                                                            })}
                                                        </td>
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
                                                                            onClick={() => handleDelete(event.id)}
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
                                                    <td colSpan={6} className="text-center">
                                                        No appointments found.
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
                                                ? new URL(link.url, window.location.origin).searchParams.get("page")
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

                <CreateBooking
                    show={show}
                    closeModal={handleClose}
                    refreshPage={handleRefresh}
                />
            </div>
        </>
    );
}