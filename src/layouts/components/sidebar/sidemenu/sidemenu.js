// import external modules
import React, { Component } from "react";

import {
   Home, ChevronRight, Map, UserCheck, Terminal, Key, CreditCard
} from "react-feather";
import { NavLink } from "react-router-dom";
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
import SideMenu from "../sidemenuHelper";
import {store} from "../../../../redux/storeConfig/store";


class SideMenuContent extends Component {
    constructor() {
        super();
        this.state = {
            permissions: store.getState().authentication.Auth.permissions
        };
    }

    validatePermission(modulePermission){
        const userPermissions = this.state.permissions;
        const permit = modulePermission.filter( permission => {
            return (userPermissions.indexOf(permission) !== -1);
        });
        return (permit.length ? true : false);
    }
   render() {

      return (
         <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuSingleItem badgeColor="danger" >
               <NavLink to="/dashboard" activeclassname="active">
                  <i className="menu-icon">
                     <Terminal size={18} />
                  </i>
                  <span className="menu-item-text">Dashboard</span>
               </NavLink>
            </SideMenu.MenuSingleItem>

             {/*ACL Menu*/}

             {this.validatePermission(['access_all', 'acl_all', 'acl_view', 'acl_add']) ?
             <SideMenu.MenuMultiItems
                 name="Roles & Permissions"
                 Icon={<Key size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 {this.validatePermission(['access_all', 'acl_all', 'acl_view']) ?
                 <NavLink to="/acl/roles" className="item" activeclassname="active">
                     <span className="menu-item-text">All Roles</span>
                 </NavLink> : '' }
                 {this.validatePermission(['access_all', 'acl_all', 'acl_add']) ?
                 <NavLink to="/acl/roles/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Role</span>
                 </NavLink> : '' }
             </SideMenu.MenuMultiItems> : ''}


            {/*Vehicles Menu*/}
             {this.validatePermission(['access_all', 'vehicle_all', 'vehicle_view', 'vehicle_add']) ?
            <SideMenu.MenuMultiItems
               name="Vehicles"
               Icon={<Map size={18} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >
                {this.validatePermission(['access_all', 'vehicle_all', 'vehicle_view']) ?
               <NavLink to="/vehicles" className="item" activeclassname="active">
                  <span className="menu-item-text">All Vehicles</span>
               </NavLink> : ''}

                {this.validatePermission(['access_all', 'vehicle_all', 'vehicle_add']) ?
               <NavLink to="/vehicles/create" className="item" activeclassname="active">
                  <span className="menu-item-text">Add Vehicles</span>
               </NavLink> : ''}
            </SideMenu.MenuMultiItems> : ''}

            {/*Merchant Menu*/}
             {this.validatePermission(['access_all', 'merchant_all', 'merchant_view', 'merchant_add']) ?
            <SideMenu.MenuMultiItems
                name="Merchants"
                Icon={<UserCheck size={18} />}
                ArrowRight={<ChevronRight size={16} />}
                collapsedSidebar={this.props.collapsedSidebar}
            >
                {this.validatePermission(['access_all', 'merchant_all', 'merchant_view']) ?
               <NavLink to="/merchants" className="item" activeclassname="active">
                  <span className="menu-item-text">All Merchants</span>
               </NavLink> : ''}
                {this.validatePermission(['access_all', 'merchant_all', 'merchant_add']) ?
               <NavLink to="/merchants/create" className="item" activeclassname="active">
                  <span className="menu-item-text">Add Merchant</span>
               </NavLink> : ''}
            </SideMenu.MenuMultiItems> : ''}

             {/*Passenger Menu*/}
             {this.validatePermission(['access_all', 'passenger_all', 'passenger_view', 'passenger_add']) ?
             <SideMenu.MenuMultiItems
                 name="Passengers"
                 Icon={<UserCheck size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 {this.validatePermission(['access_all', 'passenger_all', 'passenger_view']) ?
                 <NavLink to="/passengers" className="item" activeclassname="active">
                     <span className="menu-item-text">All Passenger</span>
                 </NavLink> : ''}

                 {this.validatePermission(['access_all', 'passenger_all', 'passenger_add']) ?
                 <NavLink to="/passengers/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Passenger</span>
                 </NavLink> : ''}
             </SideMenu.MenuMultiItems> : ''}

             {/*Booth Menu*/}
             {this.validatePermission(['access_all', 'booth_all', 'booth_view', 'booth_add']) ?
             <SideMenu.MenuMultiItems
                 name="Booths"
                 Icon={<Home size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 {this.validatePermission(['access_all', 'booth_all', 'booth_view']) ?
                 <NavLink to="/booths" className="item" activeclassname="active">
                     <span className="menu-item-text">All Booths</span>
                 </NavLink> : ''}

                 {this.validatePermission(['access_all', 'booth_all', 'booth_add']) ?
                 <NavLink to="/booths/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Booth</span>
                 </NavLink> : ''}
             </SideMenu.MenuMultiItems> : ''}

             {/*Tickets Menu*/}
             {this.validatePermission(['access_all', 'ticket_all', 'ticket_view', 'ticket_add']) ?
             <SideMenu.MenuMultiItems
                 name="Tickets"
                 Icon={<CreditCard size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 {this.validatePermission(['access_all', 'ticket_all', 'ticket_view', 'ticket_add']) ?
                 <NavLink to="/tickets" className="item" activeclassname="active">
                     <span className="menu-item-text">All Tickets</span>
                 </NavLink> : ''}

                 {this.validatePermission(['access_all', 'ticket_all', 'ticket_view', 'ticket_add']) ?
                 <NavLink to="/tickets/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Ticket</span>
                 </NavLink> : ''}
             </SideMenu.MenuMultiItems> : ''}

         </SideMenu>
      );
   }
}

export default SideMenuContent;
