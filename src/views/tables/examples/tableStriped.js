import React from 'react';
import {Button, Table} from 'reactstrap';
import {Eye, Edit, Trash} from "react-feather";
import {NavLink} from "react-router-dom";
export default class Example extends React.Component {
  render() {
    const {heading, data, misc} = this.props;
    return (

      <Table striped>
        <thead>
          <tr>
            {heading.map(h => (<th key={Math.random()}>{h}</th>))}
          </tr>
        </thead>
        <tbody>
        {
          data.map(d => (
              <tr key={d.id}>
                <th scope="row">{d.name}</th>
                <td>{d.type}</td>
                <td>{d.model}</td>
                <td>{d.year}</td>
                <td>{d.registration}</td>
                <td>
                    <NavLink to={`/${misc.link}/show/${d.id}`} className="mr-1">
                        <Eye className="mr-1"></Eye>
                    </NavLink>
                    <NavLink to={`/${misc.link}/edit/${d.id}`} className="mr-1">
                        <Edit className="mr-1"></Edit>
                    </NavLink>
                    <NavLink to={`/${misc.link}/delete/${d.id}`} className="mr-1">
                        <Trash className="mr-1"></Trash>
                    </NavLink>
                </td>
              </tr>
              )

          )
        }
        </tbody>
      </Table>
    );
  }
}
