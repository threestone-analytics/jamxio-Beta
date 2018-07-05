import React from 'react';
import PropTypes from 'prop-types';
import 'react-widgets/dist/css/react-widgets.css';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import Dropzone from '../../../components/Dropzone';

import {
  Button,
  ModalButtonBox,
  DropzoneBox,
  AlertBox,
  Form,
  FormBox,
  Title,
  Alert,
  FieldBox,
} from './style';
import AlertText from '../../../components/Alert';

import validate from './validate';
import asyncValidate from './asyncValidate';

// Actions
import * as alertActions from '../../../redux/reducers/alert/alertActions';
import * as dropzoneActions from '../../../redux/reducers/dropzone/dropzoneActions';
import * as validateActions from '../../../redux/reducers/form/validateFileForm/validateActions';

// Selectors
import { getDropzone } from '../../../utils/selectors/common';

const actions = [alertActions, dropzoneActions, validateActions];

function mapStateToProps(state) {
  return {
    dropzone: getDropzone(state),
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  };
}

const subcategories = [
  'Electricity',
  'Hydrocarbons',
  'Renewables',
  'Manufacturing',
  'Sociodemographics',
  'Conservation & Environmental goods ',
  'Justice',
];

const sources = [
  'SENER',
  'SEGOB',
  'IMMEX',
  'SE',
  'Cartocritica',
  'EIMM',
  'SE',
  'GeoComunes',
  'CONABIO',
  'CONANP',
  'datamxio',
  'RAN',
  'SINAICA',
  'SINEA',
  'CONAPRED',
  'INECC',
  'CONAPO',
  'CDI',
  'COFEPRIS',
  'SEMARNAT',
  'INEGI',
];

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

const renderMultiselect = ({ input, data, valueField, textField }) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

const UF = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  const handle = () => {
    console.log(props)
    // const record = createRecord(props);
    // props.handleAddRecord(record);
  };
  return (
    <Form>
      <form>
        <FormBox>
          <Title big>Categoria:</Title>
          <Title big>Agua</Title>
        </FormBox>
        <FormBox>
          <Title>Subcategoria:</Title>
          <FieldBox>
            <Field name="subcategory" component={renderMultiselect} data={subcategories} />
          </FieldBox>
        </FormBox>
        <FormBox>
          <Title>Fuente de los datos:</Title>
          <FieldBox>
            <Field
              name="source"
              component={renderDropdownList}
              data={sources}
              valueField="value"
              textField="source"
            />
          </FieldBox>
        </FormBox>
        <AlertBox>
          <Alert blue>Descarga el esquema de datos</Alert>
          <AlertText {...props} />
        </AlertBox>
        <DropzoneBox>
          <Dropzone {...props} />
        </DropzoneBox>
      </form>
      <ModalButtonBox>
        <Button cancel="true" onClick={props.handleHide}>
          Salir
        </Button>
        <Button onClick={handle} disabled={!props.valid}>
          Subir
        </Button>
      </ModalButtonBox>
    </Form>
  );
};

UF.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const UFD = reduxForm({
  form: 'uploadForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(UF);

const UploadForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UFD);

export default UploadForm;
