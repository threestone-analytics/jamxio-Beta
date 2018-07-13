export const createRecord = (form, data) => {
  const date = new Date();

  const publisher = {
    user: {
      username: 'alexter42',
    },
  };

  const document = {};
  document.source = form.values.source;
  document.format = form.values.format;
  document.documentType = data.documentType._id;
  document.geometry = form.values.geometry;
  document.title = form.values.source;
  document.publishedDate = date;
  document.publisher = publisher;
  const id = data._id;

  const newDocument = {
    document,
    id,
  };
  return newDocument;
};

export const validate = values => {
  const check = values.toJSON();
  console.log(check)
  const errors = {};
  if (!check.geometry) {
    errors.geometry = 'Required';
  }
  if (!check.format) {
    errors.format = 'Required';
  }
  if (!check.source) {
    errors.source = 'Required';
  }
  return errors;
};
