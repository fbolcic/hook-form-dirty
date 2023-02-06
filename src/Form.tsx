import { ChangeEvent } from "react";
import { FormProvider, useController, useFieldArray, useForm } from "react-hook-form";
import { Box, Divider, FlexBox, Label, Text } from "./components";

const defaultValues = {
  firstName: "Joe",
  lastName: "Parapoulos",
  colors: ["blue", "yellow"],
  favoriteChild: {
    firstName: "John",
    lastName: "Parapoulos",
  },
  sons: [
    {
      firstName: "John",
      lastName: "Parapoulos",
    },
  ],
  daughters: [
    {
      firstName: "Kitty",
      lastName: "Parapoulos",
    },
  ],
};

const allColors = ["blue", "red", "green", "purple", "yellow"];

const Form = () => {
  const formMethods = useForm({ defaultValues });
  const {
    formState: { dirtyFields, isDirty },
    watch,
  } = formMethods;

  console.log("isDirty", isDirty);

  return (
    <FormProvider {...formMethods}>
      <Box style={{ width: 1000, paddingBlock: 32, margin: "auto" }}>
        <FlexBox space={32}>
          <FlexBox flexDirection="column" space={16} style={{ flex: 1 }}>
            <Input name="firstName" />
            <Divider />
            <Input name="lastName" />
            <Divider />
            <CheckBoxes name="colors" />
            <Divider />
            <ChildComponent name="favoriteChild" />
            <Divider />
            <ChildrenComponent name="sons" />
            <Divider />
            <ChildrenComponent name="daughters" />
          </FlexBox>
          <Box style={{ backgroundColor: "whitesmoke", flex: 1 }}>
            <Text>Values</Text>
            <pre>{JSON.stringify(watch(), undefined, 2)}</pre>
            <Text>Dirty Values</Text>
            <pre>{JSON.stringify(dirtyFields, undefined, 2)}</pre>
          </Box>
        </FlexBox>
      </Box>
    </FormProvider>
  );
};

export default Form;

interface InputProps {
  name: string;
}

const Input = ({ name }: InputProps) => {
  const { field } = useController({ name });

  return (
    <FlexBox flexDirection="column" space={4}>
      <Label htmlFor={name}>{name}</Label>
      <input id={name} type="text" {...field} />
    </FlexBox>
  );
};

const CheckBoxes = ({ name }: InputProps) => {
  const { field } = useController({ name });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const color = event.target.value;

    if (field.value.includes(color)) {
      field.onChange([...field.value.filter((c: string) => c !== color)]);
    } else {
      field.onChange([...field.value, color]);
    }
  }

  return (
    <FlexBox flexDirection="column" space={4}>
      <Label htmlFor={name}>{name}</Label>
      <FlexBox space={8}>
        {allColors.map((color) => (
          <FlexBox key={color} space={4}>
            <label htmlFor={color}>{color}</label>
            <input id={color} checked={field.value.includes(color)} type="checkbox" value={color} {...{ onChange }} />
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

interface ChildComponentProps extends InputProps {
  onDelete?: () => void;
}

const ChildComponent = ({ name, onDelete }: ChildComponentProps) => {
  const { field } = useController({ name });

  return (
    <FlexBox flexDirection="column" space={4}>
      <FlexBox justifyContent={"space-between"} alignItems="center">
        <Label htmlFor={name}>{name}</Label>
        <button onClick={onDelete}>Delete</button>
      </FlexBox>
      <FlexBox flexDirection="column" space={8}>
        <FlexBox space={4} style={{ alignItems: "baseline" }}>
          <Text>Name</Text>
          <input
            type="text"
            value={field.value.firstName}
            onChange={(e) => field.onChange({ firstName: e.target.value, lastName: field.value.lastName })}
          />
        </FlexBox>
        <FlexBox space={4} style={{ alignItems: "baseline" }}>
          <Text>Last Name</Text>
          <input
            type="text"
            value={field.value.lastName}
            onChange={(e) => field.onChange({ firstName: field.value.firstName, lastName: e.target.value })}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ChildrenComponent = ({ name }: InputProps) => {
  const { fields, append, remove } = useFieldArray({ name });

  return (
    <FlexBox flexDirection="column" space={12}>
      <Label htmlFor={name}>{name}</Label>
      {fields.map((_, index) => (
        <ChildComponent key={`${name}.${index}`} name={`${name}.${index}`} onDelete={() => remove(index)} />
      ))}
      <button onClick={() => append({ firstName: "", lastName: "" })}>Add</button>
    </FlexBox>
  );
};
