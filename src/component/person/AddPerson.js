import React from 'react';

import './AddPerson.scss';

/**
 * This component uses local state to manage values during editing
 * when Add button is clicked the values are passed to parent using
 * prop addPerson (function).
 * Note! the parent takes care of adding the person to redux store
 */
class AddPerson extends React.Component {
  /* NOTE!
   * binding state to input values requres empty string
   * to be used in order to bind and not display warnings.
   */
  state = {
    name: '',
    age: '',
    disabled: true,
  };
  setName = event => {
    let disabled =
      event.target.value == '' || this.state.age == '';
    this.setState({
      name: event.target.value,
      disabled,
    });
  };
  setAge = event => {
    let disabled =
      this.state.name == '' || event.target.value == '';
    this.setState({
      age: event.target.value,
      disabled,
    });
  };
  onAddPerson = () => {
    //console.log("Add person...", this.state);
    this.props.addPerson({
      ...this.state,
      added: new Date(),
    });
    //RESET STATE
    this.resetState();
  };
  resetState = () => {
    this.setState({
      name: '',
      age: '',
      disabled: true,
    });
  };
  render() {
    return (
      <div className="persons-add">
        <div className="persons-add-title">
          {this.props.title}
        </div>

        <p className="persons-input">
          <input
            className="form-input"
            style={{ width: 70 + '%' }}
            name="name"
            type="text"
            placeholder={this.props.namePlaceholder}
            onChange={this.setName}
            value={this.state.name}
          />
          <input
            className="form-input"
            style={{ width: 30 + '%' }}
            name="age"
            type="number"
            placeholder={this.props.agePlaceholder}
            onChange={this.setAge}
            value={this.state.age}
          />
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={this.onAddPerson}
          disabled={this.state.disabled}>
          {this.props.btnLabel}
        </button>
      </div>
    );
  }
}

export default AddPerson;
