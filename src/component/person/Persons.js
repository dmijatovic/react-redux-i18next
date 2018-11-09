//REACT
import React from 'react';

//THIRD PARTY
import { connect } from 'react-redux';

//LOCAL
import * as actionType from '../../store/actions';
import './Persons.scss';
import AddPerson from './AddPerson';
import PersonCard from './PersonCard';
/**
 * Class Persons handles adding new persons
 * and displaying added persons in an card.
 * It depends on AddPerson and PersonCard
 * components.
 */
export class Persons extends React.Component {
  /**
   * Create persons content.
   * If persons array filled generate person cards per person
   * else show empty placeholder message.
   */
  getContent = () => {
    //create jsx content
    let jsx;
    if (this.props.persons.length > 0) {
      jsx = this.props.persons.map(p => {
        //debugger
        return (
          <PersonCard
            {...p}
            deletePerson={this.props.onDeletePerson}
            addedLabel={this.props.personCardAddedLabel}
            atLabel={this.props.personCardAtLabel}
            key={p.id}
          />
        );
      });
    } else {
      jsx = (
        <div className="persons-collection-empty">
          <p>{this.props.personsListEmptyMessage}</p>
        </div>
      );
    }
    return jsx;
  };
  render() {
    return (
      <div className="persons">
        <AddPerson
          title={this.props.addPersonTitle}
          namePlaceholder={
            this.props.addPersonInputNamePlaceholder
          }
          agePlaceholder={
            this.props.addPersonInputAgePlaceholder
          }
          btnLabel={this.props.addPersonBtnLabel}
          addPerson={this.props.onAddPerson}
        />
        <div className="persons-collection">
          {/* aestetic change - this header is excluded
            <h3 className="persons-collection-title">
              {this.props.personsListTitle}
            </h3>
          */}
          {this.getContent()}
        </div>
      </div>
    );
  }
}

//-------------- REDUX CONNECTION ---------------------

const mapStateToProps = state => {
  //debugger
  //get translations from i18n reducer
  let { data } = state.i18n.lang;
  if (data) {
    return {
      persons: state.persons,
      addPersonTitle: data['AddPerson.title'],
      addPersonInputNamePlaceholder:
        data['AddPerson.input.name.placeholder'],
      addPersonInputAgePlaceholder:
        data['AddPerson.input.age.placeholder'],
      addPersonBtnLabel: data['AddPerson.btnLabel'],
      personsListTitle: data['Persons.ListTitle'],
      personsListEmptyMessage: data['Persons.ListEmptyMessage'],
      personCardAddedLabel: data['PersonCard.addedLabel'],
      personCardAtLabel: data['PersonCard.atLabel'],
    };
  } else {
    return {
      persons: state.persons,
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: person => {
      //debugger
      return dispatch({
        type: actionType.ADD_PERSON,
        payload: person,
      });
    },
    onDeletePerson: id => {
      //debugger
      return dispatch({
        type: actionType.DELETE_PERSON,
        payload: id,
      });
    },
  };
};

//----------- EXPORT CONNECTED COMPONENT ------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons);
