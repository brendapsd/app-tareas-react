import React from 'react'; 
import {
  Alignment,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import './style.css'; 

function TodoPage(props) {
  return (
    <React.Fragment>
        <Navbar className={Classes.DARK}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Todo App</NavbarHeading>
          </NavbarGroup>
        </Navbar>
        <div className="page">
          {props.children}
        </div>
    </React.Fragment>
  )
}

export default TodoPage; 