import React from "react";
import { Table } from "reactstrap";
import { Eye, Edit, Trash, FileText } from "react-feather";
import { NavLink } from "react-router-dom";
export default class DataTable extends React.Component {
    state = {
        id: 22,
    };
    render() {
        const { heading, data, misc, onPrintTicket } = this.props;
        return (
            <Table striped>
                <thead>
                    <tr>
                        {heading.map((h) => (
                            <th key={Math.random()}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((d) => (
                        <tr key={d.id}>
                            <td>{d.code}</td>
                            <td>{d.passenger.name}</td>
                            <td>{d.merchant.name}</td>
                            <td>{d.departure_time}</td>
                            <td>{d.arrival_time}</td>
                            <td>
                                {d.status === 1
                                    ? "Active"
                                    : d.status === 2
                                    ? "Refunded"
                                    : d.status === 3
                                    ? "Claimed"
                                    : "Expired"}
                            </td>
                            <td>
                                <NavLink
                                    to={`/${misc.link}/show/${d.id}`}
                                    className="mr-1"
                                >
                                    <Eye className="mr-1"></Eye>
                                </NavLink>
                                <NavLink
                                    to={`/${misc.link}/edit/${d.id}`}
                                    className="mr-1"
                                >
                                    <Edit className="mr-1"></Edit>
                                </NavLink>
                                <NavLink
                                    to={`/${misc.link}/delete/${d.id}`}
                                    className="mr-1"
                                >
                                    <Trash className="mr-1"></Trash>
                                </NavLink>

                                <button
                                    style={{
                                        color: "#008487",
                                        textDecoration: "none",
                                        border: "none",
                                        background: "transparent",
                                        fontSize: "1rem",
                                        fontWeight: 300,
                                    }}
                                    className="mr-1"
                                    onClick={(e) => onPrintTicket(d.id)}
                                >
                                    <FileText className="mr-1"></FileText>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
