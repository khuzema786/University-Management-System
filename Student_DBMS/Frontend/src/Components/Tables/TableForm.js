import React, { useEffect } from 'react';

import { useForm, Form } from './useForm';

import { Input, RadioGroup, DatePicker, Select, Checkbox, Button } from './Elements';

import { Grid } from '../materialProps';

import { forms } from '../../Data/infographics.json';

function TableForm(props) {
  const { addOrEdit, recordForEdit, table } = props; // 'student'

  const initialValues = () => {
    const data = {};
    for (let elem in forms[table]) {
      // forms.student -> stud_Erp, course_id
      data[elem] = ''; // data.stud_erp = ''
    }
    data.insert = true;
    return data;
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    for (let elem in forms[table]) {
      if (elem in fieldValues) temp[elem] = fieldValues[elem] ? '' : 'This field is required.';
    }

    setErrors({
      ...temp
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues(),
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit
      });
    }
  }, [recordForEdit, setValues]);

  const generateSection = (col, type, key) => {
    const colData = forms[table + '_data'][col]; // forms.student_data.stud_erp
    switch (type) {
      case 'input':
        return (
          <Input
            key={key}
            label={colData.label}
            name={colData.name}
            value={values[col]}
            onChange={handleInputChange}
            error={errors[col]}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            key={key}
            label={colData.label}
            name={colData.name}
            value={values[col]}
            onChange={handleInputChange}
            items={colData.items}
          />
        );
      case 'date':
        return (
          <DatePicker
            key={key}
            label={colData.label}
            name={colData.name}
            value={values[col]}
            onChange={handleInputChange}
          />
        );
      case 'select':
        return (
          <Select
            key={key}
            label={colData.label}
            name={colData.name}
            value={values[col]}
            onChange={handleInputChange}
            error={errors[col]}
          />
        );
      default:
        return (
          <Input
            key={key}
            label={colData.label}
            name={colData.name}
            value={values[col]}
            onChange={handleInputChange}
            error={errors[col]}
          />
        );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          {Object.keys(forms[table]) // [stud_erp, roll, ..]
            .slice(0, 4)
            .map((val, ind) => {
              return generateSection(val, forms[table][val], ind); // forms.students.stud_erp: input
            })}
        </Grid>
        <Grid item xs={6}>
          {Object.keys(forms[table])
            .slice(4)
            .map((val, ind) => {
              return generateSection(val, forms[table][val], ind + 4);
            })}
          <Checkbox
            name="isPermanent"
            label="Are you sure the details are complete?"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Button type="submit" text="Submit" />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default TableForm;
