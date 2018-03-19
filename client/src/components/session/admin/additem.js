import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Upload from './upload/upload';
import * as actions from '../../../actions';

class Additem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        };
    };



    handleFormSubmit(formProps) {
        this.props.addItem(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    onChangeImg(img) {
        this.setState({
            img: img
        });
    }

    render(){
        const {handleSubmit, fields: { name, price, desc, img }} = this.props;
        return (
            <div>
                <Upload />
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <input type='hidden' value={this.state.img} changeImg={this.onChangeImg.bind(this)} {...img} />
                    <fieldset className='form-group'>
                        <label>Item Name:</label>
                        <input className='form-control' {...name} />
                        {name.touched && name.error && <div className='error'>{name.error}</div>}
                    </fieldset>
                    <fieldset className='form-group'>
                        <label>Price:</label>
                        <input className='form-control' {...price} />
                        {price.touched && price.error && <div className='error'>{price.error}</div>}
                    </fieldset>
                    <fieldset className='form-group'>
                        <label>Description:</label>
                        <input className='form-control' {...desc} />
                        {desc.touched && desc.error && <div className='error'>{desc.error}</div>}
                    </fieldset>
                    {this.renderAlert()}
                    <button action='submit' className='btn btn-primary'>Add Item</button>
                </form>
            </div>
        );
    };
}

function validate(formProps) {
    const errors = {};

    if(!formProps.name) {
        errors.name = 'Item name cannot be blank';
    }
    if(!formProps.price) {
        errors.price = 'Price cannot be blank';
    }
    if(!formProps.desc) {
        errors.desc = 'Description cannot be blank';
    }
    // if(!formProps.img) {
    //     errors.img = 'Please select an image';
    // }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'additem',
    fields: ['name', 'price', 'desc', 'img'],
    validate
}, mapStateToProps, actions)(Additem);