interface IFields {
  [k: string]: FormDataEntryValue;
}

export function formatArrayFormFieldsIntoDictionary(
  prefix: string,
  fields: IFields,
) {
  const dictionary = Object.entries(fields).reduce<{
    [k: string]: { [k: string]: unknown };
  }>((dict, [key, value]) => {
    if (!key.includes(`${prefix}__`)) return dict;
    const [_, tempId, field] = key.split("__");
    dict[tempId] = dict[tempId] ?? {};
    if (!field) return dict;

    dict[tempId][field] = value;

    return dict;
  }, {});

  return dictionary;
}
