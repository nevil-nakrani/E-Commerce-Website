import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControlles,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const renderInputsByComponentType = (getControllItem) => {
    let element = null;
    const value = formData[getControllItem.name] || "";
    switch (getControllItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControllItem.name}
            placeholder={getControllItem.placeholder}
            id={getControllItem.name}
            type={getControllItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControllItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControllItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControllItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControllItem.options && getControllItem.options.length > 0
                ? getControllItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControllItem.name}
            placeholder={getControllItem.placeholder}
            id={getControllItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControllItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControllItem.name}
            placeholder={getControllItem.placeholder}
            id={getControllItem.name}
            type={getControllItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControllItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControlles.map((controllItem) => (
          <div className="grid w-full gap-1.5" key={controllItem.name}>
            <Label className="">{controllItem.label}</Label>
            {renderInputsByComponentType(controllItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} className="mt-3 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
