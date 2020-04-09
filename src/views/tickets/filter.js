import React, {Component, Fragment} from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import CustomTabs from "../../components/tabs/customTabs";
import DataTable from "./table";
import ContentHeader from "../../components/contentHead/contentHeader";
import Select from "react-select";

class Filter extends Component{

    render() {
        const {passengers, vehicles} = this.props.filter
        return (
            <Fragment>
                <ContentHeader>Filter </ContentHeader>
                <Row>
                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <Select
                                    className={`basic-single`}
                                    classNamePrefix="select"
                                    defaultValue={null}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={this.handlePassengerSelect}
                                    name="f_passenger"
                                    id="f_passenger"
                                    options={passengers}
                                    isMulti={true}
                                />

                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <Select
                                    className={`basic-single`}
                                    classNamePrefix="select"
                                    defaultValue={null}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={this.handlePassengerSelect}
                                    name="f_vehicle"
                                    id="f_vehicle"
                                    options={vehicles}
                                    isMulti={true}
                                />

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Filter;