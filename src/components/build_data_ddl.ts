// import { dom_diffing, input_with_label, ddl, unique_id } from "hlinc_components";

import dom_diffing from '../utilities/dom_diffing';
import unique_id from '../utilities/unique_id';
import ddl from './ddl';
import input_with_label from './input_with_label';

// import dl from "../utilities/data_access_init";
export default async (
  dl: any,
  selected_value: string,
  url: string,
  name: string,
  container_name: string,
  id: string = unique_id(6),
  callback?: (e: { stopPropagation: () => void; preventDefault: () => void }, value: any) => void,
  data_id: string = 'id',
  data_name: string = 'name',
) => {
  // const url = "TestGen/GetRoles";
  const data = await dl()
    .get(url)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      location.reload();
    });
  if (data) {
    const values = data.map((value: any) => {
      return {
        value: value[data_id],
        name: value[data_name],
      };
    });
    values.unshift({ value: '', name: 'Select ' + name });
    dom_diffing(
      container_name,
      input_with_label({
        html: ddl({
          options: values,
          id: id,
          selected_value: selected_value,
          callback: callback,
        }),
        for_id: id,
        name: name,
      }),
      'div',
      undefined,
      true,
    );
  } else {
  }
};
