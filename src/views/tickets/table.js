import React from "react";
import { Button, Table } from "reactstrap";
import { Eye, Edit, Trash } from "react-feather";
import { NavLink } from "react-router-dom";
export default class DataTable extends React.Component {
    render() {
        const { heading, data, misc } = this.props;
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
