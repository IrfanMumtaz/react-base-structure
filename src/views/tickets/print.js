import React from "react";
import { Table } from "reactstrap";
import { Row, Col } from "reactstrap";

class TicketToPrint extends React.Component {
    ticketDate = (d) => {
        const date = new Date(d);
        const _date = `${("0" + date.getDate()).slice(-2)}-${(
            "0" +
            (date.getMonth() + 1)
        ).slice(-2)}-${date.getFullYear()}`;

        return _date;
    };
    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 50,
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: "#fff",
            borderRadius: 5,
            maxWidth: 900,
            margin: "0 auto",
            padding: 30,
            display: this.props.show ? "block" : "none",
            position: "relative",
            fontFamily: "Raleway",
            height: "auto",
        };

        const dynamicFields = {
            textDecoration: "underline",
            marginLeft: 5,
        };

        const termsImg = {
            width: "100%",
        };

        const amount = {
            fontSize: "10em",
            lineHeight: "1em",
            color: "#3f3f41",
        };

        const currency = {
            fontSize: "1.5em",
            color: "#b12f17",
            position: "absolute",
            bottom: 0,
            right: 0,
        };

        const issuedate = {
            marginTop: 10,
            fontSize: "1.2em",
            textAlign: "center",
            background: "#b12f19",
            color: "#fff",
            borderRadius: "15px",
        };
        const { data } = this.props;

        return (
            <React.Fragment>
                <link
                    href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"
                    rel="stylesheet"
                ></link>
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <Row>
                            <Col sm="9">
                                <div>
                                    <Table>
                                        <tr>
                                            <td>
                                                Ticket ID:
                                                <span style={dynamicFields}>
                                                    {data[0].code}
                                                </span>
                                            </td>
                                            <td>
                                                Merchant Code:
                                                <span style={dynamicFields}>
                                                    {
                                                        data[0].merchant
                                                            .merchant_code
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Name:
                                                <span style={dynamicFields}>
                                                    {data[0].passenger.name}
                                                </span>
                                            </td>
                                            <td>
                                                CNIC:
                                                <span style={dynamicFields}>
                                                    {data[0].passenger.cnic}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Phone:
                                                <span style={dynamicFields}>
                                                    {
                                                        data[0].passenger
                                                            .primary_contact
                                                            .phone
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                Expires In:
                                                <span style={dynamicFields}>
                                                    {data[0].arrival_time}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Pickup Location:
                                                <span style={dynamicFields}>
                                                    {data[0].origin}
                                                </span>
                                            </td>
                                            <td>
                                                Dropoff Location:
                                                <span style={dynamicFields}>
                                                    {data[0].destination}
                                                </span>
                                            </td>
                                        </tr>
                                    </Table>
                                    <div>
                                        <img
                                            src={require("assets/img/ticket/terms.png")}
                                            alt="Terms and conditions"
                                            style={termsImg}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col sm="3">
                                <div>
                                    <img
                                        src={require("assets/img/ticket/ticket_logo.jpeg")}
                                        alt="Terms and conditions"
                                        style={termsImg}
                                    />
                                </div>
                                <div style={{ position: "relative" }}>
                                    <span style={amount}>30</span>
                                    <span style={currency}>PKR</span>
                                </div>
                                <div>
                                    <div style={issuedate}>
                                        Date:{" "}
                                        {this.ticketDate(data[0].created_at)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="footer">
                            <button onClick={() => this.props.onClose()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TicketToPrint;
