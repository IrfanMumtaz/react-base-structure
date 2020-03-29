// import external modules
import React, { Component } from "react";

import {
   Home, ChevronRight, Map, UserCheck, Terminal, Key, CreditCard
} from "react-feather";
import { NavLink } from "react-router-dom";

// Styling
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";

class SideMenuContent extends Component {
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
             <SideMenu.MenuMultiItems
                 name="Roles & Permissions"
                 Icon={<Key size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 <NavLink to="/acl/roles" className="item" activeclassname="active">
                     <span className="menu-item-text">All Roles</span>
                 </NavLink>
                 <NavLink to="/acl/roles/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Role</span>
                 </NavLink>
             </SideMenu.MenuMultiItems>

            {/*Vehicles Menu*/}
            <SideMenu.MenuMultiItems
               name="Vehicles"
               Icon={<Map size={18} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >
               <NavLink to="/vehicles" className="item" activeclassname="active">
                  <span className="menu-item-text">All Vehicles</span>
               </NavLink>
               <NavLink to="/vehicles/create" className="item" activeclassname="active">
                  <span className="menu-item-text">Add Vehicles</span>
               </NavLink>
            </SideMenu.MenuMultiItems>

            {/*Merchant Menu*/}
            <SideMenu.MenuMultiItems
                name="Merchants"
                Icon={<UserCheck size={18} />}
                ArrowRight={<ChevronRight size={16} />}
                collapsedSidebar={this.props.collapsedSidebar}
            >
               <NavLink to="/merchants" className="item" activeclassname="active">
                  <span className="menu-item-text">All Merchants</span>
               </NavLink>
               <NavLink to="/merchants/create" className="item" activeclassname="active">
                  <span className="menu-item-text">Add Merchant</span>
               </NavLink>
            </SideMenu.MenuMultiItems>

             {/*Passenger Menu*/}
             <SideMenu.MenuMultiItems
                 name="Passengers"
                 Icon={<UserCheck size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 <NavLink to="/passengers" className="item" activeclassname="active">
                     <span className="menu-item-text">All Passenger</span>
                 </NavLink>
                 <NavLink to="/passengers/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Passenger</span>
                 </NavLink>
             </SideMenu.MenuMultiItems>

             {/*Booth Menu*/}
             <SideMenu.MenuMultiItems
                 name="Booths"
                 Icon={<Home size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 <NavLink to="/booths" className="item" activeclassname="active">
                     <span className="menu-item-text">All Booths</span>
                 </NavLink>
                 <NavLink to="/booths/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Booth</span>
                 </NavLink>
             </SideMenu.MenuMultiItems>

             {/*Tickets Menu*/}
             <SideMenu.MenuMultiItems
                 name="Tickets"
                 Icon={<CreditCard size={18} />}
                 ArrowRight={<ChevronRight size={16} />}
                 collapsedSidebar={this.props.collapsedSidebar}
             >
                 <NavLink to="/tickets" className="item" activeclassname="active">
                     <span className="menu-item-text">All Tickets</span>
                 </NavLink>
                 <NavLink to="/tickets/create" className="item" activeclassname="active">
                     <span className="menu-item-text">Add Ticket</span>
                 </NavLink>
             </SideMenu.MenuMultiItems>

         </SideMenu>
      );
   }
}

export default SideMenuContent;
