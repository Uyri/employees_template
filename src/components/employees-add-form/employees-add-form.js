import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            salary: '',
            formErrors: {name: '', salary: ''},
            nameValid: false,
            salaryValid: false,
            formValid: false
        } 
    }

    onValueChange = (e) => {
        const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let salaryValid = this.state.salaryValid;
      switch(fieldName) {
          case 'name':
            nameValid = value.length >= 1;
            break;
          case 'salary':
            salaryValid = value.length >= 1;
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        nameValid: nameValid,
                        salaryValid: salaryValid
                      }, this.validateForm);
      }
      validateForm() {
        this.setState({formValid: this.state.nameValid &&
                                  this.state.salaryValid}); 
      }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit = {this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name = "name"
                        value={name} 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name = "salary"
                        value={salary} 
                        onChange={this.onValueChange}/>
    
                    <button type="submit" 
                        disabled={!this.state.formValid}
                        className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;