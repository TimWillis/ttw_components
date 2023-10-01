import field_validation from './field_validation';
export interface values {
  el_id: string;
  value: string | undefined;
}
export default (values: Array<values>, form_el_query) => {
  let is_valid = true;
  ////debugger;
  const required_fields: any = document.querySelectorAll(form_el_query);
  for (const field of required_fields) {
    if (!field.validity.valid) {
      is_valid = false;
      field_validation('This field is required.', field, field.id + '_validation');
    }
  }
  values.forEach((value) => {
    if (!value.value || value.value === '') {
      is_valid = false;
      field_validation('This field is required.', document.getElementById(value.el_id), value.el_id + '_validation');
    }
  });
  // if (!state.selected_program || state.selected_program === "") {
  //     is_valid = false;
  //     field_validation("This field is required.", document.getElementById("programs_container"), "program_validation");
  // } else if (!state.selected_project || state.selected_project === "") {
  //     is_valid = false;
  //     field_validation("This field is required.", document.getElementById("projects_container"), "project_validation");
  // }
  return is_valid;
};
