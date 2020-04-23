import React, { Component, Fragment } from "react";
import { Card, CardBody, Col, Row, Input, Label } from "reactstrap";
import ContentHeader from "../../components/contentHead/contentHeader";
import Select from "react-select";

class Filter extends Component {
    hanldeMultiSelect = (option, e) => {
        this.props.filterMultiSelect(option, e);
    };

    handleInput = (e) => {
        this.props.filterInputField(e);
    };
    render() {
        const { passengers, vehicles, merchants, STATUS } = this.props.filter;
        return (
            <Fragment>
                <ContentHeader>Filter </ContentHeader>
                <Card>
                    <CardBody>
                        <Row>
                            <Col sm="4">
                                <Label for="f_passenger">
                                    Select Passengers
                                </Label>
                                <Select
                                    className={`basic-single`}
                                    classNamePrefix="select"
                                    defaultValue={null}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={this.hanldeMultiSelect}
                                    name="f_passengers"
                                    id="f_passengers"
                                    options={passengers}
                                    isMulti={true}
                                />
                            </Col>
                            <Col sm="4">
                                <Label for="f_vehicle">Select Merchants</Label>
                                <Select
                                    className={`basic-single`}
                                    classNamePrefix="select"
                                    defaultValue={null}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={this.hanldeMultiSelect}
                                    name="f_merchants"
                                    id="f_merchants"
                                    options={merchants}
                                    isMulti={true}
                                />
                            </Col>
                            <Col sm="4">
                                <Label for="f_vehicle">Select Vehicles</Label>
                                <Select
                                    className={`basic-single`}
                                    classNamePrefix="select"
                                    defaultValue={null}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={this.hanldeMultiSelect}
                                    name="f_vehicles"
                                    id="f_vehicles"
                                    options={vehicles}
                                    isMulti={true}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm="4">
                                <Label for="f_status">Select Status</Label>
                                <Select
                                    className={`basic-single`}
                                    classNamePrefix="select"
                                    defaultValue={null}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={this.hanldeMultiSelect}
                                    name="f_status"
                                    id="f_status"
                                    options={STATUS}
                                    isMulti={true}
                                />
                            </Col>
                            {/* <Col sm="4">
                                <Label for="f_issuance">Issuance Date</Label>
                                <Input
                                    type="date"
                                    name="f_issuance"
                                    id="f_issuance"
                                    onChange={this.handleInput}
                                />
                            </Col>
                            <Col sm="4">
                                <Label for="f_expiry">Expiry Date</Label>
                                <Input
                                    type="date"
                                    name="f_expiry"
                                    id="f_expiry"
                                    onChange={this.handleInput}
                                />
                            </Col> */}
                        </Row>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

export default Filter;
