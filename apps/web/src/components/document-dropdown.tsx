"use client";
import {
  DropdownItem,
  Dropdown,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
  Icon,
} from "@unidocs/ui";

const DocumentDropdown = () => (
  <Dropdown>
    <DropdownTrigger as="button">
      <Icon name="MoreVertical"></Icon>
    </DropdownTrigger>
    <DropdownContent>
      {/* <DropdownLabel>Actions</DropdownLabel> */}
      {/* <DropdownSeparator /> */}
      <DropdownItem icon="Eye" as="button">
        View
      </DropdownItem>
      <DropdownItem icon="Download" as="button">
        Download
      </DropdownItem>
      {/* <DropdownItem icon="Users" as="button">
        Members
      </DropdownItem>
      <DropdownItem icon="ArrowLeftRight" as="button">
        Transfer
      </DropdownItem> */}
    </DropdownContent>
  </Dropdown>
);

export { DocumentDropdown };
