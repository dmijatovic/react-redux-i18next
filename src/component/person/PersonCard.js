import React from 'react';

import './PersonCard.scss';

//let datum = new Date();

const PersonCard = props => (
  <div className="person-card">
    <div className="person-card-header">
      <h3 className="person-name">
        {props.nameLabel}
        {props.name}
      </h3>
      <button
        className="btn btn-white person-btn-delete"
        onClick={() => props.deletePerson(props.id)}
      />
    </div>
    <div className="person-card-body">
      <h3 className="person-age">
        {props.ageLabel}
        {props.age}
      </h3>
      <div className="person-added">
        {props.addedLabel}: {props.added.toLocaleDateString()}
        <br />
        {props.atLabel}: {props.added.toLocaleTimeString()}
      </div>
    </div>
  </div>
);

export default PersonCard;
