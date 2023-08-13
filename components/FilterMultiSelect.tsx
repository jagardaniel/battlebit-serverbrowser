import { MultiSelectItem } from "@/types/MultiSelectItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  name: string;
  placeholder: string;
  renderValueText: string;
  items: MultiSelectItem[];
  values: string[];
  onMultiSelectChange: (event: SelectChangeEvent<string[]>) => void;
};

export default function FilterMultiSelect({
  name,
  placeholder,
  renderValueText,
  items,
  values,
  onMultiSelectChange,
}: Props) {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <Select
        multiple
        displayEmpty
        name={name}
        value={values}
        onChange={onMultiSelectChange}
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <Box sx={{ color: "text.disabled" }}>{placeholder}</Box>;
          }

          return (
            selected.length.toString() + " " + renderValueText + " selected"
          );
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
