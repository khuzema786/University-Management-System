import React from 'react';

import { ListItem, ListItemIcon, ListItemText } from '../materialProps';

import { sections } from '../../Data/infographics.json';

function Navigation({ setCategory }) {
  return (
    <div>
      {sections.map((element, index) => {
        return (
          <ListItem button onClick={(e) => setCategory(index + 1)} key={index}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={element} />
          </ListItem>
        );
      })}
    </div>
  );
}

export default Navigation;
