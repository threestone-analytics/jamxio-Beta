import React from 'react';
import PropTypes from 'prop-types';
import 'react-widgets/dist/css/react-widgets.css';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
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

import { validate, createRecord } from './validate';

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

const handleRecord = async (props, record) => {
  await props.handleAddRecord(record);
};

const UF = props => {
  const handleSubmit = () => {
    const record = createRecord(props.forms.uploadForm);
    handleRecord(props, record);
    props.handleHide();
  };
  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormBox>
          <Title big>Categoria:</Title>
          <Title big>Agua</Title>
        </FormBox>
        <FormBox>
          <Title>Subcategoria:</Title>
          <FieldBox>
            <Field
              name="subcategory"
              component={renderDropdownList}
              data={subcategories}
              textField="subcategory"
            />
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
        <Button onClick={handleSubmit} disabled={!props.valid}>
          Subir
        </Button>
      </ModalButtonBox>
    </Form>
  );
};

const UFD = reduxForm({
  form: 'uploadForm',
  validate,
})(UF);

const UploadForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UFD);

export default UploadForm;
